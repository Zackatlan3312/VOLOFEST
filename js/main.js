/* ═══════════════════════════════════════════
   VOLOFEST — La Voloband
   Página de "Próximamente segunda edición"
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────── LOADER ─────── */
  window.addEventListener('load', function () {
    setTimeout(function () {
      var l = document.getElementById('loader');
      if (l) l.classList.add('gone');
    }, 700);
  });

  /* ─────── RELÁMPAGOS ─────── */
  var bolt = document.getElementById('lightning');
  if (bolt && !reduced) {
    (function strike() {
      var wait = 9000 + Math.random() * 16000;
      setTimeout(function () {
        if (!document.hidden) {
          bolt.classList.add('flash');
          setTimeout(function () { bolt.classList.remove('flash'); }, 520);
        }
        strike();
      }, wait);
    })();
  }

  /* ─────── MURCIÉLAGOS ─────── */
  var batLayer = document.getElementById('batLayer');

  var BAT_SVG =
    '<svg viewBox="0 0 100 42" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M50 8c-3 0-5 2-6 5-4-5-11-9-19-10-6-1-11 1-15 4 4 0 7 2 8 5-3 1-5 3-6 6 3-2 7-2 10 0-2 2-3 5-2 8 3-4 8-6 13-5 5 1 8 4 10 8 2-4 4-6 7-6s5 2 7 6c2-4 5-7 10-8 5-1 10 1 13 5 1-3 0-6-2-8 3-2 7-2 10 0-1-3-3-5-6-6 1-3 4-5 8-5-4-3-9-5-15-4-8 1-15 5-19 10-1-3-3-5-6-5z"/>' +
    '</svg>';

  function launchBat() {
    if (!batLayer || document.hidden) return;

    var bat = document.createElement('div');
    bat.className = 'bat';
    bat.innerHTML = BAT_SVG;

    var scale = 0.55 + Math.random() * 0.9;
    var dur = 11 + Math.random() * 10;

    bat.style.top = (8 + Math.random() * 72) + 'vh';
    bat.style.width = (34 * scale) + 'px';
    bat.style.opacity = (0.22 + Math.random() * 0.32).toFixed(2);
    bat.style.animationDuration = dur + 's';

    batLayer.appendChild(bat);
    setTimeout(function () { bat.remove(); }, dur * 1000 + 400);
  }

  if (batLayer && !reduced) {
    setTimeout(launchBat, 2500);
    setInterval(function () {
      if (Math.random() > 0.35) launchBat();
    }, 6500);
  }

})();
