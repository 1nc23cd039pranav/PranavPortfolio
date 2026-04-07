/* ═══════════════════════════════════════════
   PRANAV SHARMA — PORTFOLIO
   script.js
═══════════════════════════════════════════ */

/* ── NAVBAR: scroll shadow + active link ── */
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  // Scrolled shadow
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 90) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

/* ── MOBILE NAV ── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => navMenu.classList.toggle('open'));
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

/* ── TITLE ROTATOR ── */
const titles = ['Data Analyst', 'Data Science Student', 'SQL Developer', 'Power BI Analyst', 'Python Developer'];
let ti = 0;
const rotatingEl = document.getElementById('rotating-title');

function rotateTitle() {
  if (!rotatingEl) return;
  rotatingEl.style.opacity = '0';
  setTimeout(() => {
    ti = (ti + 1) % titles.length;
    rotatingEl.textContent = titles[ti];
    rotatingEl.style.opacity = '1';
  }, 400);
}
rotatingEl && setInterval(rotateTitle, 2800);

/* ── PROJECT FILTER TABS ── */
const pfBtns    = document.querySelectorAll('.pf-btn');
const projCards = document.querySelectorAll('.proj-card');
const projEmpty = document.getElementById('proj-empty');

pfBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    pfBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.cat;
    let visible = 0;

    projCards.forEach(card => {
      const match = cat === 'all' || (card.dataset.cat || '').includes(cat);
      card.classList.toggle('pcard-hidden', !match);
      if (match) visible++;
    });

    projEmpty.style.display = visible === 0 ? 'block' : 'none';
  });
});

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll(
  '.proj-card, .skill-group, .skill-chip, .cert-card, .tl-card, .info-card, .prof-item'
);

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = `opacity 0.5s ease ${(i % 6) * 0.07}s, transform 0.5s ease ${(i % 6) * 0.07}s`;
  revealObs.observe(el);
});

/* ── CONTACT FORM ── */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#16a34a';
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

/* ── SMOOTH SCROLL for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
