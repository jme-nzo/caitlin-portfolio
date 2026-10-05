# Caitlin — Portfolio

A one-page portfolio site with full-screen sections that snap as you scroll: About, Results, Projects, Contact me. The Projects section scrolls freely (no snapping inside it).

Plain HTML, CSS and JavaScript — no build step. Open `index.html` or serve the folder with any static server.

## Files

- `index.html` — page structure and content
- `styles.css` — design tokens, layout, responsive rules
- `script.js` — mobile menu, active nav link, brand carousel loop and pause button

## Placeholders to replace

Search `TEMP` in `index.html` to find every one.

| What | Where | How to replace |
| --- | --- | --- |
| About-me copy | Section 1 (`#about`) | Edit the paragraphs |
| Photo | Section 1, `.about__photo` | Swap the `<figure>` for `<img src="assets/caitlin.jpg" alt="Portrait of Caitlin">` |
| Results | Section 2 (`#results`) | Edit the four stats |
| Brand logos | Section 2, `.marquee__track` | Logo PNGs are in `assets/logos/` (black on transparent). To add or replace one, use a trimmed PNG and set its `--s` to `1 / √(width ÷ height)` so it matches the others' size. |
| **Project videos** | Section 3, `.video-placeholder` — 9 total: 3 each under Lifestyle, Travel, Fashion and Beauty (each marked `TEMP VIDEO PLACEHOLDER`) | Replace each placeholder `<div>` with `<video class="project__video" src="assets/videos/travel-1.mp4" poster="assets/videos/travel-1.jpg" controls playsinline preload="metadata" aria-label="Describe the video"></video>`. Use 9:16 (iPhone portrait) footage. |
| Email | Section 4 (`#contact`) | Change `hello@example.com` in both `mailto:` links and the visible text |

## Colour palette

Ivory · sand · dusty blue · crimson, on a 60/30/10 split. The colours are variables at the top of `styles.css`.

## Accessibility

- Skip link, semantic landmarks and headings, visible focus outlines
- Text contrast meets WCAG AA (most text AAA)
- Touch targets are at least 44×44px
- Hamburger menu exposes `aria-expanded` and closes with Escape
- Brand carousel pauses on hover or keyboard focus, and stops for users who prefer reduced motion
- Animations and smooth scrolling are turned off for users who prefer reduced motion
