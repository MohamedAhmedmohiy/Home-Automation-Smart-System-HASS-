/* documentation.js – Documentation page */
(function () {
  // ---- Filter the chapter list in the sidebar (also fed by the header search) ----
  var chapterFilter = document.getElementById('chapter-filter');
  var globalSearch = document.getElementById('global-search');
  var chapters = document.querySelectorAll('#chapter-list > li');
  var noMatch = document.getElementById('no-match');

  function applyFilter(q) {
    q = (q || '').trim().toLowerCase();
    var shown = 0;
    chapters.forEach(function (li) {
      var match = !q || li.textContent.toLowerCase().indexOf(q) !== -1;
      li.hidden = !match;
      if (match) shown++;
    });
    if (noMatch) noMatch.hidden = shown !== 0;
  }
  if (chapterFilter) chapterFilter.addEventListener('input', function () {
    if (globalSearch) globalSearch.value = chapterFilter.value;
    applyFilter(chapterFilter.value);
  });
  if (globalSearch) globalSearch.addEventListener('input', function () {
    if (chapterFilter) chapterFilter.value = globalSearch.value;
    applyFilter(globalSearch.value);
  });
  // Cmd/Ctrl + K focuses the header search
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && globalSearch) {
      e.preventDefault();
      globalSearch.focus();
    }
  });

  // ---- Sidebar: clicking a chapter jumps to it and opens its sub-items;
  //      clicking the arrow only expands / collapses ----
  var chapterEls = document.querySelectorAll('#chapter-list .chapter');
  chapterEls.forEach(function (li) {
    var link = li.querySelector('.chapter-link');
    var sub = li.querySelector('.sub-list');
    link.addEventListener('click', function (e) {
      if (!sub) return;
      if (e.target.closest('.ic')) {
        e.preventDefault();
        li.classList.toggle('open');
      } else {
        li.classList.add('open');
      }
    });
  });

  // ---- Code tabs + copy ----
  var tabs = document.querySelectorAll('.code-tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
        var d = t.querySelector('.dot');
        if (d) d.remove();
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      tab.insertAdjacentHTML('afterbegin', '<i class="dot orange"></i>');
      document.querySelectorAll('.code-body').forEach(function (pre) {
        pre.hidden = pre.id !== tab.dataset.target;
      });
    });
  });
  var copyBtn = document.getElementById('code-copy');
  function flash(btn, text) {
    var label = btn.querySelector('span');
    if (!label) return;
    var old = label.textContent;
    label.textContent = text;
    setTimeout(function () { label.textContent = old; }, 1500);
  }
  if (copyBtn) copyBtn.addEventListener('click', function () {
    var visible = Array.prototype.find.call(document.querySelectorAll('.code-body'), function (p) { return !p.hidden; });
    if (visible && navigator.clipboard) {
      navigator.clipboard.writeText(visible.textContent).then(function () { flash(copyBtn, 'Copied'); });
    }
  });

  // ---- Chapter PDF (print) and copy chapter link ----
  var pdf = document.getElementById('btn-pdf');
  if (pdf) pdf.addEventListener('click', function () { window.print(); });
  var link = document.getElementById('btn-link');
  if (link && navigator.clipboard) link.addEventListener('click', function () {
    navigator.clipboard.writeText(location.href.split('#')[0]);
  });

  // ---- "Was this chapter helpful?" ----
  var votes = document.querySelectorAll('.vote button');
  var thanks = document.getElementById('vote-thanks');
  votes.forEach(function (b) {
    b.addEventListener('click', function () {
      votes.forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      if (thanks) thanks.hidden = false;
    });
  });

  // ---- Scroll-spy: sidebar, breadcrumb, "On this page" and pager follow the reading position ----
  var docChapters = Array.prototype.slice.call(document.querySelectorAll('.doc-chapter'));
  var subHeads = Array.prototype.slice.call(document.querySelectorAll('.sub-h'));
  var crumbChapter = document.getElementById('crumb-chapter');
  var crumbCurrent = document.getElementById('crumb-current');
  var tocList = document.getElementById('toc-list');
  var pagerPrev = document.getElementById('pager-prev');
  var pagerNext = document.getElementById('pager-next');
  var shownChapter = null;

  function chapterOf(id) { return document.getElementById(id); }
  function buildToc(ch) {
    if (!tocList) return;
    var html = '<a class="toc-link" href="#' + ch.id + '">' + ch.dataset.title + '</a>';
    ch.querySelectorAll('.sub-h, .adv-extra .doc-section[id]').forEach(function (h) {
      var t = h.querySelector('h2') ? h.querySelector('h2').textContent.replace(/^\d+/, '') : h.textContent;
      html += '<a class="toc-link sub" href="#' + h.id + '">' + t + '</a>';
    });
    tocList.innerHTML = html;
  }
  function setPager(i) {
    var prev = docChapters[i - 1], next = docChapters[i + 1];
    function fill(a, ch) {
      if (!a) return;
      a.hidden = !ch;
      if (!ch) return;
      a.href = '#' + ch.id;
      a.querySelector('span').textContent = ch.dataset.label || '';
      a.querySelector('b').textContent = ch.dataset.title.replace(/^\d+\.\s*/, '');
    }
    fill(pagerPrev, prev);
    fill(pagerNext, next);
  }
  function onScroll() {
    var idx = 0;
    docChapters.forEach(function (c, i) { if (c.getBoundingClientRect().top < 140) idx = i; });
    var ch = docChapters[idx];
    var curSub = null;
    subHeads.forEach(function (h) {
      if (ch.contains(h) && h.getBoundingClientRect().top < 160) curSub = h;
    });
    var changed = shownChapter !== ch;
    if (changed) {
      shownChapter = ch;
      buildToc(ch);
      setPager(idx);
      if (crumbChapter) { crumbChapter.textContent = ch.dataset.title; crumbChapter.href = '#' + ch.id; }
    }
    chapterEls.forEach(function (li) {
      var on = li.dataset.ch === ch.id;
      li.classList.toggle('current', on);
      if (on && changed) li.classList.add('open');
      else if (changed) li.classList.remove('open');
      li.querySelectorAll('.sub-list li').forEach(function (s) {
        var a = s.querySelector('a');
        s.classList.toggle('active', on && !!curSub && a.getAttribute('href') === '#' + curSub.id);
      });
    });
    if (crumbCurrent) crumbCurrent.textContent = curSub ? curSub.textContent : ch.dataset.title;
    // "On this page" highlight
    var links = tocList ? tocList.querySelectorAll('.toc-link') : [];
    var activeHref = '#' + (curSub ? curSub.id : ch.id);
    links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === activeHref); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('hashchange', onScroll);
  onScroll();
})();
