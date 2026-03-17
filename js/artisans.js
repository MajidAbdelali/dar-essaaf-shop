/* ===========================
   ARTISANS PAGE JS
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('artisanGrid');
  if (!grid) return;

  grid.innerHTML = ARTISANS.map(a => `
    <div class="artisan-profile-card">
      <div class="artisan-profile-img">${a.emoji}</div>
      <div class="artisan-profile-body">
        <div class="artisan-profile-name">${a.name}</div>
        <div class="artisan-profile-village">📍 ${a.village}, Djerba</div>
        <p class="artisan-profile-bio">${a.bio}</p>
        <span class="artisan-profile-specialty">🧵 ${a.specialty}</span>
      </div>
    </div>
  `).join('');
});


