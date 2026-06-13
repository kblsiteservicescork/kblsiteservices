// KBL Site Services — main.js

// Mobile nav toggle
const toggle = document.querySelector('.nav__toggle');
const nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
}

// Contact form — mailto fallback
const form = document.getElementById('survey-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required], input[type="text"], input[type="tel"], input[type="email"], select').forEach(field => {
      const wrap = field.closest('.field');
      if (!field.value.trim()) {
        wrap && wrap.classList.add('field--error');
        valid = false;
      } else {
        wrap && wrap.classList.remove('field--error');
      }
    });

    if (!valid) return;

    const name    = form.querySelector('#name')?.value || '';
    const phone   = form.querySelector('#phone')?.value || '';
    const email   = form.querySelector('#email')?.value || '';
    const project = form.querySelector('#project')?.value || form.querySelector('#issue')?.value || '';
    const message = form.querySelector('#message')?.value || '';

    const body = `Name: ${name}%0APhone: ${phone}%0AEmail: ${email}%0AProject type: ${project}%0A%0A${message}`;
    window.location.href = `mailto:hello@kblsiteservices.ie?subject=Survey enquiry from ${encodeURIComponent(name)}&body=${body}`;

    const status = form.querySelector('.form__status');
    if (status) status.classList.add('show');
  });
}
