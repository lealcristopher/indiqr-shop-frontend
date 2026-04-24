/* ── HERO DATA (injetado pelo Jinja2) ────────────────────────── */
// window.HERO_DATA é definido inline no template

(function () {
  'use strict';

  /* ── SCROLL SHADOW ──────────────────────────────────────────── */
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });

  /* ── CATEGORY FILTER ────────────────────────────────────────── */
  const navLinks     = document.querySelectorAll('.nav-link[data-cat]');
  const catCards     = document.querySelectorAll('.category-card[data-cat]');
  const productCards = document.querySelectorAll('.product-card[data-cat]');
  const heroTitle    = document.querySelector('.hero-title');
  const heroSub      = document.querySelector('.hero-sub');
  const heroBg       = document.querySelector('.hero-bg');
  const productsTitleEl = document.querySelector('.products-title');
  const productsCountEl = document.querySelector('.products-count');

  function setActiveCategory(catId) {
    /* nav */
    navLinks.forEach(el => el.classList.toggle('active', el.dataset.cat === catId));
    /* carousel */
    catCards.forEach(el => el.classList.toggle('active', el.dataset.cat === catId));
    /* products */
    let visible = 0;
    productCards.forEach(el => {
      const show = catId === '0' || el.dataset.cat === catId;
      el.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    /* hero text */
    const hero = window.HERO_DATA[catId] || window.HERO_DATA['0'];
    if (heroTitle) heroTitle.textContent = hero.title;
    if (heroSub)   heroSub.textContent   = hero.subtitle;
    /* hero bg */
    if (heroBg) {
      heroBg.style.backgroundImage = hero.image_url ? `url('${hero.image_url}')` : '';
    }
    /* products header */
    if (productsTitleEl) {
      productsTitleEl.textContent = catId === '0'
        ? 'Todos os Serviços'
        : (window.HERO_DATA[catId] ? window.HERO_DATA[catId].cat_name : 'Serviços');
    }
    if (productsCountEl) {
      productsCountEl.textContent = `${visible} ${visible === 1 ? 'serviço' : 'serviços'}`;
    }
    /* persist selection */
    try { sessionStorage.setItem('activeCat', catId); } catch(e) {}
  }

  /* bind nav clicks */
  navLinks.forEach(el => {
    el.addEventListener('click', () => setActiveCategory(el.dataset.cat));
  });

  /* bind carousel card clicks */
  catCards.forEach(el => {
    el.addEventListener('click', () => setActiveCategory(el.dataset.cat));
  });

  /* restore session */
  const saved = (() => { try { return sessionStorage.getItem('activeCat'); } catch(e) { return null; } })();
  setActiveCategory(saved || '0');

  /* ── CAROUSEL SCROLL ────────────────────────────────────────── */
  const track   = document.querySelector('.carousel-track');
  const btnPrev = document.querySelector('.carousel-btn.prev');
  const btnNext = document.querySelector('.carousel-btn.next');

  if (track && btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => track.scrollBy({ left: -220, behavior: 'smooth' }));
    btnNext.addEventListener('click', () => track.scrollBy({ left:  220, behavior: 'smooth' }));
  }

  /* ── PRODUCT CARD HOVER (img placeholder) ───────────────────── */
  productCards.forEach(card => {
    const img = card.querySelector('.product-img.placeholder');
    if (!img) return;
    card.addEventListener('mouseenter', () => img.style.transform = 'scale(1.03)');
    card.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
  });

})();
