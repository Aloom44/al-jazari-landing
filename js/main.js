/* ==========================================================================
   AETERNA — High-End Luxury Horology Dynamic Template Engine
   ========================================================================== */

let currentProduct = null;

document.addEventListener('DOMContentLoaded', () => {
  currentProduct = getCurrentProduct();

  const mainContainer = document.getElementById('main-product-container');
  const notFoundContainer = document.getElementById('product-404-container');

  // Handle 404 state if slug is invalid or product not found
  if (!currentProduct) {
    if (mainContainer) mainContainer.style.display = 'none';
    if (notFoundContainer) notFoundContainer.style.display = 'flex';
    document.title = '404 - المنتج غير موجود | AL-JAZARI';
    return;
  }

  // Ensure main container is displayed and 404 container is hidden
  if (mainContainer) mainContainer.style.display = 'block';
  if (notFoundContainer) notFoundContainer.style.display = 'none';

  // 1. Populate dynamic product DOM content
  applyProductToDOM(currentProduct);

  // 2. Initialize interactive modules
  initHorologyCanvas();
  initHeroCarousel(currentProduct.images);
  initStickyMobileBar();
  initFormHandler(currentProduct);
  initScrollAnimations();
  initMobileNav();
  initMetaPixelTracking(currentProduct);
});

/* --------------------------------------------------------------------------
   0. Dynamic DOM Binding Engine
   -------------------------------------------------------------------------- */
function applyProductToDOM(product) {
  // 1. SEO & Meta Tags
  document.title = `${product.name} | AL-JAZARI`;
  
  const pageMetaDesc = document.getElementById('page-meta-desc');
  if (pageMetaDesc) pageMetaDesc.setAttribute('content', product.description || `${product.name} - ${product.price} جنيه مع الدفع عند الاستلام والتوصيل لكافة المحافظات.`);
  
  const ogTitle = document.getElementById('og-title');
  if (ogTitle) ogTitle.setAttribute('content', `${product.name} | AL-JAZARI`);
  
  const ogDesc = document.getElementById('og-description');
  if (ogDesc) ogDesc.setAttribute('content', product.description || '');

  const ogImg = document.getElementById('og-image');
  const firstImg = (product.images && product.images[0]) 
    ? (typeof product.images[0] === 'string' ? product.images[0] : product.images[0].image)
    : 'assets/images/watch_aljazari.webp';
  if (ogImg) ogImg.setAttribute('content', firstImg);

  // 2. Hero Section
  const eyebrowEl = document.getElementById('hero-brand-eyebrow');
  if (eyebrowEl) eyebrowEl.textContent = product.hero_badge || `${(product.brand || product.name).toUpperCase()} • HIGH QUALITY`;

  const headlineEl = document.getElementById('hero-headline');
  if (headlineEl) {
    headlineEl.innerHTML = `${product.hero_title || product.name} <span id="hero-accent-text" class="hero-accent-highlight">${product.hero_accent || ''}</span>`;
  }

  const subtextEl = document.getElementById('hero-subtext');
  if (subtextEl) {
    if (product.hero_subtext) {
      subtextEl.textContent = product.hero_subtext;
    } else {
      const offerPart = (product.offer && product.offer.enabled)
        ? ` | قطعتين بـ ${product.offer.price} جنيه (توفير ${product.offer.saving}ج + ${product.shipping_info || 'شحن مجاني'})`
        : '';
      subtextEl.textContent = `${product.description} • ${product.price} جنيه (${product.shipping_info || 'شحن مجاني'})${offerPart}`;
    }
  }

  // 3. Details & Specifications Section
  const detailsImg = document.getElementById('details-img');
  if (detailsImg) {
    detailsImg.src = product.details_image || firstImg;
    detailsImg.alt = product.details_title || product.name;
  }

  const detailsEyebrow = document.getElementById('details-eyebrow');
  if (detailsEyebrow) detailsEyebrow.textContent = `القسم 01 • تفاصيل الساعة`;

  const detailsTitle = document.getElementById('details-title');
  if (detailsTitle) detailsTitle.textContent = product.details_title || 'تفاصيل صُممت لتدوم';

  const detailsDesc = document.getElementById('details-description');
  if (detailsDesc) detailsDesc.textContent = product.details_description || product.description;

  const specsList = document.getElementById('specs-list');
  const detailsSection = document.getElementById('details');
  if (specsList) {
    if (product.features && product.features.length > 0) {
      specsList.innerHTML = product.features.map(f => `
        <div class="spec-item">
          <span class="label">${f.label}</span>
          <span class="value">${f.value}</span>
        </div>
      `).join('');
      if (detailsSection) detailsSection.style.display = 'block';
    } else {
      specsList.innerHTML = '';
      if (detailsSection) detailsSection.style.display = 'none'; // Requirement 17: Hide empty specs section safely
    }
  }

  // 4. Special Offers Section (#offers)
  const offersSection = document.getElementById('offers');
  if (offersSection) {
    if (product.offer && product.offer.enabled) {
      offersSection.style.display = 'block';

      const singleOfferAmount = document.getElementById('single-offer-amount');
      if (singleOfferAmount) singleOfferAmount.textContent = product.price;

      const singleOfferFeatures = document.getElementById('single-offer-features');
      if (singleOfferFeatures && product.single_offer_features) {
        singleOfferFeatures.innerHTML = product.single_offer_features.map(feat => `<li>✓ ${feat}</li>`).join('');
      }

      const offerBadge = document.getElementById('offer-badge-label');
      if (offerBadge) offerBadge.textContent = product.offer.badge || `الأكثر طلباً • توفير ${product.offer.saving} ج.م`;

      const offerAmount = document.getElementById('offer-amount');
      if (offerAmount) offerAmount.textContent = product.offer.price;

      const offerOldAmount = document.getElementById('offer-old-amount');
      if (offerOldAmount) offerOldAmount.textContent = `${product.offer.old_price} ج.م`;

      const offerFeatures = document.getElementById('offer-features');
      if (offerFeatures && product.offer.features) {
        offerFeatures.innerHTML = product.offer.features.map(feat => `<li>✓ ${feat}</li>`).join('');
      }
    } else {
      offersSection.style.display = 'none'; // Requirement 17: Hide offers section if no offer
    }
  }

  // 5. Order Form Options
  const qtySelect = document.getElementById('customer-quantity');
  if (qtySelect) {
    qtySelect.innerHTML = '';
    const opt1 = document.createElement('option');
    opt1.value = '1';
    opt1.setAttribute('data-price', product.price);
    opt1.selected = true;
    opt1.textContent = `قطعة واحدة — ${product.price} جنيه (${product.shipping_info || 'شحن مجاني'})`;
    qtySelect.appendChild(opt1);

    if (product.offer && product.offer.enabled) {
      const opt2 = document.createElement('option');
      opt2.value = String(product.offer.quantity || 2);
      opt2.setAttribute('data-price', product.offer.price);
      opt2.textContent = `قطعتين (عرض التوفير) — ${product.offer.price} جنيه (توفير ${product.offer.saving}ج + ${product.shipping_info || 'شحن مجاني'})`;
      qtySelect.appendChild(opt2);
    }
  }

  const colorSelectGroup = document.getElementById('color-select-group');
  const colorSelect = document.getElementById('customer-color');
  if (colorSelectGroup && colorSelect) {
    if (product.colors && product.colors.length > 0) {
      colorSelectGroup.style.display = 'block';
      colorSelect.innerHTML = product.colors.map((c, idx) => `
        <option value="${c.name}" data-image="${c.image || ''}" ${idx === 0 ? 'selected' : ''}>${c.name}</option>
      `).join('');
    } else {
      colorSelectGroup.style.display = 'none'; // Requirement 17: Hide color selector if no colors
    }
  }

  const orderHeaderDesc = document.getElementById('order-header-desc');
  if (orderHeaderDesc) {
    const offerText = (product.offer && product.offer.enabled)
      ? ` • قطعة بـ ${product.price}ج | قطعتين بـ ${product.offer.price}ج`
      : ` • قطعة بـ ${product.price}ج`;
    orderHeaderDesc.textContent = `أكمل بياناتك وسنتواصل معك هاتفياً لتأكيد الطلب • ${product.shipping_info || 'شحن مجاني لجميع المحافظات'}${offerText}`;
  }

  const submitBtnText = document.getElementById('order-submit-text');
  if (submitBtnText) {
    submitBtnText.textContent = `تأكيد الطلب — ${product.price} جنيه (${product.shipping_info || 'شحن مجاني'})`;
  }

  const orderTrustBadges = document.getElementById('order-trust-badges');
  if (orderTrustBadges && product.order_trust_badges) {
    orderTrustBadges.innerHTML = product.order_trust_badges.map(b => `<div class="trust-badge-item">✓ ${b}</div>`).join('');
  }

  // 6. Sticky CTA Bar
  const stickyBrand = document.getElementById('sticky-brand');
  if (stickyBrand) stickyBrand.textContent = product.short_name || product.name;

  const stickyPriceInfo = document.getElementById('sticky-price-info');
  if (stickyPriceInfo) {
    const note = (product.offer && product.offer.enabled)
      ? `(${product.shipping_info || 'شحن مجاني'} - أو قطعتين بـ ${product.offer.price}ج)`
      : `(${product.shipping_info || 'شحن مجاني'})`;
    stickyPriceInfo.innerHTML = `${product.price} ج.م <span class="sticky-note">${note}</span>`;
  }

  // 7. Floating WhatsApp Button
  const waBtn = document.getElementById('floating-whatsapp-btn');
  if (waBtn) {
    const waNum = (product.whatsapp || '201557350728').replace(/\D/g, '');
    const waMsg = `مرحبًا، أريد الاستفسار عن ${product.name}.`;
    waBtn.href = `https://wa.me/${waNum}?text=${encodeURIComponent(waMsg)}`;
  }
}

/* --------------------------------------------------------------------------
   1. Multi-Layered Horology Background System
   -------------------------------------------------------------------------- */
function initHorologyCanvas() {
  const canvas = document.getElementById('watch-canvas-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let angle = 0;

  function getCanvasPrimaryRgb() {
    return document.documentElement.style.getPropertyValue('--hero-canvas-primary-rgb').trim() ||
           document.documentElement.style.getPropertyValue('--hero-accent-rgb').trim() ||
           '204, 164, 98';
  }

  function getCanvasSecondaryRgb() {
    return document.documentElement.style.getPropertyValue('--hero-canvas-secondary-rgb').trim() ||
           '160, 120, 60';
  }

  function drawHorologyGear(cx, cy, outerRadius, innerRadius, teeth, rotationAngle, opacity, useSecondary = false) {
    const rgb = useSecondary ? getCanvasSecondaryRgb() : getCanvasPrimaryRgb();
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotationAngle);
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${rgb}, ${opacity})`;
    ctx.lineWidth = 1.2;

    for (let i = 0; i < teeth; i++) {
      const a1 = (i * 2 * Math.PI) / teeth;
      const a2 = ((i + 0.3) * 2 * Math.PI) / teeth;
      const a3 = ((i + 0.7) * 2 * Math.PI) / teeth;
      const a4 = ((i + 1) * 2 * Math.PI) / teeth;

      const r1 = outerRadius;
      const r2 = innerRadius;

      if (i === 0) ctx.moveTo(r1 * Math.cos(a1), r1 * Math.sin(a1));
      else ctx.lineTo(r1 * Math.cos(a1), r1 * Math.sin(a1));

      ctx.lineTo(r1 * Math.cos(a2), r1 * Math.sin(a2));
      ctx.lineTo(r2 * Math.cos(a3), r2 * Math.sin(a3));
      ctx.lineTo(r2 * Math.cos(a4), r2 * Math.sin(a4));
    }
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, innerRadius * 0.55, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  function drawHorologyDialBlueprint(cx, cy, radius, rotationAngle) {
    const primaryRgb = getCanvasPrimaryRgb();
    const secondaryRgb = getCanvasSecondaryRgb();
    ctx.save();
    ctx.translate(cx, cy);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.85, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${secondaryRgb}, 0.05)`;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.65, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${primaryRgb}, 0.05)`;
    ctx.stroke();

    for (let i = 0; i < 60; i++) {
      const tickAngle = (i * Math.PI) / 30;
      const isMajor = i % 5 === 0;
      const rInner = radius * (isMajor ? 0.88 : 0.94);
      const rOuter = radius * 0.98;

      ctx.beginPath();
      ctx.moveTo(rInner * Math.cos(tickAngle), rInner * Math.sin(tickAngle));
      ctx.lineTo(rOuter * Math.cos(tickAngle), rOuter * Math.sin(tickAngle));
      ctx.strokeStyle = isMajor ? `rgba(${primaryRgb}, 0.07)` : 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = isMajor ? 1.5 : 1;
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
    ctx.beginPath();
    ctx.moveTo(-radius * 1.2, 0);
    ctx.lineTo(radius * 1.2, 0);
    ctx.moveTo(0, -radius * 1.2);
    ctx.lineTo(0, radius * 1.2);
    ctx.stroke();

    ctx.rotate(rotationAngle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -radius * 0.6);
    ctx.strokeStyle = `rgba(${primaryRgb}, 0.07)`;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }

  function renderFrame() {
    ctx.clearRect(0, 0, width, height);
    angle += 0.001;

    drawHorologyDialBlueprint(width * 0.5, height * 0.45, Math.min(width, height) * 0.4, angle * 0.4);
    drawHorologyGear(width * 0.82, height * 0.25, 260, 220, 32, -angle * 0.8, 0.05, false);
    drawHorologyGear(width * 0.12, height * 0.75, 220, 185, 24, angle * 1.1, 0.045, true);

    requestAnimationFrame(renderFrame);
  }

  renderFrame();
}

/* --------------------------------------------------------------------------
   2. Dynamic Hero Carousel & Theme Engine
   -------------------------------------------------------------------------- */
function initHeroCarousel(slidesData) {
  const stage        = document.getElementById('hero-carousel-stage');
  const imageWrapper = stage && stage.querySelector('.carousel-image-wrapper');
  const counter      = document.getElementById('carousel-counter');
  const prevBtn      = document.getElementById('carousel-prev-btn');
  const nextBtn      = document.getElementById('carousel-next-btn');
  const thumbsWrap   = document.getElementById('carousel-thumbnails');
  const ambientGlow  = document.getElementById('hero-ambient-glow');
  const priceAmount  = document.getElementById('hero-price-amount');
  const activeImg    = document.getElementById('carousel-active-img');
  const nextImgEl    = document.getElementById('carousel-next-img');

  if (!stage || !imageWrapper || !activeImg) return;

  const slides = (slidesData && slidesData.length > 0) ? slidesData : [
    {
      id: "default-slide",
      image: "assets/images/watch_aljazari.webp",
      filter: "none",
      name: "Watch",
      accentColor: "#CCA462",
      price: "800"
    }
  ];

  const heroSlides = slides.map((s, idx) => {
    if (typeof s === 'string') {
      return {
        id: `slide-${idx}`,
        image: s,
        filter: "none",
        name: currentProduct ? currentProduct.name : "Watch",
        accentColor: "#CCA462",
        accentRgb: "204, 164, 98",
        secondaryAccent: "#BFA15F",
        canvasPrimaryRgb: "204, 164, 98",
        canvasSecondaryRgb: "160, 120, 60",
        glowColor: "rgba(180, 138, 70, 0.14)",
        ambientGrad: "radial-gradient(circle, rgba(180, 138, 70, 0.14) 0%, rgba(6, 7, 9, 0) 70%)",
        accentBorder: "rgba(204, 164, 98, 0.32)",
        textSecondary: "#8E95A5",
        heroBg: "radial-gradient(circle at 50% 45%, #131211 0%, #060709 72%)",
        price: currentProduct ? String(currentProduct.price) : "800"
      };
    }
    return {
      id: s.id || `slide-${idx}`,
      image: s.image,
      filter: s.filter || "none",
      name: s.name || (currentProduct ? currentProduct.name : "Watch"),
      accentColor: s.accentColor || "#CCA462",
      accentRgb: s.accentRgb || "204, 164, 98",
      secondaryAccent: s.secondaryAccent || "#BFA15F",
      canvasPrimaryRgb: s.canvasPrimaryRgb || "204, 164, 98",
      canvasSecondaryRgb: s.canvasSecondaryRgb || "160, 120, 60",
      glowColor: s.glowColor || "rgba(180, 138, 70, 0.14)",
      ambientGrad: s.ambientGrad || "radial-gradient(circle, rgba(180, 138, 70, 0.14) 0%, rgba(6, 7, 9, 0) 70%)",
      accentBorder: s.accentBorder || "rgba(204, 164, 98, 0.32)",
      textSecondary: s.textSecondary || "#8E95A5",
      heroBg: s.heroBg || "radial-gradient(circle at 50% 45%, #131211 0%, #060709 72%)",
      price: s.price || (currentProduct ? String(currentProduct.price) : "800")
    };
  });

  let currentIndex    = 0;
  let timer           = null;
  let isTransitioning = false;

  const firstSlide = heroSlides[0];
  if (firstSlide.image) {
    activeImg.src          = firstSlide.image;
    activeImg.style.filter = firstSlide.filter;
    activeImg.style.display = 'block';
  } else {
    activeImg.removeAttribute('src');
    activeImg.style.display = 'none';
  }
  activeImg.className    = 'hero-watch-img active';

  if (nextImgEl) {
    if (firstSlide.image) {
      nextImgEl.src          = firstSlide.image;
      nextImgEl.style.filter = firstSlide.filter;
      nextImgEl.style.display = 'block';
    } else {
      nextImgEl.removeAttribute('src');
      nextImgEl.style.display = 'none';
    }
    nextImgEl.className    = 'hero-watch-img';
  }

  applyTheme(firstSlide);
  updateCounter(0);

  // Build thumbnails
  thumbsWrap.innerHTML = '';
  heroSlides.forEach((slide, idx) => {
    const wrap = document.createElement('div');
    wrap.className = `carousel-thumb-item${idx === 0 ? ' active' : ''}`;
    wrap.setAttribute('aria-label', slide.name);
    if (slide.image) {
      const tImg = document.createElement('img');
      tImg.src          = slide.image;
      tImg.alt          = slide.name;
      tImg.style.filter = slide.filter;
      wrap.appendChild(tImg);
    } else {
      wrap.style.background = `radial-gradient(circle, ${slide.accentColor}33 0%, transparent 80%)`;
      wrap.style.borderColor = `${slide.accentColor}44`;
    }
    wrap.addEventListener('click', () => {
      if (idx !== currentIndex && !isTransitioning)
        navigate(idx, idx > currentIndex ? 'next' : 'prev');
    });
    thumbsWrap.appendChild(wrap);
  });

  function navigate(newIndex, dir = 'next') {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex = (newIndex + heroSlides.length) % heroSlides.length;
    const slide = heroSlides[currentIndex];

    activeImg.className = `hero-watch-img exit-${dir}`;

    if (nextImgEl) {
      if (slide.image) {
        nextImgEl.src = slide.image;
        nextImgEl.style.display = 'block';
      } else {
        nextImgEl.removeAttribute('src');
        nextImgEl.style.display = 'none';
      }
      nextImgEl.style.filter = slide.filter;
      nextImgEl.className = `hero-watch-img enter-${dir}`;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (nextImgEl) nextImgEl.className = 'hero-watch-img active';

        setTimeout(() => {
          updateCounter(currentIndex);
          updateThumbs(currentIndex);
          if (priceAmount) priceAmount.textContent = slide.price;
        }, 220);

        setTimeout(() => applyTheme(slide), 100);

        setTimeout(() => {
          if (slide.image) {
            activeImg.src = slide.image;
            activeImg.style.display = 'block';
          } else {
            activeImg.removeAttribute('src');
            activeImg.style.display = 'none';
          }
          activeImg.style.filter = slide.filter;
          activeImg.className = 'hero-watch-img active';

          if (nextImgEl) {
            nextImgEl.className = 'hero-watch-img';
            nextImgEl.style.filter = 'none';
          }
          isTransitioning = false;
        }, 1500);

      });
    });
  }

  function applyTheme(slide) {
    const root = document.documentElement;
    root.style.setProperty('--hero-accent',        slide.accentColor);
    root.style.setProperty('--hero-glow',          slide.glowColor);
    root.style.setProperty('--hero-accent-border', slide.accentBorder);
    if (slide.accentRgb) root.style.setProperty('--hero-accent-rgb', slide.accentRgb);
    if (slide.secondaryAccent) root.style.setProperty('--hero-secondary-accent', slide.secondaryAccent);
    if (slide.textSecondary) root.style.setProperty('--hero-subtext-color', slide.textSecondary);
    if (slide.canvasPrimaryRgb) root.style.setProperty('--hero-canvas-primary-rgb', slide.canvasPrimaryRgb);
    if (slide.canvasSecondaryRgb) root.style.setProperty('--hero-canvas-secondary-rgb', slide.canvasSecondaryRgb);
    if (slide.heroBg) root.style.setProperty('--hero-bg-gradient', slide.heroBg);

    if (ambientGlow) {
      ambientGlow.style.background = slide.ambientGrad ||
        `radial-gradient(circle, ${slide.glowColor} 0%, rgba(6,7,9,0) 70%)`;
    }
  }

  function updateCounter(idx) {
    if (!counter) return;
    const curr  = String(idx + 1).padStart(2, '0');
    const total = String(heroSlides.length).padStart(2, '0');
    counter.innerHTML =
      `<span class="curr">${curr}</span><span class="sep"> / </span><span class="tot">${total}</span>`;
  }

  function updateThumbs(idx) {
    thumbsWrap.querySelectorAll('.carousel-thumb-item')
      .forEach((t, i) => t.classList.toggle('active', i === idx));
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(() => navigate(currentIndex + 1, 'next'), 5500);
  }
  function stopTimer()  { if (timer) clearInterval(timer); }
  function resetTimer() { stopTimer(); startTimer(); }

  prevBtn && prevBtn.addEventListener('click', () => { navigate(currentIndex - 1, 'prev'); resetTimer(); });
  nextBtn && nextBtn.addEventListener('click', () => { navigate(currentIndex + 1, 'next'); resetTimer(); });

  stage.addEventListener('mouseenter', stopTimer);
  stage.addEventListener('mouseleave', startTimer);

  let tx = 0;
  stage.addEventListener('touchstart', e => { tx = e.changedTouches[0].screenX; }, { passive: true });
  stage.addEventListener('touchend',   e => {
    const diff = e.changedTouches[0].screenX - tx;
    if (Math.abs(diff) > 40) {
      navigate(currentIndex + (diff < 0 ? 1 : -1), diff < 0 ? 'next' : 'prev');
      resetTimer();
    }
  }, { passive: true });

  startTimer();
}

/* --------------------------------------------------------------------------
   3. Sticky Mobile Bottom CTA Controller
   -------------------------------------------------------------------------- */
function initStickyMobileBar() {
  const stickyBar = document.getElementById('sticky-cta-bar') || document.getElementById('sticky-mobile-bar');
  const heroSection = document.getElementById('hero');

  if (!stickyBar) return;

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const heroHeight = heroSection ? heroSection.offsetHeight - 150 : 350;

    if (scrollPos > heroHeight) {
      stickyBar.classList.add('active');
    } else {
      stickyBar.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   4. Order Form Handler & Confirmation Popup
   -------------------------------------------------------------------------- */
function initFormHandler(product) {
  const orderForm = document.getElementById('order-form');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const submitBtnSpan = document.getElementById('order-submit-text');
  const qtySelect = document.getElementById('customer-quantity');
  const colorSelect = document.getElementById('customer-color');

  if (!orderForm || !modalOverlay) return;

  if (qtySelect) {
    qtySelect.addEventListener('change', () => {
      const qtyVal = qtySelect.value;
      if (submitBtnSpan) {
        if (qtyVal === String(product.offer?.quantity || 2) && product.offer?.enabled) {
          submitBtnSpan.textContent = `تأكيد الطلب — ${product.offer.price} جنيه (عرض قطعتين + ${product.shipping_info || 'شحن مجاني'})`;
        } else {
          submitBtnSpan.textContent = `تأكيد الطلب — ${product.price} جنيه (${product.shipping_info || 'شحن مجاني'})`;
        }
      }
    });
  }

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const phone2El = document.getElementById('customer-phone-2');
    const phone2 = phone2El ? phone2El.value.trim() : '';
    const governorate = document.getElementById('customer-governorate').value;
    const address = document.getElementById('customer-address').value.trim();
    
    const qty = qtySelect ? qtySelect.value : '1';
    const numItems = parseInt(qty, 10) || 1;
    const isOffer = (numItems === (product.offer?.quantity || 2)) && product.offer?.enabled;
    const totalPrice = isOffer ? product.offer.price : (product.price * numItems);
    
    const color = colorSelect ? colorSelect.value : (product.colors && product.colors[0] ? product.colors[0].name : 'افتراضي');

    if (!name || !phone || !governorate || !address) {
      alert('يرجى التأكد من ملء جميع البيانات المطلوبة.');
      return;
    }

    const modalNameEl = document.getElementById('modal-customer-name');
    const modalProductNameEl = document.getElementById('modal-product-name');
    const modalPhoneEl = document.getElementById('modal-customer-phone');
    const modalGovEl = document.getElementById('modal-customer-gov');
    const modalColorEl = document.getElementById('modal-customer-color');

    if (modalNameEl) modalNameEl.textContent = name;
    if (modalProductNameEl) modalProductNameEl.textContent = product.name;
    if (modalPhoneEl) modalPhoneEl.textContent = phone2 ? `${phone} / ${phone2}` : phone;
    if (modalGovEl) modalGovEl.textContent = governorate;
    
    const qtyText = isOffer ? `عرض ${numItems} قطع (${totalPrice} ج.م)` : `${numItems} قطعة (${totalPrice} ج.م)`;
    if (modalColorEl) modalColorEl.textContent = `${color} — ${qtyText}`;

    modalOverlay.classList.add('active');

    // --- Save Order to Firebase Database (Ref: admin_orders.html) ---
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true });

    saveOrderToDatabase({
      name: name,
      phone: phone,
      phone2: phone2 || '',
      governorate: governorate,
      address: address,
      product: product.name,
      productType: product.name,
      productSlug: product.slug,
      color: color,
      quantity: numItems,
      unitPrice: isOffer ? (product.offer.price / numItems) : product.price,
      price: totalPrice,
      totalPrice: totalPrice,
      notes: `المنتج: ${product.name} | اللون: ${color} | العرض: ${qtyText}`,
      date: dateStr,
      time: timeStr,
      createdAt: now.toISOString()
    });

    // --- Meta Pixel Lead & Purchase Tracking (Fired strictly on order success) ---
    if (typeof window.fbq === 'function') {
      const cleanPhone = phone.replace(/\D/g, '');

      // Advanced Matching initialization
      window.fbq('init', product.pixel_id || '1090362260079762', {
        ph: cleanPhone,
        fn: name.toLowerCase()
      });

      // Track Lead Event
      window.fbq('track', 'Lead', {
        content_name: product.name,
        content_category: product.category || 'ساعات',
        value: totalPrice,
        currency: 'EGP',
        num_items: numItems,
        variant: color
      });

      // Track Purchase Event
      window.fbq('track', 'Purchase', {
        content_name: product.name,
        content_type: 'product',
        content_ids: [product.slug],
        value: totalPrice,
        currency: 'EGP',
        num_items: numItems,
        variant: color
      });
    }

    orderForm.reset();

    if (submitBtnSpan) {
      submitBtnSpan.textContent = `تأكيد الطلب — ${product.price} جنيه (${product.shipping_info || 'شحن مجاني'})`;
    }
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   7. Meta Pixel Professional Tracking Module
   Pixel ID: Dynamic per product
   -------------------------------------------------------------------------- */
function initMetaPixelTracking(product) {
  const pixelId = product.pixel_id || '1090362260079762';

  if (typeof window.fbq === 'function') {
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  }

  function safeFbq(action, eventName, params) {
    if (typeof window.fbq === 'function') {
      if (params) {
        window.fbq(action, eventName, params);
      } else {
        window.fbq(action, eventName);
      }
    }
  }

  // 1. ViewContent (Fires once per page load)
  let hasFiredViewContent = false;
  function trackViewContent() {
    if (hasFiredViewContent) return;
    hasFiredViewContent = true;
    safeFbq('track', 'ViewContent', {
      content_name: product.name,
      content_category: product.category || 'ساعات',
      content_type: 'product',
      content_ids: [product.slug],
      value: product.price,
      currency: 'EGP'
    });
  }
  trackViewContent();

  // 2. InitiateCheckout (Fires once per interaction session when user initiates checkout)
  let hasFiredInitiateCheckout = false;
  window.triggerMetaInitiateCheckout = function(source = 'user_action') {
    if (hasFiredInitiateCheckout) return;
    hasFiredInitiateCheckout = true;
    safeFbq('track', 'InitiateCheckout', {
      content_name: product.name,
      content_category: product.category || 'ساعات',
      content_type: 'product',
      content_ids: [product.slug],
      value: product.price,
      currency: 'EGP',
      num_items: 1,
      trigger_source: source
    });
  };

  // CTA Click Listeners
  document.querySelectorAll('a[href="#order"], .sticky-btn-action, .mobile-header-action').forEach(btn => {
    btn.addEventListener('click', () => {
      window.triggerMetaInitiateCheckout('cta_click');
    });
  });

  // Order Section Scroll / Focus Detection
  const orderSection = document.getElementById('order') || document.getElementById('order-form');
  if (orderSection) {
    if ('IntersectionObserver' in window) {
      const orderObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window.triggerMetaInitiateCheckout('order_scroll');
          }
        });
      }, { threshold: 0.2 });
      orderObserver.observe(orderSection);
    }

    orderSection.addEventListener('focusin', () => {
      window.triggerMetaInitiateCheckout('form_input_focus');
    }, { once: true });
  }

  // 3. AddToCart (Fires when quantity or color options are changed)
  const qtySelect = document.getElementById('customer-quantity');
  const colorSelect = document.getElementById('customer-color');

  function trackAddToCart() {
    const qtyVal = qtySelect ? qtySelect.value : '1';
    const numItems = parseInt(qtyVal, 10) || 1;
    const isOffer = (numItems === (product.offer?.quantity || 2)) && product.offer?.enabled;
    const totalValue = isOffer ? product.offer.price : (product.price * numItems);
    const selectedColor = colorSelect ? colorSelect.value : (product.colors && product.colors[0] ? product.colors[0].name : 'افتراضي');

    safeFbq('track', 'AddToCart', {
      content_name: product.name,
      content_type: 'product',
      content_ids: [product.slug],
      value: totalValue,
      currency: 'EGP',
      num_items: numItems,
      variant: selectedColor
    });
  }

  if (qtySelect) qtySelect.addEventListener('change', trackAddToCart);
  if (colorSelect) colorSelect.addEventListener('change', trackAddToCart);

  // 4. Contact Event (WhatsApp Button Click)
  document.querySelectorAll('.floating-whatsapp-btn, a[href*="wa.me"]').forEach(waBtn => {
    waBtn.addEventListener('click', () => {
      safeFbq('track', 'Contact', {
        content_name: product.name,
        contact_method: 'WhatsApp'
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Scroll Animations (Intersection Observer)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-editorial-grid, .editorial-header, .order-editorial-wrapper, .specs-bar-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(35px)';
    el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}

/* --------------------------------------------------------------------------
   6. Mobile Navigation Drawer Controller
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-nav-close');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const drawer = document.getElementById('mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  function openMenu() {
    drawer.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   8. Firebase Realtime Database Integration (Direct sync with admin_orders.html)
   -------------------------------------------------------------------------- */
const firebaseConfig = {
    apiKey: "AIzaSyCVJYD2adDrZD2C7jnTjVhiewxVohZzM38",
    authDomain: "herbs-orders.firebaseapp.com",
    databaseURL: "https://herbs-orders-default-rtdb.firebaseio.com",
    projectId: "herbs-orders",
    storageBucket: "herbs-orders.firebasestorage.app",
    messagingSenderId: "866663461200",
    appId: "1:866663461200:web:0b891e0eb53a16c555fc55"
};

let firebaseDbInstance = null;
function getFirebaseDb() {
  if (firebaseDbInstance) return firebaseDbInstance;
  if (typeof firebase !== 'undefined') {
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      firebaseDbInstance = firebase.database();
      return firebaseDbInstance;
    } catch (err) {
      console.warn('Firebase init exception:', err);
    }
  }
  return null;
}

function saveOrderToDatabase(orderData) {
  const now = new Date();
  const timestampNum = Date.now();

  const dbPayload = {
    name: orderData.name || '',
    phone: orderData.phone || '',
    phone2: orderData.phone2 || '',
    governorate: orderData.governorate || '',
    address: orderData.address || '',
    product: orderData.product || (currentProduct ? currentProduct.name : 'ساعة Rolex Oyster هاي كواليتي'),
    productType: orderData.productType || (currentProduct ? currentProduct.name : 'ساعة Rolex Oyster هاي كواليتي'),
    productSlug: orderData.productSlug || (currentProduct ? currentProduct.slug : 'rolex-oyster'),
    color: orderData.color || '',
    quantity: orderData.quantity || 1,
    unitPrice: orderData.unitPrice || 0,
    price: orderData.price || 800,
    total: orderData.price || 800,
    size: `${orderData.color || ''} (${orderData.quantity > 1 ? 'عرض' : 'قطعة واحدة'})`,
    bottleSize: `${orderData.color || ''} (${orderData.quantity > 1 ? 'عرض' : 'قطعة واحدة'})`,
    notes: orderData.notes || '',
    date: orderData.date || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`,
    time: orderData.time || now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true }),
    timestamp: timestampNum,
    createdAt: now.toISOString()
  };

  // 1. Primary: Direct HTTPS REST API POST to Firebase Realtime Database
  fetch('https://herbs-orders-default-rtdb.firebaseio.com/orders.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dbPayload)
  }).then(res => res.json()).then(data => {
    console.log('✅ Order saved to Firebase via REST API:', data);
  }).catch(err => {
    console.warn('⚠️ REST API push error:', err);
  });

  // 2. Secondary: Firebase Web SDK push if loaded
  const db = getFirebaseDb();
  if (db) {
    try {
      db.ref('orders').push({
        ...dbPayload,
        timestamp: (typeof firebase !== 'undefined' && firebase.database && firebase.database.ServerValue)
          ? firebase.database.ServerValue.TIMESTAMP
          : timestampNum
      }).then(() => {
        console.log('✅ Order saved to Firebase via SDK');
      }).catch(err => console.warn('Firebase SDK push error:', err));
    } catch (e) {
      console.warn('Firebase SDK push exception:', e);
    }
  }

  // 3. Backup to LocalStorage under 'hairOilOrders' for local offline fallback
  try {
    const existingOrders = JSON.parse(localStorage.getItem('hairOilOrders') || '[]');
    existingOrders.push({
      ...dbPayload,
      firebaseId: 'local_' + timestampNum
    });
    localStorage.setItem('hairOilOrders', JSON.stringify(existingOrders));
  } catch (err) {
    console.warn('LocalStorage backup error:', err);
  }
}
