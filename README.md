# ChangeVideoSpeed

**100% Client-Side Online Video Speed Controller — Speed Up or Slow Down Videos & GIFs in Browser RAM with Zero Cloud Uploads and No Watermarks.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-changevideospeed.github.io-0E5E6F?style=for-the-badge&logo=googlechrome&logoColor=FFEFD6)](https://changevideospeed.github.io/)
[![Astro](https://img.shields.io/badge/Astro-7.x_Static-3A8891?style=for-the-badge&logo=astro&logoColor=FFFFFF)](https://astro.build/)
[![FFmpeg.wasm](https://img.shields.io/badge/FFmpeg.wasm-WebAssembly-0E5E6F?style=for-the-badge&logo=ffmpeg&logoColor=F2DEBA)](https://ffmpegwasm.netlify.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-F2DEBA?style=for-the-badge&labelColor=0E5E6F)](LICENSE)
[![Support the Developer](https://img.shields.io/badge/Buy_Me_a_Coffee-Support_Dev-0E5E6F?style=for-the-badge&logo=buymeacoffee&logoColor=FFEFD6)](https://kisharadilshan.gumroad.com/coffee)

---

## Overview

**ChangeVideoSpeed** ([changevideospeed.github.io](https://changevideospeed.github.io/)) is a privacy-first, watermark-free video and GIF speed editor that executes directly inside your browser via WebAssembly (`@ffmpeg/ffmpeg`). Whether you need to slow an iPhone clip into ultra-smooth `0.25x` slo-mo, speed up a tutorial to `2x`/`4x`, convert slow-motion footage back to normal speed, or adjust animated GIF playback rates, every byte stays locally inside your device's memory.

---

## Key Features

- **Zero Cloud Uploads (100% Local RAM):** No server queues, no bandwidth bottlenecks, and zero privacy risks. All decoding and encoding runs locally via FFmpeg WebAssembly.
- **1-Click Speed Presets (`0.25x` to `4x`) & Fine-Tune Slider (`0.1x`–`10.0x`):** Instant multiplier buttons (`0.25x`, `0.5x`, `1.25x`, `1.5x`, `2x`, `4x`) plus granular `0.1x`–`10.0x` slider control with live HTML5 `playbackRate` preview.
- **Audio Pitch Sync & Mute Control:** Unified `-filter_complex` pipeline combining `[0:v]setpts=PTS/SPEED[v]` and automatically chained `[0:a]atempo=SPEED[a]` filters to keep dialogue and music tightly locked—or mute audio completely (`-an`).
- **8-Language Internationalization (i18n):** Native localized routes and UI translations for English (`/`), Spanish (`/es/`), Portuguese (`/pt/`), German (`/de/`), French (`/fr/`), Japanese (`/ja/`), Chinese (`/zh/`), and Russian (`/ru/`).
- **Light / Dark Theme & Ultra-Minimal Mobile Navbar:** Sand & Teal theme with instant `localStorage` persistence and `48×48px` icon-only touch targets on viewports below `768px`.
- **Offline-Ready PWA:** Installable Progressive Web App with an offline-first Service Worker (`public/sw.js`) precaching HTML, CSS, JS, and `ffmpeg-core.wasm` so you can process videos completely offline.

---

## Tech Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Framework** | **Astro (Islands Architecture)** | Static HTML generation (`output: 'static'`) for GitHub Pages with hydrated Preact workspace island (`client:load`). |
| **Styling & Theme** | **Tailwind CSS v4 + CSS Variables** | Responsive Sand & Teal design tokens supporting Light/Dark modes and smooth hardware-friendly animations. |
| **Video Engine** | **`@ffmpeg/ffmpeg` + `@ffmpeg/util` (`@ffmpeg/core`)** | Client-side WebAssembly worker executing `setpts`, chained `atempo`, `ffprobe`, and GIF `palettegen`/`paletteuse`. |
| **Offline PWA** | **Web App Manifest + Service Worker** | Offline-first caching (`public/sw.js` + generated `sw-assets.json`) covering HTML routes, bundles, and WASM core. |
| **Technical SEO** | **`@astrojs/sitemap` + `sitemap.xml.ts` + JSON-LD** | Dual GSC-ready sitemaps (`sitemap.xml` & `sitemap-index.xml`), full `hreflang` graph, and zero-fake-rating schema markup. |
| **Analytics** | **Google Tag Manager (`GTM-NPFG4XBJ`) & GA4 (`G-5RB9RRC0D1`)** | Asynchronous head-injected telemetry with zero render-blocking impact. |

---

## Color Palette Specification

| Token Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Soft Sand Beige** | `#F2DEBA` | Surface cards, navbar background (light), primary CTA button (dark mode), badges |
| **Pale Cream Ivory** | `#FFEFD6` | Primary page canvas background (light mode), primary typography (dark mode) |
| **Deep Ocean Teal** | `#0E5E6F` | Primary CTA buttons (light mode), primary headings & text (light mode), surface cards (dark mode) |
| **Muted Aquamarine** | `#3A8891` | Interactive borders, hover states, secondary accents, gradient progress highlights |
| **Pure Canvas White** | `#FFFFFF` | Interactive Speed Controller Workspace Box background (light mode) |
| **Deep Night Black** | `#121212` | Primary page canvas background (dark mode) |

---

## Quick Start & Deployment

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/changevideospeed/changevideospeed.github.io.git
cd changevideospeed.github.io

# 2. Install dependencies (automatically syncs local @ffmpeg/core WASM assets into public/ffmpeg/)
npm install

# 3. Start local dev server
npm run dev

# 4. Run type checks and build static production output into dist/
npm run check
npm run build
```

### Automated GitHub Pages Deployment

This repository includes [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) configured for GitHub Pages:

1. Push to the `main` branch (or trigger manually via **Actions → Deploy ChangeVideoSpeed to GitHub Pages → Run workflow**).
2. `withastro/action@v3` (running Node `22`) installs dependencies, executes `npm run build`, verifies `public/.nojekyll`, and uploads `dist/`.
3. `actions/deploy-pages@v4` publishes the static bundle directly to the `github-pages` environment at `https://changevideospeed.github.io/`.

---

## Support the Developer

If ChangeVideoSpeed saved you time or helped you edit videos privately without watermarks, consider buying the creator a coffee:

👉 **[Support Kishara Dilshan on Gumroad](https://kisharadilshan.gumroad.com/coffee)**

---

## License

Licensed under the **MIT License**. See [LICENSE](LICENSE) for full copyright and permission details.
