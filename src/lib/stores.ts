export type Store = {
  id: string;
  city: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  image: string;
  alt: string;
  mapsQuery: string;
};

export const stores: Store[] = [
  {
    id: 'mumbai-bandra',
    city: 'Mumbai',
    name: 'Chai Society · Bandra',
    address: 'Hill Road, Bandra West, Mumbai',
    hours: '8:00 AM – 11:00 PM',
    phone: '+91 00000 00000',
    image: 'https://images.pexels.com/photos/18988624/pexels-photo-18988624.jpeg?auto=compress&cs=tinysrgb&h=900&w=700',
    alt: 'Warm cafe interior with wooden furniture and hanging plants',
    mapsQuery: 'Hill Road Bandra West Mumbai',
  },
  {
    id: 'bengaluru-indiranagar',
    city: 'Bengaluru',
    name: 'Chai Society · Indiranagar',
    address: '100 Feet Road, Indiranagar, Bengaluru',
    hours: '7:30 AM – 11:30 PM',
    phone: '+91 00000 00000',
    image: 'https://images.pexels.com/photos/30915537/pexels-photo-30915537.jpeg?auto=compress&cs=tinysrgb&h=900&w=700',
    alt: 'Warm and inviting cafe with modern decor',
    mapsQuery: '100 Feet Road Indiranagar Bengaluru',
  },
  {
    id: 'delhi-khan',
    city: 'Delhi',
    name: 'Chai Society · Khan Market',
    address: 'Khan Market, New Delhi',
    hours: '8:00 AM – 11:00 PM',
    phone: '+91 00000 00000',
    image: 'https://images.pexels.com/photos/10940365/pexels-photo-10940365.jpeg?auto=compress&cs=tinysrgb&h=900&w=700',
    alt: 'Coffeeshop filled with rustic wicker elements and plants',
    mapsQuery: 'Khan Market New Delhi',
  },
];
