import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'node_modules', '@ffmpeg', 'core', 'dist', 'esm');
const targetDir = path.join(rootDir, 'public', 'ffmpeg');

const filesToCopy = ['ffmpeg-core.js', 'ffmpeg-core.wasm'];

if (fs.existsSync(sourceDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  for (const file of filesToCopy) {
    const src = path.join(sourceDir, file);
    const dest = path.join(targetDir, file);
    if (fs.existsSync(src)) {
      const shouldCopy =
        !fs.existsSync(dest) ||
        fs.statSync(src).size !== fs.statSync(dest).size;
      if (shouldCopy) {
        fs.copyFileSync(src, dest);
        console.log(`[sync-ffmpeg] Copied ${file} to public/ffmpeg/`);
      }
    }
  }
} else {
  console.warn('[sync-ffmpeg] @ffmpeg/core/dist/esm not found yet; skipping copy.');
}
