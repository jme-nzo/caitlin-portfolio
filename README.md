# Caitlin — Portfolio

A one-page portfolio site with full-screen sections that snap as you scroll: About, Results, Projects, Contact me. The Projects section scrolls freely (no snapping inside it).

Plain HTML, CSS and JavaScript — no build step. Open `index.html` or serve the folder with any static server.

## Files

- `index.html` — page structure and content
- `styles.css` — design tokens, layout, responsive rules
- `script.js` — mobile menu, active nav link, navbar colour that follows the section, brand carousel loop
- `assets/fonts/` — self-hosted Clash Display (headings and navbar)
- `assets/logos/` — brand logos for the carousel

## Project videos

15 videos in `assets/videos/`, named `lifestyle-1.mp4` … `fashion-3.mp4`, each with a `.jpg` cover frame. To swap one, replace the file with a 9:16 H.264 MP4 of the same name (and update its `aria-label` in `index.html`). Videos autoplay muted while on screen and pause when scrolled away; each has a sound button (only one plays sound at a time), and tapping a video pauses or resumes it. Autoplay is skipped for visitors who have reduced motion turned on.

## Placeholders to replace

Search `TEMP` in `index.html` to find every one.

| What | Where | How to replace |
| --- | --- | --- |
| About-me copy | Section 1 (`#about`) | Edit the paragraphs |
| ~~Photo~~ | Done (`assets/caitlin.jpg`) | |
| ~~Results~~ | Done | |
| Brand logos | Section 2, `.marquee__track` | Logo PNGs are in `assets/logos/` (black on transparent). To add or replace one, use a trimmed PNG and set its `--s` to `1 / √(width ÷ height)` so it matches the others' size. |
| ~~Email~~ | Done | |

## Social links

The LinkedIn, Instagram and TikTok buttons at the bottom of Contact still point to placeholder profiles. In `index.html`, search for `PASTE YOUR` and replace each `href="…"` with the real profile link. Logos are in `assets/social/` (crimson PNGs).

## Colour palette

Ivory · sand · dusty blue · crimson, on a 60/30/10 split. The colours are variables at the top of `styles.css`.

## Accessibility

- Skip link, semantic landmarks and headings, visible focus outlines
- Text contrast meets WCAG AA (most text AAA)
- Touch targets are at least 44×44px
- Hamburger menu exposes `aria-expanded` and closes with Escape
- Brand carousel pauses on hover or keyboard focus, and stops for users who prefer reduced motion
- Animations and smooth scrolling are turned off for users who prefer reduced motion
