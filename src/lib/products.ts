export type Category =
  | 'Chai'
  | 'Coffee'
  | 'Matcha'
  | 'Shakes'
  | 'Bun Maska'
  | 'Sandwiches'
  | 'Maggi'
  | 'Snacks'
  | 'Desserts';

export type Product = {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  image: string;
  alt: string;
  featured?: boolean;
};

export const categories: Category[] = [
  'Chai',
  'Coffee',
  'Matcha',
  'Shakes',
  'Bun Maska',
  'Sandwiches',
  'Maggi',
  'Snacks',
  'Desserts',
];

export const products: Product[] = [
  {
    id: 'masala-chai',
    name: 'Cutting Masala Chai',
    category: 'Chai',
    description: 'Slow-brewed Assam tea with crushed cardamom, ginger and full-cream milk.',
    price: 60,
    image: 'https://images.pexels.com/photos/31141291/pexels-photo-31141291.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    alt: 'Glass of masala chai on a wooden table',
    featured: true,
  },
  {
    id: 'kashmiri-chai',
    name: 'Kashmiri Pink Chai',
    category: 'Chai',
    description: 'Slow-steeped gulabi chai with saffron, pistachio and a pinch of sea salt.',
    price: 120,
    image: 'https://images.pexels.com/photos/5946612/pexels-photo-5946612.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    alt: 'Top view of Indian tea with milk, cinnamon and star anise',
  },
  {
    id: 'filter-coffee',
    name: 'South Indian Filter Coffee',
    category: 'Coffee',
    description: 'Robust chicory blend decoction, frothed hot in a steel tumbler & dabarah.',
    price: 90,
    image: 'https://images.pexels.com/photos/16541078/pexels-photo-16541078.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    alt: 'Latte art being poured into a coffee cup',
    featured: true,
  },
  {
    id: 'pour-over',
    name: 'Single Origin Pour Over',
    category: 'Coffee',
    description: 'Hand-poured Chikmagalur beans, bright acidity with notes of citrus & cocoa.',
    price: 180,
    image: 'https://images.pexels.com/photos/26711783/pexels-photo-26711783.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    alt: 'Barista preparing pour over coffee',
  },
  {
    id: 'iced-matcha',
    name: 'Iced Matcha Latte',
    category: 'Matcha',
    description: 'Stone-ground Uji matcha whisked with cold milk over hand-cut ice.',
    price: 160,
    image: 'https://images.pexels.com/photos/8004562/pexels-photo-8004562.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    alt: 'Iced matcha latte with ice cubes on a round table',
    featured: true,
  },
  {
    id: 'matcha-affogato',
    name: 'Matcha Affogato',
    category: 'Matcha',
    description: 'Cold vanilla bean gelato drowned in a shot of ceremonial-grade matcha.',
    price: 200,
    image: 'https://images.pexels.com/photos/34516941/pexels-photo-34516941.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    alt: 'Iced matcha latte in a branded glass',
  },
  {
    id: 'chocolate-shake',
    name: 'Belgian Chocolate Shake',
    category: 'Shakes',
    description: 'Thick 70% dark chocolate shake, whipped cream & toasted hazelnut.',
    price: 220,
    image: 'https://images.pexels.com/photos/14662100/pexels-photo-14662100.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    alt: 'Milkshake topped with whipped cream',
  },
  {
    id: 'mango-shake',
    name: 'Alphonso Mango Shake',
    category: 'Shakes',
    description: 'Seasonal Alphonso pulp blended with chilled milk & a dash of cardamom.',
    price: 210,
    image: 'https://images.pexels.com/photos/38921772/pexels-photo-38921772.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    alt: 'Chocolate and mango milkshakes',
  },
  {
    id: 'bun-maska',
    name: 'Bun Maska',
    category: 'Bun Maska',
    description: 'Toasted pao, generous layer of Amul butter & fruit jam. A Irani café classic.',
    price: 70,
    image: 'https://images.pexels.com/photos/166653/pexels-photo-166653.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    alt: 'Glazed freshly baked buns',
    featured: true,
  },
  {
    id: 'butter-toast',
    name: 'Butter Toast Platter',
    category: 'Bun Maska',
    description: 'Sourdough toast, salted butter, boiled eggs & a small cutting chai.',
    price: 140,
    image: 'https://images.pexels.com/photos/31755312/pexels-photo-31755312.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    alt: 'Person spreading butter on toast at a sunny cafe',
  },
  {
    id: 'panini',
    name: 'Grilled Garden Panini',
    category: 'Sandwiches',
    description: 'Pesto, mozzarella, sun-blushed tomato & rocket pressed in sourdough.',
    price: 240,
    image: 'https://images.pexels.com/photos/5555754/pexels-photo-5555754.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    alt: 'Grilled panini sandwiches on a wooden platter',
  },
  {
    id: 'croissant-sandwich',
    name: 'Butter Croissant Sandwich',
    category: 'Sandwiches',
    description: 'Flaky croissant with cream cheese, smoked cucumber & fresh dill.',
    price: 260,
    image: 'https://images.pexels.com/photos/28826335/pexels-photo-28826335.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    alt: 'Croissant and baguette sandwiches on marble',
  },
  {
    id: 'masala-maggi',
    name: 'Masala Maggi',
    category: 'Maggi',
    description: 'Street-style noodles tossed with butter, tomato, masala & coriander.',
    price: 110,
    image: 'https://images.pexels.com/photos/15504840/pexels-photo-15504840.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    alt: 'Plate of street food noodles',
    featured: true,
  },
  {
    id: 'cheese-maggi',
    name: 'Cheese & Chilli Maggi',
    category: 'Maggi',
    description: 'Maggi folded into molten cheddar, green chilli & a squeeze of lime.',
    price: 130,
    image: 'https://images.pexels.com/photos/35113190/pexels-photo-35113190.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    alt: 'Street food bowls of chaat and noodles',
  },
  {
    id: 'pakora',
    name: 'Onion Pakora & Chai',
    category: 'Snacks',
    description: 'Crisp besan onion fritters with green chutney & a complimentary chai.',
    price: 90,
    image: 'https://images.pexels.com/photos/29547418/pexels-photo-29547418.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    alt: 'Golden brown Indian pakoras on paper towel',
  },
  {
    id: 'chaat-platter',
    name: 'Society Chaat Platter',
    category: 'Snacks',
    description: 'A trio of sev puri, dahi bhalla & aloo tikki — for the whole table.',
    price: 180,
    image: 'https://images.pexels.com/photos/958547/pexels-photo-958547.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    alt: 'Assortment of Indian snacks on a tray',
  },
  {
    id: 'crepe-cake',
    name: 'Strawberry Crepe Cake',
    category: 'Desserts',
    description: 'Twenty layers of paper-thin crêpes, vanilla cream & macerated strawberry.',
    price: 280,
    image: 'https://images.pexels.com/photos/31251571/pexels-photo-31251571.png?auto=compress&cs=tinysrgb&h=900&w=600',
    alt: 'Slice of crepe cake topped with strawberry',
  },
  {
    id: 'caramel-mousse',
    name: 'Salted Caramel Mousse',
    category: 'Desserts',
    description: 'Silken caramel mousse, cocoa nib praline & a flake of Maldon salt.',
    price: 250,
    image: 'https://images.pexels.com/photos/19550623/pexels-photo-19550623.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    alt: 'Caramel mousse dessert on a white plate',
  },
];

export const menuFeatures = [
  {
    category: 'Chai',
    tagline: 'Brewed slow, served warm',
    image: 'https://images.pexels.com/photos/36326292/pexels-photo-36326292.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
    alt: 'Hot glass of masala chai on a sunlit table',
  },
  {
    category: 'Coffee',
    tagline: 'Modern energy, classic craft',
    image: 'https://images.pexels.com/photos/19080416/pexels-photo-19080416.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
    alt: 'A drink being poured at a cafe',
  },
  {
    category: 'Matcha',
    tagline: 'Fresh, green, ceremonial',
    image: 'https://images.pexels.com/photos/8004558/pexels-photo-8004558.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
    alt: 'Iced matcha latte with bamboo whisk',
  },
];
