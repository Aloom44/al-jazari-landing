/* ==========================================================================
   AETERNA — High-End Luxury Horology Canvas & Interactive Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHorologyCanvas();
  initHeroCarousel();
  initStickyMobileBar();
  initFormHandler();
  initScrollAnimations();
  initMobileNav();
  initMetaPixelTracking();
});

/* --------------------------------------------------------------------------
   1. Multi-Layered Horology Background System
   - Low Opacity (3% - 8%)
   - Concentric Dial Geometry, Gears, Technical Blueprint Lines
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

  // Layer 4: Gear Silhouette Renderer
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

    // Inner Concentric Gear Skeleton Ring
    ctx.beginPath();
    ctx.arc(0, 0, innerRadius * 0.55, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  // Layer 3 & 5: Dial Geometry & Technical Diagram Blueprint
  function drawHorologyDialBlueprint(cx, cy, radius, rotationAngle) {
    const primaryRgb = getCanvasPrimaryRgb();
    const secondaryRgb = getCanvasSecondaryRgb();
    ctx.save();
    ctx.translate(cx, cy);

    // Concentric Dial Rings
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

    // Hour Index Marks
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

    // Technical Crosshairs
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
    ctx.beginPath();
    ctx.moveTo(-radius * 1.2, 0);
    ctx.lineTo(radius * 1.2, 0);
    ctx.moveTo(0, -radius * 1.2);
    ctx.lineTo(0, radius * 1.2);
    ctx.stroke();

    // Slow Rotating Hands Silhouette
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

    // Render low opacity horology layers across canvas
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
const heroSlides = [
  {
    id: "rolex-gold-two-tone",
    image: "assets/images/watch_aljazari.webp",
    filter: "none",
    name: "الإصدار الذهبي الملكي ثنائي النغمة",
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
    price: "800"
  },
  {
    id: "rolex-champagne-gold",
    image: "assets/images/watch_champagne_gold.webp",
    filter: "none",
    name: "الإصدار الشامبين الذهبي الملكي",
    accentColor: "#D8B26E",
    accentRgb: "216, 178, 110",
    secondaryAccent: "#CCA462",
    secondaryAccentRgb: "204, 164, 98",
    canvasPrimaryRgb: "216, 178, 110",
    canvasSecondaryRgb: "170, 130, 65",
    glowColor: "rgba(216, 178, 110, 0.15)",
    ambientGrad: "radial-gradient(circle, rgba(216, 178, 110, 0.15) 0%, rgba(35, 28, 18, 0.10) 45%, rgba(6, 6, 7, 0) 72%)",
    accentBorder: "rgba(216, 178, 110, 0.35)",
    textSecondary: "#A39E96",
    heroBg: "radial-gradient(circle at 50% 45%, #141310 0%, #0c0b08 45%, #060607 80%)",
    price: "800"
  },
  {
    id: "rolex-blue-emerald",
    image: "assets/images/watch_blue_emerald.webp",
    filter: "none",
    name: "الإصدار الملكي الأزرق والزمردي",
    accentColor: "#5B9BD5",
    accentRgb: "91, 155, 213",
    secondaryAccent: "#CCA462",
    secondaryAccentRgb: "204, 164, 98",
    canvasPrimaryRgb: "91, 155, 213",
    canvasSecondaryRgb: "24, 75, 58",
    glowColor: "rgba(45, 95, 155, 0.16)",
    ambientGrad: "radial-gradient(circle, rgba(45, 95, 155, 0.16) 0%, rgba(16, 52, 42, 0.10) 45%, rgba(5, 7, 10, 0) 72%)",
    accentBorder: "rgba(91, 155, 213, 0.35)",
    textSecondary: "#8FA0B2",
    heroBg: "radial-gradient(circle at 50% 45%, #051012 0%, #060B12 45%, #050608 80%)",
    price: "800"
  },
  {
    id: "rolex-pearl-white",
    image: "assets/images/watch_pearl_white.webp",
    filter: "none",
    name: "الإصدار الأبيض الفضي البلاتيني",
    accentColor: "#E2E8F0",
    accentRgb: "226, 232, 240",
    secondaryAccent: "#94A3B8",
    secondaryAccentRgb: "148, 163, 184",
    canvasPrimaryRgb: "215, 225, 235",
    canvasSecondaryRgb: "75, 85, 99",
    glowColor: "rgba(220, 228, 238, 0.13)",
    ambientGrad: "radial-gradient(circle, rgba(220, 228, 238, 0.13) 0%, rgba(30, 36, 44, 0.10) 45%, rgba(5, 6, 8, 0) 72%)",
    accentBorder: "rgba(226, 232, 240, 0.38)",
    textSecondary: "#94A3B8",
    heroBg: "radial-gradient(circle at 50% 45%, #131519 0%, #0d0f13 45%, #050607 80%)",
    price: "800"
  },
  {
    id: "rolex-trio-collection",
    image: "assets/images/watch_trio_collection.webp",
    filter: "none",
    name: "المجموعة الكاملة — ثلاثية التميز",
    accentColor: "#E2D9C8",
    accentRgb: "226, 217, 200",
    secondaryAccent: "#5B9BD5",
    secondaryAccentRgb: "91, 155, 213",
    canvasPrimaryRgb: "226, 217, 200",
    canvasSecondaryRgb: "91, 155, 213",
    glowColor: "rgba(226, 217, 200, 0.14)",
    ambientGrad: "radial-gradient(circle, rgba(226, 217, 200, 0.14) 0%, rgba(45, 95, 155, 0.08) 40%, rgba(6, 7, 9, 0) 72%)",
    accentBorder: "rgba(226, 217, 200, 0.35)",
    textSecondary: "#9DA7B3",
    heroBg: "radial-gradient(circle at 50% 45%, #121316 0%, #0a0b0d 45%, #050607 80%)",
    price: "800"
  }
];

function initHeroCarousel() {
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

  // ── State ────────────────────────────────────────────────────────
  let currentIndex    = 0;
  let timer           = null;
  let isTransitioning = false;

  // ── Initialise first slide (no animation) ────────────────────────
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

  // ── Build thumbnails ─────────────────────────────────────────────
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
      // Subtle swatch indicator when awaiting images
      wrap.style.background = `radial-gradient(circle, ${slide.accentColor}33 0%, transparent 80%)`;
      wrap.style.borderColor = `${slide.accentColor}44`;
    }
    wrap.addEventListener('click', () => {
      if (idx !== currentIndex && !isTransitioning)
        navigate(idx, idx > currentIndex ? 'next' : 'prev');
    });
    thumbsWrap.appendChild(wrap);
  });

  // ── Core crossfade ────────────────────────────────────────────
  function navigate(newIndex, dir = 'next') {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex = (newIndex + heroSlides.length) % heroSlides.length;
    const slide = heroSlides[currentIndex];

    // ── PHASE 1 (0ms): outgoing image fades out ──────────────────────
    activeImg.className = `hero-watch-img exit-${dir}`;

    // ── PHASE 2 (0ms): position incoming image at enter state (no transition) ─
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
      // enter class has transition: none — snaps to start position cleanly
    }

    // Two RAFs guarantee the browser has committed the enter position
    // before we switch to .active and begin the crossfade transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {

        // ── PHASE 3: incoming image blooms in ────────────────────────
        if (nextImgEl) nextImgEl.className = 'hero-watch-img active';

        // ── PHASE 4 (220ms): counter + thumbs switch mid-crossfade ────────
        setTimeout(() => {
          updateCounter(currentIndex);
          updateThumbs(currentIndex);
          if (priceAmount) priceAmount.textContent = slide.price;
        }, 220);

        // ── PHASE 5 (100ms): theme + ambient glow shift slightly after image ─
        setTimeout(() => applyTheme(slide), 100);

        // ── PHASE 6 (1500ms): collapse after transition fully settles ───────
        // 1500ms > 1.1s opacity transition — safe margin for completion
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

  // ── Theme & ambient glow ─────────────────────────────────────────
  function applyTheme(slide) {
    const root = document.documentElement;
    root.style.setProperty('--hero-accent',        slide.accentColor);
    root.style.setProperty('--hero-glow',          slide.glowColor);
    root.style.setProperty('--hero-accent-border', slide.accentBorder);
    if (slide.accentRgb) {
      root.style.setProperty('--hero-accent-rgb', slide.accentRgb);
    }
    if (slide.secondaryAccent) {
      root.style.setProperty('--hero-secondary-accent', slide.secondaryAccent);
    }
    if (slide.textSecondary) {
      root.style.setProperty('--hero-subtext-color', slide.textSecondary);
    }
    if (slide.canvasPrimaryRgb) {
      root.style.setProperty('--hero-canvas-primary-rgb', slide.canvasPrimaryRgb);
    }
    if (slide.canvasSecondaryRgb) {
      root.style.setProperty('--hero-canvas-secondary-rgb', slide.canvasSecondaryRgb);
    }
    if (slide.heroBg) {
      root.style.setProperty('--hero-bg-gradient', slide.heroBg);
    }

    if (ambientGlow) {
      ambientGlow.style.background = slide.ambientGrad ||
        `radial-gradient(circle, ${slide.glowColor} 0%, rgba(6,7,9,0) 70%)`;
    }
  }

  // ── UI helpers ───────────────────────────────────────────────────
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

  // ── Auto-play timer ──────────────────────────────────────────────
  function startTimer() {
    stopTimer();
    timer = setInterval(() => navigate(currentIndex + 1, 'next'), 5500);
  }
  function stopTimer()  { if (timer) clearInterval(timer); }
  function resetTimer() { stopTimer(); startTimer(); }

  // ── Controls ─────────────────────────────────────────────────────
  prevBtn && prevBtn.addEventListener('click', () => { navigate(currentIndex - 1, 'prev'); resetTimer(); });
  nextBtn && nextBtn.addEventListener('click', () => { navigate(currentIndex + 1, 'next'); resetTimer(); });

  stage.addEventListener('mouseenter', stopTimer);
  stage.addEventListener('mouseleave', startTimer);

  // Touch / swipe
  let tx = 0;
  stage.addEventListener('touchstart', e => { tx = e.changedTouches[0].screenX; }, { passive: true });
  stage.addEventListener('touchend',   e => {
    const diff = e.changedTouches[0].screenX - tx;
    if (Math.abs(diff) > 40) {
      navigate(currentIndex + (diff < 0 ? 1 : -1), diff < 0 ? 'next' : 'prev');
      resetTimer();
    }
  }, { passive: true });

  // ── Start ────────────────────────────────────────────────────────
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
function initFormHandler() {
  const orderForm = document.getElementById('order-form');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const submitBtnSpan = document.querySelector('#order-submit-btn span');
  const qtySelect = document.getElementById('customer-quantity');
  const colorSelect = document.getElementById('customer-color');

  if (!orderForm || !modalOverlay) return;

  // Handle quantity select dropdown change & button text update
  if (qtySelect) {
    qtySelect.addEventListener('change', () => {
      const qty = qtySelect.value;
      if (submitBtnSpan) {
        submitBtnSpan.textContent = qty === '2' 
          ? 'تأكيد الطلب — 1400 جنيه (عرض قطعتين + شحن مجاني)' 
          : 'تأكيد الطلب — 800 جنيه (شحن مجاني)';
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
    const qtyText = qty === '2' ? 'عرض قطعتين (1400 ج.م)' : 'قطعة واحدة (800 ج.م)';

    const color = colorSelect ? colorSelect.value : 'أسود وذهبي';

    if (!name || !phone || !governorate || !address || !color) {
      alert('يرجى التأكد من ملء جميع البيانات المطلوبة.');
      return;
    }

    const modalNameEl = document.getElementById('modal-customer-name');
    const modalPhoneEl = document.getElementById('modal-customer-phone');
    const modalGovEl = document.getElementById('modal-customer-gov');
    const modalColorEl = document.getElementById('modal-customer-color');

    if (modalNameEl) modalNameEl.textContent = name;
    if (modalPhoneEl) modalPhoneEl.textContent = phone2 ? `${phone} / ${phone2}` : phone;
    if (modalGovEl) modalGovEl.textContent = governorate;
    if (modalColorEl) modalColorEl.textContent = `${color} — ${qtyText}`;

    modalOverlay.classList.add('active');

    // --- Save Order to Firebase Database (Ref: admin_orders.html) ---
    const now = new Date();
    const numItems = qty === '2' ? 2 : 1;
    const totalValue = numItems === 2 ? 1400 : 800;

    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true });

    saveOrderToDatabase({
      name: name,
      phone: phone,
      phone2: phone2 || '',
      governorate: governorate,
      address: address,
      product: 'ساعة Rolex Oyster هاي كواليتي',
      productType: 'ساعة Rolex Oyster هاي كواليتي',
      color: color,
      quantity: numItems,
      price: totalValue,
      notes: `اللون: ${color} | العرض: ${numItems === 2 ? 'عرض قطعتين (1400 ج.م - شحن مجاني)' : 'قطعة واحدة (800 ج.م - شحن مجاني)'}`,
      date: dateStr,
      time: timeStr,
      createdAt: now.toISOString()
    });

    // --- Meta Pixel Lead & Purchase Tracking (Fired strictly on order success) ---
    if (typeof window.fbq === 'function') {
      const cleanPhone = phone.replace(/\D/g, '');

      // Advanced Matching initialization
      window.fbq('init', '1090362260079762', {
        ph: cleanPhone,
        fn: name.toLowerCase()
      });

      // Track Lead Event
      window.fbq('track', 'Lead', {
        content_name: 'Rolex Oyster هاي كواليتي',
        content_category: 'ساعات',
        value: totalValue,
        currency: 'EGP',
        num_items: numItems,
        variant: color
      });

      // Track Purchase Event
      window.fbq('track', 'Purchase', {
        content_name: 'Rolex Oyster هاي كواليتي',
        content_type: 'product',
        content_ids: ['rolex-oyster'],
        value: totalValue,
        currency: 'EGP',
        num_items: numItems,
        variant: color
      });
    }

    orderForm.reset();

    // Reset default submit button text after form reset
    if (submitBtnSpan) submitBtnSpan.textContent = 'تأكيد الطلب — 800 جنيه (شحن مجاني)';
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
   Pixel ID: 1090362260079762
   -------------------------------------------------------------------------- */
function initMetaPixelTracking() {
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
      content_name: 'Rolex Oyster هاي كواليتي',
      content_category: 'ساعات',
      content_type: 'product',
      content_ids: ['rolex-oyster'],
      value: 800,
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
      content_name: 'Rolex Oyster هاي كواليتي',
      content_category: 'ساعات',
      content_type: 'product',
      content_ids: ['rolex-oyster'],
      value: 800,
      currency: 'EGP',
      num_items: 1,
      trigger_source: source
    });
  };

  // CTA Click Listeners (All CTA buttons pointing to #order or order action)
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
    const numItems = qtyVal === '2' ? 2 : 1;
    const totalValue = numItems === 2 ? 1400 : 800;
    const selectedColor = colorSelect ? colorSelect.value : 'أسود وذهبي';

    safeFbq('track', 'AddToCart', {
      content_name: 'Rolex Oyster هاي كواليتي',
      content_type: 'product',
      content_ids: ['rolex-oyster'],
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
        content_name: 'Rolex Oyster هاي كواليتي',
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
try {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebaseDbInstance = firebase.database();
  }
} catch (err) {
  console.warn('Firebase init exception:', err);
}

function saveOrderToDatabase(orderData) {
  // 1. Push order to Firebase Realtime Database at 'orders' node
  if (firebaseDbInstance) {
    try {
      const dbPayload = {
        ...orderData,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };
      firebaseDbInstance.ref('orders').push(dbPayload).then(() => {
        console.log('✅ Order saved to Firebase Database (orders node)');
      }).catch((err) => {
        console.error('❌ Firebase push error:', err);
      });
    } catch (err) {
      console.error('❌ Firebase DB exception:', err);
    }
  } else {
    console.warn('⚠️ Firebase SDK not loaded, saving to local storage fallback.');
  }

  // 2. Backup to LocalStorage under 'hairOilOrders' for local fallback in admin_orders.html
  try {
    const existingOrders = JSON.parse(localStorage.getItem('hairOilOrders') || '[]');
    existingOrders.push({
      ...orderData,
      firebaseId: 'local_' + Date.now(),
      timestamp: Date.now()
    });
    localStorage.setItem('hairOilOrders', JSON.stringify(existingOrders));
  } catch (err) {
    console.warn('LocalStorage backup error:', err);
  }
}
