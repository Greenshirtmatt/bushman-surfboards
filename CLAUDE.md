# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A four-page static site for Bushman Surfboards (Home, About, Press, Contact). No build step, no framework, no backend — plain HTML, one CSS file, one small JS file. Deploy by dragging the folder to Netlify or pushing to a connected Git repo.

## Development

Open any `.html` file directly in a browser. There is no dev server, no npm, no compilation step.

## Architecture

All pages share:
- `assets/styles.css` — every style for the entire site; CSS variables at the top of `:root` control the whole palette and type scale
- `assets/site.js` — three behaviors: footer year, mobile nav toggle, hero image rotator (home only)
- `assets/img/` — image drop zone; `<img>` tags use `onerror` fallbacks to the old Shopify CDN until local images are added

Each HTML page is self-contained (nav + footer repeated per page, no includes or templating).

## Key design tokens (in `assets/styles.css` `:root`)

- `--accent: #e0531f` — the single burnt-orange accent; change here to retheme
- `--ink` / `--paper` — near-black and off-white; the base palette
- Fonts: Anton (display/headings), Spectral (body), Space Mono (eyebrows/labels) — loaded via Google Fonts `<link>` in each `<head>`

## Content to confirm before launch

- **Images**: all `<img>` tags reference placeholder paths; drop real files at the names listed in `README.md` and remove the `onerror=` attributes
- **Email**: `bushmansurfboards@gmail.com` appears in `press.html` and `contact.html` — search-replace if it changes
- **RCJ win year**: the About essay says "RCJ winning in 2001"; one source lists the Eddie Aikau win under the 2000 contest year (held Jan 2001) — confirm preferred wording
- **Video**: the YouTube embed in `index.html` should be swapped for the real video ID

## Deploy

`netlify.toml` sets publish dir to `.`, empty build command, clean URLs (`/about` → `about.html`), legacy Shopify path redirects, and long-cache headers for `/assets/*`.
