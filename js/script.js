(function () {
  'use strict';
  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  function getPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function setTheme(theme) {
    if (theme === 'dark') html.classList.add('dark');
    else html.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }
  setTheme(getPreferredTheme());
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      setTheme(html.classList.contains('dark') ? 'light' : 'dark');
    });
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
  });
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if (!name || !email || !message) { alert('Please fill in all fields.'); return; }
      const subject = encodeURIComponent('Portfolio Contact from ' + name);
      const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
      window.location.href = 'mailto:ishannepal528@gmail.com?subject=' + subject + '&body=' + body;
      setTimeout(() => contactForm.reset(), 500);
    });
  }
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) link.classList.add('active');
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
  const typingEl = document.getElementById('typing-text');
  if (typingEl) {
    const phrases = ['BBS Student', 'Business Enthusiast', 'Lifelong Learner', 'Future Entrepreneur', 'Curious Mind'];
    let phraseIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 90;
    function type() {
      const current = phrases[phraseIndex];
      if (isDeleting) { typingEl.textContent = current.substring(0, charIndex - 1); charIndex--; typingSpeed = 45; }
      else { typingEl.textContent = current.substring(0, charIndex + 1); charIndex++; typingSpeed = 90; }
      if (!isDeleting && charIndex === current.length) { typingSpeed = 1800; isDeleting = true; }
      else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; typingSpeed = 400; }
      setTimeout(type, typingSpeed);
    }
    setTimeout(type, 600);
  }
  const revealElements = document.querySelectorAll('.reveal, .stagger-children');
  if ('IntersectionObserver' in window && revealElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [], width, height;
    function resize() { width = canvas.width = canvas.offsetWidth; height = canvas.height = canvas.offsetHeight; }
    function createParticles() {
      const count = Math.min(55, Math.floor((width * height) / 18000));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({ x: Math.random()*width, y: Math.random()*height, radius: Math.random()*1.8+0.6, vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4, alpha: Math.random()*0.5+0.15 });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, dist = Math.sqrt(dx*dx+dy*dy);
          if (dist < 110) {
            ctx.beginPath(); ctx.strokeStyle = 'rgba(14, 165, 233, ' + (0.12 * (1 - dist / 110)) + ')'; ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(14, 165, 233, ' + p.alpha + ')'; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });
      requestAnimationFrame(draw);
    }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      resize(); createParticles(); draw();
      window.addEventListener('resize', () => { resize(); createParticles(); });
    }
  }
})();
