/*===============================================================
  ЗАРИНА ЖАНАТАЕВА — скрипты
  Без зависимостей: меню, появление при скролле,
  подсветка активного пункта меню, кнопка «наверх».
================================================================*/

(function () {
  'use strict';

  /*=============== МОБИЛЬНОЕ МЕНЮ ===============*/
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');

  if (toggle && menu) {
    const setMenu = (open) => {
      menu.classList.toggle('is-open', open);
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    };

    toggle.addEventListener('click', () => {
      setMenu(!menu.classList.contains('is-open'));
    });

    menu.querySelectorAll('.menu__link').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /*=============== ГРАНИЦА ШАПКИ И КНОПКА «НАВЕРХ» ===============*/
  const header = document.getElementById('header');
  const toTop = document.getElementById('to-top');

  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 24);
    if (toTop) toTop.classList.toggle('is-visible', y > 600);
    highlightNav(y);
  };

  /*=============== АКТИВНЫЙ ПУНКТ МЕНЮ ===============*/
  const sections = Array.from(document.querySelectorAll('section[id], footer[id]'));

  function highlightNav(scrollY) {
    const offset = scrollY + window.innerHeight / 3;

    sections.forEach((section) => {
      const link = document.querySelector('.nav__link[href="#' + section.id + '"]');
      if (!link) return;

      const top = section.offsetTop;
      const inView = offset >= top && offset < top + section.offsetHeight;
      link.classList.toggle('is-active', inView);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /*=============== ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ ===============*/
  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return;
          // лёгкая каскадная задержка внутри одного экрана
          entry.target.style.transitionDelay = i * 60 + 'ms';
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }

  /*=============== ГОД В ПОДВАЛЕ ===============*/
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
