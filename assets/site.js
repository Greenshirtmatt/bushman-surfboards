/* Bushman Surfboards — shared interactions (no dependencies) */
(function () {
  "use strict";

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Hero rotator (home only)
  var stage = document.querySelector(".hero__stage");
  if (stage) {
    var slides = Array.prototype.slice.call(stage.querySelectorAll(".hero__slide"));
    var dots = Array.prototype.slice.call(document.querySelectorAll(".hero__dots button"));
    var titleEl = document.getElementById("hero-title");
    var placeEl = document.getElementById("hero-place");
    var captions = [
      { title: "Bushman<br>Surfboards", place: "North Shore, Hawaii" },
      { title: "Tamayo<br>Perry", place: "North Shore, Hawaii" },
      { title: "Ross<br>Clarke-Jones", place: "Waimea Bay, Hawaii" },
      { title: "Pancho<br>Sullivan", place: "Teahupoo, Tahiti" }
    ];
    var i = 0, timer = null;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function go(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, idx) { s.classList.toggle("is-active", idx === i); });
      dots.forEach(function (d, idx) { d.classList.toggle("is-active", idx === i); });
      if (titleEl && captions[i]) titleEl.innerHTML = captions[i].title;
      if (placeEl && captions[i]) placeEl.textContent = captions[i].place;
    }
    function start() { if (!reduce) timer = setInterval(function () { go(i + 1); }, 6000); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    dots.forEach(function (d, idx) {
      d.addEventListener("click", function () { stop(); go(idx); start(); });
    });
    start();
  }
})();
