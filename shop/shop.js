/* shop.js – Shop page: system configurator (devices + 10A/30A relays), invoice modal, fleet form */
(function () {
  // ---------- pricing (EGP) ----------
  var BASE_PRICE = { 2: 2100, 4: 2400, 8: 3600, 16: 4600, 32: 6000 }; // price when every relay is 10A
  var EXTRA_30A = 80;                                                  // each 30A relay adds this
  var WHATSAPP = '201023065186';                                       // 01023065186

  var DATA = {
    2:  { img: 'img/Device2.jpg',  text: 'Perfect for a small smart home setup.' },
    4:  { img: 'img/Device4.jpg',  text: 'Ideal for a small home with multiple smart devices.' },
    8:  { img: 'img/Device8.jpg',  text: 'Great for a complete smart home setup.' },
    16: { img: 'img/Device16.jpg', text: 'Designed for larger smart home installations.' },
    32: { img: 'img/Device32.jpg', text: 'Built for advanced and large-scale smart homes.' }
  };

  var state = { devices: 2, r10: 2, r30: 0 };

  function $(id) { return document.getElementById(id); }
  var options = document.querySelectorAll('.device-option');
  var img = $('project-image');
  var minus10 = $('minus-10'), plus10 = $('plus-10'), minus30 = $('minus-30'), plus30 = $('plus-30');
  var cont = $('continue-btn');
  var form = $('buy-form');
  if (!form || !img) return;

  function fmt(n) { return n.toLocaleString('en-US'); }
  function price() { return (BASE_PRICE[state.devices] || 0) + state.r30 * EXTRA_30A; }

  function renderPrice() {
    $('price-total').textContent = fmt(price());
    $('add-total').textContent = '[' + fmt(price()) + ' EGP]';
  }

  function renderRelays() {
    $('relay-10').textContent = state.r10;
    $('relay-30').textContent = state.r30;
    $('sum-relay').textContent = state.r10 + ' / ' + state.r30;
    var diff = state.devices - (state.r10 + state.r30);
    var msg = $('validation');
    if (diff === 0) {
      msg.textContent = '✓ Perfect! All devices are allocated.'; msg.className = 'validation ok';
    } else if (diff > 0) {
      msg.textContent = '⚠ You have ' + diff + ' unallocated device(s). Please distribute them.'; msg.className = 'validation err';
    } else {
      msg.textContent = '⚠ You have over-allocated by ' + Math.abs(diff) + ' device(s). Please remove some.'; msg.className = 'validation err';
    }
    cont.disabled = diff !== 0;
    plus10.disabled = plus30.disabled = diff <= 0;
    minus10.disabled = state.r10 <= 0;
    minus30.disabled = state.r30 <= 0;
    renderPrice();
  }

  function swapImage(n) {
    var data = DATA[n];
    img.classList.add('changing');
    setTimeout(function () {
      img.src = data.img;
      img.alt = 'HASS system with ' + n + ' devices';
      img.classList.remove('changing');
    }, 200);
  }

  function renderDevices() {
    options.forEach(function (o) {
      var on = Number(o.dataset.devices) === state.devices;
      o.classList.toggle('active', on);
      o.setAttribute('aria-checked', on ? 'true' : 'false');
    });
    $('preview-text').textContent = state.devices + ' Devices';
    $('sum-devices').textContent = state.devices;
    $('device-description').textContent = DATA[state.devices].text;
  }

  options.forEach(function (o) {
    o.addEventListener('click', function () {
      var n = Number(o.dataset.devices);
      if (n === state.devices) return;
      state.devices = n; state.r10 = n; state.r30 = 0;
      renderDevices(); swapImage(n); renderRelays();
    });
  });

  function step(key, dir) {
    var total = state.r10 + state.r30;
    if (dir > 0 && total >= state.devices) return;
    if (dir < 0 && state[key] <= 0) return;
    state[key] += dir;
    renderRelays();
  }
  plus10.addEventListener('click', function () { step('r10', 1); });
  minus10.addEventListener('click', function () { step('r10', -1); });
  plus30.addEventListener('click', function () { step('r30', 1); });
  minus30.addEventListener('click', function () { step('r30', -1); });

  // ---------- invoice modal ----------
  var modal = $('invoice-modal');
  var lastFocus = null;

  function openInvoice() {
    $('inv-date').textContent = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    $('inv-devices').textContent = state.devices;
    $('inv-10').textContent = state.r10;
    $('inv-30').textContent = state.r30;
    $('inv-total').textContent = fmt(price()) + ' EGP';
    var text = 'Hello HASS, I would like to order a system with ' + state.devices + ' devices (' +
      state.r10 + ' x 10A relay, ' + state.r30 + ' x 30A relay). Total: ' + fmt(price()) + ' EGP.';
    $('inv-wa').href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text);
    lastFocus = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    $('inv-close').focus();
  }
  function closeInvoice() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!cont.disabled) openInvoice();
  });
  $('inv-close').addEventListener('click', closeInvoice);
  $('inv-close-x').addEventListener('click', closeInvoice);
  $('inv-print').addEventListener('click', function () { window.print(); });
  modal.addEventListener('click', function (e) { if (e.target === modal) closeInvoice(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeInvoice();
  });

  renderDevices();
  renderRelays();

  // ---------- Fleet RFP form: front-end confirmation only ----------
  var fleet = $('fleet-form');
  var fleetNote = $('fleet-note');
  if (fleet) fleet.addEventListener('submit', function (e) {
    e.preventDefault();
    if (fleetNote) fleetNote.hidden = false;
    fleet.reset();
  });
})();
