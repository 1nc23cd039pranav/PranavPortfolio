/* ═══════════════════════════════════
   PRANAV SHARMA — PORTFOLIO
   script.js
═══════════════════════════════════ */

/* ── MOBILE NAV ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── ACTIVE NAV LINK ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.querySelectorAll('a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => observer.observe(s));

/* ── NAVBAR SHADOW ON SCROLL ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.boxShadow =
    window.scrollY > 10 ? '0 2px 12px rgba(0,0,0,0.08)' : 'none';
});

/* ── PROJECT FILTER TABS ── */
const pfBtns    = document.querySelectorAll('.pf-btn');
const pCards    = document.querySelectorAll('.pcard');
const projEmpty = document.getElementById('proj-empty');

pfBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    pfBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.cat;
    let visible = 0;

    pCards.forEach(card => {
      const match = cat === 'all' || (card.dataset.cat || '').includes(cat);
      card.classList.toggle('pcard-hidden', !match);
      if (match) visible++;
    });

    if (projEmpty) projEmpty.style.display = visible === 0 ? 'block' : 'none';
  });
});