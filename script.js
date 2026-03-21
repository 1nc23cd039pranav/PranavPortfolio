/* ── MOBILE NAV TOGGLE ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav when a link is clicked (mobile)
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── SCROLL REVEAL — EXPERIENCE TIMELINE ── */
const expItems = document.querySelectorAll('.exp-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 120);
    }
  });
}, { threshold: 0.15 });

expItems.forEach(el => revealObserver.observe(el));

/* ── ACTIVE NAV LINK ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => navObserver.observe(sec));

/* ── PROJECT CARDS — SCROLL REVEAL ── */
const projCards = document.querySelectorAll('.proj-card');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = parseInt(entry.target.dataset.index, 10) || 0;
      setTimeout(() => entry.target.classList.add('visible'), idx * 100);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

projCards.forEach(card => cardObserver.observe(card));

/* ── PROJECT CARDS — FILTER TABS ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const emptyState = document.getElementById('empty-state');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    let count = 0;

    projCards.forEach((card) => {
      const cats = card.dataset.category || '';
      const match = filter === 'all' || cats.includes(filter);

      if (match) {
        card.classList.remove('hidden');
        card.classList.remove('visible');
        card.dataset.index = count;
        setTimeout(() => card.classList.add('visible'), count * 100);
        count++;
      } else {
        card.classList.add('hidden');
        card.classList.remove('visible');
      }
    });

    if (emptyState) {
      emptyState.style.display = count === 0 ? 'block' : 'none';
    }
  });
});