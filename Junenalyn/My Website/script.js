(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');
  const heroTitleImg = document.querySelector('.hero-title-img');

  // ----- Header scroll effect -----
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    setActiveNavLink();
  }

  // ----- Set active nav link based on scroll position -----
  function setActiveNavLink() {
    const scrollY = window.scrollY;
    const viewportMid = scrollY + window.innerHeight * 0.4;

    let currentId = 'home';
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (viewportMid >= top && viewportMid < top + height) {
        currentId = section.id || currentId;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const targetId = href && href.startsWith('#') ? href.slice(1) : '';
      link.classList.toggle('active', targetId === currentId);
    });
  }

  // ----- Smooth scroll for nav links (same page) -----
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const target = document.getElementById(href.slice(1));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ----- Hero entrance animation -----
  function initHeroAnimation() {
    if (heroTitleImg) heroTitleImg.style.opacity = '0';

    requestAnimationFrame(() => {
      if (heroTitleImg) {
        heroTitleImg.style.transition = 'opacity 0.6s ease 0.2s';
        heroTitleImg.style.opacity = '1';
      }
    });
  }

  // ----- Listeners -----
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', () => {
    setActiveNavLink();
    initHeroAnimation();
  });
})();
