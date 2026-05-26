# Bushman Surfboards — Static Site

A four-page static site (Home, About, Press, Contact) for Bushman Surfboards,
rebuilt off the former Shopify store with e-commerce removed. No build step,
no framework, no backend. Plain HTML, one CSS file, one small JS file.

## File structure

```
.
├── index.html          Home (hero rotator, statement, rider grid, video, CTA)
├── about.html          Jeff Bushman bio essay + stats
├── press.html          Three press links + press-inquiry email
├── contact.html        mailto: contact (no form backend)
├── 404.html            Custom not-found page
├── netlify.toml        Redirects, clean URLs, security/cache headers
├── robots.txt
├── sitemap.xml
└── assets/
    ├── styles.css      All styling (CSS variables at top)
    ├── site.js         Mobile nav, hero rotator, footer year
    └── img/            Drop your images here (see "Images" below)
```

## Deploy to Netlify

**Option A — drag & drop (fastest):**
1. Go to https://app.netlify.com/drop
2. Drag this entire folder onto the page.
3. Done. You get a random `*.netlify.app` URL immediately.

**Option B — Git (recommended for ongoing edits):**
1. Push this folder to a GitHub/GitLab repo.
2. In Netlify: Add new site → Import an existing project → pick the repo.
3. Build command: leave empty. Publish directory: `.`
4. Deploy.

**Custom domain (bushmansurfboards.com):**
1. Netlify → Site → Domain management → Add a domain → enter `bushmansurfboards.com`.
2. Point DNS at Netlify (either move nameservers to Netlify DNS, or add the
   A/ALIAS + CNAME records Netlify shows you at your current registrar).
3. Netlify provisions HTTPS automatically via Let's Encrypt.

## Images — what to replace

All `<img>` tags currently point at placeholder paths in `assets/img/` and fall
back to the old Shopify CDN via `onerror` so the layout renders before you add
files. Replace these filenames with your high-res originals (same names = zero
code edits needed):

| File                        | Used on        | Suggested subject                          |
|-----------------------------|----------------|--------------------------------------------|
| `assets/img/tamayo.jpg`     | Home hero      | Tamayo Perry, North Shore                  |
| `assets/img/rcj.jpg`        | Home hero      | Ross Clarke-Jones, Waimea Bay              |
| `assets/img/pancho.jpg`     | Home hero      | Pancho Sullivan, Teahupoo                  |
| `assets/img/feature-*.jpg`  | Home grid      | Riders + shaping-bay shots                 |
| `assets/img/jeff-portrait.jpg` | About       | Portrait of Jeff (4:5 vertical works best) |
| `assets/img/logo.svg`       | (placeholder)  | Replace with your real logo if desired     |

Recommended: export hero/feature images at ~2000px wide, compressed JPG or WebP.
Once your own files are in place you can delete the `onerror=` attributes.

## Editing content

- **Colors / type:** all in `assets/styles.css` under `:root` (the `--accent`
  variable is the dusty sea-green accent — change it in one place).
- **Nav, footer, copy:** edit the HTML directly; each page is self-contained.
- **Email address:** search the project for `bushmansurfboards@gmail.com` and
  replace if it changes (appears on press.html and contact.html).

## Notes / things to confirm

- The About essay is carried over verbatim from the old site, including the line
  "RCJ winning in 2001." One archival source lists the Ross Clarke-Jones Eddie
  Aikau win under the 2000 contest year (event held Jan 2001). Confirm the
  preferred wording.
- The press links use the *current* canonical URLs (the old site used legacy
  Shopify-era paths that now redirect).
