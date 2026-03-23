# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running Locally

No build step required. Serve the directory with any HTTP server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`. There are no tests, no linting tools, and no npm.

## Deployment

Push to the `main` branch — GitHub Pages deploys automatically. The `.nojekyll` file disables Jekyll processing.

## Architecture

This is a **zero-dependency static site** (pure HTML/CSS/JS). All pages are thin shells that are dynamically populated by JavaScript at runtime.

### Content Flow

`content.json` is the single source of truth for all homepage content (hero, experience, skills, blog post metadata, nav, etc.). On page load, `/js/main.js` fetches it and renders every section.

### Blog System

- **List page** (`/blog/index.html`): reads `posts` array from `content.json`, paginates 5 per page
- **Post page** (`/blog/post.html?post=<slug>`): fetches `/blog/posts/<slug>.md`, parses YAML frontmatter and Markdown using `marked.min.js`, then syntax-highlights with `highlight.min.js`

**Adding a blog post:**
1. Create `/blog/posts/<slug>.md` with YAML frontmatter (`title`, `date`, `readTime`, `description`)
2. Add an entry to the `posts` array in `content.json` with matching `slug`, `title`, `date`, `readTime`, and `description`
3. Add a `<url>` entry to `sitemap.xml` and an `<item>` entry to `feed.xml`

**Conventions:**
- Dates use the format `"Month DD, YYYY"` (e.g., "March 21, 2026") in both `content.json` and frontmatter
- `readTime` is required in both `content.json` and frontmatter (e.g., "4 min read")

### Theming

CSS custom properties in `css/style.css` define both light and dark themes. The `[data-theme="dark"]` selector overrides the defaults. Theme preference is saved to `localStorage`; system preference is the fallback. When the theme switches, `main.js` also swaps the syntax-highlight stylesheet (`highlight.min.css` ↔ `highlight-light.min.css`).
