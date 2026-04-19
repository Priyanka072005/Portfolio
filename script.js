// Mobile Hamburger Menu Logic
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link-item');
const body = document.body;

let scrollPosition = 0;

hamburgerBtn.addEventListener('click', () => {
  hamburgerBtn.classList.toggle('active');
  navMenu.classList.toggle('active');

  if (navMenu.classList.contains('active')) {
    // Save current scroll position
    scrollPosition = window.scrollY;

    // Lock background without breaking scroll
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
    body.style.width = '100%';

  } else {
    unlockScroll();
  }
});

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // stop default jump

    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    // Close menu
    hamburgerBtn.classList.remove('active');
    navMenu.classList.remove('active');

    unlockScroll();

    // Smooth scroll AFTER unlock
    setTimeout(() => {
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  });
});

// PC Custom Cursor Logic
if (window.matchMedia("(pointer: fine)").matches) {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    setTimeout(() => {
      ring.style.left = e.clientX + 'px';
      ring.style.top = e.clientY + 'px';
    }, 60);
  });
}

// Unlock function (clean)
function unlockScroll() {
  body.style.position = '';
  body.style.top = '';
  body.style.width = '';

  window.scrollTo(0, scrollPosition);
}

// Scroll Reveal Animations
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

reveals.forEach(el => observer.observe(el));

