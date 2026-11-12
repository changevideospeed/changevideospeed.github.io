import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export type EngineStage = 'loading' | 'probing' | 'processing' | 'finalizing';

export interface SpeedChangeOptions {
  file: File;
  speed: number;
  muteAudio: boolean;
  outputAsGif: boolean;
  inputDurationSec?: number;
  needsEvenPad?: boolean;
  onStage?: (stage: EngineStage) => void;
  onProgress?: (percent: number) => void;
  signal?: AbortSignal;
}

export interface SpeedChangeResult {
  blob: Blob;
  url: string;
  mimeType: string;
  filename: string;
  hasAudio: boolean;
}

const CORE_VERSION = '0.12.10';
const LOCAL_BASE = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/ffmpeg`;
const CDN_BASES = [
  LOCAL_BASE,
  `https://cdn.jsdelivr.net/npm/@ffmpeg/core@${CORE_VERSION}/dist/esm`,
  `https://unpkg.com/@ffmpeg/core@${CORE_VERSION}/dist/esm`,
];

let ffmpegInstance: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;
let jobCounter = 0;

export function buildAtempoFilter(speed: number): string {
  const clamped = Math.min(10, Math.max(0.1, Number(speed.toFixed(4))));
  if (Math.abs(clamped - 1) < 0.0001) {
    return 'atempo=1.0';
  }

  const filters: string[] = [];
  let remaining = clamped;

  while (remaining < 0.5 - 1e-6) {
    filters.push('atempo=0.5');
    remaining = Number((remaining / 0.5).toFixed(6));
  }

  while (remaining > 2.0 + 1e-6) {
    filters.push('atempo=2.0');
    remaining = Number((remaining / 2.0).toFixed(6));
  }

  const finalFactor = Math.min(2.0, Math.max(0.5, Number(remaining.toFixed(4))));
  filters.push(`atempo=${finalFactor}`);
  return filters.join(',');
}

export function formatDuration(seconds: number | null | undefined): string {
  if (seconds == null || !Number.isFinite(seconds) || seconds < 0) {
    return '00:00';
  }
  const rounded = Math.max(0, Math.round(seconds));
  const hrs = Math.floor(rounded / 3600);
  const mins = Math.floor((rounded % 3600) / 60);
  const secs = rounded % 60;
  const mm = String(mins).padStart(2, '0');
  const ss = String(secs).padStart(2, '0');
  if (hrs > 0) {
    return `${String(hrs).padStart(2, '0')}:${mm}:${ss}`;
  }
  return `${mm}:${ss}`;
}

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(2)} MB`;
  return `${(mb / 1024).toFixed(2)} GB`;
}

export function isGifFile(file: File): boolean {
  return file.type === 'image/gif' || /\.gif$/i.test(file.name);
}

const SUPPORTED_VIDEO_EXT = /\.(mp4|m4v|webm|mov|mkv|avi|ogv|3gp|flv|wmv|gif)$/i;

export function isSupportedMediaFile(file: File): boolean {
  if (file.type.startsWith('video/') || file.type === 'image/gif') {
    return true;
  }
  return SUPPORTED_VIDEO_EXT.test(file.name);
}

async function ensureFFmpegLoaded(): Promise<FFmpeg> {
  if (ffmpegInstance && ffmpegInstance.loaded) {
    return ffmpegInstance;
  }
  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = (async () => {
    let lastError: unknown = null;

    for (const baseURL of CDN_BASES) {
      const instance = new FFmpeg();
      try {
        const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript');
        const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm');
        await instance.load({ coreURL, wasmURL });
        ffmpegInstance = instance;
        return instance;
      } catch (err) {
        lastError = err;
        try {
          instance.terminate();
        } catch {
          // ignore cleanup failure
        }
      }
    }

    loadPromise = null;
    throw lastError instanceof Error
      ? lastError
      : new Error('Failed to load FFmpeg WebAssembly core');
  })();

  return loadPromise;
}

export function terminateFFmpeg(): void {
  loadPromise = null;
  if (ffmpegInstance) {
    try {
      ffmpegInstance.terminate();
    } catch {
      // ignore
    }
    ffmpegInstance = null;
  }
}

async function safeDelete(ffmpeg: FFmpeg, path: string): Promise<void> {
  try {
    await ffmpeg.deleteFile(path);
  } catch {
    // file may not exist
  }
}

async function detectAudioTrack(ffmpeg: FFmpeg, inputName: string, probeFile: string): Promise<boolean> {
  // Primary check: inspect FFmpeg stream headers via `-i` log output (works reliably across all @ffmpeg/core builds)
  const probeLogs: string[] = [];
  const captureLog = ({ message }: { type: string; message: string }) => {
    probeLogs.push(message);
  };
  ffmpeg.on('log', captureLog);
  try {
    await ffmpeg.exec(['-hide_banner', '-i', inputName]);
  } catch {
    // `-i` without output exits non-zero intentionally after logging stream info
  } finally {
    ffmpeg.off('log', captureLog);
  }

  const headerDump = probeLogs.join('\n');
  if (/Input #0/i.test(headerDump)) {
    return /Stream #\d+:\d+[^:]*:\s*Audio:/i.test(headerDump);
  }

  // Secondary check: ffprobe
  try {
    const code = await ffmpeg.ffprobe([
      '-v',
      'error',
      '-select_streams',
      'a',
      '-show_entries',
      'stream=index',
      '-of',
      'csv=p=0',
      inputName,
      '-o',
      probeFile,
    ]);

    if (code === 0) {
      const data = await ffmpeg.readFile(probeFile, 'utf8');
      await safeDelete(ffmpeg, probeFile);
      if (typeof data === 'string') {
        return data.trim().length > 0;
      }
    }
  } catch {
    // fallback below
  }
  await safeDelete(ffmpeg, probeFile);
  // Default optimistic (`true`): if the container actually has no audio track, the encode fallback retries with `-an`
  return true;
}

function getSafeExtension(filename: string): string {
  const match = filename.toLowerCase().match(/\.([a-z0-9]+)$/);
  return match ? `.${match[1]}` : '.mp4';
}

function buildOutputFilename(originalName: string, speed: number, outputExt: string): string {
  const baseName = originalName.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9._-]+/g, '_') || 'video';
  const speedTag = `${Number(speed.toFixed(2))}x`;
  return `${baseName}-${speedTag}.${outputExt}`;
}

export async function changeMediaSpeed(options: SpeedChangeOptions): Promise<SpeedChangeResult> {
  const {
    file,
    speed,
    muteAudio,
    outputAsGif,
    inputDurationSec,
    needsEvenPad = false,
    onStage,
    onProgress,
    signal,
  } = options;

  if (signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }

  onStage?.('loading');
  onProgress?.(2);
  const ffmpeg = await ensureFFmpegLoaded();

  if (signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }

  const jobId = ++jobCounter;
  const inputExt = getSafeExtension(file.name);
  const inputName = `in_${jobId}${inputExt}`;
  const probeFile = `probe_${jobId}.txt`;
  const inputIsGif = isGifFile(file);
  const targetGif = outputAsGif || inputIsGif;
  const outputExt = targetGif ? 'gif' : 'mp4';
  const outputName = `out_${jobId}.${outputExt}`;
  const speedStr = Number(speed.toFixed(4)).toString();

  const logs: string[] = [];
  const logHandler = ({ message }: { type: string; message: string }) => {
    logs.push(message);
    if (logs.length > 80) logs.shift();
  };

  const progressHandler = ({ progress, time }: { progress: number; time: number }) => {
    let pct = 0;
    if (inputDurationSec && inputDurationSec > 0 && time > 0) {
      const expectedOutSec = inputDurationSec / speed;
      const outTimeSec = time / 1_000_000;
      pct = Math.round((outTimeSec / expectedOutSec) * 100);
    } else if (Number.isFinite(progress) && progress > 0) {
      pct = Math.round(progress * 100);
    }
    const bounded = Math.min(98, Math.max(5, pct));
    onProgress?.(bounded);
  };

  const onAbort = () => {
    terminateFFmpeg();
  };
  signal?.addEventListener('abort', onAbort, { once: true });

  ffmpeg.on('log', logHandler);
  ffmpeg.on('progress', progressHandler);

  try {
    onStage?.('probing');
    onProgress?.(5);

    const bytes = await fetchFile(file);
    await ffmpeg.writeFile(inputName, bytes);

    const hasAudio = !targetGif && !muteAudio
      ? await detectAudioTrack(ffmpeg, inputName, probeFile)
      : false;

    onStage?.('processing');
    onProgress?.(8);

    const runEncode = async (forceEvenPad: boolean, allowAudio: boolean): Promise<number> => {
      if (targetGif) {
        const prefix = inputIsGif
          ? `[0:v]setpts=PTS/${speedStr}`
          : `[0:v]fps=15,scale='min(640,iw)':-1:flags=lanczos,setpts=PTS/${speedStr}`;
        const filterComplex = `${prefix},split[s0][s1];[s0]palettegen=stats_mode=diff[p];[s1][p]paletteuse=dither=bayer`;
        return ffmpeg.exec(['-i', inputName, '-filter_complex', filterComplex, '-loop', '0', outputName]);
      }

      const vFilter = forceEvenPad
        ? `[0:v]setpts=PTS/${speedStr},pad=ceil(iw/2)*2:ceil(ih/2)*2[v]`
        : `[0:v]setpts=PTS/${speedStr}[v]`;

      if (allowAudio) {
        const atempo = buildAtempoFilter(speed);
        const filterComplex = `${vFilter};[0:a:0]${atempo}[a]`;
        return ffmpeg.exec([
          '-i',
          inputName,
          '-filter_complex',
          filterComplex,
          '-map',
          '[v]',
          '-map',
          '[a]',
          '-c:v',
          'libx264',
          '-preset',
          'ultrafast',
          '-crf',
          '23',
          '-pix_fmt',
          'yuv420p',
          '-c:a',
          'aac',
          '-b:a',
          '128k',
          '-movflags',
          '+faststart',
          outputName,
        ]);
      }

      return ffmpeg.exec([
        '-i',
        inputName,
        '-filter_complex',
        vFilter,
        '-map',
        '[v]',
        '-an',
        '-c:v',
        'libx264',
        '-preset',
        'ultrafast',
        '-crf',
        '23',
        '-pix_fmt',
        'yuv420p',
        '-movflags',
        '+faststart',
        outputName,
      ]);
    };

    let useEvenPad = needsEvenPad;
    let useAudio = hasAudio;
    let exitCode = await runEncode(useEvenPad, useAudio);

    for (let attempt = 0; attempt < 2 && exitCode !== 0 && !targetGif; attempt++) {
      const logJoined = logs.join('\n');
      const oddDims = !useEvenPad && /not divisible by 2|width not divisible|height not divisible/i.test(logJoined);
      const missingAudio =
        useAudio && /matches no streams|Stream specifier|does not contain any stream/i.test(logJoined);

      if (!oddDims && !missingAudio) {
        break;
      }
      if (oddDims) useEvenPad = true;
      if (missingAudio) useAudio = false;

      logs.length = 0;
      await safeDelete(ffmpeg, outputName);
      exitCode = await runEncode(useEvenPad, useAudio);
    }

    if (signal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }

    if (exitCode !== 0) {
      const tail = logs.slice(-6).join(' | ');
      throw new Error(`FFmpeg exited with code ${exitCode}${tail ? `: ${tail}` : ''}`);
    }

    onStage?.('finalizing');
    onProgress?.(99);

    const data = await ffmpeg.readFile(outputName);
    if (!(data instanceof Uint8Array) || data.byteLength === 0) {
      throw new Error('FFmpeg produced an empty output file.');
    }

    const mimeType = targetGif ? 'image/gif' : 'video/mp4';
    const copyBytes = new Uint8Array(data.byteLength);
    copyBytes.set(data);
    const blob = new Blob([copyBytes.buffer], { type: mimeType });
    const url = URL.createObjectURL(blob);

    onProgress?.(100);

    return {
      blob,
      url,
      mimeType,
      filename: buildOutputFilename(file.name, speed, outputExt),
      hasAudio: useAudio,
    };
  } finally {
    signal?.removeEventListener('abort', onAbort);
    ffmpeg.off('log', logHandler);
    ffmpeg.off('progress', progressHandler);
    if (ffmpegInstance && ffmpegInstance.loaded) {
      await safeDelete(ffmpegInstance, inputName);
      await safeDelete(ffmpegInstance, outputName);
      await safeDelete(ffmpegInstance, probeFile);
    }
  }
}
