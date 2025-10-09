# Stopwatch

A simple stopwatch app. Currently hosted at [stopwatch.richmak.es](https://stopwatch.richmak.es).

## Getting Started

Install dependencies:

```bash
npm i
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Features

Built a custom 7-segment display using SVG paths with octagonal beveled segments. Gives it that analog calculator feel.

Lap tracking with automatic fastest/slowest detection. The lap entries slide in with CSS animations.

Keyboard shortcuts for everything: `Space` to start/pause, `L` for lap, `R` for reset, `F` for fullscreen.

Fullscreen mode dynamically sizes the display based on viewport dimensions.

Theme picker supports light, dark, and system preferences.

## Performance Notes

Uses `requestAnimationFrame` with `performance.now()` for accurate timing. Updates every 10ms but tracks time internally at higher precision.

Document title updates are throttled to whole seconds to avoid unnecessary renders.

Leading zeros fade out for cleaner display.

## Current Limitations

Only displays mm:ss:ms format. Doesn't support hours yet. We'll add that when needed for longer sessions.
Is not responsive down to phone sizes. Needs better small screen handling and can perhaps be optimised / use a tweaked design.

## Tech Stack

Built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4. Uses Turbopack for faster builds.
