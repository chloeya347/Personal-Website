# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Chloe Gu's personal website and engineering portfolio. Plain HTML/CSS/JS — no framework, no build step, no dependencies. External resources (Google Fonts, Font Awesome) are loaded via CDN.

## Running locally

There is no build or test pipeline. Open `index.html` directly in a browser, or serve the folder to get correct relative paths and `fetch`/module behavior:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

Deployed via GitHub Pages from the repo root, so the live site is whatever is on `main`.

## Architecture

All user-facing text lives in `content/`, separate from markup and logic. The HTML carries only structure; the JS wires content in.

- `index.html` — single-page layout with `#home`, `#updates`, `#projects` (flagship only), and a collapsible `#fun` section.
- `projects.html` — the full project list. Links back to `index.html#...` anchors.
- `css/style.css` — the **only** stylesheet; both pages link it. (Earlier per-page CSS files were consolidated here.)

### Content (the words on the site)

All copy is in `content/` — **edit these files, not the HTML or JS**, to change wording:

- `content/site.json` — every page string (hero, intros, section labels, about, hobbies, footer), nested by key. Each value is bound to the element carrying the matching `data-content="dotted.key"` attribute.
- `content/news.json` — the `#updates` list, an array of `{ date, text }` objects (e.g. `{ "date": "Aug 2024", "text": "Started my undergrad at Duke!" }`). Order in the file is the order shown; brackets around the date are added on render.
- `content/projects.json` — **single source of truth for all projects.** An array of objects; see the convention below.

### JavaScript

Loaded as plain `<script>` tags (no modules/bundler):

- `js/content.js` — the content loader, runs on both pages. Fetches `content/site.json` and fills every `[data-content]` element by its dotted key; renders `content/news.json` into `#update-list`; renders `content/projects.json` cards into `#projects-list`, branching on the container's `data-filter` attribute (`data-filter="flagship"` on index renders only `flagship: true`; no filter on projects.html renders everything). All steps are null-safe, so the same script runs on both pages. Because it `fetch`es local files, the site must be **served** (see above), not opened via `file://`.
- `js/nav.js` — IntersectionObserver that highlights the nav link for the section in view. Relies on nav links having `data-section` matching a section `id` (present only on `index.html`).
- `js/hobbies.js` — toggles the collapsible `#fun-reveal` block via the `hidden` attribute. Only relevant on `index.html`.

## Conventions

- **Changing page text:** edit `content/site.json`. To wire a *new* element to content, give it `data-content="some.key"` and add `some.key` to `site.json`; `content.js` sets its `textContent`. Values are plain text (no HTML).
- **Adding an update:** add a `{ "date": ..., "text": ... }` object to `content/news.json`.
- **Adding a project:** add an object to `content/projects.json` with `title`, `date`, `img`, `desc`, `skills` (array), and optionally `flagship: true` to feature it on the home page. Card numbering and accent colors (`accents` array in `js/content.js`) are assigned automatically by index.
- **Images** live in `src/` — `src/projects/`, `src/photos/` (birding), `src/cubing/`. Referenced with `./src/...` relative paths. Note the repo uses uppercase extensions on some files (`.JPG`, `.JPEG`); match the actual filename exactly (case-sensitive on the GitHub Pages host).
- The cartoon "blob" mascot is pure markup + CSS: `<div class="blob">` with `.body`, `.eye l`, `.eye r`, and optional `.mouth` children. Reuse this structure rather than inventing new markup.
- Project cards are built from a template string in `createProjectCard`; project `desc`/`title` text is interpolated unescaped, so keep that content trusted/plain.
