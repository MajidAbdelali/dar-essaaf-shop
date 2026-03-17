/* ===========================
   CONTACT PAGE JS
   =========================== */

function switchContactTab(tab, btn) {
  document.querySelectorAll('.contact-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tabGeneral').classList.toggle('hidden', tab !== 'general');
  document.getElementById('tabWholesale').classList.toggle('hidden', tab !== 'wholesale');
}

function submitContact() {
  showToast('Message sent! We\'ll reply within 24 hours. 🌴', 'success');
}

function submitWholesale() {
  showToast('Wholesale inquiry received! Our team will contact you within 48 hours.', 'success');
}

// Open wholesale tab from URL hash
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash === '#wholesale') {
    const tab = document.getElementById('wholesaleTab');
    if (tab) switchContactTab('wholesale', tab);
  }
});
