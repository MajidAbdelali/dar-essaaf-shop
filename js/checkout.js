/* ===========================
   CHECKOUT JS
   =========================== */

let shippingCost = 12;

function renderCheckoutSummary() {
  const list = document.getElementById('checkoutItemsList');
  if (!list) return;

  list.innerHTML = cart.map(item => `
    <div class="checkout-summary-item">
      <div class="checkout-summary-item-img">${item.emoji}</div>
      <div class="checkout-summary-item-info">
        <div class="checkout-summary-item-title">${item.name}</div>
        <div class="checkout-summary-item-qty">Qty: ${item.qty}</div>
      </div>
      <div class="checkout-summary-item-price">${(item.price * item.qty).toFixed(0)} TND</div>
    </div>
  `).join('');

  updateTotals();
}

function updateShipping(cost) {
  shippingCost = cost;
  updateTotals();
}

function updateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + shippingCost;
  const el = id => document.getElementById(id);
  if (el('coSubtotal')) el('coSubtotal').textContent = subtotal.toFixed(0) + ' TND';
  if (el('coShipping')) el('coShipping').textContent = shippingCost + ' TND';
  if (el('coTotal')) el('coTotal').textContent = total.toFixed(0) + ' TND';
}

function switchPayment(type, btn) {
  document.querySelectorAll('.payment-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('paymentCard').classList.toggle('hidden', type !== 'card');
  document.getElementById('paymentCOD').classList.toggle('hidden', type !== 'cod');
}

function formatCard(input) {
  let val = input.value.replace(/\D/g, '').slice(0, 16);
  input.value = val.replace(/(\d{4})(?=\d)/g, '$1 ');
}

function placeOrder() {
  const email = document.getElementById('emailInput')?.value;
  const firstName = document.getElementById('firstName')?.value;
  const address = document.getElementById('address')?.value;

  if (!email || !firstName || !address) {
    showToast('Please fill in all required fields.');
    return;
  }

  if (cart.length === 0) {
    showToast('Your cart is empty!');
    return;
  }

  // Submit to PHP backend
  const orderData = {
    email,
    firstName,
    lastName: document.getElementById('lastName')?.value,
    address,
    city: document.getElementById('city')?.value,
    country: document.getElementById('country')?.value,
    items: cart,
    total: cart.reduce((s, i) => s + i.price * i.qty, 0) + shippingCost
  };

  fetch('api/place_order.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      localStorage.removeItem('djerbaCart');
      window.location = 'order-success.html?id=' + data.orderId;
    } else {
      showToast('Error placing order. Please try again.');
    }
  })
  .catch(() => {
    // Demo fallback
    localStorage.removeItem('djerbaCart');
    showToast('Order placed! Thank you. 🌴', 'success');
    setTimeout(() => window.location = 'index.html', 2000);
  });
}

document.addEventListener('DOMContentLoaded', renderCheckoutSummary);
