// Theme
const root = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  if (toggleBtn) toggleBtn.textContent = theme === 'dark' ? '☽' : '☀︎';
  localStorage.setItem('theme', theme);
  const hljsTheme = document.getElementById('hljs-theme');
  if (hljsTheme) {
    hljsTheme.href = theme === 'dark'
      ? '../css/highlight.min.css'
      : '../css/highlight-light.min.css';
  }
}

applyTheme(localStorage.getItem('theme') || getSystemTheme());

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
}

// Resolve content.json path based on page depth
function contentPath() {
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  return depth >= 2 ? '../content.json' : '/content.json';
}

async function render() {
  const res = await fetch(contentPath());
  const c = await res.json();

  // Meta
  document.title = c.site.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', c.site.description);

  // Header
  const siteName = document.getElementById('site-name');
  if (siteName) siteName.textContent = c.site.navLogo;

  const nav = document.getElementById('header-nav');
  if (nav && c.site.nav) {
    const onBlogPage = window.location.pathname.includes('/blog/');
    c.site.nav.forEach((item) => {
      const a = document.createElement('a');
      a.href = onBlogPage ? item.url.replace(/^\//, '../') : item.url;
      a.textContent = item.label;
      nav.insertBefore(a, toggleBtn);
    });
  }

  // About
  const aboutEl = document.getElementById('about-paragraphs');
  if (aboutEl) {
    aboutEl.innerHTML = c.about.paragraphs.map((p) => `<p>${p}</p>`).join('');
  }

  // Experience
  const expEl = document.getElementById('experience-list');
  if (expEl) {
    expEl.innerHTML = c.experience.map((e) => `
      <div class="exp-item">
        <div class="exp-header">
          <span class="exp-role">${e.role}</span>
          <span class="exp-period">${e.period}</span>
        </div>
        <div class="exp-company">${e.company}</div>
        <p class="exp-desc">${e.description}</p>
      </div>
    `).join('');
  }

  // Skills
  const skillsEl = document.getElementById('skills-list');
  if (skillsEl) {
    skillsEl.innerHTML = c.skills.map((g) => `
      <div class="skill-card">
        <h4>${g.category}</h4>
        <ul>${g.items.map((i) => `<li>${i}</li>`).join('')}</ul>
      </div>
    `).join('');
  }

  // Contact
  const contactEl = document.getElementById('contact-links');
  if (contactEl) {
    contactEl.innerHTML = c.contact.links.map((l) => `
      <p class="contact-line">
        <a href="${l.url}" ${l.url.startsWith('http') ? 'target="_blank"' : ''}>${l.label}</a>
      </p>
    `).join('');
  }

  // Blog list with pagination
  const blogListEl = document.getElementById('blog-list');
  if (blogListEl && c.posts) {
    const onBlogPage = window.location.pathname.includes('/blog/');
    const base = onBlogPage ? '' : '../blog/';
    const perPage = 5;
    const params = new URLSearchParams(window.location.search);
    const page = Math.max(1, parseInt(params.get('page') || '1'));
    const total = Math.ceil(c.posts.length / perPage);
    const slice = c.posts.slice((page - 1) * perPage, page * perPage);

    blogListEl.innerHTML = slice.map((p) => `
      <a href="${base}post.html?post=${p.slug}" class="blog-card">
        <p class="blog-card-meta">${p.date}</p>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
      </a>
    `).join('');

    if (total > 1) {
      const pagination = document.getElementById('blog-pagination');
      if (pagination) {
        pagination.innerHTML = `
          ${page > 1 ? `<a href="?page=${page - 1}">← Newer</a>` : '<span></span>'}
          <span>${page} / ${total}</span>
          ${page < total ? `<a href="?page=${page + 1}">Older →</a>` : '<span></span>'}
        `;
      }
    }
  }

  // Footer
  const footerEl = document.getElementById('footer-text');
  if (footerEl) footerEl.textContent = c.footer;
}

render();
