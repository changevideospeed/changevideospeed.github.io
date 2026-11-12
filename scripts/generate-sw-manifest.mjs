import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  console.warn('[generate-sw-manifest] dist/ not found; skipping.');
  process.exit(0);
}

const collected = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else {
      const rel = path.relative(distDir, full).replace(/\\/g, '/');
      if (rel === 'sw.js' || rel === 'sw-assets.json') continue;
      if (rel === 'index.html') {
        collected.push('/');
      } else if (rel.endsWith('/index.html')) {
        collected.push(`/${rel.slice(0, -'index.html'.length)}`);
      } else if (
        /\.(js|css|wasm|svg|png|webmanifest|mp4)$/i.test(rel)
      ) {
        collected.push(`/${rel}`);
      }
    }
  }
}

walk(distDir);

const uniqueAssets = Array.from(new Set(collected)).sort();
const outputPath = path.join(distDir, 'sw-assets.json');
fs.writeFileSync(
  outputPath,
  JSON.stringify({ generatedAt: new Date().toISOString(), assets: uniqueAssets }, null, 2)
);

console.log(`[generate-sw-manifest] Wrote ${uniqueAssets.length} precache entries to dist/sw-assets.json`);
