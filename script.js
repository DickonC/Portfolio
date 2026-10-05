(function () {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Email link copies the address (mailto does nothing if no mail app is set up).
  var mail = document.querySelector('.js-copy');
  if (mail && navigator.clipboard) {
    mail.addEventListener('click', function (e) {
      e.preventDefault();
      var label = 'Email';
      navigator.clipboard.writeText(mail.getAttribute('data-email')).then(function () {
        mail.textContent = 'Copied ' + mail.getAttribute('data-email');
        clearTimeout(mail._t);
        mail._t = setTimeout(function () { mail.textContent = label; }, 2200);
      }, function () { window.location.href = mail.href; });
    });
  }

  // Fade elements up as they scroll into view, staggering siblings slightly.
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.filter(function (e) { return e.isIntersecting; }).forEach(function (entry, i) {
        entry.target.style.setProperty('--d', (i * 0.06) + 's');
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.1 });
    items.forEach(function (el) { observer.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Show a small project image under the section label on hover (fine pointers only).
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var preview = document.querySelector('.preview');
  var img = preview.querySelector('img');

  document.querySelectorAll('[data-preview]').forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      img.src = el.getAttribute('data-preview');
      preview.classList.add('is-on');
    });
    el.addEventListener('mouseleave', function () { preview.classList.remove('is-on'); });
  });
})();
