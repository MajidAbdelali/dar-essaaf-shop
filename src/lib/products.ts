export interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  category: 'Chapeaux' | 'Paniers' | 'Décoration' | 'Accessoires';
  description: string;
  image: string;
  featured: boolean;
  inStock: boolean;
  badge?: 'Nouveau' | 'Bestseller' | 'Artisanal';
}

export const products: Product[] = [
  {
    id: 'mdhilla-hat-classic',
    name: 'Chapeau Mdhilla Classique',
    nameAr: 'قبعة المضيلة الكلاسيكية',
    price: 85,
    category: 'Chapeaux',
    description: 'Le chapeau Mdhilla traditionnel, tissé à la main par des artisans djerbiens. Fabriqué à partir de palmes séchées, ce chapeau iconique est le symbole de l\'artisanat tunisien. Léger, respirant et durable.',
    image: '/images/products/mdhilla-hat-classic.jpg',
    featured: true,
    inStock: true,
    badge: 'Bestseller',
  },
  {
    id: 'mdhilla-hat-natural',
    name: 'Chapeau Mdhilla Naturel',
    nameAr: 'قبعة المضيلة الطبيعية',
    price: 75,
    category: 'Chapeaux',
    description: 'Version naturelle du chapeau Mdhilla, conservant la couleur dorée des palmes séchées. Un chef-d\'œuvre artisanal qui incarne l\'authenticité de Djerba.',
    image: '/images/products/mdhilla-hat-natural.jpg',
    featured: false,
    inStock: true,
    badge: 'Artisanal',
  },
  {
    id: 'djerbian-sun-hat',
    name: 'Chapeau de Soleil Djerbien',
    nameAr: 'قبعة الشمس الجربية',
    price: 65,
    category: 'Chapeaux',
    description: 'Protégez-vous du soleil méditerranéen avec ce magnifique chapeau djerbien. Tressé à la main avec des feuilles de palmier sélectionnées, il offre une protection optimale tout en restant élégant.',
    image: '/images/products/djerbian-sun-hat.jpg',
    featured: true,
    inStock: true,
  },
  {
    id: 'palm-weave-fedora',
    name: 'Fedora en Palme Tressée',
    nameAr: 'قبعة فيدورا من سعف النخيل',
    price: 95,
    category: 'Chapeaux',
    description: 'Un fedora moderne revisité avec les techniques ancestrales de tressage djerbien. La fusion parfaite entre la mode contemporaine et le savoir-faire traditionnel.',
    image: '/images/products/palm-weave-fedora.jpg',
    featured: false,
    inStock: true,
    badge: 'Nouveau',
  },
  {
    id: 'large-palm-basket',
    name: 'Grand Panier en Palme',
    nameAr: 'السلة الكبيرة من سعف النخيل',
    price: 120,
    category: 'Paniers',
    description: 'Ce grand panier en palme tressée est idéal pour le marché ou comme décoration d\'intérieur. Entièrement fait à la main par des artisanes djerbaites, chaque panier est unique.',
    image: '/images/products/large-palm-basket.jpg',
    featured: true,
    inStock: true,
    badge: 'Bestseller',
  },
  {
    id: 'round-storage-basket',
    name: 'Panier Rond de Rangement',
    nameAr: 'سلة التخزين المستديرة',
    price: 89,
    category: 'Paniers',
    description: 'Organisez votre espace avec élégance grâce à ce panier rond en palme. Parfait pour ranger jouets, linge ou accessoires, il apporte une touche naturelle à votre intérieur.',
    image: '/images/products/round-storage-basket.jpg',
    featured: true,
    inStock: true,
    badge: 'Artisanal',
  },
  {
    id: 'market-tote-basket',
    name: 'Panier Cabas de Marché',
    nameAr: 'حقيبة السوق المنسوجة',
    price: 72,
    category: 'Paniers',
    description: 'Le compagnon idéal pour vos courses au marché. Ce cabas en palme tressée est à la fois pratique et esthétique, dans la pure tradition djerbienne.',
    image: '/images/products/market-tote-basket.jpg',
    featured: false,
    inStock: true,
  },
  {
    id: 'palm-leaf-wall-art',
    name: 'Art Mural en Feuilles de Palme',
    nameAr: 'لوحة جدارية من سعف النخيل',
    price: 145,
    category: 'Décoration',
    description: 'Transformez vos murs avec cette œuvre d\'art unique réalisée en feuilles de palme tressées. Un symbole de l\'artisanat de Djerba qui apportera chaleur et authenticité à votre intérieur.',
    image: '/images/products/palm-leaf-wall-art.jpg',
    featured: true,
    inStock: true,
    badge: 'Nouveau',
  },
  {
    id: 'woven-table-runner',
    name: 'Chemin de Table Tressé',
    nameAr: 'مفرش طاولة منسوج',
    price: 58,
    category: 'Décoration',
    description: 'Égayez votre table avec ce chemin de table artisanal en palme tressée. Ses motifs géométriques traditionnels djerbiens apportent une touche d\'authenticité méditerranéenne.',
    image: '/images/products/woven-table-runner.jpg',
    featured: false,
    inStock: true,
    badge: 'Artisanal',
  },
  {
    id: 'decorative-palm-bowl',
    name: 'Coupe Décorative en Palme',
    nameAr: 'وعاء زخرفي من سعف النخيل',
    price: 68,
    category: 'Décoration',
    description: 'Cette coupe décorative en palme tressée est parfaite pour présenter des fruits ou comme pièce de décoration. Chaque pièce est unique, témoin du talent des artisanes de Djerba.',
    image: '/images/products/decorative-palm-bowl.jpg',
    featured: false,
    inStock: true,
  },
  {
    id: 'palm-frond-lantern',
    name: 'Lanterne en Feuilles de Palme',
    nameAr: 'فانوس من سعف النخيل',
    price: 110,
    category: 'Décoration',
    description: 'Créez une ambiance magique avec cette lanterne artisanale en feuilles de palme. La lumière filtre à travers le tressage pour créer de magnifiques jeux d\'ombres.',
    image: '/images/products/palm-frond-lantern.jpg',
    featured: true,
    inStock: true,
    badge: 'Bestseller',
  },
  {
    id: 'palm-leaf-earrings',
    name: 'Boucles d\'Oreilles en Palme',
    nameAr: 'أقراط من سعف النخيل',
    price: 35,
    category: 'Accessoires',
    description: 'Des boucles d\'oreilles légères et élégantes, réalisées en micro-tressage de palme. Un bijou naturel qui incarne l\'esprit de Djerba, parfait comme souvenir ou cadeau.',
    image: '/images/products/palm-leaf-earrings.jpg',
    featured: true,
    inStock: true,
    badge: 'Nouveau',
  },
  {
    id: 'woven-clutch-bag',
    name: 'Pochette Tressée',
    nameAr: 'حقيبة يد منسوجة',
    price: 85,
    category: 'Accessoires',
    description: 'Une pochette sophistiquée en palme tressée, idéale pour les soirées estivales. Sa fermeture magnétique dissimulée et son doublage en coton en font un accessoire à la fois pratique et luxueux.',
    image: '/images/products/woven-clutch-bag.jpg',
    featured: false,
    inStock: true,
    badge: 'Artisanal',
  },
];

export const getFeaturedProducts = () => products.filter(p => p.featured);
export const getProductsByCategory = (category: string) =>
  category === 'Tous' ? products : products.filter(p => p.category === category);
export const getProductById = (id: string) => products.find(p => p.id === id);
export const getRelatedProducts = (id: string, category: string) =>
  products.filter(p => p.category === category && p.id !== id).slice(0, 4);
