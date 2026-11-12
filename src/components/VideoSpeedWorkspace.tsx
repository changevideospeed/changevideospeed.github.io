import { useEffect, useRef, useState } from 'preact/hooks';
import type { UITranslations } from '../i18n/ui';
import {
  changeMediaSpeed,
  formatDuration,
  formatFileSize,
  isGifFile,
  isSupportedMediaFile,
  type EngineStage,
} from '../lib/ffmpegEngine';

type SpeedMode = 'change' | 'speedUp' | 'slowDown' | 'gif';
type Step = 'upload' | 'controls' | 'processing' | 'result';

interface QueuedItem {
  id: string;
  file: File;
  previewUrl: string;
  isGif: boolean;
  durationSec: number | null;
  needsEvenPad: boolean;
}

interface ProcessedItem {
  id: string;
  sourceName: string;
  originalDurationSec: number | null;
  outputDurationSec: number | null;
  outputUrl: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  isGif: boolean;
}

interface Props {
  t: UITranslations['workspace'];
}

const PRESETS: Array<{ value: number; label: string; tagKey: keyof UITranslations['workspace']['step2'] }> = [
  { value: 0.25, label: '0.25x', tagKey: 'presetTagSlowest' },
  { value: 0.5, label: '0.5x', tagKey: 'presetTagSlow' },
  { value: 1.25, label: '1.25x', tagKey: 'presetTagBrisk' },
  { value: 1.5, label: '1.5x', tagKey: 'presetTagFast' },
  { value: 2, label: '2x', tagKey: 'presetTagDouble' },
  { value: 4, label: '4x', tagKey: 'presetTagTimelapse' },
];

export default function VideoSpeedWorkspace({ t }: Props) {
  const [mode, setMode] = useState<SpeedMode>('change');
  const [modesExpanded, setModesExpanded] = useState<boolean>(false);
  const [step, setStep] = useState<Step>('upload');
  const [speed, setSpeed] = useState<number>(2);
  const [muteAudio, setMuteAudio] = useState<boolean>(false);
  const [previewMuted, setPreviewMuted] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [queue, setQueue] = useState<QueuedItem[]>([]);
  const [activeQueueIndex, setActiveQueueIndex] = useState<number>(0);

  const [stage, setStage] = useState<EngineStage>('loading');
  const [progress, setProgress] = useState<number>(0);
  const [batchProgress, setBatchProgress] = useState<{ current: number; total: number; name: string }>({
    current: 1,
    total: 1,
    name: '',
  });

  const [results, setResults] = useState<ProcessedItem[]>([]);
  const [activeResultIndex, setActiveResultIndex] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const addMoreInputRef = useRef<HTMLInputElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const activeItem = queue[activeQueueIndex] ?? queue[0] ?? null;
  const activeResult = results[activeResultIndex] ?? results[0] ?? null;
  const isGifOutput = mode === 'gif' || (queue.length > 0 && queue.every((q) => q.isGif));

  // Revoke object URLs on unmount
  const queueRef = useRef<QueuedItem[]>([]);
  const resultsRef = useRef<ProcessedItem[]>([]);
  queueRef.current = queue;
  resultsRef.current = results;

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      queueRef.current.forEach((q) => URL.revokeObjectURL(q.previewUrl));
      resultsRef.current.forEach((r) => URL.revokeObjectURL(r.outputUrl));
    };
  }, []);

  // Sync HTML5 video preview playbackRate smoothly
  const applyPlaybackRate = (el: HTMLVideoElement | null, targetSpeed: number) => {
    if (!el) return;
    try {
      el.defaultPlaybackRate = targetSpeed;
      el.playbackRate = targetSpeed;
    } catch {
      try {
        const clamped = Math.min(4, Math.max(0.25, targetSpeed));
        el.defaultPlaybackRate = clamped;
        el.playbackRate = clamped;
      } catch {
        // ignore unsupported browser playbackRate
      }
    }
  };

  const updateSpeed = (nextSpeed: number) => {
    setSpeed(nextSpeed);
    applyPlaybackRate(previewVideoRef.current, nextSpeed);
  };

  useEffect(() => {
    if (step === 'controls') {
      applyPlaybackRate(previewVideoRef.current, speed);
    }
  }, [speed, step, activeQueueIndex]);

  const handleModeSwitch = (nextMode: SpeedMode) => {
    setMode(nextMode);
    if (nextMode === 'speedUp' && speed <= 1) {
      updateSpeed(2);
    } else if (nextMode === 'slowDown' && speed >= 1) {
      updateSpeed(0.5);
    }
  };

  const probeMediaDuration = (url: string, isGif: boolean): Promise<{ duration: number | null; oddDims: boolean }> => {
    if (isGif) {
      return Promise.resolve({ duration: null, oddDims: false });
    }
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = url;
      const cleanup = () => {
        video.removeAttribute('src');
        video.load();
      };
      video.onloadedmetadata = () => {
        const dur = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : null;
        const odd = video.videoWidth % 2 !== 0 || video.videoHeight % 2 !== 0;
        cleanup();
        resolve({ duration: dur, oddDims: odd });
      };
      video.onerror = () => {
        cleanup();
        resolve({ duration: null, oddDims: false });
      };
    });
  };

  const clearResults = () => {
    results.forEach((r) => URL.revokeObjectURL(r.outputUrl));
    setResults([]);
    setActiveResultIndex(0);
  };

  const addFilesToQueue = async (fileList: FileList | File[], append = false) => {
    setErrorMsg(null);
    const incoming = Array.from(fileList);
    const valid = incoming.filter(isSupportedMediaFile);

    if (valid.length === 0) {
      setErrorMsg(t.errors.unsupportedFile);
      return;
    }

    if (!append) {
      queue.forEach((q) => URL.revokeObjectURL(q.previewUrl));
      clearResults();
    }

    const newItems: QueuedItem[] = await Promise.all(
      valid.map(async (file, idx) => {
        const url = URL.createObjectURL(file);
        const gif = isGifFile(file);
        const meta = await probeMediaDuration(url, gif);
        return {
          id: `${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 7)}`,
          file,
          previewUrl: url,
          isGif: gif,
          durationSec: meta.duration,
          needsEvenPad: meta.oddDims,
        };
      })
    );

    if (!append && newItems.every((item) => item.isGif)) {
      setMode('gif');
    }

    setQueue((prev) => (append ? [...prev, ...newItems] : newItems));
    if (!append) {
      setActiveQueueIndex(0);
    }
    setModesExpanded(false);
    setStep('controls');
  };

  const handleFileInput = (e: Event, append = false) => {
    const target = e.currentTarget as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      void addFilesToQueue(files, append);
    }
    target.value = '';
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      void addFilesToQueue(e.dataTransfer.files, false);
    }
  };

  const removeQueueItem = (id: string) => {
    setQueue((prev) => {
      const target = prev.find((q) => q.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      const next = prev.filter((q) => q.id !== id);
      if (next.length === 0) {
        setStep('upload');
      } else if (activeQueueIndex >= next.length) {
        setActiveQueueIndex(next.length - 1);
      }
      return next;
    });
  };

  const handleResetAll = () => {
    abortRef.current?.abort();
    queue.forEach((q) => URL.revokeObjectURL(q.previewUrl));
    clearResults();
    setQueue([]);
    setActiveQueueIndex(0);
    setMuteAudio(false);
    setPreviewMuted(false);
    setErrorMsg(null);
    setProgress(0);
    setStep('upload');
  };

  const handleStartProcessing = async () => {
    if (queue.length === 0) return;

    setErrorMsg(null);
    clearResults();
    setStep('processing');
    setProgress(2);
    setStage('loading');

    const controller = new AbortController();
    abortRef.current = controller;

    const processed: ProcessedItem[] = [];

    try {
      for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        setBatchProgress({ current: i + 1, total: queue.length, name: item.file.name });

        const outputAsGif = mode === 'gif' || item.isGif;
        const result = await changeMediaSpeed({
          file: item.file,
          speed,
          muteAudio: outputAsGif ? true : muteAudio,
          outputAsGif,
          inputDurationSec: item.durationSec ?? undefined,
          needsEvenPad: item.needsEvenPad,
          signal: controller.signal,
          onStage: (nextStage) => setStage(nextStage),
          onProgress: (itemPct) => {
            const sliceSize = 100 / queue.length;
            const overall = Math.min(99, Math.round(i * sliceSize + (itemPct / 100) * sliceSize));
            setProgress(overall);
          },
        });

        const outMeta = await probeMediaDuration(result.url, outputAsGif);

        processed.push({
          id: item.id,
          sourceName: item.file.name,
          originalDurationSec: item.durationSec,
          outputDurationSec:
            outMeta.duration ??
            (item.durationSec != null ? item.durationSec / speed : null),
          outputUrl: result.url,
          filename: result.filename,
          mimeType: result.mimeType,
          sizeBytes: result.blob.size,
          isGif: outputAsGif,
        });
      }

      setProgress(100);
      setResults(processed);
      setActiveResultIndex(0);
      setStep('result');
    } catch (err) {
      processed.forEach((p) => URL.revokeObjectURL(p.outputUrl));
      if (err instanceof DOMException && err.name === 'AbortError') {
        setErrorMsg(t.errors.cancelled);
        setStep('controls');
      } else {
        const msg = err instanceof Error ? err.message : '';
        setErrorMsg(
          /FFmpeg WebAssembly core/i.test(msg) ? t.errors.ffmpegLoadFailed : t.errors.processingFailed
        );
        setStep('controls');
      }
    } finally {
      abortRef.current = null;
    }
  };

  const handleCancelProcessing = () => {
    abortRef.current?.abort();
  };

  const triggerDownload = (item: ProcessedItem) => {
    const a = document.createElement('a');
    a.href = item.outputUrl;
    a.download = item.filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleDownloadAll = () => {
    results.forEach((item, idx) => {
      setTimeout(() => triggerDownload(item), idx * 220);
    });
  };

  const handleNudgeSpeed = (delta: number) => {
    const next = Math.min(10, Math.max(0.1, Number((speed + delta).toFixed(2))));
    updateSpeed(next);
  };

  const getStageMessage = () => {
    if (stage === 'loading') return t.step3.statusLoading;
    if (stage === 'probing') return t.step3.statusProbing;
    if (stage === 'finalizing') return t.step3.statusFinalizing;
    return isGifOutput ? t.step3.statusProcessingGif : t.step3.statusProcessing;
  };

  const formatSummaryBanner = (origSec: number | null, outSec: number | null, mult: number) => {
    const orig = formatDuration(origSec);
    const next = formatDuration(outSec ?? (origSec != null ? origSec / mult : null));
    const speedText = Number(mult.toFixed(2)).toString();
    return t.step4.summaryTemplate
      .replace('{orig}', orig)
      .replace('{speed}', speedText)
      .replace('{next}', next);
  };

  const modeTabs: Array<{ id: SpeedMode; label: string }> = [
    { id: 'change', label: t.modes.change },
    { id: 'speedUp', label: t.modes.speedUp },
    { id: 'slowDown', label: t.modes.slowDown },
    { id: 'gif', label: t.modes.gif },
  ];

  const activeModeLabel = modeTabs.find((m) => m.id === mode)?.label ?? t.modes.change;

  return (
    <div
      class="w-full min-w-0 max-w-full overflow-hidden rounded-[28px] border-2 p-3 sm:p-5 md:p-6 transition-all"
      style="background-color: var(--bg-workspace); border-color: var(--border-color); box-shadow: var(--shadow-workspace);"
    >
      {/* Top Mode Selector Header + Collapsible Presets Toggle */}
      <div class="mb-4 flex min-w-0 flex-col items-center gap-2.5 sm:mb-5">
        <div class="flex max-w-full items-center justify-center gap-2">
          <button
            type="button"
            aria-expanded={modesExpanded}
            aria-controls="speed-mode-presets-panel"
            aria-label={t.modesToggleAria}
            disabled={step === 'processing'}
            onClick={() => setModesExpanded((open) => !open)}
            class="inline-flex min-h-[44px] max-w-full min-w-0 items-center gap-2 rounded-2xl border-2 px-3 py-2 text-sm font-extrabold tracking-tight shadow-sm hover:opacity-95 disabled:opacity-50 sm:gap-2.5 sm:px-4 sm:text-base"
            style="background-color: var(--surface-subtle); border-color: var(--border-color); color: var(--text-primary);"
          >
            <span
              class="min-w-0 truncate rounded-xl px-2.5 py-1 text-xs font-black sm:px-3 sm:text-sm"
              style="background-color: var(--btn-primary); color: var(--btn-primary-text);"
            >
              {activeModeLabel}
            </span>
            <span class="hidden shrink-0 text-xs font-bold opacity-80 sm:inline">
              {t.modesLabel}
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
              class={`h-5 w-5 shrink-0 transition-transform duration-200 ${modesExpanded ? 'rotate-180' : ''}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>

        {/* Collapsible Mode Presets Bar (keeps all 4 modes in SSR/DOM for SEO while collapsed on initial screen) */}
        <div
          id="speed-mode-presets-panel"
          hidden={!modesExpanded}
          class="w-full max-w-3xl animate-fade-slide-up"
        >
          <div
            role="tablist"
            aria-label={t.modesLabel}
            class="flex flex-wrap items-center justify-center gap-2 rounded-2xl border p-1.5"
            style="background-color: var(--surface-subtle); border-color: var(--border-color);"
          >
            {modeTabs.map((tab) => {
              const isActive = mode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  disabled={step === 'processing'}
                  onClick={() => handleModeSwitch(tab.id)}
                  class="rounded-xl px-3.5 py-2 text-sm font-extrabold tracking-tight sm:px-4 sm:py-2 sm:text-base disabled:opacity-50"
                  style={
                    isActive
                      ? 'background-color: var(--btn-primary); color: var(--btn-primary-text); box-shadow: 0 4px 12px rgba(14, 94, 111, 0.22);'
                      : 'background-color: transparent; color: var(--text-primary);'
                  }
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Inline Error Alert */}
      {errorMsg && (
        <div
          role="alert"
          class="mb-4 flex items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 text-sm font-bold sm:text-base animate-fade-slide-up"
          style="background-color: var(--badge-bg); border-color: var(--border-color); color: var(--text-primary);"
        >
          <span>{errorMsg}</span>
          <button
            type="button"
            onClick={() => setErrorMsg(null)}
            aria-label="Dismiss error"
            class="shrink-0 rounded-lg px-2 py-1 text-lg leading-none opacity-80 hover:opacity-100"
          >
            ×
          </button>
        </div>
      )}

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="video/*,.mp4,.m4v,.webm,.mov,.mkv,.avi,.gif,image/gif"
        class="hidden"
        onChange={(e) => handleFileInput(e, false)}
      />
      <input
        ref={addMoreInputRef}
        type="file"
        multiple
        accept="video/*,.mp4,.m4v,.webm,.mov,.mkv,.avi,.gif,image/gif"
        class="hidden"
        onChange={(e) => handleFileInput(e, true)}
      />

      {/* STEP 1: DROPZONE */}
      {step === 'upload' && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isDragging) setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
          }}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          class="animate-fade-slide-up flex min-h-[340px] cursor-pointer flex-col items-center justify-center rounded-3xl border-[3px] border-dashed px-4 py-8 text-center transition-all sm:min-h-[380px] md:px-10 md:py-10"
          style={{
            borderColor: isDragging ? 'var(--btn-primary)' : 'var(--border-color)',
            backgroundColor: isDragging ? 'var(--surface-subtle)' : 'transparent',
            transform: isDragging ? 'scale(1.01)' : 'scale(1)',
          }}
        >
          {/* Oversized Floating SVG Icon (64px) */}
          <div
            class="animate-float-slow mb-4 flex h-20 w-20 items-center justify-center rounded-3xl border-2 shadow-md"
            style="background-color: var(--badge-bg); border-color: var(--border-color); color: var(--text-primary);"
          >
            <svg
              width="58"
              height="58"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
              class="h-14 w-14"
            >
              <rect width="18" height="14" x="3" y="5" rx="3" />
              <path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" />
              <path d="M12 2v3" />
              <path d="M12 19v3" />
              <path d="M7 22h10" />
            </svg>
          </div>

          <h2 class="mb-2 text-2xl font-extrabold tracking-tight sm:text-3xl" style="color: var(--text-primary);">
            {isDragging ? t.step1.dropActive : t.step1.dropTitle}
          </h2>

          <p class="mb-6 max-w-xl text-base font-medium sm:text-lg" style="color: var(--text-secondary);">
            {t.step1.dropSubtitle}
          </p>

          <div
            class="flex w-full max-w-md flex-wrap items-center justify-center gap-3 sm:gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              class="inline-flex min-h-[54px] w-full max-w-full items-center justify-center gap-2.5 rounded-2xl px-5 py-3.5 text-base font-extrabold shadow-lg hover:scale-[1.02] active:scale-[0.99] sm:w-auto sm:gap-3 sm:px-7 sm:text-lg"
              style="background-color: var(--btn-primary); color: var(--btn-primary-text);"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                class="shrink-0"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
              <span class="min-w-0 leading-snug">{t.step1.selectBtn}</span>
            </button>
          </div>

          <div
            class="mt-6 inline-flex max-w-full items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold sm:px-4 sm:text-sm"
            style="background-color: var(--badge-bg); border-color: var(--border-color); color: var(--text-primary);"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="shrink-0">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span class="min-w-0 leading-snug">{t.step1.privacyMicro}</span>
          </div>
        </div>
      )}

      {/* STEP 2: SPEED CONTROLS & LIVE PREVIEW */}
      {step === 'controls' && activeItem && (
        <div class="animate-fade-slide-up grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Left Column: Live Video Preview & File Queue */}
          <div class="flex min-w-0 flex-col gap-3 lg:col-span-5">
            <div
              class="relative min-w-0 overflow-hidden rounded-2xl border-2"
              style="background-color: #0b1619; border-color: var(--border-color);"
            >
              <div class="flex min-w-0 items-center justify-between gap-2 px-3 py-2 text-xs font-extrabold uppercase tracking-wide" style="background-color: var(--badge-bg); color: var(--text-primary);">
                <span class="inline-flex min-w-0 items-center gap-1.5">
                  <span class="inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500"></span>
                  <span class="truncate">
                    {t.step2.previewLiveBadge} • {Number(speed.toFixed(2))}x
                  </span>
                </span>
                {!activeItem.isGif && (
                  <button
                    type="button"
                    onClick={() => setPreviewMuted((m) => !m)}
                    aria-label={t.step2.mutePreviewAria}
                    class="shrink-0 rounded-lg px-2 py-0.5 text-xs font-bold hover:opacity-80"
                    style="background-color: var(--bg-workspace); color: var(--text-primary);"
                  >
                    {previewMuted ? '🔇' : '🔊'}
                  </button>
                )}
              </div>

              {activeItem.isGif ? (
                <img
                  src={activeItem.previewUrl}
                  alt={activeItem.file.name}
                  class="mx-auto max-h-[220px] w-full object-contain sm:max-h-[250px]"
                />
              ) : (
                <video
                  ref={previewVideoRef}
                  src={activeItem.previewUrl}
                  controls
                  loop
                  playsInline
                  muted={previewMuted || muteAudio}
                  onLoadedMetadata={(e) => applyPlaybackRate(e.currentTarget, speed)}
                  onPlay={(e) => applyPlaybackRate(e.currentTarget, speed)}
                  class="max-h-[220px] w-full bg-black object-contain sm:max-h-[250px]"
                />
              )}
            </div>

            {/* Live Duration Estimate */}
            <div
              aria-live="polite"
              class="flex min-w-0 flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-2xl border px-3 py-2.5 text-center text-xs font-bold sm:justify-between sm:px-4 sm:text-left sm:text-sm"
              style="background-color: var(--badge-bg); border-color: var(--border-color); color: var(--text-primary);"
            >
              <span>
                {t.step2.originalLabel}: {formatDuration(activeItem.durationSec)}
              </span>
              <span aria-hidden="true">→</span>
              <span>
                {t.step2.estimatedLabel} ({Number(speed.toFixed(2))}x):{' '}
                {activeItem.durationSec != null
                  ? formatDuration(activeItem.durationSec / speed)
                  : '--:--'}
              </span>
            </div>

            {/* File Queue / Batch Management */}
            <div
              class="min-w-0 max-w-full overflow-hidden rounded-2xl border p-3"
              style="background-color: var(--surface-subtle); border-color: var(--border-color);"
            >
              <div class="flex min-w-0 flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-stretch">
                <span
                  class="block min-w-0 w-full flex-1 truncate text-left text-sm font-extrabold"
                  title={
                    queue.length > 1
                      ? t.step2.batchCountLabel.replace('{count}', String(queue.length))
                      : activeItem.file.name
                  }
                  style="color: var(--text-primary);"
                >
                  {queue.length > 1
                    ? t.step2.batchCountLabel.replace('{count}', String(queue.length))
                    : activeItem.file.name}
                </span>
                <div class="flex shrink-0 flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => addMoreInputRef.current?.click()}
                    class="whitespace-nowrap rounded-xl border px-2.5 py-1.5 text-xs font-extrabold hover:opacity-85"
                    style="background-color: var(--bg-workspace); border-color: var(--border-color); color: var(--text-primary);"
                  >
                    + {t.step2.addMoreBtn}
                  </button>
                  <button
                    type="button"
                    onClick={handleResetAll}
                    class="whitespace-nowrap rounded-xl border px-2.5 py-1.5 text-xs font-extrabold hover:opacity-85"
                    style="background-color: var(--bg-workspace); border-color: var(--border-color); color: var(--text-secondary);"
                  >
                    {t.step2.changeFileBtn}
                  </button>
                </div>
              </div>

              {queue.length > 1 && (
                <ul class="mt-2.5 max-h-24 space-y-1.5 overflow-y-auto pr-1">
                  {queue.map((item, idx) => (
                    <li
                      key={item.id}
                      class="flex min-w-0 items-center justify-between gap-2 rounded-xl px-2.5 py-1.5 text-xs font-bold"
                      style={
                        idx === activeQueueIndex
                          ? 'background-color: var(--btn-primary); color: var(--btn-primary-text);'
                          : 'background-color: var(--bg-workspace); color: var(--text-primary);'
                      }
                    >
                      <button
                        type="button"
                        onClick={() => setActiveQueueIndex(idx)}
                        title={item.file.name}
                        class="min-w-0 flex-1 truncate text-left"
                      >
                        {item.file.name} ({formatFileSize(item.file.size)})
                      </button>
                      <button
                        type="button"
                        aria-label={t.step2.removeFileAria}
                        onClick={() => removeQueueItem(item.id)}
                        class="shrink-0 rounded px-1.5 py-0.5 text-sm leading-none hover:opacity-75"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right Column: Speed Presets, Fine Slider & Audio Options */}
          <div class="flex min-w-0 flex-col justify-between gap-4 lg:col-span-7">
            {/* 1. Speed Presets Grid */}
            <div class="min-w-0">
              <p class="mb-2 text-sm font-extrabold uppercase tracking-wider" style="color: var(--text-secondary);">
                {t.step2.presetsTitle}
              </p>
              <div class="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {PRESETS.map((preset) => {
                  const isSelected = Math.abs(speed - preset.value) < 0.01;
                  return (
                    <button
                      key={preset.value}
                      type="button"
                      aria-label={`${preset.label} ${t.step2[preset.tagKey]}`}
                      aria-pressed={isSelected}
                      onClick={() => updateSpeed(preset.value)}
                      class="flex min-w-0 flex-col items-center justify-center rounded-2xl border-2 px-2 py-3 text-center hover:scale-[1.02]"
                      style={
                        isSelected
                          ? 'background-color: var(--btn-primary); border-color: var(--btn-primary); color: var(--btn-primary-text); box-shadow: 0 6px 16px rgba(14, 94, 111, 0.25);'
                          : 'background-color: var(--surface-subtle); border-color: var(--border-color); color: var(--text-primary);'
                      }
                    >
                      <span class="text-xl font-black sm:text-2xl">{preset.label}</span>
                      <span class="mt-0.5 max-w-full break-words text-xs font-bold leading-tight opacity-85">
                        {t.step2[preset.tagKey]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Fine-Tune Speed Slider (0.1x to 10.0x) */}
            <div
              class="min-w-0 rounded-2xl border-2 p-3.5 sm:p-4"
              style="background-color: var(--surface-subtle); border-color: var(--border-color);"
            >
              <div class="mb-3 flex flex-wrap items-center justify-between gap-2.5">
                <label for="speed-slider-input" class="min-w-0 text-sm font-extrabold sm:text-base" style="color: var(--text-primary);">
                  {t.step2.sliderLabel}
                </label>
                <div class="flex shrink-0 items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    aria-label="Decrease speed by 0.1x"
                    onClick={() => handleNudgeSpeed(-0.1)}
                    class="flex h-9 w-9 items-center justify-center rounded-xl border text-lg font-black"
                    style="background-color: var(--bg-workspace); border-color: var(--border-color); color: var(--text-primary);"
                  >
                    −
                  </button>
                  <span
                    class="min-w-[68px] rounded-xl px-2.5 py-1.5 text-center text-base font-black sm:min-w-[74px] sm:px-3 sm:text-lg"
                    style="background-color: var(--btn-primary); color: var(--btn-primary-text);"
                  >
                    {Number(speed.toFixed(2))}x
                  </span>
                  <button
                    type="button"
                    aria-label="Increase speed by 0.1x"
                    onClick={() => handleNudgeSpeed(0.1)}
                    class="flex h-9 w-9 items-center justify-center rounded-xl border text-lg font-black"
                    style="background-color: var(--bg-workspace); border-color: var(--border-color); color: var(--text-primary);"
                  >
                    +
                  </button>
                </div>
              </div>

              <input
                id="speed-slider-input"
                type="range"
                min="0.1"
                max="10"
                step="0.05"
                value={speed}
                onInput={(e) => updateSpeed(parseFloat(e.currentTarget.value))}
                class="speed-range-slider"
              />
              <div class="mt-1.5 flex justify-between gap-1 text-[11px] font-extrabold opacity-80 sm:text-xs" style="color: var(--text-primary);">
                <span>{t.step2.sliderMin}</span>
                <span>1.0x</span>
                <span>5.0x</span>
                <span>{t.step2.sliderMax}</span>
              </div>
            </div>

            {/* 3. Audio Options Toggle */}
            <div class="min-w-0">
              <p class="mb-2 text-sm font-extrabold uppercase tracking-wider" style="color: var(--text-secondary);">
                {t.step2.audioTitle}
              </p>
              {isGifOutput ? (
                <div
                  class="rounded-2xl border px-4 py-3 text-sm font-bold opacity-85"
                  style="background-color: var(--badge-bg); border-color: var(--border-color); color: var(--text-primary);"
                >
                  {t.step2.audioNotApplicable}
                </div>
              ) : (
                <div class="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <button
                    type="button"
                    aria-pressed={!muteAudio}
                    onClick={() => setMuteAudio(false)}
                    class="flex min-w-0 items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 text-sm font-extrabold sm:text-base"
                    style={
                      !muteAudio
                        ? 'background-color: var(--btn-primary); border-color: var(--btn-primary); color: var(--btn-primary-text);'
                        : 'background-color: var(--bg-workspace); border-color: var(--border-color); color: var(--text-primary);'
                    }
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="shrink-0">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                    <span class="min-w-0 leading-snug">{t.step2.audioKeep}</span>
                  </button>

                  <button
                    type="button"
                    aria-pressed={muteAudio}
                    onClick={() => setMuteAudio(true)}
                    class="flex min-w-0 items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 text-sm font-extrabold sm:text-base"
                    style={
                      muteAudio
                        ? 'background-color: var(--btn-primary); border-color: var(--btn-primary); color: var(--btn-primary-text);'
                        : 'background-color: var(--bg-workspace); border-color: var(--border-color); color: var(--text-primary);'
                    }
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="shrink-0">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="22" x2="16" y1="9" y2="15" />
                      <line x1="16" x2="22" y1="9" y2="15" />
                    </svg>
                    <span class="min-w-0 leading-snug">{t.step2.audioMute}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Primary Execute Action */}
            <button
              type="button"
              onClick={handleStartProcessing}
              class="inline-flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-2xl px-4 py-3.5 text-base font-black shadow-xl hover:scale-[1.01] active:scale-[0.99] sm:min-h-[58px] sm:gap-3 sm:px-6 sm:py-4 sm:text-xl"
              style="background-color: var(--btn-primary); color: var(--btn-primary-text);"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" class="shrink-0">
                <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span class="min-w-0 leading-snug">
                {queue.length > 1
                  ? `${t.step2.processBatchBtn} (${queue.length})`
                  : t.step2.processBtn}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: ANIMATED PROGRESS */}
      {step === 'processing' && (
        <div
          aria-live="polite"
          class="animate-fade-slide-up flex min-h-[340px] flex-col items-center justify-center px-4 py-8 text-center sm:min-h-[380px]"
        >
          {/* Oversized Animated Gear/Bolt Icon (60px) */}
          <div
            class="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border-2 shadow-lg"
            style="background-color: var(--badge-bg); border-color: var(--border-color); color: var(--text-primary);"
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
              class="h-14 w-14 animate-spin"
              style="animation-duration: 3s;"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </div>

          <div class="mb-2 text-4xl font-black tracking-tight sm:text-5xl" style="color: var(--text-primary);">
            {progress}%
          </div>

          <p class="mb-2 text-lg font-extrabold sm:text-xl" style="color: var(--text-primary);">
            {getStageMessage()}
          </p>

          {queue.length > 1 && (
            <p class="mb-4 max-w-full break-all px-2 text-sm font-bold" style="color: var(--text-secondary);">
              {t.step3.statusBatchItem
                .replace('{current}', String(batchProgress.current))
                .replace('{total}', String(batchProgress.total))
                .replace('{name}', batchProgress.name)}
            </p>
          )}

          {/* Animated Gradient Progress Bar */}
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            class="my-4 h-6 w-full max-w-xl overflow-hidden rounded-full border-2 p-1"
            style="background-color: var(--surface-subtle); border-color: var(--border-color);"
          >
            <div
              class="progress-gradient-bar h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.max(4, progress)}%` }}
            />
          </div>

          {/* Mandatory Trust Badge */}
          <div
            class="mt-3 inline-flex max-w-full items-center gap-2 rounded-2xl border-2 px-4 py-2.5 text-xs font-extrabold sm:max-w-xl sm:gap-2.5 sm:px-5 sm:text-base"
            style="background-color: var(--badge-bg); border-color: var(--border-color); color: var(--text-primary);"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" class="shrink-0">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span class="min-w-0 leading-snug">{t.step3.trustBadge}</span>
          </div>

          <button
            type="button"
            onClick={handleCancelProcessing}
            class="mt-6 rounded-2xl border-2 px-6 py-2.5 text-base font-extrabold hover:opacity-85"
            style="background-color: var(--bg-workspace); border-color: var(--border-color); color: var(--text-primary);"
          >
            {t.step3.cancelBtn}
          </button>
        </div>
      )}

      {/* STEP 4: INSTANT PREVIEW & DOWNLOAD */}
      {step === 'result' && activeResult && (
        <div class="animate-fade-slide-up flex min-w-0 flex-col gap-4">
          {/* Visual Duration Summary Banner */}
          <div
            role="status"
            aria-live="polite"
            class="flex min-w-0 flex-wrap items-center justify-between gap-2.5 rounded-2xl border-2 px-3.5 py-3 sm:gap-3 sm:px-6"
            style="background-color: var(--badge-bg); border-color: var(--border-color); color: var(--text-primary);"
          >
            <div class="flex min-w-0 flex-1 items-center gap-2.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" class="shrink-0">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span class="min-w-0 text-sm font-black sm:text-lg">
                {formatSummaryBanner(
                  activeResult.originalDurationSec,
                  activeResult.outputDurationSec,
                  speed
                )}
              </span>
            </div>
            <span class="shrink-0 rounded-xl px-3 py-1 text-xs font-extrabold sm:text-sm" style="background-color: var(--bg-workspace);">
              {t.step4.fileSizeLabel}: {formatFileSize(activeResult.sizeBytes)}
            </span>
          </div>

          {/* Output Player */}
          <div
            class="overflow-hidden rounded-2xl border-2 bg-black"
            style="border-color: var(--border-color);"
          >
            {activeResult.isGif ? (
              <img
                src={activeResult.outputUrl}
                alt={activeResult.filename}
                class="mx-auto max-h-[280px] w-full object-contain sm:max-h-[320px]"
              />
            ) : (
              <video
                src={activeResult.outputUrl}
                controls
                autoPlay
                loop
                playsInline
                class="max-h-[280px] w-full object-contain sm:max-h-[320px]"
              />
            )}
          </div>

          {/* Batch Results Selector (if multiple) */}
          {results.length > 1 && (
            <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {results.map((item, idx) => (
                <div
                  key={item.id}
                  class="flex min-w-0 items-center justify-between gap-2 rounded-2xl border-2 px-3 py-2"
                  style={
                    idx === activeResultIndex
                      ? 'background-color: var(--badge-bg); border-color: var(--btn-primary); color: var(--text-primary);'
                      : 'background-color: var(--surface-subtle); border-color: var(--border-color); color: var(--text-primary);'
                  }
                >
                  <button
                    type="button"
                    onClick={() => setActiveResultIndex(idx)}
                    title={item.filename}
                    class="min-w-0 flex-1 truncate text-left text-sm font-extrabold"
                  >
                    {item.filename} ({formatFileSize(item.sizeBytes)})
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerDownload(item)}
                    class="shrink-0 rounded-xl px-3 py-1.5 text-xs font-black"
                    style="background-color: var(--btn-primary); color: var(--btn-primary-text);"
                  >
                    ↓
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Download & Action Buttons */}
          <div class="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div class="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <button
                type="button"
                onClick={() => triggerDownload(activeResult)}
                class="inline-flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-2xl px-6 py-3.5 text-base font-black shadow-xl hover:scale-[1.02] active:scale-[0.99] sm:min-h-[56px] sm:w-auto sm:gap-3 sm:px-8 sm:text-lg"
                style="background-color: var(--btn-primary); color: var(--btn-primary-text);"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="shrink-0">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                <span>{activeResult.isGif ? t.step4.downloadGifBtn : t.step4.downloadBtn}</span>
              </button>

              {results.length > 1 && (
                <button
                  type="button"
                  onClick={handleDownloadAll}
                  class="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl border-2 px-5 py-3.5 text-base font-black hover:scale-[1.02] sm:min-h-[56px] sm:w-auto sm:px-6"
                  style="background-color: var(--badge-bg); border-color: var(--border-color); color: var(--text-primary);"
                >
                  <span>{t.step4.downloadAllBtn}</span>
                </button>
              )}
            </div>

            <div class="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setStep('controls')}
                class="min-h-[48px] flex-1 rounded-2xl border-2 px-4 py-2.5 text-sm font-extrabold hover:opacity-85 sm:flex-initial sm:px-5 sm:text-base"
                style="background-color: var(--surface-subtle); border-color: var(--border-color); color: var(--text-primary);"
              >
                {t.step4.adjustAgainBtn}
              </button>
              <button
                type="button"
                onClick={handleResetAll}
                class="min-h-[48px] flex-1 rounded-2xl border-2 px-4 py-2.5 text-sm font-extrabold hover:opacity-85 sm:flex-initial sm:px-5 sm:text-base"
                style="background-color: var(--bg-workspace); border-color: var(--border-color); color: var(--text-secondary);"
              >
                {t.step4.processAnotherBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
