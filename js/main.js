(function () {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  function onScroll() {
    if (!header || header.classList.contains('on-light')) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  const form = document.getElementById('enquire-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const phone = (data.get('phone') || '').toString().trim();
      const dates = (data.get('dates') || '').toString().trim();
      const group = (data.get('group') || '').toString().trim();
      const language = (data.get('language') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      if (!name || !email || !message) {
        alert('Please complete your name, email, and message.');
        return;
      }

      const body = [
        'Name: ' + name,
        'Email: ' + email,
        'Phone: ' + phone,
        'Preferred dates: ' + dates,
        'Group size: ' + group,
        'Language: ' + language,
        '',
        message
      ].join(String.fromCharCode(10));

      const mailto =
        'mailto:info@kimba-africa.co.za' +
        '?subject=' + encodeURIComponent('Journey enquiry from ' + name) +
        '&body=' + encodeURIComponent(body);

      form.classList.add('is-hidden');
      const success = document.getElementById('form-success');
      if (success) success.classList.add('is-visible');

      const mailLink = document.getElementById('mailto-fallback');
      if (mailLink) mailLink.setAttribute('href', mailto);

      // Attempt to open mail client as fallback
      window.location.href = mailto;
    });
  }
})();
