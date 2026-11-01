/* contact.js – Contact page */
(function () {
  // ---- Classification tabs ----
  var tabs = document.querySelectorAll('#topic-tabs .tab');
  var topic = 'Commercial / Batch';
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      topic = tab.dataset.topic;
    });
  });

  // ---- Attachment drop zone ----
  var dz = document.getElementById('dropzone');
  var input = document.getElementById('f-file');
  var title = document.getElementById('drop-title');
  function showFile(file) {
    if (!file) return;
    var mb = file.size / 1048576;
    if (mb > 45) { title.textContent = 'File too large (max 45MB)'; input.value = ''; return; }
    title.textContent = file.name + ' (' + mb.toFixed(1) + ' MB)';
  }
  if (input) input.addEventListener('change', function () { showFile(input.files[0]); });
  if (dz) {
    ['dragenter', 'dragover'].forEach(function (ev) {
      dz.addEventListener(ev, function (e) { e.preventDefault(); dz.classList.add('over'); });
    });
    ['dragleave', 'drop'].forEach(function (ev) {
      dz.addEventListener(ev, function (e) { e.preventDefault(); dz.classList.remove('over'); });
    });
    dz.addEventListener('drop', function (e) {
      if (e.dataTransfer.files.length) {
        try { input.files = e.dataTransfer.files; } catch (err) { /* older browsers */ }
        showFile(e.dataTransfer.files[0]);
      }
    });
  }

  // ---- Submit (front-end only, no backend yet) ----
  var form = document.getElementById('contact-form');
  var sent = document.getElementById('sent');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('f-name');
    var email = document.getElementById('f-email');
    var details = document.getElementById('f-details');
    sent.hidden = false;
    if (!name.value.trim() || !email.validity.valid || !email.value.trim() || !details.value.trim()) {
      sent.className = 'sent err';
      sent.textContent = 'Please complete the required fields (name, a valid work email, and project details).';
      return;
    }
    sent.className = 'sent';
    sent.textContent = 'Dispatch received (' + topic + '). Our engineering team will respond within 24 hours.';
    form.reset();
    title.textContent = 'Drag schematics or click to browse';
  });

  // ---- Copy PGP fingerprint ----
  var copyBtn = document.getElementById('copy-key');
  var fp = document.getElementById('pgp-fp');
  if (copyBtn && fp && navigator.clipboard) {
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(fp.textContent.trim()).then(function () {
        var label = copyBtn.querySelector('span');
        var old = label.textContent;
        label.textContent = 'Copied';
        setTimeout(function () { label.textContent = old; }, 1500);
      });
    });
  }
})();
