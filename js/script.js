/* =============================================
   DIVYAZ ARTS GALLERY — script.js
   ============================================= */

/* ── Mobile hamburger menu ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});


/* ── Smooth active nav highlight on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a, .nav-mobile a');

function updateActiveLink() {
  const scrollY = window.scrollY + 80;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(l => l.classList.remove('active'));
      navLinks.forEach(l => {
        if (l.getAttribute('href') === '#' + id) l.classList.add('active');
      });
    }
  });
}
window.addEventListener('scroll', updateActiveLink, { passive: true });


/* ── Fade-in on scroll (subtle entrance) ── */
const fadeEls = document.querySelectorAll(
  '.gallery-item, .contact-card, .about-inner, .hero-featured-frame'
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

fadeEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.05}s, transform 0.55s ease ${i * 0.05}s`;
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  // Trigger visible class via CSS
  document.querySelectorAll('.visible').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
});

// Handle the .visible class addition
const styleSheet = document.createElement('style');
styleSheet.textContent = `.visible { opacity: 1 !important; transform: none !important; }`;
document.head.appendChild(styleSheet);
