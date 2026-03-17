/* ===========================
   PRODUCT DETAIL JS
   =========================== */

let currentQty = 1;

const REVIEWS_DATA = [
  { name: "Sophie L.", location: "Paris", rating: 5, date: "March 2025", text: "Absolutely beautiful! The craftsmanship is impeccable. I can tell how much time and skill went into making this piece.", avatar: "S" },
  { name: "Ibrahim K.", location: "Dubai", rating: 5, date: "February 2025", text: "Third order from Djerba Palms. The quality is consistently excellent. Fast shipping and gorgeous packaging too.", avatar: "I" },
  { name: "Anna M.", location: "Berlin", rating: 4, date: "January 2025", text: "Really lovely piece. Colors are warm and natural. Only slight variation from the photo but that's to be expected from handmade.", avatar: "A" },
];

const ACCORDION_DATA = [
  { title: "Materials & Care", content: "Made from 100% natural date palm fronds harvested sustainably on the island of Djerba. Clean gently with a dry or slightly damp cloth. Avoid prolonged exposure to moisture. Store in a dry place away from direct sunlight to preserve color. No chemicals or synthetic treatments are used in production." },
  { title: "Dimensions", content: "Dimensions may vary slightly as each piece is handmade. Please refer to the product listing for specific measurements. All pieces are crafted to be functional as well as decorative." },
  { title: "Shipping Info", content: "Orders are processed within 2-3 business days. Standard shipping: 7-14 business days. Express shipping: 2-5 business days. We ship to 40+ countries worldwide. Tracking information is provided via email once your order is dispatched." },
  { title: "About the Artisan", content: "This product is made by a member of our Djerba artisan cooperative. Each piece is signed by its maker. 80% of the sale price goes directly to the artisan family." },
];

function initProductPage() {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get('id')) || 1;
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  // Breadcrumb
  const bc = document.getElementById('productBreadcrumb');
  if (bc) bc.innerHTML = `<a href="index.html">Home</a> / <a href="shop.html">Shop</a> / <span>${product.name}</span>`;

  document.title = `${product.name} — Djerba Palms`;

  // Render main product layout
  const layout = document.getElementById('productLayout');
  if (!layout) return;

  const stockHtml = product.stock === 'low'
    ? `<div class="product-stock stock-low">⚠ Only 2 left in stock</div>`
    : `<div class="product-stock stock-in">✓ In Stock · Ready to ship</div>`;

  const oldPriceHtml = product.oldPrice
    ? `<span class="product-price-old">${product.oldPrice} TND</span>`
    : '';

  layout.innerHTML = `
    <div class="product-gallery">
      <div class="product-main-img" id="mainImg">${product.emoji}</div>
      <div class="product-thumbs">
        <div class="product-thumb active" onclick="switchThumb(this, '${product.emoji}')">${product.emoji}</div>
        <div class="product-thumb" onclick="switchThumb(this, '🌿')">🌿</div>
        <div class="product-thumb" onclick="switchThumb(this, '✋')">✋</div>
        <div class="product-thumb" onclick="switchThumb(this, '📦')">📦</div>
      </div>
    </div>
    <div class="product-info-col">
      <div class="product-category-tag">${product.category} · By ${product.artisan}, ${product.village}</div>
      <h1 class="product-title">${product.name}</h1>
      <div class="product-rating-row">
        <span class="stars" style="font-size:1rem;color:#F4A233">${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5-Math.round(product.rating))}</span>
        <span style="font-size:0.85rem;color:var(--text-muted)">${product.rating} · ${product.reviews} reviews</span>
      </div>
      <div class="product-price-row">
        <span class="product-price-main">${product.price} TND</span>
        ${oldPriceHtml}
      </div>
      ${stockHtml}
      <div class="quantity-row">
        <div class="quantity-control">
          <button class="qty-btn" onclick="changeQty(-1)">−</button>
          <input type="number" class="qty-input" id="qtyInput" value="1" min="1" max="10" onchange="currentQty = parseInt(this.value)" />
          <button class="qty-btn" onclick="changeQty(1)">+</button>
        </div>
        <span style="font-size:0.78rem;color:var(--text-muted)">Max 10 per order</span>
      </div>
      <div class="product-cta">
        <button class="btn btn-primary" onclick="addToCart(${product.id}, currentQty)">Add to Cart</button>
        <button class="btn btn-ghost" onclick="wishlist(${product.id})">♡ Wishlist</button>
      </div>
      <div class="product-accordion" id="productAccordion">
        <!-- Injected below -->
      </div>
    </div>
  `;

  // Accordion
  const accordion = document.getElementById('productAccordion');
  if (accordion) {
    accordion.innerHTML = ACCORDION_DATA.map((item, i) => `
      <div class="accordion-item">
        <button class="accordion-header" onclick="toggleAccordion(this)">
          <span>${item.title}</span>
          <span>+</span>
        </button>
        <div class="accordion-body${i === 0 ? ' open' : ''}">
          ${item.content}
        </div>
      </div>
    `).join('');
  }

  // Reviews
  const reviewsGrid = document.getElementById('reviewsGrid');
  if (reviewsGrid) {
    reviewsGrid.innerHTML = REVIEWS_DATA.map(r => `
      <div class="testimonial-card">
        <div class="testimonial-stars">${'★'.repeat(r.rating)}</div>
        <p class="testimonial-text">"${r.text}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${r.avatar}</div>
          <div>
            <div class="testimonial-name">${r.name} · <span style="font-weight:400;color:var(--text-muted)">${r.location}</span></div>
            <div class="testimonial-location">${r.date}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Related products
  const relatedGrid = document.getElementById('relatedGrid');
  if (relatedGrid) {
    const related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
    relatedGrid.innerHTML = (related.length > 0 ? related : PRODUCTS.filter(p => p.id !== product.id).slice(0, 4)).map(renderProductCard).join('');
  }
}

function switchThumb(el, emoji) {
  document.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const mainImg = document.getElementById('mainImg');
  if (mainImg) mainImg.textContent = emoji;
}

function changeQty(delta) {
  currentQty = Math.max(1, Math.min(10, currentQty + delta));
  const input = document.getElementById('qtyInput');
  if (input) input.value = currentQty;
}

function toggleAccordion(btn) {
  const body = btn.nextElementSibling;
  const isOpen = body.classList.contains('open');
  document.querySelectorAll('.accordion-body').forEach(b => b.classList.remove('open'));
  document.querySelectorAll('.accordion-header span:last-child').forEach(s => s.textContent = '+');
  if (!isOpen) {
    body.classList.add('open');
    btn.querySelector('span:last-child').textContent = '−';
  }
}

function wishlist(id) {
  showToast('Added to wishlist ♡');
}

document.addEventListener('DOMContentLoaded', initProductPage);
