/* Bushman Surfboards — site interactions (no dependencies) */
(function () {
  'use strict';

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Sticky header scrolled state ---- */
  var head = document.querySelector('.site-head');
  if (head) {
    var onScroll = function () {
      if (window.scrollY > 12) head.classList.add('scrolled');
      else head.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Hero carousel ---- */
  var carousel = document.querySelector('.carousel');
  if (carousel) {
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('.slide'));
    var dotsWrap = document.querySelector('.dots');
    var capEl = document.querySelector('.cap');
    var idx = 0, timer = null, DURATION = 5200;

    var dots = slides.map(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Show slide ' + (i + 1));
      b.addEventListener('click', function () { go(i, true); });
      if (dotsWrap) dotsWrap.appendChild(b);
      return b;
    });

    function go(n, manual) {
      slides[idx].classList.remove('active');
      if (dots[idx]) dots[idx].setAttribute('aria-selected', 'false');
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add('active');
      if (dots[idx]) dots[idx].setAttribute('aria-selected', 'true');
      if (capEl) capEl.textContent = slides[idx].getAttribute('data-caption') || '';
      if (manual) restart();
    }
    function next() { go(idx + 1); }
    function restart() { if (timer) clearInterval(timer); timer = setInterval(next, DURATION); }

    // init
    slides[0].classList.add('active');
    if (dots[0]) dots[0].setAttribute('aria-selected', 'true');
    if (capEl) capEl.textContent = slides[0].getAttribute('data-caption') || '';
    restart();

    // pause when tab hidden
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { if (timer) clearInterval(timer); }
      else restart();
    });
  }

  /* ---- Lazy video (click-to-load YouTube facade) ---- */
  var poster = document.querySelector('.video-poster');
  if (poster) {
    poster.addEventListener('click', function () {
      var id = poster.getAttribute('data-yt');
      var frame = poster.parentNode;
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.title = 'Pancho Sullivan on the Sunset Special';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.setAttribute('allowfullscreen', '');
      frame.appendChild(iframe);
      poster.remove();
    });
  }

  /* ---- Scroll reveal ---- */
  var revs = document.querySelectorAll('.reveal');
  if (revs.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revs.forEach(function (el) { io.observe(el); });
  } else {
    revs.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Footer year ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
