/* faq.js – FAQ page: accordion + search */
(function () {
  var items = document.querySelectorAll('.faq-item');

  items.forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    btn.addEventListener('click', function () {
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  var search = document.getElementById('faq-search');
  var empty = document.getElementById('faq-empty');
  if (!search) return;
  search.addEventListener('input', function () {
    var q = search.value.trim().toLowerCase();
    var shown = 0;
    items.forEach(function (item) {
      var match = !q || item.textContent.toLowerCase().indexOf(q) !== -1;
      item.hidden = !match;
      if (match) shown++;
    });
    if (empty) empty.hidden = shown !== 0;
  });
})();
