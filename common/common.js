/* common.js – shared behaviour for every page */
(function () {
  // ---- SVG icon sprite: use as <svg class="ic"><use href="#i-zap"/></svg> ----
  var icons = {
    'zap': '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
    'lock': '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    'lock-dot': '<rect x="4" y="9" width="16" height="13" rx="3"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.5" r="1"/>',
    'shield': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    'shield-check': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    'clock': '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    'user': '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    'bag': '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    'check-circle': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    'x': '<path d="M18 6 6 18M6 6l12 12"/>',
    'check': '<path d="M20 6 9 17l-5-5"/>',
    'arrow-down': '<path d="M12 5v14M19 12l-7 7-7-7"/>',
    'arrow-right': '<path d="M5 12h14M12 5l7 7-7 7"/>',
    'arrow-left': '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    'alert': '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    'cpu': '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
    'wifi': '<path d="M5 12.6a11 11 0 0 1 14 0M1.4 9a16 16 0 0 1 21.2 0M8.5 16.1a6 6 0 0 1 7 0M12 20h.01"/>',
    'phone': '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
    'toggle': '<rect x="1" y="5" width="22" height="14" rx="7"/><circle cx="16" cy="12" r="3"/>',
    'radio': '<circle cx="12" cy="12" r="2"/><path d="M16.2 7.8a6 6 0 0 1 0 8.5M7.8 16.2a6 6 0 0 1 0-8.5M19 4.9a10 10 0 0 1 0 14.2M5 19.1a10 10 0 0 1 0-14.2"/>',
    'calendar': '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    'refresh': '<path d="M21 12a9 9 0 0 0-15-6.7L3 8M3 3v5h5M3 12a9 9 0 0 0 15 6.7L21 16M21 21v-5h-5"/>',
    'split': '<path d="M12 22V10M12 10 6 3M12 10l6-7M4 3h4M16 3h4"/>',
    'cog': '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
    'brain': '<path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 1 5 3 3 0 0 0 4 4V3zM15 3a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-1 5 3 3 0 0 1-4 4V3z"/>',
    'trend-down': '<path d="m22 17-8.5-8.5-5 5L2 7M16 17h6v-6"/>',
    'trend-up': '<path d="m22 7-8.5 8.5-5-5L2 17M16 7h6v6"/>',
    'sliders': '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
    'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    'download-circle': '<circle cx="12" cy="12" r="10"/><path d="m8 12 4 4 4-4M12 8v8"/>',
    'upload': '<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
    'copy': '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    'terminal': '<rect x="2" y="3" width="20" height="18" rx="2"/><path d="m6 9 3 3-3 3M12 15h6"/>',
    'truck': '<path d="M1 3h15v13H1zM16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    'history': '<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l4 2"/>',
    'book': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    'bulb': '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/>',
    'cloud-off': '<path d="M22 19a4.5 4.5 0 0 0-3.5-7.5A7 7 0 0 0 6 8M2 2l20 20M2.5 13.5A4.5 4.5 0 0 0 6 19h11"/>',
    'key': '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.8-9.8M17 6l3 3M14 9l2 2"/>',
    'activity': '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    'hand': '<path d="M9 11V5a2 2 0 0 1 4 0v6M13 11V9a2 2 0 0 1 4 0v5a7 7 0 0 1-7 7h-1a6 6 0 0 1-5-3l-2-4a2 2 0 0 1 3-2l2 2"/>',
    'trophy': '<path d="M8 21h8M12 17v4M7 4h10v6a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
    'award': '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8"/>',
    'medal': '<path d="M7 2h4l1 6M17 2h-4l-1 6"/><circle cx="12" cy="15" r="6"/><path d="m12 12 1 2h2l-1.5 1.5.5 2-2-1-2 1 .5-2L9 14h2z"/>',
    'star-circle': '<circle cx="12" cy="12" r="10"/><path d="m12 7 1.5 3.3 3.5.4-2.6 2.4.7 3.5L12 14.8 8.9 16.6l.7-3.5L7 10.7l3.5-.4z"/>',
    'network': '<circle cx="12" cy="12" r="2.5"/><circle cx="12" cy="3.5" r="1.5"/><circle cx="20" cy="9" r="1.5"/><circle cx="17" cy="19" r="1.5"/><circle cx="7" cy="19" r="1.5"/><circle cx="4" cy="9" r="1.5"/><path d="M12 5v4.5M18.6 9.8 14.3 11M15.8 17.8l-2.4-3.5M8.2 17.8l2.4-3.5M5.4 9.8l4.3 1.2"/>',
    'router': '<rect x="2" y="14" width="20" height="7" rx="2"/><path d="M6 18h.01M10 18h.01M6 10a8 8 0 0 1 12 0M9 7a4 4 0 0 1 6 0"/>',
    'ruler': '<rect x="2" y="8" width="20" height="8" rx="1"/><path d="M6 8v4M10 8v3M14 8v4M18 8v3"/>',
    'compass': '<path d="M12 3 5 21M12 3l7 18M8 15h8"/>',
    'building': '<rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
    'plug': '<path d="M12 22v-5M9 8V2M15 8V2M18 8v4a6 6 0 0 1-12 0V8z"/>',
    'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    'filter': '<path d="M3 6h18M6 12h12M10 18h4"/>',
    'link': '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    'flag': '<path d="M4 22V4M4 4h13l-2 4 2 4H4"/>',
    'message': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    'edit': '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    'file': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-right': '<path d="m9 6 6 6-6 6"/>',
    'grid': '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    'chip': '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/><path d="M8 2v2M12 2v2M16 2v2M8 20v2M12 20v2M16 20v2M2 8h2M2 12h2M2 16h2M20 8h2M20 12h2M20 16h2"/>',
    'shield-sm': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    'power': '<path d="M12 2v10M18.4 6.6a9 9 0 1 1-12.8 0"/>',
    'code': '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    'radio-box': '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="m6 7 12-4M7 12h6M7 16h.01M11 16h.01"/>',
    'cpu-box': '<rect x="3" y="3" width="18" height="18" rx="3"/><rect x="8" y="8" width="8" height="8" rx="1"/>',
    'wave': '<path d="M2 12h3l2-6 4 12 3-9 2 3h6"/>',
    'cloud-key': '<path d="M3 3l18 18M9 4a7 7 0 0 1 10 6 4 4 0 0 1 2 6M5 9a5 5 0 0 0-1 9h12"/>',
    'sliders-h': '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    'list': '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    'cart': '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>',
    'package': '<path d="M16.5 9.4 7.5 4.2M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7zM3.3 7 12 12l8.7-5M12 22V12"/>'
  };
  var NS = 'http://www.w3.org/2000/svg';
  var sprite = document.createElementNS(NS, 'svg');
  sprite.setAttribute('width', '0'); sprite.setAttribute('height', '0');
  sprite.setAttribute('aria-hidden', 'true');
  sprite.style.position = 'absolute';
  var out = '';
  Object.keys(icons).forEach(function (k) {
    out += '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + icons[k] + '</symbol>';
  });
  sprite.innerHTML = out;
  document.body.insertBefore(sprite, document.body.firstChild);

  // ---- Mobile navbar toggle ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---- Front-end only forms: no backend is connected yet ----
  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function (e) { e.preventDefault(); });
  });
})();
