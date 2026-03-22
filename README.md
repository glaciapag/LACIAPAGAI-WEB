# laciapag.ai

Personal website and blog for Glenn Laciapag — data engineer, chemist-turned-coder.

Built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no build step. Hosted on GitHub Pages.

## Local Development

Serve the project root with any HTTP server:

```bash
python -m http.server 8000
```

Visit `http://localhost:8000`.

## Project Structure

- **`content.json`** — all site content (bio, experience, skills, blog post metadata)
- **`js/main.js`** — fetches `content.json` and dynamically renders every page section
- **`blog/posts/*.md`** — blog posts in Markdown with YAML frontmatter
- **`css/style.css`** — styles with CSS variables for light/dark theming

## Adding a Blog Post

1. Create `blog/posts/<slug>.md` with frontmatter:
   ```markdown
   ---
   title: Post Title
   date: Month DD, YYYY
   readTime: X min read
   description: Short description.
   ---
   ```
2. Add an entry to the `posts` array in `content.json`.

## Deployment

Push to `main` — GitHub Pages deploys automatically.
