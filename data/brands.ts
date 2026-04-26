export interface GroupBrand {
  id: string;
  name: string;
  tagline: string;
  domain: string;
  visualMode: 'light' | 'dark';
  brandColor: string; // primary accent hex
  secondaryColor?: string;
  description: string;
  active: boolean;
}

export const groupBrands: GroupBrand[] = [
  {
    id: 'lumerra',
    name: 'Lumerra',
    tagline: 'Light. Water. Stillness.',
    domain: 'lumerra.co.uk',
    visualMode: 'light',
    brandColor: '#8B6F47', // bronze
    description: 'Premium hot tubs, swim spas, and saunas.',
    active: true,
  },
  {
    id: 'ember',
    name: 'Ember',
    tagline: 'Fire. Feast. Gather.',
    domain: 'emberliving.co.uk',
    visualMode: 'dark',
    brandColor: '#FF6B35', // ember
    secondaryColor: '#D4832A', // amber
    description: 'Outdoor kitchens, grills, and fire pits.',
    active: true,
  },
  {
    id: 'warmpath',
    name: 'Warmpath',
    tagline: 'A warmer home starts here.',
    domain: 'warmpath.co.uk',
    visualMode: 'light',
    brandColor: '#4A5D4E', // sage
    description: 'Air source heat pumps and home energy upgrades.',
    active: true,
  },
  {
    id: 'grove',
    name: 'Grove',
    tagline: 'Space to be.',
    domain: 'grovecabins.co.uk',
    visualMode: 'light',
    brandColor: '#5D5D4A', // olive
    description: 'Modular garden rooms and wellness studios.',
    active: true,
  },
];
