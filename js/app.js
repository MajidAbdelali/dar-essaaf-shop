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

const LANGUAGE_STORAGE_KEY = 'djerbaLang';

const LANGUAGE_LABELS = [
  { selector: '.main-nav a[href="index.html"]', en: 'Home', fr: 'Accueil' },
  { selector: '.main-nav a[href="shop.html"]', en: 'Shop', fr: 'Boutique' },
  { selector: '.main-nav a[href="artisans.html"]', en: 'Our Artisans', fr: 'Nos Artisans' },
  { selector: '.main-nav a[href="contact.html"]', en: 'Contact', fr: 'Contact' },
  { selector: '.breadcrumb a[href="index.html"]', en: 'Home', fr: 'Accueil' }
];

function getCurrentLanguage() {
  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return saved === 'fr' ? 'fr' : 'en';
}

function t(enText, frText) {
  return getCurrentLanguage() === 'fr' ? frText : enText;
}

function setText(selector, enText, frText, language) {
  document.querySelectorAll(selector).forEach(el => {
    el.textContent = language === 'fr' ? frText : enText;
  });
}

function setHtml(selector, enHtml, frHtml, language) {
  document.querySelectorAll(selector).forEach(el => {
    el.innerHTML = language === 'fr' ? frHtml : enHtml;
  });
}

function setPlaceholder(selector, enText, frText, language) {
  document.querySelectorAll(selector).forEach(el => {
    el.placeholder = language === 'fr' ? frText : enText;
  });
}

function getPageName() {
  const page = window.location.pathname.split('/').pop();
  return page || 'index.html';
}

function applyPageTranslations(language) {
  const page = getPageName();

  setText('.footer-brand p', 'Handwoven with love in Djerba, Tunisia.', 'Tisse avec amour a Djerba, Tunisie.', language);
  setText('.footer-links h4', 'Shop', 'Boutique', language);
  setText('.footer-links h4 + a[href*="baskets"]', 'Woven Baskets', 'Paniers tisses', language);
  setText('.footer-links h4 + a[href*="mats"]', 'Traditional Mats', 'Nattes traditionnelles', language);
  setText('.footer-links h4 + a[href*="decor"]', 'Home Decor', 'Decoration maison', language);
  setText('.footer-links h4 + a[href*="fashion"]', 'Hats & Bags', 'Chapeaux et sacs', language);
  setText('.footer-links:nth-of-type(2) h4', 'Company', 'Entreprise', language);
  setText('.footer-links:nth-of-type(2) a[href="artisans.html"]', 'Our Artisans', 'Nos Artisans', language);
  setText('.footer-links:nth-of-type(2) a[href="contact.html"]', 'Contact', 'Contact', language);
  setText('.footer-links:nth-of-type(2) a[href="contact.html#wholesale"]', 'Wholesale', 'Vente en gros', language);
  setText('.footer-links:nth-of-type(2) a[href="#"]', 'Sustainability', 'Durabilite', language);
  setText('.footer-links:nth-of-type(3) h4', 'Support', 'Support', language);
  setText('.footer-links:nth-of-type(3) a:nth-of-type(1)', 'Shipping Info', 'Infos livraison', language);
  setText('.footer-links:nth-of-type(3) a:nth-of-type(2)', 'Returns Policy', 'Politique de retour', language);
  setText('.footer-links:nth-of-type(3) a:nth-of-type(3)', 'Care Guide', 'Guide d entretien', language);
  setText('.footer-links:nth-of-type(3) a:nth-of-type(4)', 'FAQ', 'FAQ', language);
  setText('.footer-bottom p', '? 2025 dar-essaaf-shop. All rights reserved.', '? 2025 dar-essaaf-shop. Tous droits reserves.', language);

  if (page === 'index.html') {
    document.title = language === 'fr' ? 'dar-essaaf-shop - Artisanat traditionnel authentique' : 'dar-essaaf-shop - Authentic Handwoven Crafts';
    setText('.popup-badge', 'LIMITED OFFER', 'OFFRE LIMITEE', language);
    setText('.popup-title', 'Before You Go...', 'Avant de partir...', language);
    setText('.popup-sub', 'Claim 10% off your first order of handwoven Djerbian crafts.', 'Profitez de 10% de reduction sur votre premiere commande artisanale de Djerba.', language);
    setPlaceholder('.popup-input', 'Your email address', 'Votre adresse email', language);
    setText('.popup-box .btn.btn-primary', 'Claim My Discount', 'Obtenir ma reduction', language);
    setText('.popup-note', 'No spam. Just palms. ??', 'Pas de spam. Juste des palmes. ??', language);

    setText('.hero-badge', '? Djerba, Tunisia', '? Djerba, Tunisie', language);
    setHtml('.hero-title', 'Authentic Djerbian<br><em>Craftsmanship</em>', 'Artisanat djerbien<br><em>authentique</em>', language);
    setHtml('.hero-sub', 'Handwoven palm decor, baskets & textiles  - <br>made by artisans who carry centuries of tradition.', 'Decors, paniers et textiles en palmier tisses a la main - <br>realises par des artisans de tradition centenaire.', language);
    setText('.hero-cta .btn.btn-primary', 'Shop the Collection', 'Voir la collection', language);
    setText('.hero-cta .btn.btn-ghost', 'Meet the Artisans', 'Rencontrer les artisans', language);
    setText('.hero-stats .stat:nth-of-type(1) .stat-label', 'Artisan Families', 'Familles d artisans', language);
    setText('.hero-stats .stat:nth-of-type(3) .stat-label', 'Natural Palm', 'Palmier naturel', language);
    setText('.hero-stats .stat:nth-of-type(5) .stat-label', 'Countries Shipped', 'Pays livres', language);
    setText('.hero-scroll-hint span', 'Scroll', 'Defiler', language);

    setText('.trust-item:nth-of-type(1) span', '100% Natural Materials', '100% materiaux naturels', language);
    setText('.trust-item:nth-of-type(2) span', 'Handcrafted by Local Artisans', 'Fabrique a la main par des artisans locaux', language);
    setText('.trust-item:nth-of-type(3) span', 'Secure Worldwide Shipping', 'Livraison securisee dans le monde', language);
    setText('.trust-item:nth-of-type(4) span', 'Fair Trade Certified', 'Commerce equitable certifie', language);

    setText('.categories .section-tag', 'Browse', 'Parcourir', language);
    setText('.categories .section-title', 'Shop by Category', 'Acheter par categorie', language);
    setText('.categories-grid .cat-card:nth-of-type(1) h3', 'Woven Baskets', 'Paniers tisses', language);
    setText('.categories-grid .cat-card:nth-of-type(2) h3', 'Traditional Mats', 'Nattes traditionnelles', language);
    setText('.categories-grid .cat-card:nth-of-type(3) h3', 'Home Decor', 'Decoration maison', language);
    setText('.categories-grid .cat-card:nth-of-type(4) h3', 'Hats & Bags', 'Chapeaux et sacs', language);

    setText('.bestsellers .section-tag', 'Trending', 'Tendance', language);
    setText('.bestsellers .section-title', 'Best Sellers', 'Meilleures ventes', language);
    setText('.bestsellers .section-link', 'View All ?', 'Voir tout ?', language);

    setText('.story-text .section-tag', 'Our Heritage', 'Notre heritage', language);
    setText('.story-text .section-title', 'A Thousand Years of Palm Weaving', 'Mille ans de tissage du palmier', language);
    setText('.story-text p', 'In the narrow alleys of Djerba\'s ancient medina, artisan families pass their craft from parent to child. Each basket tells a story - of patient hands, of date palms swaying in Mediterranean winds, of a tradition older than the island\'s white-washed walls.', 'Dans les ruelles de l ancienne medina de Djerba, les familles d artisans transmettent leur savoir-faire de generation en generation. Chaque panier raconte une histoire de mains patientes, de palmiers dattiers et d une tradition tres ancienne.', language);
    setText('.story-text .btn.btn-primary', 'Meet the Artisans', 'Rencontrer les artisans', language);

    setText('.testimonials .section-tag', 'Reviews', 'Avis', language);
    setText('.testimonials .section-title', 'What Customers Say', 'Ce que disent nos clients', language);

    setText('.newsletter-box h2', 'Woven Into Your World', 'Le tissage dans votre quotidien', language);
    setText('.newsletter-box p', 'Get stories from our artisans, new arrivals, and exclusive offers.', 'Recevez les histoires de nos artisans, les nouveautes et des offres exclusives.', language);
    setPlaceholder('.newsletter-input', 'your@email.com', 'votre@email.com', language);
    setText('.newsletter-form .btn.btn-primary', 'Subscribe', 'S inscrire', language);
  }

  if (page === 'shop.html') {
    document.title = language === 'fr' ? 'Boutique - dar-essaaf-shop' : 'Shop - dar-essaaf-shop';
    setText('.breadcrumb span', 'Shop', 'Boutique', language);
    setText('.page-banner-title', 'The Collection', 'La Collection', language);
    setText('.page-banner-sub', 'Every piece handwoven by Djerbian artisans', 'Chaque piece est tissee a la main par des artisans de Djerba', language);
    setText('.filter-group:nth-of-type(1) .filter-title', 'Category', 'Categorie', language);
    setText('.filter-group:nth-of-type(1) .filter-option:nth-of-type(1)', ' All Products', ' Tous les produits', language);
    setText('.filter-group:nth-of-type(1) .filter-option:nth-of-type(2)', ' Woven Baskets', ' Paniers tisses', language);
    setText('.filter-group:nth-of-type(1) .filter-option:nth-of-type(3)', ' Traditional Mats', ' Nattes traditionnelles', language);
    setText('.filter-group:nth-of-type(1) .filter-option:nth-of-type(4)', ' Home Decor', ' Decoration maison', language);
    setText('.filter-group:nth-of-type(1) .filter-option:nth-of-type(5)', ' Hats & Bags', ' Chapeaux et sacs', language);
    setText('.filter-group:nth-of-type(2) .filter-title', 'Price Range', 'Fourchette de prix', language);
    setText('.filter-group:nth-of-type(3) .filter-title', 'Sort By', 'Trier par', language);
    setText('.filter-select option[value="default"]', 'Featured', 'Mis en avant', language);
    setText('.filter-select option[value="price-asc"]', 'Price: Low to High', 'Prix : croissant', language);
    setText('.filter-select option[value="price-desc"]', 'Price: High to Low', 'Prix : decroissant', language);
    setText('.filter-select option[value="newest"]', 'Newest', 'Plus recents', language);
    setText('.filter-group .btn.btn-ghost.btn-full', 'Reset Filters', 'Reinitialiser les filtres', language);
    setText('.mobile-filter-btn', '? Filter', '? Filtrer', language);
    setText('#loadMoreBtn', 'Load More', 'Charger plus', language);
  }

  if (page === 'cart.html') {
    document.title = language === 'fr' ? 'Votre Panier - dar-essaaf-shop' : 'Your Cart - dar-essaaf-shop';
    setText('.breadcrumb span', 'Your Cart', 'Votre panier', language);
    setText('.page-banner-title', 'Your Cart', 'Votre panier', language);
    setText('#cartEmpty h3', 'Your cart is empty', 'Votre panier est vide', language);
    setText('#cartEmpty p', 'Explore our collection and bring some Djerbian craft home.', 'Explorez notre collection et rapportez un artisanat de Djerba chez vous.', language);
    setText('#cartEmpty .btn.btn-primary', 'Browse Collection', 'Voir la collection', language);
    setText('.cart-summary-title', 'Order Summary', 'Resume de commande', language);
    setText('.cart-summary-line:nth-of-type(1) span:first-child', 'Subtotal', 'Sous-total', language);
    setText('.cart-summary-line:nth-of-type(2) span:first-child', 'Shipping', 'Livraison', language);
    setText('.cart-summary-line:nth-of-type(3) span:first-child', 'Total', 'Total', language);
    setPlaceholder('#couponInput', 'Coupon code', 'Code promo', language);
    setText('.coupon-row .btn.btn-ghost.btn-sm', 'Apply', 'Appliquer', language);
    setText('#checkoutBtn', 'Proceed to Checkout', 'Passer a la caisse', language);
    setText('.cart-secure-note', '?? Secure checkout ? SSL encrypted', '?? Paiement securise ? SSL chiffre', language);
    setText('.cart-summary .btn.btn-ghost.btn-full', 'Continue Shopping', 'Continuer vos achats', language);
  }

  if (page === 'contact.html') {
    document.title = language === 'fr' ? 'Contact et Vente en Gros - dar-essaaf-shop' : 'Contact & Wholesale - dar-essaaf-shop';
    setText('.breadcrumb span', 'Contact', 'Contact', language);
    setText('.page-banner-title', 'Get in Touch', 'Contactez-nous', language);
    setText('.page-banner-sub', 'We\'re based in Djerba - and always happy to hear from you.', 'Nous sommes bases a Djerba et toujours ravis de vous lire.', language);
    setText('.contact-tabs .contact-tab:nth-of-type(1)', 'General Inquiry', 'Demande generale', language);
    setText('.contact-tabs .contact-tab:nth-of-type(2)', 'Wholesale / B2B', 'Vente en gros / B2B', language);
    setPlaceholder('#tabGeneral .form-row input:nth-of-type(1)', 'Your name', 'Votre nom', language);
    setPlaceholder('#tabGeneral .form-row input:nth-of-type(2)', 'Email address', 'Adresse email', language);
    setPlaceholder('#tabGeneral > input.form-input', 'Subject', 'Sujet', language);
    setPlaceholder('#tabGeneral textarea', 'Your message...', 'Votre message...', language);
    setText('#tabGeneral .btn.btn-primary', 'Send Message', 'Envoyer le message', language);
    setText('.wholesale-intro', 'Interested in stocking dar-essaaf-shop products? We offer wholesale pricing for boutiques, interior designers, and retailers worldwide.', 'Vous souhaitez distribuer les produits dar-essaaf-shop ? Nous proposons des tarifs grossistes pour boutiques, decorateurs et revendeurs.', language);
    setPlaceholder('#tabWholesale .form-row:nth-of-type(1) input:nth-of-type(1)', 'Contact name', 'Nom du contact', language);
    setPlaceholder('#tabWholesale .form-row:nth-of-type(1) input:nth-of-type(2)', 'Company name', 'Nom de l entreprise', language);
    setPlaceholder('#tabWholesale .form-row:nth-of-type(2) input:nth-of-type(1)', 'Business email', 'Email professionnel', language);
    setPlaceholder('#tabWholesale .form-row:nth-of-type(2) input:nth-of-type(2)', 'Phone number', 'Numero de telephone', language);
    setText('#tabWholesale .form-input option[value=""]', 'Business type', 'Type d activite', language);
    setText('#tabWholesale .form-input option:nth-of-type(2)', 'Boutique / Retail Store', 'Boutique / Magasin', language);
    setText('#tabWholesale .form-input option:nth-of-type(3)', 'Interior Design Studio', 'Studio de design interieur', language);
    setText('#tabWholesale .form-input option:nth-of-type(4)', 'Online Retailer', 'Commerce en ligne', language);
    setText('#tabWholesale .form-input option:nth-of-type(5)', 'Hotel / Hospitality', 'Hotel / Hotellerie', language);
    setText('#tabWholesale .form-input option:nth-of-type(6)', 'Other', 'Autre', language);
    setPlaceholder('#tabWholesale > input.form-input', 'Estimated monthly order quantity', 'Quantite mensuelle estimee', language);
    setPlaceholder('#tabWholesale textarea', 'Tell us about your business and which products interest you...', 'Parlez-nous de votre entreprise et des produits qui vous interessent...', language);
    setText('#tabWholesale .btn.btn-primary', 'Submit Wholesale Inquiry', 'Envoyer la demande grossiste', language);
    setText('.contact-info-card:nth-of-type(1) h4', '?? Visit Us', '?? Venez nous voir', language);
    setText('.contact-info-card:nth-of-type(2) h4', '?? Email', '?? Email', language);
    setText('.contact-info-card:nth-of-type(3) h4', '?? Phone', '?? Telephone', language);
    setText('.contact-hours', 'Mon�Fri, 9am�5pm (CET)', 'Lun�Ven, 9h�17h (CET)', language);
    setText('.contact-info-card:nth-of-type(4) h4', '?? Social', '?? Reseaux', language);
    setText('.faq-block h4', 'Common Questions', 'Questions frequentes', language);
    setText('.faq-item:nth-of-type(1) summary', 'Do you ship worldwide?', 'Livrez-vous dans le monde entier ?', language);
    setText('.faq-item:nth-of-type(1) p', 'Yes! We ship to 40+ countries. Shipping rates are calculated at checkout.', 'Oui ! Nous livrons dans plus de 40 pays. Les frais sont calcules au paiement.', language);
    setText('.faq-item:nth-of-type(2) summary', 'Are all products handmade?', 'Tous les produits sont-ils faits a la main ?', language);
    setText('.faq-item:nth-of-type(2) p', 'Absolutely. Every piece is handwoven by artisan families on the island of Djerba.', 'Absolument. Chaque piece est tissee a la main par des familles artisanes de Djerba.', language);
    setText('.faq-item:nth-of-type(3) summary', 'What is your return policy?', 'Quelle est votre politique de retour ?', language);
    setText('.faq-item:nth-of-type(3) p', 'We accept returns within 14 days for unused items in original condition.', 'Nous acceptons les retours sous 14 jours pour les articles non utilises.', language);
    setText('.faq-item:nth-of-type(4) summary', 'Can I request custom orders?', 'Puis-je demander des commandes sur mesure ?', language);
    setText('.faq-item:nth-of-type(4) p', 'Yes! Contact us via the wholesale form and we\'ll discuss custom weaving options.', 'Oui ! Contactez-nous via le formulaire grossiste pour discuter des options sur mesure.', language);
  }

  if (page === 'artisans.html') {
    document.title = language === 'fr' ? 'Nos Artisans - dar-essaaf-shop' : 'Our Artisans - dar-essaaf-shop';
    setText('.artisan-hero .section-tag', 'Our Heritage', 'Notre heritage', language);
    setHtml('.artisan-hero .hero-title', 'The Hands<br><em>Behind Every Weave</em>', 'Les mains<br><em>derriere chaque tissage</em>', language);
    setText('.artisan-hero p', 'For over a century, families on the Island of Djerba have transformed sun-dried palm fronds into intricate, beautiful objects. We work directly with these artisans to bring their craft to the world - fairly, transparently, and with deep respect.', 'Depuis plus d un siecle, les familles de Djerba transforment les feuilles de palmier sechees en creations uniques. Nous travaillons directement avec ces artisans avec equite et transparence.', language);
    setText('.artisan-stat:nth-of-type(1) .artisan-stat-label', 'Artisan Families', 'Familles d artisans', language);
    setText('.artisan-stat:nth-of-type(2) .artisan-stat-label', 'Founding Year', 'Annee de fondation', language);
    setText('.artisan-stat:nth-of-type(3) .artisan-stat-label', 'Villages', 'Villages', language);
    setText('.artisan-stat:nth-of-type(4) .artisan-stat-label', 'Fair Trade', 'Commerce equitable', language);
    setText('.process-section .section-tag', 'The Process', 'Le processus', language);
    setText('.process-section .section-title', 'From Palm to Your Home', 'Du palmier jusqu a votre maison', language);
    setText('.process-step:nth-of-type(1) h4', 'Harvesting', 'Recolte', language);
    setText('.process-step:nth-of-type(2) h4', 'Drying & Dyeing', 'Sechage et teinture', language);
    setText('.process-step:nth-of-type(3) h4', 'Weaving', 'Tissage', language);
    setText('.process-step:nth-of-type(4) h4', 'Quality Check', 'Controle qualite', language);
    setText('.artisan-profiles .section-tag', 'Meet Them', 'Rencontrez-les', language);
    setText('.artisan-profiles .section-title', 'Featured Artisans', 'Artisans a l honneur', language);
    setText('.sustain-text .section-tag', 'Planet & People', 'Planete et personnes', language);
    setText('.sustain-text .section-title', 'Sustainable by Nature', 'Durable par nature', language);
    setText('.sustain-text .btn.btn-primary', 'Shop Sustainably', 'Acheter durable', language);
    setText('.cta-inner h2', 'Every Purchase Supports a Family', 'Chaque achat soutient une famille', language);
    setText('.cta-inner p', 'When you buy from dar-essaaf-shop, 80% of the price goes directly to the artisan. Shopping has never felt this good.', 'Quand vous achetez chez dar-essaaf-shop, 80% du prix revient directement a l artisan. Un achat qui a du sens.', language);
    setText('.cta-inner .btn.btn-sand', 'Shop the Collection', 'Voir la collection', language);
  }

  if (page === 'product.html') {
    document.title = language === 'fr' ? 'Produit - dar-essaaf-shop' : 'Product - dar-essaaf-shop';
    setText('#productBreadcrumb a[href="shop.html"]', 'Shop', 'Boutique', language);
    setText('.product-loading', 'Loading product...', 'Chargement du produit...', language);
    setText('.reviews-section .section-title', 'Customer Reviews', 'Avis clients', language);
    setText('.section-tag', 'Also Love', 'Vous aimerez aussi', language);
    setText('.section .section-title', 'You May Also Like', 'Vous pourriez aussi aimer', language);
  }

  if (page === 'checkout.html') {
    document.title = language === 'fr' ? 'Paiement - dar-essaaf-shop' : 'Checkout - dar-essaaf-shop';
    setText('.checkout-progress .progress-step:nth-of-type(1)', 'Information', 'Informations', language);
    setText('.checkout-progress .progress-step:nth-of-type(3)', 'Shipping', 'Livraison', language);
    setText('.checkout-progress .progress-step:nth-of-type(5)', 'Payment', 'Paiement', language);
    setText('.checkout-secure', '?? Secure', '?? Securise', language);
    setText('.checkout-block:nth-of-type(1) h3', 'Contact Information', 'Informations de contact', language);
    setHtml('.checkout-login-hint', 'Have an account? <a href="#">Log in</a>', 'Vous avez un compte ? <a href="#">Se connecter</a>', language);
    setPlaceholder('#emailInput', 'Email address', 'Adresse email', language);
    setText('.form-checkbox', ' Keep me up to date on news & exclusive offers', ' Me tenir informe des actualites et offres exclusives', language);
    setText('.checkout-block:nth-of-type(2) h3', 'Shipping Information', 'Informations de livraison', language);
    setPlaceholder('#firstName', 'First name', 'Prenom', language);
    setPlaceholder('#lastName', 'Last name', 'Nom', language);
    setPlaceholder('#address', 'Address', 'Adresse', language);
    setPlaceholder('#address2', 'Apartment, suite, etc. (optional)', 'Appartement, suite, etc. (optionnel)', language);
    setPlaceholder('#city', 'City', 'Ville', language);
    setPlaceholder('#postal', 'Postal code', 'Code postal', language);
    setText('#country option[value=""]', 'Select country', 'Choisir un pays', language);
    setPlaceholder('#phone', 'Phone (optional)', 'Telephone (optionnel)', language);
    setText('.checkout-block:nth-of-type(3) h3', 'Shipping Method', 'Mode de livraison', language);
    setText('.shipping-option:nth-of-type(1) .shipping-name', 'Standard Shipping', 'Livraison standard', language);
    setText('.shipping-option:nth-of-type(1) .shipping-eta', '7�14 business days', '7�14 jours ouvrables', language);
    setText('.shipping-option:nth-of-type(2) .shipping-name', 'Express Shipping', 'Livraison express', language);
    setText('.shipping-option:nth-of-type(2) .shipping-eta', '2�5 business days', '2�5 jours ouvrables', language);
    setText('.checkout-block:nth-of-type(4) h3', 'Payment', 'Paiement', language);
    setText('.checkout-secure-badge', '?? All transactions are secure and encrypted.', '?? Toutes les transactions sont securisees et chiffrees.', language);
    setText('.payment-tabs .payment-tab:nth-of-type(1)', 'Credit Card', 'Carte bancaire', language);
    setText('.payment-tabs .payment-tab:nth-of-type(2)', 'Cash on Delivery', 'Paiement a la livraison', language);
    setPlaceholder('#paymentCard input:nth-of-type(1)', 'Card number', 'Numero de carte', language);
    setPlaceholder('#paymentCard .form-row input:nth-of-type(1)', 'MM / YY', 'MM / AA', language);
    setPlaceholder('#paymentCard .form-row input:nth-of-type(2)', 'CVV', 'CVV', language);
    setPlaceholder('#paymentCard input:nth-of-type(2)', 'Name on card', 'Nom sur la carte', language);
    setText('.cod-note', '?? You will pay when your order is delivered. A confirmation will be sent to your email.', '?? Vous paierez a la livraison. Une confirmation sera envoyee par email.', language);
    setText('.btn.btn-primary.btn-full.btn-lg', 'Complete Order', 'Finaliser la commande', language);
    setHtml('.checkout-back a', '? Return to cart', '? Retour au panier', language);
    setText('.checkout-summary .cart-summary-title', 'Order Summary', 'Resume de commande', language);
    setText('.checkout-summary .cart-summary-line:nth-of-type(2) span:first-child', 'Subtotal', 'Sous-total', language);
    setText('.checkout-summary .cart-summary-line:nth-of-type(3) span:first-child', 'Shipping', 'Livraison', language);
    setText('.checkout-summary .cart-summary-line:nth-of-type(4) span:first-child', 'Total', 'Total', language);
  }

  if (page === 'order-success.html') {
    document.title = language === 'fr' ? 'Commande Confirmee - dar-essaaf-shop' : 'Order Confirmed - dar-essaaf-shop';
    setText('.section-tag', 'Order Confirmed', 'Commande confirmee', language);
    setText('section h1', 'Thank You!', 'Merci !', language);
    setText('section p:nth-of-type(1)', 'Your order has been received and is being prepared by our artisans.', 'Votre commande a bien ete recue et est en preparation chez nos artisans.', language);

    const orderLine = document.getElementById('orderIdLine');
    if (orderLine) {
      const current = orderLine.textContent || '';
      const orderMatch = current.match(/Order\s+#(\d+)/i);
      if (orderMatch) {
        const orderId = orderMatch[1];
        orderLine.textContent = language === 'fr'
          ? `Commande #${orderId} - Un email de confirmation vous sera envoye sous peu.`
          : `Order #${orderId} - A confirmation email will be sent to you shortly.`;
      } else {
        orderLine.textContent = language === 'fr'
          ? 'Un email de confirmation vous sera envoye sous peu.'
          : 'A confirmation email will be sent to you shortly.';
      }
    }

    setText('section h4', 'What Happens Next', 'Et ensuite ?', language);
    setText('section strong:nth-of-type(1)', 'Confirmation Email', 'Email de confirmation', language);
    setText('section strong:nth-of-type(2)', 'Artisan Preparation', 'Preparation artisanale', language);
    setText('section strong:nth-of-type(3)', 'Shipping & Tracking', 'Livraison et suivi', language);
    setText('section strong:nth-of-type(1) + br + span', 'You\'ll receive a summary within minutes.', 'Vous recevrez un recapitulatif dans quelques minutes.', language);
    setText('section strong:nth-of-type(2) + br + span', 'Your items are carefully packaged by hand within 2�3 business days.', 'Vos articles sont prepares a la main sous 2�3 jours ouvrables.', language);
    setText('section strong:nth-of-type(3) + br + span', 'You\'ll receive tracking info once dispatched.', 'Vous recevrez les informations de suivi des l expedition.', language);
    setText('section .btn.btn-primary', 'Back to Home', 'Retour a l accueil', language);
    setText('section .btn.btn-ghost', 'Continue Shopping', 'Continuer vos achats', language);
  }
}

function applyLanguage(lang) {
  const language = lang === 'fr' ? 'fr' : 'en';
  document.documentElement.lang = language;
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);

  LANGUAGE_LABELS.forEach(item => {
    document.querySelectorAll(item.selector).forEach(el => {
      el.textContent = language === 'fr' ? item.fr : item.en;
    });
  });

  applyPageTranslations(language);

  const toggleBtn = document.getElementById('languageToggleBtn');
  if (toggleBtn) {
    toggleBtn.textContent = language === 'fr' ? 'EN' : 'FR';
    toggleBtn.title = language === 'fr' ? 'Switch to English' : 'Passer en francais';
    toggleBtn.setAttribute('aria-label', toggleBtn.title);
  }
}

function initLanguageToggle() {
  if (document.getElementById('languageToggleBtn')) return;

  let headerActions = document.querySelector('.header-actions');
  if (!headerActions) {
    const headerInner = document.querySelector('.site-header .header-inner');
    if (!headerInner) return;

    headerActions = document.createElement('div');
    headerActions.className = 'header-actions header-actions--lang-only';
    headerInner.appendChild(headerActions);
  }

  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.id = 'languageToggleBtn';
  toggleBtn.className = 'lang-toggle';

  toggleBtn.addEventListener('click', () => {
    const nextLanguage = getCurrentLanguage() === 'fr' ? 'en' : 'fr';
    applyLanguage(nextLanguage);
  });

  const cartBtn = headerActions.querySelector('.cart-btn');
  if (cartBtn) {
    headerActions.insertBefore(toggleBtn, cartBtn);
  } else {
    headerActions.prepend(toggleBtn);
  }

  applyLanguage(getCurrentLanguage());
}

window.getCurrentLanguage = getCurrentLanguage;
window.applyLanguage = applyLanguage;
window.t = t;

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
  showToast(t(`✅ "${product.name}" added to cart!`, `✅ "${product.name}" ajoute au panier !`), 'success');
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
  showToast(t('Search coming soon!', 'La recherche arrive bientot !'));
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
  initLanguageToggle();
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

  // Re-apply language after page-specific scripts render dynamic sections.
  setTimeout(() => applyLanguage(getCurrentLanguage()), 0);
});




