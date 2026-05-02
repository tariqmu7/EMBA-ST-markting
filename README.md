# Danone Egypt — EMBA Marketing Presentation

A 41-slide marketing presentation on Danone Egypt prepared for the EMBA Marketing course by Ahmed Sabri, Ahmed Awad, and Tarik.

**Live site**: https://tariqmu7.github.io/EMBA-ST-markting/

## Stack
React 19 · Vite 6 · Tailwind v4 · framer-motion · lucide-react · d3-geo · vite-plugin-singlefile

All slides live in a single `rawPagesData` array inside `src/App.tsx`. Two custom in-slide components are wired in via a `customMedia` field: `EgyptMap` (real Egypt outline projected with d3-geo Mercator from a bundled GeoJSON) and `ShareChart` (CSS bar chart of approximate Egyptian dairy market shares).

## Run locally

```bash
npm install
npm run dev      # dev server on http://localhost:3000/EMBA-ST-markting/
```

## Two builds

```bash
# Online (for GitHub Pages — multi-file, base = /EMBA-ST-markting/)
npm run build              # → dist/

# Offline (for USB / file:// — single inlined HTML, base = ./)
npm run build:offline      # → dist-offline/
```

The offline build inlines all JS and CSS into one `index.html` so it works when opened directly from a flash drive on any browser, no internet, no Python, no install. Images and fonts are vendored locally in `public/img/` and `public/fonts/`.

## Deploy

Pushing to `main` triggers GitHub Actions (`.github/workflows/deploy.yml`) which runs `npm run build` and deploys to GitHub Pages. End-to-end takes ~30 seconds.

```bash
git push origin main       # → CI deploys to https://tariqmu7.github.io/EMBA-ST-markting/
```

## Section layout

| Slides | Section |
|---|---|
| 1–8 | Identity (Danone hero, roadmap, 1919 founding, FY-2024 stats, segments, timeline, B Corp, V/M/V) |
| 9–13 | Egypt context (hero, since-2006, market stats, footprint with SVG map, competitive bar chart) |
| 14–18 | SWOT (transition + S/W/O/T) |
| 19–22 | STP (intro, segmentation, targeting, positioning) |
| 23–24 | Objectives (commercial & financial, product development & health) |
| 25–33 | 4 Ps (intro + 2 product + 2 price + 2 place + 2 promotion) |
| 34–39 | 5 Marketing Problems → Solutions |
| 40 | References (38 clickable sources) |
| 41 | Thank You · Q&A |
