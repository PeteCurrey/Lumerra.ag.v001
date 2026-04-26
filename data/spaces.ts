export interface LumerraSpace {
  slug: string;
  title: string;
  category: 'Urban Terrace' | 'Country Garden' | 'Coastal' | 'Nordic' | 'Contemporary' | 'Sustainable';
  designerBrief: string;
  heroImageUrl: string;
  shoppableProducts: {
    productId: string;
    name: string;
    price: number;
    x: number; // percentage position
    y: number;
  }[];
}

export const lumerraSpaces: LumerraSpace[] = [
  {
    slug: 'nordic-sanctuary',
    title: 'Nordic Sanctuary',
    category: 'Nordic',
    designerBrief: 'A study in minimalist recovery. This Cotswold project combines the Hekla Oslo sauna with the Zen Chiller cold plunge, set against a backdrop of charred timber and limestone.',
    heroImageUrl: '/images/spaces/nordic-sanctuary.jpg',
    shoppableProducts: [
      { productId: 'oslo', name: 'Hekla Oslo', price: 649900, x: 45, y: 60 },
      { productId: 'zen-chiller-system', name: 'Zen Chiller', price: 499900, x: 70, y: 75 },
    ],
  },
  {
    slug: 'urban-escape',
    title: 'Urban Escape',
    category: 'Urban Terrace',
    designerBrief: 'Maximising vertical stillness. A rooftop project in London featuring the Portofino hot tub, integrated into a cedar deck with year-round privacy screening.',
    heroImageUrl: '/images/spaces/urban-escape.jpg',
    shoppableProducts: [
      { productId: 'portofino', name: 'Portofino', price: 1249900, x: 50, y: 50 },
    ],
  },
];
