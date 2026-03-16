export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  categorySlug: string;
  tags: string[];
  formats: string[];
  colors: string[];
  description: string;
  shortDescription: string;
  isBestSeller: boolean;
  isNew: boolean;
  createdAt: string;
}

export interface Pack {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  products: string[];
  description: string;
  shortDescription: string;
  type: '2-pour-10' | 'set-de-3' | 'set-de-6' | 'gallery-wall';
  isBestSeller: boolean;
  isNew: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentSlug?: string;
}

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Villes & Voyage',
    slug: 'villes-voyage',
    description: 'Affiches vintage de villes et destinations mythiques.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=800&fit=crop',
  },
  {
    id: 'cat-2',
    name: 'Mer & Surf',
    slug: 'mer-surf',
    description: 'L\'appel de l\'océan en affiches rétro et décoratives.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=800&fit=crop',
  },
  {
    id: 'cat-3',
    name: 'Botanique & Nature',
    slug: 'botanique-nature',
    description: 'Planches botaniques et illustrations naturelles.',
    image: 'https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?w=600&h=800&fit=crop',
  },
  {
    id: 'cat-4',
    name: 'Vintage Déco',
    slug: 'vintage-deco',
    description: 'Affiches rétro et illustrations décoratives d\'époque.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=800&fit=crop',
  },
  {
    id: 'cat-5',
    name: 'Cartes & Plans',
    slug: 'cartes-plans',
    description: 'Cartes anciennes et plans de villes historiques.',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=800&fit=crop',
  },
];

export const formats = ['A5', 'A4', 'A3', 'A2', '30x40', '50x70', '70x100'];

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Paris Vintage',
    slug: 'paris-vintage',
    price: 19.90,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&h=800&fit=crop',
    ],
    category: 'Villes & Voyage',
    categorySlug: 'villes-voyage',
    tags: ['paris', 'france', 'tour eiffel', 'vintage'],
    formats: ['A5', 'A4', 'A3', '30x40', '50x70'],
    colors: ['beige', 'bleu', 'rouge'],
    description: 'Magnifique affiche vintage de Paris avec la Tour Eiffel en arrière-plan. Impression de qualité sur papier mat épais 200g. Parfaite pour décorer un salon ou un bureau avec une touche rétro et élégante.',
    shortDescription: 'Affiche vintage de Paris avec la Tour Eiffel.',
    isBestSeller: true,
    isNew: false,
    createdAt: '2025-01-15',
  },
  {
    id: 'prod-2',
    name: 'Biarritz Surf',
    slug: 'biarritz-surf',
    price: 19.90,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1455729552457-5c322b382173?w=600&h=800&fit=crop',
    ],
    category: 'Mer & Surf',
    categorySlug: 'mer-surf',
    tags: ['biarritz', 'surf', 'ocean', 'plage'],
    formats: ['A5', 'A4', 'A3', '30x40', '50x70'],
    colors: ['bleu', 'turquoise', 'sable'],
    description: 'Affiche surf rétro inspirée de Biarritz et de la côte basque. Design épuré mêlant vagues et typographie vintage. Parfaite pour les amoureux de l\'océan.',
    shortDescription: 'Affiche surf rétro inspirée de Biarritz.',
    isBestSeller: true,
    isNew: false,
    createdAt: '2025-02-10',
  },
  {
    id: 'prod-3',
    name: 'Botanique Ancienne — Fougères',
    slug: 'botanique-fougeres',
    price: 17.90,
    image: 'https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&h=800&fit=crop',
    ],
    category: 'Botanique & Nature',
    categorySlug: 'botanique-nature',
    tags: ['botanique', 'fougères', 'plantes', 'nature'],
    formats: ['A5', 'A4', 'A3', '30x40'],
    colors: ['vert', 'beige', 'brun'],
    description: 'Planche botanique ancienne représentant des fougères. Reproduction fidèle d\'une illustration du XIXe siècle. Un classique intemporel de la décoration murale.',
    shortDescription: 'Planche botanique ancienne de fougères.',
    isBestSeller: false,
    isNew: false,
    createdAt: '2025-01-20',
  },
  {
    id: 'prod-4',
    name: 'Côte d\'Azur Rétro',
    slug: 'cote-azur-retro',
    price: 19.90,
    image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=600&h=800&fit=crop',
    ],
    category: 'Villes & Voyage',
    categorySlug: 'villes-voyage',
    tags: ['côte d\'azur', 'nice', 'méditerranée', 'vintage'],
    formats: ['A4', 'A3', '30x40', '50x70'],
    colors: ['bleu', 'orange', 'jaune'],
    description: 'Affiche rétro de la Côte d\'Azur évoquant les voyages en train des années 1930. Couleurs chaudes et typographie d\'époque.',
    shortDescription: 'Affiche rétro de la Côte d\'Azur.',
    isBestSeller: true,
    isNew: false,
    createdAt: '2025-03-01',
  },
  {
    id: 'prod-5',
    name: 'Hossegor Sunset',
    slug: 'hossegor-sunset',
    price: 19.90,
    image: 'https://images.unsplash.com/photo-1455729552457-5c322b382173?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1455729552457-5c322b382173?w=600&h=800&fit=crop',
    ],
    category: 'Mer & Surf',
    categorySlug: 'mer-surf',
    tags: ['hossegor', 'surf', 'coucher de soleil', 'landes'],
    formats: ['A4', 'A3', '30x40', '50x70'],
    colors: ['orange', 'rose', 'bleu'],
    description: 'Coucher de soleil sur Hossegor, ambiance surf et océan. Des teintes chaudes pour une déco apaisante.',
    shortDescription: 'Affiche coucher de soleil surf à Hossegor.',
    isBestSeller: false,
    isNew: true,
    createdAt: '2026-02-15',
  },
  {
    id: 'prod-6',
    name: 'Plan de Paris 1920',
    slug: 'plan-paris-1920',
    price: 22.90,
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=800&fit=crop',
    ],
    category: 'Cartes & Plans',
    categorySlug: 'cartes-plans',
    tags: ['paris', 'carte', 'plan', '1920'],
    formats: ['A3', '30x40', '50x70', '70x100'],
    colors: ['sépia', 'beige', 'noir'],
    description: 'Reproduction d\'un plan de Paris des années 1920. Détails fins et patine d\'époque. Format idéal en grand pour un effet spectaculaire.',
    shortDescription: 'Plan ancien de Paris années 1920.',
    isBestSeller: false,
    isNew: false,
    createdAt: '2025-04-10',
  },
  {
    id: 'prod-7',
    name: 'Affiche Art Déco',
    slug: 'affiche-art-deco',
    price: 18.90,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=800&fit=crop',
    ],
    category: 'Vintage Déco',
    categorySlug: 'vintage-deco',
    tags: ['art déco', 'rétro', 'géométrique', 'années 20'],
    formats: ['A5', 'A4', 'A3', '30x40', '50x70'],
    colors: ['doré', 'noir', 'crème'],
    description: 'Affiche style Art Déco aux motifs géométriques élégants. S\'intègre parfaitement dans un intérieur contemporain ou classique.',
    shortDescription: 'Affiche décorative style Art Déco.',
    isBestSeller: true,
    isNew: false,
    createdAt: '2025-05-01',
  },
  {
    id: 'prod-8',
    name: 'Botanica — Eucalyptus',
    slug: 'botanica-eucalyptus',
    price: 17.90,
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&h=800&fit=crop',
    ],
    category: 'Botanique & Nature',
    categorySlug: 'botanique-nature',
    tags: ['eucalyptus', 'botanique', 'nature', 'vert'],
    formats: ['A5', 'A4', 'A3', '30x40'],
    colors: ['vert', 'blanc', 'gris'],
    description: 'Illustration botanique d\'eucalyptus sur fond clair. Douceur et élégance naturelle pour une déco apaisante.',
    shortDescription: 'Illustration botanique d\'eucalyptus.',
    isBestSeller: false,
    isNew: true,
    createdAt: '2026-03-01',
  },
  {
    id: 'prod-9',
    name: 'New York Skyline Vintage',
    slug: 'new-york-skyline-vintage',
    price: 21.90,
    image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=600&h=800&fit=crop',
    ],
    category: 'Villes & Voyage',
    categorySlug: 'villes-voyage',
    tags: ['new york', 'skyline', 'voyage', 'vintage'],
    formats: ['A4', 'A3', '30x40', '50x70', '70x100'],
    colors: ['gris', 'bleu', 'sépia'],
    description: 'Skyline iconique de New York dans un style vintage. Les gratte-ciels se dessinent dans une atmosphère rétro et cinématographique.',
    shortDescription: 'Affiche vintage skyline de New York.',
    isBestSeller: true,
    isNew: false,
    createdAt: '2025-06-15',
  },
  {
    id: 'prod-10',
    name: 'Carte du Monde Ancienne',
    slug: 'carte-monde-ancienne',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&h=800&fit=crop',
    ],
    category: 'Cartes & Plans',
    categorySlug: 'cartes-plans',
    tags: ['carte', 'monde', 'ancien', 'exploration'],
    formats: ['A3', '30x40', '50x70', '70x100'],
    colors: ['sépia', 'beige', 'brun'],
    description: 'Reproduction d\'une carte du monde ancienne aux teintes sépia. Idéale pour les passionnés de voyages et d\'histoire.',
    shortDescription: 'Carte du monde ancienne style sépia.',
    isBestSeller: false,
    isNew: true,
    createdAt: '2026-01-20',
  },
  {
    id: 'prod-11',
    name: 'Vague Japonaise',
    slug: 'vague-japonaise',
    price: 19.90,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop',
    ],
    category: 'Vintage Déco',
    categorySlug: 'vintage-deco',
    tags: ['japon', 'vague', 'hokusai', 'art'],
    formats: ['A5', 'A4', 'A3', '30x40', '50x70'],
    colors: ['bleu', 'blanc', 'indigo'],
    description: 'Interprétation décorative inspirée de la grande vague. Un classique revisité pour les amateurs d\'art asiatique.',
    shortDescription: 'Affiche décorative inspirée de l\'art japonais.',
    isBestSeller: true,
    isNew: false,
    createdAt: '2025-07-10',
  },
  {
    id: 'prod-12',
    name: 'Lisbonne Vintage',
    slug: 'lisbonne-vintage',
    price: 19.90,
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=800&fit=crop',
    ],
    category: 'Villes & Voyage',
    categorySlug: 'villes-voyage',
    tags: ['lisbonne', 'portugal', 'tramway', 'vintage'],
    formats: ['A4', 'A3', '30x40', '50x70'],
    colors: ['jaune', 'bleu', 'terracotta'],
    description: 'Affiche vintage de Lisbonne avec le célèbre tramway jaune. Ambiance chaleureuse et couleurs du Portugal.',
    shortDescription: 'Affiche vintage du tramway de Lisbonne.',
    isBestSeller: false,
    isNew: true,
    createdAt: '2026-02-28',
  },
];

export const packs: Pack[] = [
  {
    id: 'pack-1',
    name: '2 pour 10€',
    slug: '2-pour-10',
    price: 10,
    originalPrice: 19.90 * 2,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=600&h=800&fit=crop',
    ],
    products: ['prod-1', 'prod-3'],
    description: 'Choisissez 2 affiches format A5 pour seulement 10€. L\'offre idéale pour commencer votre collection.',
    shortDescription: '2 affiches A5 au choix pour 10€.',
    type: '2-pour-10',
    isBestSeller: true,
    isNew: false,
  },
  {
    id: 'pack-2',
    name: 'Set Travel Vintage',
    slug: 'set-travel-vintage',
    price: 44.90,
    originalPrice: 19.90 * 3,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=600&h=800&fit=crop',
    ],
    products: ['prod-1', 'prod-4', 'prod-9'],
    description: 'Trio d\'affiches voyage vintage : Paris, Côte d\'Azur et New York. Parfait pour créer un mur de cadres thématique.',
    shortDescription: '3 affiches voyage vintage à prix réduit.',
    type: 'set-de-3',
    isBestSeller: true,
    isNew: false,
  },
  {
    id: 'pack-3',
    name: 'Set Mer & Surf',
    slug: 'set-mer-surf',
    price: 44.90,
    originalPrice: 19.90 * 3,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1455729552457-5c322b382173?w=600&h=800&fit=crop',
    ],
    products: ['prod-2', 'prod-5'],
    description: 'Set de 3 affiches sur le thème de l\'océan et du surf. Ambiance côte atlantique garantie.',
    shortDescription: '3 affiches mer & surf pour une ambiance océan.',
    type: 'set-de-3',
    isBestSeller: false,
    isNew: true,
  },
  {
    id: 'pack-4',
    name: 'Collection Botanique',
    slug: 'collection-botanique',
    price: 79.90,
    originalPrice: 17.90 * 6,
    image: 'https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&h=800&fit=crop',
    ],
    products: ['prod-3', 'prod-8'],
    description: 'Collection complète de 6 planches botaniques. Un ensemble harmonieux pour créer un mur végétal graphique.',
    shortDescription: '6 planches botaniques pour un mur végétal.',
    type: 'set-de-6',
    isBestSeller: false,
    isNew: false,
  },
  {
    id: 'pack-5',
    name: 'Gallery Wall — Mix Vintage',
    slug: 'gallery-wall-mix-vintage',
    price: 89.90,
    originalPrice: 140,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=600&h=800&fit=crop',
    ],
    products: ['prod-1', 'prod-4', 'prod-7', 'prod-9', 'prod-11'],
    description: 'Gallery wall composée de 6 affiches vintage en formats mixtes. Prête à accrocher, disposition suggérée incluse.',
    shortDescription: 'Gallery wall 6 affiches vintage, formats mixtes.',
    type: 'gallery-wall',
    isBestSeller: true,
    isNew: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getPacksByType(type: Pack['type']): Pack[] {
  return packs.filter((p) => p.type === type);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
