/* ═══════════════════════════════════════════
   VOLOFEST 2026 — La Voloband
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Marca que el JS sí corre: habilita el estado inicial oculto del reveal.
     Sin esto, el CSS deja todo visible por defecto. */
  document.documentElement.classList.add('js');

  /* ─────── LOADER ─────── */
  window.addEventListener('load', function () {
    setTimeout(function () {
      var l = document.getElementById('loader');
      if (l) l.classList.add('gone');
    }, 700);
  });

  /* ─────── NAV ─────── */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', function () {
    nav.classList.toggle('stuck', window.scrollY > 40);
  }, { passive: true });

  navToggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ─────── CUENTA REGRESIVA ───────
     Sábado 24 de octubre de 2026, 18:00 hrs (Veracruz, UTC-6)  */
  var TARGET = new Date('2026-10-24T18:00:00-06:00').getTime();

  var cd = {
    d: document.getElementById('cdD'),
    h: document.getElementById('cdH'),
    m: document.getElementById('cdM'),
    s: document.getElementById('cdS')
  };

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function tick() {
    var diff = TARGET - Date.now();

    if (diff <= 0) {
      var box = document.getElementById('countdown');
      if (box) {
        box.innerHTML = '<p style="font-family:var(--goth);font-size:2rem;' +
          'color:var(--sangre-viva);margin:0;letter-spacing:.06em">' +
          'ES HOY. NOS VEMOS EN LAS GARZAS.</p>';
      }
      clearInterval(timer);
      return;
    }

    var s = Math.floor(diff / 1000);
    cd.d.textContent = pad(Math.floor(s / 86400));
    cd.h.textContent = pad(Math.floor(s / 3600) % 24);
    cd.m.textContent = pad(Math.floor(s / 60) % 60);
    cd.s.textContent = pad(s % 60);
  }

  tick();
  var timer = setInterval(tick, 1000);

  /* ─────── REVEAL AL SCROLL ─────── */
  var revealables = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (!e.isIntersecting) return;
        var el = e.target;
        setTimeout(function () { el.classList.add('in'); }, (i % 6) * 70);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealables.forEach(function (el) { io.observe(el); });

    /* Red de seguridad: si la pestaña cargó en segundo plano o el observer
       nunca dispara, nada queda invisible. */
    var sweep = function () {
      revealables.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.5) el.classList.add('in');
      });
    };
    setTimeout(sweep, 2500);
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) setTimeout(sweep, 400);
    });
  } else {
    revealables.forEach(function (el) { el.classList.add('in'); });
  }

  /* ─────── PARALLAX DEL HERO ─────── */
  var parallax = document.querySelector('[data-parallax]');
  if (parallax && !reduced) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          parallax.style.transform = 'translateY(' + (y * 0.32) + 'px)';
        }
        ticking = false;
      });
    }, { passive: true });
  }

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

  /* ─────── LIGHTBOX DE CARTELERA ─────── */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var shots = Array.prototype.slice.call(
    document.querySelectorAll('#gallery .gi img')
  );
  var idx = 0;

  function show(i) {
    idx = (i + shots.length) % shots.length;
    lbImg.src = shots[idx].src;
    lbImg.alt = shots[idx].alt;
  }

  function openLb(i) {
    show(i);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  shots.forEach(function (img, i) {
    img.parentElement.addEventListener('click', function () { openLb(i); });
  });

  document.getElementById('lbClose').addEventListener('click', closeLb);
  document.getElementById('lbPrev').addEventListener('click', function (e) {
    e.stopPropagation(); show(idx - 1);
  });
  document.getElementById('lbNext').addEventListener('click', function (e) {
    e.stopPropagation(); show(idx + 1);
  });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  /* Swipe en móvil */
  var touchX = null;
  lb.addEventListener('touchstart', function (e) {
    touchX = e.changedTouches[0].clientX;
  }, { passive: true });

  lb.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 55) show(dx > 0 ? idx - 1 : idx + 1);
    touchX = null;
  }, { passive: true });

})();
