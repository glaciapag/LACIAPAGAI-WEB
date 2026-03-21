// Theme toggle
const root = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  if (toggleBtn) toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', theme);
}

const saved = localStorage.getItem('theme') || getSystemTheme();
applyTheme(saved);

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || getSystemTheme();
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// Resolve path to content.json regardless of page depth
function contentPath() {
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  return depth >= 2 ? '../content.json' : '/content.json';
}

// Render nav on every page
async function renderNav(c) {
  const logo = document.getElementById('nav-logo');
  const links = document.getElementById('nav-links');
  if (logo) logo.textContent = c.site.navLogo;
  if (links) {
    links.innerHTML = c.site.nav
      .map((item) => `<li><a href="${item.url}">${item.label}</a></li>`)
      .join('');
  }
}

// Render content from content.json (only on index page)
async function renderContent() {
  const res = await fetch(contentPath());
  const c = await res.json();

  await renderNav(c);

  const isIndex = document.getElementById('hero-name');
  if (!isIndex) return;

  // Meta
  document.title = c.site.title;
  document.querySelector('meta[name="description"]').setAttribute('content', c.site.description);
  document.getElementById('nav-logo').textContent = c.site.navLogo;

  // Hero
  const badge = document.getElementById('hero-badge');
  if (c.hero.badge) {
    badge.textContent = c.hero.badge;
  } else {
    badge.style.display = 'none';
  }
  document.getElementById('hero-name').textContent = c.hero.name;
  document.getElementById('hero-tagline').textContent = c.hero.tagline;

  // About
  const avatarEl = document.getElementById('about-avatar');
  if (c.about.avatar.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) {
    avatarEl.innerHTML = `<img src="${c.about.avatar}" alt="Avatar" />`;
  } else {
    avatarEl.textContent = c.about.avatar;
  }
  document.getElementById('about-paragraphs').innerHTML = c.about.paragraphs
    .map((p) => `<p>${p}</p>`)
    .join('');

  // Experience
  document.getElementById('experience-timeline').innerHTML = c.experience
    .map(
      (e) => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-header">
          <span class="timeline-role">${e.role}</span>
          <span class="timeline-period">${e.period}</span>
        </div>
        <div class="timeline-company">${e.company}</div>
        <p class="timeline-desc">${e.description}</p>
        <div class="card-tags">${e.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
      </div>`
    )
    .join('');

  // Skills
  document.getElementById('skills-grid').innerHTML = c.skills
    .map(
      (g) => `
      <div class="skill-group">
        <h4>${g.category}</h4>
        <ul>${g.items.map((i) => `<li>${i}</li>`).join('')}</ul>
      </div>`
    )
    .join('');

  // Contact
  document.getElementById('contact-links').innerHTML = c.contact.links
    .map(
      (l) => `<a href="${l.url}" class="contact-link" ${l.url.startsWith('http') ? 'target="_blank"' : ''}>${l.icon} ${l.label}</a>`
    )
    .join('');

  // Footer
  document.getElementById('footer-text').textContent = c.footer;

  // Init scroll observer after content is rendered
  initScrollObserver();
}

function initScrollObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
}


renderContent();
