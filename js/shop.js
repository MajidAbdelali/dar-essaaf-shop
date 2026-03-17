/* ===========================
   SHOP PAGE JS
   =========================== */

let currentProducts = [...PRODUCTS];
let displayedCount = 8;
let maxPrice = 500;
let currentSort = 'default';
let currentCat = '';

function getFiltered() {
  const params = new URLSearchParams(window.location.search);
  const urlCat = params.get('cat') || '';
  const activeCat = currentCat || urlCat;

  let filtered = PRODUCTS.filter(p => {
    const catMatch = !activeCat || p.category === activeCat;
    const priceMatch = p.price <= maxPrice;
    return catMatch && priceMatch;
  });

  if (currentSort === 'price-asc') filtered.sort((a,b) => a.price - b.price);
  else if (currentSort === 'price-desc') filtered.sort((a,b) => b.price - a.price);
  else if (currentSort === 'newest') filtered.sort((a,b) => b.id - a.id);

  return filtered;
}

function renderShopGrid() {
  const grid = document.getElementById('shopProductsGrid');
  const countEl = document.getElementById('productCount');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (!grid) return;

  const filtered = getFiltered();
  const visible = filtered.slice(0, displayedCount);

  grid.innerHTML = visible.length > 0
    ? visible.map(renderProductCard).join('')
    : `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted);">
        <p style="font-size:3rem">🌴</p>
        <p>No products found matching your filters.</p>
        <button class="btn btn-ghost" onclick="resetFilters()" style="margin-top:16px">Reset Filters</button>
      </div>`;

  if (countEl) countEl.textContent = `Showing ${Math.min(displayedCount, filtered.length)} of ${filtered.length} products`;
  if (loadMoreBtn) loadMoreBtn.style.display = filtered.length > displayedCount ? 'inline-flex' : 'none';
}

function filterProducts() {
  const radios = document.querySelectorAll('input[name="cat"]');
  radios.forEach(r => { if (r.checked) currentCat = r.value; });
  displayedCount = 8;
  renderShopGrid();

  // Update URL without reload
  const url = new URL(window.location);
  if (currentCat) url.searchParams.set('cat', currentCat);
  else url.searchParams.delete('cat');
  window.history.replaceState({}, '', url);
}

function updatePrice(val) {
  maxPrice = parseInt(val);
  document.getElementById('priceMax').textContent = val + ' TND';
  renderShopGrid();
}

function sortProducts(val) {
  currentSort = val;
  renderShopGrid();
}

function resetFilters() {
  currentCat = '';
  maxPrice = 500;
  currentSort = 'default';
  displayedCount = 8;

  document.querySelectorAll('input[name="cat"]').forEach(r => { r.checked = r.value === ''; });
  document.getElementById('priceSlider').value = 500;
  document.getElementById('priceMax').textContent = '500 TND';
  document.querySelector('.filter-select').value = 'default';

  const url = new URL(window.location);
  url.searchParams.delete('cat');
  window.history.replaceState({}, '', url);

  renderShopGrid();
}

function loadMore() {
  displayedCount += 4;
  renderShopGrid();
}

function toggleMobileSidebar() {
  document.querySelector('.shop-sidebar').classList.toggle('mobile-open');
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  // Pre-select category from URL
  const params = new URLSearchParams(window.location.search);
  const urlCat = params.get('cat');
  if (urlCat) {
    currentCat = urlCat;
    const radio = document.querySelector(`input[name="cat"][value="${urlCat}"]`);
    if (radio) radio.checked = true;
  }

  renderShopGrid();
});

