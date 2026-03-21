/* ═══════════════════════════════════
   PRANAV SHARMA — PORTFOLIO
   script.js
═══════════════════════════════════ */

/* ── MOBILE NAV TOGGLE ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── EXPERIENCE TIMELINE — SCROLL REVEAL ── */
const expItems = document.querySelectorAll('.exp-item');

// Only hide items that are below the fold on load
expItems.forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.top >= window.innerHeight) {
    el.classList.add('animate-ready');
  }
});

const expObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 120);
      expObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

expItems.forEach(el => {
  if (el.classList.contains('animate-ready')) expObserver.observe(el);
});

/* ── ACTIVE NAV LINK ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
      });
    }
  });
}, { threshold: 0.35 });
sections.forEach(sec => navObserver.observe(sec));

/* ── PROJECTS — FILTER TABS ── */
const pfBtns    = document.querySelectorAll('.pf-btn');
const pCards    = document.querySelectorAll('.pcard');
const projEmpty = document.getElementById('proj-empty');

pfBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    pfBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.cat;
    let count = 0;

    pCards.forEach(card => {
      const cats = card.dataset.cat || '';
      const show = cat === 'all' || cats.includes(cat);
      if (show) {
        card.classList.remove('pcard-hidden');
        count++;
      } else {
        card.classList.add('pcard-hidden');
      }
    });

    if (projEmpty) {
      projEmpty.style.display = count === 0 ? 'block' : 'none';
    }
  });
});