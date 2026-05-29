/* KBL Site Services — shared behaviour */

// Mobile nav toggle
(function () {
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }
})();

// Scroll reveal
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(function (e) { e.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(function (e) { io.observe(e); });
})();

// Contact form validation + submission
// NOTE: This uses a mailto fallback so the form works on a static host immediately.
// To capture leads server-side, swap the buildMailto block for a fetch() POST to
// Formspree / Netlify Forms / your own endpoint and remove the mailto redirect.
(function () {
  var form = document.getElementById('survey-form');
  if (!form) return;

  var TO = 'hello@kblsiteservices.ie'; // <-- replace with real inbox

  function setError(field, on) {
    field.closest('.field').classList.toggle('field--error', on);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    var name = form.querySelector('#name');
    var phone = form.querySelector('#phone');
    var email = form.querySelector('#email');
    var issue = form.querySelector('#issue');
    var msg = form.querySelector('#message');

    [name, phone, issue].forEach(function (f) {
      var empty = !f.value.trim();
      setError(f, empty);
      if (empty) ok = false;
    });

    var emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value.trim());
    setError(email, !emailOk);
    if (!emailOk) ok = false;

    if (!ok) return;

    var body =
      'Name: ' + name.value + '\n' +
      'Phone: ' + phone.value + '\n' +
      'Email: ' + email.value + '\n' +
      'Main issue: ' + issue.options[issue.selectedIndex].text + '\n\n' +
      'Details:\n' + (msg.value || '(none)');

    var link = 'mailto:' + TO +
      '?subject=' + encodeURIComponent('Home survey request — ' + name.value) +
      '&body=' + encodeURIComponent(body);

    window.location.href = link;

    var status = form.querySelector('.form__status');
    status.classList.add('show');
    form.reset();
  });
})();
