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
  showToast(t('Message sent! We\'ll reply within 24 hours. 🌴', 'Message envoye ! Nous repondrons sous 24 heures. 🌴'), 'success');
}

function submitWholesale() {
  showToast(t('Wholesale inquiry received! Our team will contact you within 48 hours.', 'Demande grossiste recue ! Notre equipe vous contactera sous 48 heures.'), 'success');
}

// Open wholesale tab from URL hash
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash === '#wholesale') {
    const tab = document.getElementById('wholesaleTab');
    if (tab) switchContactTab('wholesale', tab);
  }
});

