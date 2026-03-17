/* ===========================
   DAR-ESSAAF-SHOP - MAIN APP JS
   =========================== */

// ======= SAMPLE PRODUCT DATA (replace with API calls to PHP backend) =======
const PRODUCTS = [
  { id: 1, name: "Midoun Market Basket", category: "baskets", price: 48, oldPrice: 60, emoji: "🧺", rating: 4.8, reviews: 124, stock: "in", badge: "best", artisan: "Fatma Ben Youssef", village: "Midoun" },
  { id: 2, name: "Smar Woven Floor Mat", category: "mats", price: 95, emoji: "🪵", rating: 4.6, reviews: 87, stock: "in", badge: "new", artisan: "Ali Ghribi", village: "Guellala" },
  { id: 3, name: "Palm Frond Sun Hat", category: "fashion", price: 35, emoji: "👒", rating: 4.9, reviews: 203, stock: "low", badge: null, artisan: "Maryem Jouini", village: "Houmt Souk" },
  { id: 4, name: "Djerbian Herb Basket Set", category: "baskets", price: 72, emoji: "🌿", rating: 4.7, reviews: 56, stock: "in", badge: "sale", artisan: "Hassan Dhouibi", village: "Ajim" },
  { id: 5, name: "Woven Wall Hanging", category: "decor", price: 120, emoji: "🖼️", rating: 4.5, reviews: 31, stock: "in", badge: "new", artisan: "Najoua Chaâbane", village: "Midoun" },
  { id: 6, name: "Palm Leaf Tote Bag", category: "fashion", price: 55, emoji: "👜", rating: 4.7, reviews: 78, stock: "low", badge: null, artisan: "Salwa Ben Romdhane", village: "Guellala" },
  { id: 7, name: "Traditional Storage Chest", category: "decor", price: 185, emoji: "📦", rating: 4.6, reviews: 22, stock: "in", badge: null, artisan: "Mohamed Krichen", village: "Erriadh" },
  { id: 8, name: "Coiled Bread Basket", category: "baskets", price: 38, emoji: "🍞", rating: 4.9, reviews: 145, stock: "in", badge: "best", artisan: "Fatma Ben Youssef", village: "Midoun" },
  { id: 9, name: "Decorative Palm Platter", category: "decor", price: 65, emoji: "🪙", rating: 4.4, reviews: 44, stock: "in", badge: null, artisan: "Ali Ghribi", village: "Guellala" },
  { id: 10, name: "Woven Shoulder Bag", category: "fashion", price: 88, emoji: "👝", rating: 4.8, reviews: 93, stock: "in", badge: "new", artisan: "Maryem Jouini", village: "Houmt Souk" },
  { id: 11, name: "Island Runner Mat", category: "mats", price: 78, emoji: "🌾", rating: 4.6, reviews: 38, stock: "low", badge: null, artisan: "Hassan Dhouibi", village: "Ajim" },
  { id: 12, name: "Mediterranean Lantern Wrap", category: "decor", price: 42, emoji: "🏮", rating: 4.7, reviews: 61, stock: "in", badge: null, artisan: "Najoua Chaâbane", village: "Midoun" },
];

const ARTISANS = [
  { name: "Fatma Ben Youssef", village: "Midoun", bio: "Fatma has been weaving since age 12, learning at her grandmother's knee. Her baskets are renowned for their tight, intricate spiral patterns.", specialty: "Coiled Baskets", emoji: "👩" },
  { name: "Ali Ghribi", village: "Guellala", bio: "A third-generation weaver, Ali specialises in large decorative floor mats using traditional Smar techniques that take up to a week to complete.", specialty: "Smar Mats", emoji: "👨" },
  { name: "Maryem Jouini", village: "Houmt Souk", bio: "Maryem started a small cooperative of 12 women in her village, helping artisans sell their work directly without middlemen.", specialty: "Hats & Bags", emoji: "👩" },
  { name: "Hassan Dhouibi", village: "Ajim", bio: "Hassan brings engineering precision to traditional weaving. His storage pieces are both structurally sound and beautifully patterned.", specialty: "Storage Baskets", emoji: "👨" },
  { name: "Najoua Chaâbane", village: "Midoun", bio: "Najoua experiments with natural dyes from pomegranate rind, henna and saffron to create vivid, colorful wall hangings beloved worldwide.", specialty: "Wall Decor", emoji: "👩" },
  { name: "Mohamed Krichen", village: "Erriadh", bio: "The eldest artisan in our cooperative at 74, Mohamed has spent 60 years perfecting the traditional Djerbian chest - a piece that once held wedding trousseau.", specialty: "Storage Chests", emoji: "👴" },
];

const TESTIMONIALS = [
  { text: "The basket I ordered arrived beautifully packaged and is even more gorgeous in person. I can feel the craftsmanship in every weave.", name: "Sophie L.", location: "Paris, France", rating: 5 },
  { text: "I ordered six mats for my boutique hotel. Guests constantly ask about them - they add an authentic warmth no manufactured product can match.", name: "Ibrahim K.", location: "Dubai, UAE", rating: 5 },
  { text: "The tote bag is both functional and stunning. I take it everywhere. The quality is exceptional for the price.", name: "Anna M.", location: "Berlin, Germany", rating: 5 },
];

// ======= CART STATE =======
let cart = JSON.parse(localStorage.getItem('djerbaCart') || '[]');

function saveCart() {
  localStorage.setItem('djerbaCart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => {
    el.textContent = totalItems;
    el.style.display = totalItems > 0 ? 'flex' : 'none';
  });
}

function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }

  saveCart();
  showToast(`✅ "${product.name}" added to cart!`, 'success');
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
}

// ======= PRODUCT CARD HTML =======
function renderProductCard(product) {
  const badgeMap = { best: 'badge-new', new: 'badge-new', sale: 'badge-sale', null: '' };
  const badgeLabel = { best: 'Best Seller', new: 'New', sale: 'Sale' };
  const badgeClass = product.badge ? badgeMap[product.badge] : '';
  const stockLabel = product.stock === 'low' ? '<span class="product-stock-badge badge-low">Only 2 left!</span>' : '';
  const newBadge = product.badge ? `<span class="product-stock-badge ${badgeClass}" style="top:${product.stock==='low'?'44px':'12px'}">${badgeLabel[product.badge]}</span>` : '';

  return `
    <div class="product-card" onclick="window.location='product.html?id=${product.id}'">
      <div class="product-card-img">
        <div class="product-card-img-inner">${product.emoji}</div>
        ${stockLabel}
        ${newBadge}
        <div class="product-card-overlay">
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); addToCart(${product.id})">+ Add to Cart</button>
        </div>
      </div>
      <div class="product-card-body">
        <div class="product-card-cat">${product.category}</div>
        <div class="product-card-title">${product.name}</div>
        <div class="product-card-stars">
          <span class="stars">${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5-Math.round(product.rating))}</span>
          <span class="review-count">(${product.reviews})</span>
        </div>
        <div class="product-card-footer">
          <div>
            <span class="product-price">${product.price} TND</span>
            ${product.oldPrice ? `<span class="product-price-old">${product.oldPrice} TND</span>` : ''}
          </div>
          <button class="add-to-cart-mini" onclick="event.stopPropagation(); addToCart(${product.id})" title="Add to Cart">+</button>
        </div>
      </div>
    </div>
  `;
}

// ======= TOAST =======
function showToast(message, type = '') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast${type ? ' toast-' + type : ''}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ======= HEADER SCROLL =======
window.addEventListener('scroll', () => {
  const header = document.getElementById('siteHeader');
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
});

// ======= MOBILE NAV =======
function toggleMobileNav() {
  const nav = document.getElementById('mainNav');
  const hamburger = document.getElementById('hamburger');
  if (nav) nav.classList.toggle('open');
  if (hamburger) hamburger.classList.toggle('open');
}

// ======= SEARCH =======
function toggleSearch() {
  showToast('Search coming soon!');
}

// ======= EXIT INTENT POPUP =======
let popupShown = false;

function initExitIntent() {
  if (sessionStorage.getItem('popupDismissed')) return;

  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !popupShown) {
      popupShown = true;
      const popup = document.getElementById('exitPopup');
      if (popup) popup.classList.remove('hidden');
    }
  });
}

function closePopup() {
  const popup = document.getElementById('exitPopup');
  if (popup) popup.classList.add('hidden');
  sessionStorage.setItem('popupDismissed', '1');
}

// ======= INIT =======
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  initExitIntent();

  // Best sellers on homepage
  const grid = document.getElementById('bestSellersGrid');
  if (grid) {
    const sellers = PRODUCTS.filter(p => p.badge === 'best' || p.reviews > 80).slice(0, 4);
    grid.innerHTML = sellers.map(renderProductCard).join('');
  }

  // Testimonials on homepage
  const testimonialsTrack = document.getElementById('testimonialsTrack');
  if (testimonialsTrack) {
    testimonialsTrack.innerHTML = TESTIMONIALS.map(t => `
      <div class="testimonial-card">
        <div class="testimonial-stars">${'★'.repeat(t.rating)}</div>
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${t.name[0]}</div>
          <div>
            <div class="testimonial-name">${t.name}</div>
            <div class="testimonial-location">${t.location}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Check URL hash for wholesale
  if (window.location.hash === '#wholesale') {
    const tab = document.getElementById('wholesaleTab');
    if (tab) tab.click();
  }
});




