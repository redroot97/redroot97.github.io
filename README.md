# @redroot97 - Offensive Security Research Blog

A static, terminal-aesthetic personal blog for @redroot97 - built to showcase offensive security work, CVE research, and ongoing experiments. **Free to host all year.** No frameworks, no build step, no trackers.

```
~/
├── index.html          # research log / blog posts (landing page)
├── whoami.html         # whoami / resume / experience / arsenal / contact
├── cves.html           # CVE advisories tracker
├── images/
│   └── profile.png     # hero profile picture
├── css/
│   └── style.css       # all styling (terminal brutalism, red/amber palette)
├── js/
│   ├── main.js         # shared utilities (year, parallax, easter egg)
│   ├── cves.js         # CVE data + table rendering  ← edit to add CVEs
│   └── research.js     # blog post data + rendering   ← edit to add posts
└── README.md           # you are here
```

---

## 🚀 Deploy to GitHub Pages (free, 5 minutes)

### Step 1: Create the repo

```bash
# from inside the project folder
git init
git add .
git commit -m "initial: redroot97 site"
gh repo create redroot97.github.io --public --source=. --remote=origin --push
```

> The repo **must** be named `redroot97.github.io` - that's the magic name GitHub Pages uses for your user site at the root of the username.

If you don't have the `gh` CLI installed, do it manually:

1. Go to [github.com/new](https://github.com/new)
2. Name the repo exactly `redroot97.github.io` and make it **Public**
3. Run:
   ```bash
   git init
   git remote add origin https://github.com/redroot97/redroot97.github.io.git
   git add .
   git commit -m "initial: redroot97 site"
   git branch -M main
   git push -u origin main
   ```

### Step 2: Turn on GitHub Pages

1. Open the repo → **Settings** → **Pages** (left sidebar).
2. Under **Source**, pick **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`. Save.
4. Wait ~60 seconds. Site goes live at **https://redroot97.github.io**.

### Step 3 (optional): Custom domain

If you bought `redroot97.dev` or similar (Cloudflare Registrar runs ~$10/yr, the cheapest, no markup):

1. In your DNS provider, create:
   - `A` record `@` → `185.199.108.153`
   - `A` record `@` → `185.199.109.153`
   - `A` record `@` → `185.199.110.153`
   - `A` record `@` → `185.199.111.153`
   - `CNAME` record `www` → `redroot97.github.io`
2. In the repo, create a file named `CNAME` (no extension) containing just your domain on one line:
   ```
   redroot97.dev
   ```
3. Commit and push. In **Settings → Pages**, enter your domain in the "Custom domain" box and tick "Enforce HTTPS" once it lets you.

**Total cost: $0 if you use the `*.github.io` subdomain, ~$10/yr if you want a custom domain.**

---

## 📝 Adding content

### Add a new CVE

Open `js/cves.js`. Append to the `cves` array:

```js
{
    id: 'CVE-2026-XXXXX',
    year: 2026,
    product: 'Product Name 1.2.3',
    vendor: 'Vendor Name',
    type: 'Authentication Bypass',     // RCE / XSS / SSRF / etc.
    severity: 'high',                  // critical | high | medium | low
    status: 'published',               // reserved | published | disclosed
    summary: 'One-paragraph description of the vulnerability and impact...',
    credit: '@redroot97',
    link: 'https://nvd.nist.gov/vuln/detail/CVE-2026-XXXXX'
}
```

Commit, push. The summary counters at the top of the CVE page auto-update.

### Add a new research post

Open `js/research.js`. Append to the `posts` array:

```js
{
    date: '2026.06',
    category: 'red-team',              // matches a filter button
    tag: 'red team // your tag',
    title: 'Your Post Title Here',
    excerpt: 'One paragraph that hooks the reader. Two sentences max.',
    status: 'live'
}
```

To add a brand-new category, also add a filter button in `index.html`:

```html
<button class="tag filter-btn" data-filter="your-new-category">your label</button>
```

### Update the bio / experience

Everything is in `whoami.html`. The structure is well-commented. Sections are numbered `[0x01]` through `[0x05]` - just edit the HTML directly.

---

## 🎨 Customization quick reference

All colors and fonts live as CSS variables at the top of `css/style.css`:

```css
:root {
    --bg: #161616;          /* page background */
    --accent: #ff3344;      /* red accent - change this to recolor everything */
    --amber: #ffaa00;       /* used for cert badges */
    --green: #00ff88;       /* used for status dots */
    --mono: 'JetBrains Mono', monospace;
}
```

Change `--accent` and the entire site re-themes.

---

## 🧪 Local preview

Just open `index.html` in a browser - no build step. For a proper local server:

```bash
# python (any version 3.x)
python3 -m http.server 8000

# or with node
npx serve
```

Then visit `http://localhost:8000`.

---

## 🛡️ A note on privacy

This site ships with **zero** third-party scripts. No Google Analytics, no fonts loaded from sketchy CDNs (Google Fonts is the only external dependency and is GDPR-safe via `googleapis.com`). No cookies. No tracking pixels. The way personal sites are supposed to be.

---

## License

Content (writing, CVEs) © @redroot97. Site code: MIT - fork and remix freely.
