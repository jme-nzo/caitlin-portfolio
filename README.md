# Caitlin — Portfolio

A one-page portfolio site with full-screen sections that snap as you scroll: About, Rates, Results, Projects, Contact me.

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
| Rates | Section 2 (`#rates`) | Edit names, prices and bullet points |
| Results | Section 3 (`#results`) | Edit the four stats |
| Brand logos | Section 3, `.marquee__track` | Currently black text wordmarks. Replace each `<span class="logo__mark">` with `<img src="assets/logos/<brand>.svg" alt="<Brand>">`. Images are forced to black by CSS. |
| **Project videos** | Section 4, `.video-placeholder` (3 of them, marked `TEMP VIDEO PLACEHOLDER`) | Replace each placeholder `<div>` with `<video class="project__video" src="assets/videos/project-1.mp4" poster="assets/videos/project-1.jpg" controls playsinline preload="metadata" aria-label="Describe the video"></video>`. Use 9:16 (iPhone portrait) footage. |
| Email | Section 5 (`#contact`) | Change `hello@example.com` in both `mailto:` links and the visible text |

## Accessibility

- Skip link, semantic landmarks and headings, visible focus outlines
- Text contrast meets WCAG AA (most text AAA)
- Touch targets are at least 44×44px
- Hamburger menu exposes `aria-expanded` and closes with Escape
- Brand carousel can be paused (button, hover or keyboard focus)
- Animations and smooth scrolling are turned off for users who prefer reduced motion
