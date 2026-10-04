/**
 * Riya Pizza Jawa - Main Application Script
 * Location: Riya Pizza Jawa, F588+G87, Jawa Rd, Java, Haryana 127310
 * Service Status: Paused
 */

// Global State
let currentCategory = "all";
let searchQuery = "";
let cart = []; // Array of { id, name, price, qty, image }
let orderType = "delivery"; // 'delivery' or 'pickup'
let paymentMethod = "cod"; // 'cod' or 'upi'

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  loadCartFromStorage();
  populateShopInfo();
  renderMenuTabs();
  renderMenuItems();
  renderSpecialOffers();
  renderReviews();
  setupEventListeners();
  updateCartUI();
  checkServiceAvailability();
}

// Check and display service availability notice
function checkServiceAvailability() {
  if (SHOP_CONFIG.isServiceAvailable === false) {
    const banner = document.getElementById("serviceNoticeBanner");
    if (banner) banner.style.display = "block";
  }
}

// 1. Populate Shop Dynamic Info
function populateShopInfo() {
  // Update Phone Link placeholders
  const phoneEls = document.querySelectorAll(".shop-phone");
  phoneEls.forEach(el => {
    el.textContent = SHOP_CONFIG.phone || "Service Paused";
    if (el.tagName === "A") {
      if (SHOP_CONFIG.phoneRaw) {
        el.href = `tel:${SHOP_CONFIG.phoneRaw}`;
      } else {
        el.removeAttribute("href");
        el.style.pointerEvents = "none";
        el.style.cursor = "default";
      }
    }
  });

  // Update Location Text
  const locEls = document.querySelectorAll(".shop-location");
  locEls.forEach(el => {
    el.textContent = SHOP_CONFIG.location;
  });

  // Update Opening Hours
  const hoursEls = document.querySelectorAll(".shop-hours");
  hoursEls.forEach(el => {
    el.textContent = SHOP_CONFIG.openingHours;
  });

  // Social Links
  const instaLink = document.getElementById("instaLink");
  if (instaLink) instaLink.href = SHOP_CONFIG.socials.instagram;

  const fbLink = document.getElementById("fbLink");
  if (fbLink) fbLink.href = SHOP_CONFIG.socials.facebook;

  const mapBtn = document.getElementById("mapBtn");
  if (mapBtn) mapBtn.href = SHOP_CONFIG.socials.maps;

  const mapIframe = document.getElementById("mapIframe");
  if (mapIframe) mapIframe.src = SHOP_CONFIG.mapEmbedUrl;
}

// 2. Render Menu Category Tabs
function renderMenuTabs() {
  const container = document.getElementById("menuTabs");
  if (!container) return;

  container.innerHTML = MENU_CATEGORIES.map(cat => `
    <button class="tab-btn ${cat.id === currentCategory ? 'active' : ''}" data-category="${cat.id}">
      <span>${cat.icon}</span> ${cat.label}
    </button>
  `).join('');

  container.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const target = e.currentTarget.getAttribute("data-category");
      currentCategory = target;
      renderMenuTabs();
      renderMenuItems();
    });
  });
}

// 3. Render Menu Items Grid
function renderMenuItems() {
  const container = document.getElementById("menuGrid");
  if (!container) return;

  // Filter items based on Category & Search Query
  const filtered = MENU_ITEMS.filter(item => {
    const matchesCategory = currentCategory === "all" || item.category === currentCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: #6B7280;">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">🔍</span>
        <h3>No food items found matching "${searchQuery}"</h3>
        <p style="font-size: 0.9rem;">Try searching for another dish or change the category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const cartItem = cart.find(ci => ci.id === item.id);
    const qty = cartItem ? cartItem.qty : 0;
    const displayPrice = item.priceLabel || `₹${item.price}`;

    return `
      <div class="food-card" id="card-${item.id}">
        <div class="food-img-container">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          ${item.badge ? `<span class="food-badge">${item.badge}</span>` : ''}
          ${item.isVeg ? `<span class="veg-indicator" title="100% Vegetarian"></span>` : ''}
        </div>
        <div class="food-info">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="food-footer">
            <span class="food-price">${displayPrice}</span>
            ${qty === 0 ? `
              <button class="add-btn" onclick="addToCart('${item.id}')">
                <span>+</span> Add to Order
              </button>
            ` : `
              <div class="card-qty-control">
                <button class="card-qty-btn" onclick="updateQty('${item.id}', ${qty - 1})">-</button>
                <span class="card-qty-num">${qty}</span>
                <button class="card-qty-btn" onclick="updateQty('${item.id}', ${qty + 1})">+</button>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 4. Render Special Offers
function renderSpecialOffers() {
  const container = document.getElementById("offersGrid");
  if (!container) return;

  container.innerHTML = SPECIAL_OFFERS.map(offer => `
    <div class="offer-card">
      <div class="offer-img-box">
        <img src="${offer.image}" alt="${offer.title}" loading="lazy">
        <span class="offer-tag">${offer.tag}</span>
      </div>
      <div class="offer-content">
        <h3>${offer.title}</h3>
        <p>${offer.description}</p>
        <div class="offer-price-row">
          <div class="offer-prices">
            <span class="offer-price">₹${offer.offerPrice}</span>
            <span class="original-price">₹${offer.originalPrice}</span>
          </div>
          <button class="btn-primary" style="padding: 0.45rem 1rem; font-size: 0.85rem;" onclick="addOfferToCart('${offer.id}')">
            Order Combo 🍕
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// 5. Render Reviews
function renderReviews() {
  const container = document.getElementById("reviewsGrid");
  if (!container) return;

  container.innerHTML = REVIEWS.map(rev => `
    <div class="review-card">
      <div class="stars">
        ${'★'.repeat(rev.rating)}
      </div>
      <p>"${rev.comment}"</p>
      <div class="reviewer">
        <div class="reviewer-avatar">${rev.name.charAt(0)}</div>
        <div class="reviewer-info">
          <strong>${rev.name}</strong>
          <span>${rev.role}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// 6. Cart Management Logic
function addToCart(itemId) {
  if (SHOP_CONFIG.isServiceAvailable === false) {
    showServiceUnavailableNotice();
    return;
  }

  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  const existing = cart.find(ci => ci.id === itemId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: 1,
      image: item.image
    });
  }

  saveCartAndSync();
  showToast(`Added ${item.name} to cart! 🍕`);
}

function addOfferToCart(offerId) {
  if (SHOP_CONFIG.isServiceAvailable === false) {
    showServiceUnavailableNotice();
    return;
  }

  const offer = SPECIAL_OFFERS.find(o => o.id === offerId);
  if (!offer) return;

  const existing = cart.find(ci => ci.id === offer.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: offer.id,
      name: offer.title,
      price: offer.offerPrice,
      qty: 1,
      image: offer.image
    });
  }

  saveCartAndSync();
  showToast(`Combo added! ${offer.title} 🥳`);
  openCartDrawer();
}

function showServiceUnavailableNotice() {
  alert(`⚠️ Currently Service Unavailable via Web\n\n${SHOP_CONFIG.serviceUnavailableMessage}`);
}

function updateQty(itemId, newQty) {
  if (newQty <= 0) {
    cart = cart.filter(ci => ci.id !== itemId);
  } else {
    const item = cart.find(ci => ci.id === itemId);
    if (item) item.qty = newQty;
  }
  saveCartAndSync();
}

function saveCartAndSync() {
  localStorage.setItem("riya_cart", JSON.stringify(cart));
  renderMenuItems();
  updateCartUI();
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("riya_cart");
    if (saved) {
      cart = JSON.parse(saved);
    }
  } catch (e) {
    cart = [];
  }
}

// 7. Update Cart Modal & Counter UI
function updateCartUI() {
  // Update Badges
  const totalCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const badges = document.querySelectorAll(".cart-badge");
  badges.forEach(b => b.textContent = totalCount);

  // Update Drawer Body
  const cartBody = document.getElementById("cartItemsContainer");
  const subtotalEl = document.getElementById("cartSubtotal");
  const totalEl = document.getElementById("cartTotal");
  const deliveryFeeEl = document.getElementById("cartDeliveryFee");

  if (!cartBody) return;

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty">
        <div class="icon">🛒</div>
        <h3>Your order cart is empty</h3>
        <p>Explore our menu starting @ ₹250 for Pizza & ₹60 for Burger!</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = "₹0";
    if (totalEl) totalEl.textContent = "₹0";
    if (deliveryFeeEl) deliveryFeeEl.textContent = "₹0";
    return;
  }

  // Calculate Subtotal & Total
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let deliveryFee = 0;
  if (orderType === "delivery") {
    deliveryFee = subtotal >= SHOP_CONFIG.freeDeliveryThreshold ? 0 : SHOP_CONFIG.deliveryFee;
  }
  const total = subtotal + deliveryFee;

  cartBody.innerHTML = `
    <div class="cart-items-list">
      ${cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <div class="price">₹${item.price} x ${item.qty} = ₹${item.price * item.qty}</div>
          </div>
          <div class="cart-item-actions">
            <button onclick="updateQty('${item.id}', ${item.qty - 1})">-</button>
            <span style="font-weight: 700; font-size: 0.9rem;">${item.qty}</span>
            <button onclick="updateQty('${item.id}', ${item.qty + 1})">+</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (deliveryFeeEl) {
    deliveryFeeEl.textContent = orderType === "pickup" ? "Free (Pickup)" : (deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`);
  }
  if (totalEl) totalEl.textContent = `₹${total}`;

  // Update Direct UPI Link button amount
  const directPayBtn = document.getElementById("directPayBtn");
  if (directPayBtn) {
    const upiLink = `upi://pay?pa=${SHOP_CONFIG.upiId}&pn=${encodeURIComponent(SHOP_CONFIG.upiName)}&am=${total}&cu=INR`;
    directPayBtn.href = upiLink;
    directPayBtn.textContent = `📱 Pay ₹${total} via UPI App (GPay / PhonePe / Paytm)`;
  }
}

// 8. Event Listeners Setup
function setupEventListeners() {
  // Mobile Hamburger Toggle
  const hamburger = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");
  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
    });
    // Close on link click
    mobileNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => mobileNav.classList.remove("open"));
    });
  }

  // Menu Search Bar
  const searchInput = document.getElementById("menuSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderMenuItems();
    });
  }

  // Cart Drawer Triggers
  const openCartBtns = document.querySelectorAll(".open-cart-btn");
  openCartBtns.forEach(btn => btn.addEventListener("click", openCartDrawer));

  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartBackdrop = document.getElementById("cartBackdrop");
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCartDrawer);
  if (cartBackdrop) {
    cartBackdrop.addEventListener("click", (e) => {
      if (e.target === cartBackdrop) closeCartDrawer();
    });
  }

  // Delivery / Pickup Option Toggle
  const delBtn = document.getElementById("optDelivery");
  const picBtn = document.getElementById("optPickup");
  const addressGroup = document.getElementById("addressGroup");

  if (delBtn && picBtn) {
    delBtn.addEventListener("click", () => {
      orderType = "delivery";
      delBtn.classList.add("active");
      picBtn.classList.remove("active");
      if (addressGroup) addressGroup.style.display = "block";
      updateCartUI();
    });

    picBtn.addEventListener("click", () => {
      orderType = "pickup";
      picBtn.classList.add("active");
      delBtn.classList.remove("active");
      if (addressGroup) addressGroup.style.display = "none";
      updateCartUI();
    });
  }

  // Payment Method Selection Toggle
  const payCodBtn = document.getElementById("optPayCod");
  const payUpiBtn = document.getElementById("optPayUpi");
  const upiInfoBox = document.getElementById("upiInfoBox");

  if (payCodBtn && payUpiBtn) {
    payCodBtn.addEventListener("click", () => {
      paymentMethod = "cod";
      payCodBtn.classList.add("active");
      payUpiBtn.classList.remove("active");
      if (upiInfoBox) upiInfoBox.style.display = "none";
    });

    payUpiBtn.addEventListener("click", () => {
      paymentMethod = "upi";
      payUpiBtn.classList.add("active");
      payCodBtn.classList.remove("active");
      if (upiInfoBox) upiInfoBox.style.display = "block";
    });
  }

  // Copy UPI ID Button
  const copyUpiBtn = document.getElementById("copyUpiBtn");
  if (copyUpiBtn) {
    copyUpiBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(SHOP_CONFIG.upiId).then(() => {
        showToast("UPI ID copied to clipboard! 📋");
      }).catch(() => {
        showToast(`UPI ID: ${SHOP_CONFIG.upiId}`);
      });
    });
  }

  // WhatsApp Order Submission
  const whatsappBtn = document.getElementById("sendWhatsappOrderBtn");
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", sendOrderToWhatsApp);
  }
}

function openCartDrawer() {
  if (SHOP_CONFIG.isServiceAvailable === false) {
    showServiceUnavailableNotice();
    return;
  }
  const backdrop = document.getElementById("cartBackdrop");
  if (backdrop) backdrop.classList.add("open");
  updateCartUI();
}

function closeCartDrawer() {
  const backdrop = document.getElementById("cartBackdrop");
  if (backdrop) backdrop.classList.remove("open");
}

// 9. Generate & Send WhatsApp Order
function sendOrderToWhatsApp() {
  if (SHOP_CONFIG.isServiceAvailable === false) {
    showServiceUnavailableNotice();
    return;
  }

  if (cart.length === 0) {
    alert("Please add at least one item to your cart before placing an order.");
    return;
  }

  const nameInput = document.getElementById("custName");
  const phoneInput = document.getElementById("custPhone");
  const addressInput = document.getElementById("custAddress");
  const noteInput = document.getElementById("custNote");

  const name = nameInput ? nameInput.value.trim() : "";
  const phone = phoneInput ? phoneInput.value.trim() : "";
  const address = addressInput ? addressInput.value.trim() : "";
  const note = noteInput ? noteInput.value.trim() : "";

  if (!name || !phone) {
    alert("Please enter your Name and Phone Number to complete the order.");
    return;
  }

  if (orderType === "delivery" && !address) {
    alert("Please enter your Delivery Address in Java (Jawa) or nearby area.");
    return;
  }

  // Build Message
  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  let deliveryFee = 0;
  if (orderType === "delivery") {
    deliveryFee = subtotal >= SHOP_CONFIG.freeDeliveryThreshold ? 0 : SHOP_CONFIG.deliveryFee;
  }
  const total = subtotal + deliveryFee;

  let msg = `*NEW ORDER - ${SHOP_CONFIG.name.toUpperCase()}*\n`;
  msg += `📍 Address: ${SHOP_CONFIG.location}\n`;
  msg += `------------------------------------\n`;
  msg += `👤 *Customer:* ${name}\n`;
  msg += `📞 *Phone:* ${phone}\n`;
  msg += `📍 *Order Type:* ${orderType === "delivery" ? "Home Delivery" : "Store Pickup"}\n`;
  msg += `💳 *Payment:* ${paymentMethod === "upi" ? `UPI Payment (${SHOP_CONFIG.upiId})` : "Cash on Delivery (COD)"}\n`;
  if (orderType === "delivery") {
    msg += `🏠 *Address:* ${address}\n`;
  }
  if (note) {
    msg += `📝 *Instructions:* ${note}\n`;
  }
  msg += `------------------------------------\n`;
  msg += `🍕 *ORDER ITEMS:*\n`;

  cart.forEach((item, index) => {
    msg += `${index + 1}. ${item.name} x ${item.qty} = ₹${item.price * item.qty}\n`;
  });

  msg += `------------------------------------\n`;
  msg += `Subtotal: ₹${subtotal}\n`;
  if (orderType === "delivery") {
    msg += `Delivery Fee: ${deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}\n`;
  }
  msg += `*TOTAL AMOUNT: ₹${total}*\n`;
  msg += `------------------------------------\n`;
  msg += `Please confirm my order. Thank you!`;

  // Encode URL
  const encodedMsg = encodeURIComponent(msg);
  const waUrl = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodedMsg}`;

  // Open WhatsApp in new tab
  window.open(waUrl, "_blank");
}

// 10. Helper Toast Message
function showToast(message) {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>✨</span> <div>${message}</div>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
