/* ==========================================================================
   AETERNA — Central Product Data Registry, Sync Engine & URL Router
   ========================================================================== */

const PRODUCTS = {
  "rolex-oyster": {
    identity: {
      slug: "rolex-oyster",
      name: "ساعة Rolex Oyster هاي كواليتي",
      short_name: "Rolex Oyster",
      brand: "ROLEX OYSTER",
      category: "ساعات"
    },
    pricing: {
      price: 800,
      old_price: 1000
    },
    offer: {
      enabled: true,
      quantity: 2,
      price: 1400,
      old_price: 1600,
      saving: 200,
      badge: "الأكثر طلباً • توفير 200 ج.م",
      features: [
        "قطعتين بالألوان المختارة",
        "شاملة علبتين فاخرتين",
        "توفير 200 جنيه حصرياً"
      ]
    },
    content: {
      description: "ساعة ميكانيكية فاخرة بتصميم استثنائي وحضور جذاب. 800 جنيه مع الدفع عند الاستلام والتوصيل لكافة المحافظات.",
      hero_badge: "ROLEX OYSTER • HIGH QUALITY",
      hero_title: "ساعة Rolex Oyster",
      hero_accent: "هاي كواليتي",
      hero_subtext: "قطعة ميكانيكية استثنائية صُممت بحضور طاغٍ • 800 جنيه (شحن مجاني) | قطعتين بـ 1400 جنيه (توفير 200ج + شحن مجاني)",
      details_image: "assets/images/watch_strap_v2.webp",
      details_title: "تفاصيل صُممت لتدوم",
      details_description: "تصميم كلاسيكي بحضور عصري، يجمع بين الحركة الأوتوماتيكية والتفاصيل المعدنية الدقيقة، مع تشطيبات تمنح الساعة مظهرًا فاخرًا ومتوازنًا."
    },
    images: [
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
    ],
    colors: [
      {
        name: "أسود وذهبي",
        value: "#CCA462",
        image: "assets/images/watch_aljazari.webp"
      },
      {
        name: "أزرق وفضي",
        value: "#5B9BD5",
        image: "assets/images/watch_blue_emerald.webp"
      },
      {
        name: "شامبين وذهبي",
        value: "#D8B26E",
        image: "assets/images/watch_champagne_gold.webp"
      },
      {
        name: "فضي وأبيض مع تفاصيل زرقاء",
        value: "#E2E8F0",
        image: "assets/images/watch_pearl_white.webp"
      }
    ],
    features: [
      { label: "الحركة", value: "حركة أوتوماتيكية" },
      { label: "الخامة", value: "ستانلس ستيل" },
      { label: "الزجاج", value: "زجاج كريستالي عالي الجودة" },
      { label: "السوار", value: "سوار ستانلس ستيل" },
      { label: "الإطار", value: "إطار فلوتد بتفاصيل دقيقة" },
      { label: "التاريخ", value: "نافذة تاريخ عند موضع الساعة 3" },
      { label: "الظهر", value: "ظهر شفاف يُظهر تفاصيل الحركة" },
      { label: "المرفقات", value: "تأتي مع بوكس فاخر" }
    ],
    trust_points: [
      "الدفع عند الاستلام",
      "معاينة الشحنة قبل الدفع",
      "شحن لكافة المحافظات"
    ],
    single_offer_features: [
      "ساعة Rolex Oyster هاي كواليتي باللون المفضل لك",
      "شاملة علبة الساعة الفاخرة",
      "معاينة وفحص قبل الدفع"
    ],
    order_trust_badges: [
      "الدفع عند الاستلام",
      "معاينة وفحص الشحنة قبل الدفع",
      "شحن مجاني وسريع خلال 24–48 ساعة لكافة المحافظات",
      "إمكانية الاستبدال والاسترجاع حسب سياسة المتجر"
    ],
    shipping_info: "شحن مجاني",
    whatsapp: "201557350728",
    pixel_id: "1090362260079762",
    status: "published",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-09-23T00:00:00.000Z"
  }
};

/**
 * Standardize product object schema to ensure seamless reading
 */
function normalizeProduct(raw) {
  if (!raw) return null;

  const identity = raw.identity || {};
  const pricing = raw.pricing || {};
  const offer = raw.offer || {};
  const content = raw.content || {};
  const contact = raw.contact || {};
  const tracking = raw.tracking || {};
  const seo = raw.seo || {};

  const slug = raw.slug || identity.slug || "rolex-oyster";
  const name = raw.name || identity.name || "ساعة فاخرة";
  const short_name = raw.short_name || identity.short_name || name;
  const brand = raw.brand || identity.brand || "AL-JAZARI";
  const category = raw.category || identity.category || "ساعات";

  const price = raw.price !== undefined ? Number(raw.price) : (pricing.price !== undefined ? Number(pricing.price) : 800);
  const old_price = raw.old_price !== undefined ? Number(raw.old_price) : (pricing.old_price !== undefined ? Number(pricing.old_price) : price + 200);

  const offerEnabled = offer.enabled !== undefined ? Boolean(offer.enabled) : true;
  const offerQuantity = offer.quantity ? Number(offer.quantity) : 2;
  const offerPrice = offer.price ? Number(offer.price) : 1400;
  const offerOldPrice = offer.old_price ? Number(offer.old_price) : 1600;
  const offerSaving = offer.saving ? Number(offer.saving) : (offerOldPrice - offerPrice);

  const description = raw.description || content.description || "";
  const hero_badge = raw.hero_badge || content.hero_badge || `${brand} • HIGH QUALITY`;
  const hero_title = raw.hero_title || content.hero_title || name;
  const hero_accent = raw.hero_accent || content.hero_accent || "";
  const hero_subtext = raw.hero_subtext || content.hero_subtext || description;
  const details_image = raw.details_image || content.details_image || "";
  const details_title = raw.details_title || content.details_title || "تفاصيل صُممت لتدوم";
  const details_description = raw.details_description || content.details_description || description;

  const whatsapp = raw.whatsapp || contact.whatsapp || "201557350728";
  const pixel_id = raw.pixel_id || tracking.pixel_id || "1090362260079762";
  const status = raw.status || "published";

  const images = Array.isArray(raw.images) ? raw.images : [];
  const colors = Array.isArray(raw.colors) ? raw.colors : [];
  const features = Array.isArray(raw.features) ? raw.features : (Array.isArray(raw.specifications) ? raw.specifications : []);

  return {
    slug,
    name,
    short_name,
    brand,
    category,
    price,
    old_price,
    offer: {
      enabled: offerEnabled,
      quantity: offerQuantity,
      price: offerPrice,
      old_price: offerOldPrice,
      saving: offerSaving,
      badge: offer.badge || `الأكثر طلباً • توفير ${offerSaving} ج.م`,
      features: offer.features || [
        `قطعتين بالألوان المختارة`,
        `شاملة علبتين فاخرتين`,
        `توفير ${offerSaving} جنيه حصرياً`
      ]
    },
    description,
    hero_badge,
    hero_title,
    hero_accent,
    hero_subtext,
    details_image,
    details_title,
    details_description,
    images,
    colors,
    features,
    trust_points: raw.trust_points || [
      "الدفع عند الاستلام",
      "معاينة الشحنة قبل الدفع",
      "شحن لكافة المحافظات"
    ],
    single_offer_features: raw.single_offer_features || [
      `${name} باللون المفضل لك`,
      "شاملة علبة الساعة الفاخرة",
      "معاينة وفحص قبل الدفع"
    ],
    order_trust_badges: raw.order_trust_badges || [
      "الدفع عند الاستلام",
      "معاينة وفحص الشحنة قبل الدفع",
      "شحن مجاني وسريع خلال 24–48 ساعة لكافة المحافظات",
      "إمكانية الاستبدال والاسترجاع حسب سياسة المتجر"
    ],
    shipping_info: raw.shipping_info || "شحن مجاني",
    whatsapp,
    pixel_id,
    status,
    seo: {
      title: (raw.seo && raw.seo.title) || `${name} | AL-JAZARI`,
      description: (raw.seo && raw.seo.description) || description,
      og_image: (raw.seo && raw.seo.og_image) || (images[0] ? (typeof images[0] === 'string' ? images[0] : images[0].image) : '')
    },
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt || new Date().toISOString(),

    // Structured sub-objects preserved for Admin Schema
    identity: { slug, name, short_name, brand, category },
    pricing: { price, old_price },
    content: { description, hero_badge, hero_title, hero_accent, hero_subtext, details_image, details_title, details_description },
    contact: { whatsapp },
    tracking: { pixel_id }
  };
}

/**
 * Get all cached products from LocalStorage
 */
function getLocalStorageProducts() {
  try {
    const data = localStorage.getItem('watchProducts');
    return data ? JSON.parse(data) : {};
  } catch (err) {
    console.warn('LocalStorage read exception:', err);
    return {};
  }
}

/**
 * Update LocalStorage cache
 */
function setLocalStorageProducts(productsMap) {
  try {
    localStorage.setItem('watchProducts', JSON.stringify(productsMap));
  } catch (err) {
    console.warn('LocalStorage write exception:', err);
  }
}

/**
 * Fetch products from Firebase Realtime Database
 */
async function fetchFirebaseProducts() {
  try {
    const res = await fetch('https://herbs-orders-default-rtdb.firebaseio.com/products.json');
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object') {
        setLocalStorageProducts(data);
        return data;
      }
    }
  } catch (err) {
    console.warn('Firebase products fetch error:', err);
  }
  return null;
}

/**
 * Retrieve product by slug according to exact priority hierarchy:
 * 1. Firebase / LocalStorage
 * 2. PRODUCTS Fallback
 */
function getProductBySlugSync(slug) {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().trim();

  // 1. LocalStorage Cache (updated from Firebase)
  const localMap = getLocalStorageProducts();
  if (localMap[cleanSlug]) {
    return normalizeProduct(localMap[cleanSlug]);
  }

  // 2. PRODUCTS Fallback
  if (PRODUCTS[cleanSlug]) {
    return normalizeProduct(PRODUCTS[cleanSlug]);
  }

  return null;
}

/**
 * Resolve current product for public landing page
 */
function getCurrentProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  const slugParam = urlParams.get('product') || urlParams.get('slug');
  const isPreview = urlParams.get('preview') === 'true';

  const slugToFind = slugParam ? slugParam.toLowerCase().trim() : 'rolex-oyster';
  const found = getProductBySlugSync(slugToFind);

  if (!found) return null;

  // Published vs Draft Enforcement (Requirement 6)
  // If product status is NOT 'published' and NOT in preview mode from admin, return null (404)
  if (found.status !== 'published' && !isPreview) {
    return null; // Displays 404 UI for public visitors
  }

  return found;
}

/**
 * Save product to Firebase Realtime Database and update LocalStorage Cache
 */
async function saveProductToDatabase(productObj) {
  const normalized = normalizeProduct(productObj);
  const slug = normalized.slug;

  // 1. Update LocalStorage Cache immediately
  const localMap = getLocalStorageProducts();
  localMap[slug] = normalized;
  setLocalStorageProducts(localMap);

  // 2. Persist via Firebase Web SDK if present (carries active auth session)
  if (typeof firebase !== 'undefined' && firebase.database) {
    try {
      await firebase.database().ref(`products/${slug}`).set(normalized);
      console.log(`✅ Product ${slug} saved to Firebase via SDK.`);
      return normalized;
    } catch (err) {
      console.warn(`⚠️ Firebase SDK set exception:`, err);
    }
  }

  // Fallback to REST API
  try {
    const res = await fetch(`https://herbs-orders-default-rtdb.firebaseio.com/products/${slug}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(normalized)
    });
    if (res.ok) {
      console.log(`✅ Product ${slug} saved to Firebase via REST API.`);
    }
  } catch (err) {
    console.warn(`⚠️ Firebase REST API save error:`, err);
  }

  return normalized;
}

/**
 * Delete product from Firebase Realtime Database and LocalStorage Cache
 */
async function deleteProductFromDatabase(slug) {
  if (!slug) return false;
  const cleanSlug = slug.toLowerCase().trim();

  // 1. Remove from LocalStorage Cache
  const localMap = getLocalStorageProducts();
  delete localMap[cleanSlug];
  setLocalStorageProducts(localMap);

  // 2. Delete via Firebase Web SDK if present (carries active auth session)
  if (typeof firebase !== 'undefined' && firebase.database) {
    try {
      await firebase.database().ref(`products/${cleanSlug}`).remove();
      console.log(`✅ Product ${cleanSlug} deleted from Firebase via SDK.`);
      return true;
    } catch (err) {
      console.warn(`⚠️ Firebase SDK remove exception:`, err);
    }
  }

  // Fallback to REST API
  try {
    const res = await fetch(`https://herbs-orders-default-rtdb.firebaseio.com/products/${cleanSlug}.json`, {
      method: 'DELETE'
    });
    if (res.ok) {
      console.log(`✅ Product ${cleanSlug} deleted from Firebase via REST API.`);
    }
  } catch (err) {
    console.warn(`⚠️ Firebase REST API delete error:`, err);
  }

  return true;
}

// Initial background sync with Firebase on page load
if (typeof window !== 'undefined') {
  fetchFirebaseProducts();
}
