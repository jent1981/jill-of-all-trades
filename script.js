/* ====================================================
   Jill of All Trades — Main Script
   ==================================================== */

// ——— NAVBAR ———
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScrollY = y;
}, { passive: true });

// Mobile menu toggle
hamburger?.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile menu on link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Click outside to close
document.addEventListener('click', e => {
  if (navLinks?.classList.contains('open') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Set active nav link based on current page
const currentFile = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentFile || (currentFile === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ——— SCROLL ANIMATIONS (Intersection Observer) ———
const animEls = document.querySelectorAll('.animate-on-scroll');

const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      animObserver.unobserve(entry.target); // fire once
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

animEls.forEach(el => animObserver.observe(el));

// ——— HERO BACKGROUND PARALLAX ———
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  // Kick off the zoom-in on load
  requestAnimationFrame(() => heroBg.classList.add('loaded'));

  window.addEventListener('scroll', () => {
    const shift = window.scrollY * 0.28;
    heroBg.style.transform = `translateY(${shift}px)`;
  }, { passive: true });
}

// ——— PAGE-HERO ZOOM ———
const pageHeroBg = document.querySelector('.page-hero-bg');
if (pageHeroBg) {
  requestAnimationFrame(() => pageHeroBg.classList.add('loaded'));
}

// ——— COUNTER ANIMATION (hero stats) ———
function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

function animateCounter(el) {
  const raw    = el.dataset.target || el.textContent;
  const suffix = el.dataset.suffix || '';
  const target = parseFloat(raw);
  const duration = 1600; // ms
  const start  = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(easeOut(progress) * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Only start counters when the hero stats enter view
const statEls = document.querySelectorAll('.hero-stat .num');
if (statEls.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statEls.forEach(el => counterObserver.observe(el));
}

// ——— CONTACT FORM ———
const contactForm = document.getElementById('contactForm');
const formSuccess  = document.querySelector('.form-success');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const btn = contactForm.querySelector('.form-submit');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending…';
    btn.disabled = true;

    // Simulate async submission (replace with real endpoint)
    setTimeout(() => {
      contactForm.style.display = 'none';
      if (formSuccess) {
        formSuccess.style.display = 'block';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 1800);
  });
}

// ——— KEN BURNS SCROLL TRIGGER (banner & CTA on mobile) ———
const kbEls = document.querySelectorAll('.mascots-band, .cta-banner-bg');
if (kbEls.length) {
  const kbObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('kb-active');
        kbObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  kbEls.forEach(el => kbObserver.observe(el));
}

// ——— SMOOTH ANCHOR SCROLL ———
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 90; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
