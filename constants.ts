
import { Product } from './types';

export const PIZZAS: Product[] = [
  {
    id: 'p1',
    name: 'Pepperoni Lover',
    description: 'Doble pepperoni, extra queso mozzarella y nuestra salsa secreta.',
    price: 12.99,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqpJHj1CEjKV-T4j1OgklgZFjMX3xXUAT0Ap5yxoVimzc7Ul-LHbpkALlUuAUjBLWyNQCBTWg9kmt-RArvfsFpG0WT2YSBh3LN1h6CCzGTsPvI-uD5C1ys-lcJNRjq1hlvcukSztVa_lHascQ367XFHXRPI5xo_3uejaCpJ96cziITQzXYi2U7B0POXnDXMdYUpFrXPpLq1IUAYhQ9sVSoFZRmded2X70HjXx2R4yu6rRa9h4jpo1fO0LZ8AikssX0S6HlG2wUAQ',
    category: 'Clásicas',
    popular: false
  },
  {
    id: 'p2',
    name: 'Hawaiana Tropical',
    description: 'Jamón selecto, piña fresca, queso mozzarella y base de tomate.',
    price: 11.50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZfhpeMJ3m6EPgG7SWynuqvwcJgeaQUYTNoxce1qiLsqhaglLNcMN5ylMN5wYTHEaFgyEO2P2lydPDmTtfcaVKWDmkwB3MCsSP3sWoJGih3t9ysfjAKXUXYjhHW1GhgRfF0VMl7dI5fJnsmwamUN4VFLg0_xnfUOgs1o_lsEETgiZ16ZWcmztRgEPYLLqU22OmPy62T5PgLMnJKT6uIK1x6S-f7yRcOi02clm02HjJJIHwAoP8esU4KD01y7l1f99nhOOt-UgNlQ',
    category: 'Clásicas',
    popular: false
  },
  {
    id: 'p3',
    name: 'BBQ Chicken',
    description: 'Pollo a la parrilla, cebolla morada, salsa BBQ ahumada y cilantro.',
    price: 14.25,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGxff1m6QOcCBcJjid32mK_t3mm1avZVeamlbTq8_mSyovWlREatijvWgSLoggCLOiOJwDJ69Jv1L9fjOCZaxcd8Jy94Gv5wYu-gXs2qOlMJyz2CJ8OdPqjNVDwked-r_-BmufsvereXE6j2iwhA3WPiyzNVkhdRCLZMj2Hz8MMS7MM-R2rY5lOQ0-LyOx3waHySxgDOAwxLZFKHJ4FNnHp3PE3Lv4v4R9YlOuis5stO4mgtPQ600CyJX3lxwTqUsA9u5nZ_LJoQ',
    category: 'Especiales',
    popular: true
  }
];

export const SIDES: Product[] = [
  {
    id: 's1',
    name: 'Coca-Cola',
    description: 'Bebida refrescante 600ml.',
    price: 1.50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6raS6PsIqQudNNR5xeJ638KPsfjJBnl179AtgOeeNlgQWnRf7gHwzzlriF73_9IBHhrxzffNQbdmCBC-DPUg4XONaVYp8TYB8x3XGw3ESWGZSL3qDgxWn1ypjIwBsOfhUYHQ58ticcvknzdX4fcWRSv73c11kZeMTAPo_M1tmx9RZ10vIx5L8K9dhbvfv73UVKKT2osm-QUuiARejRrrOz1ssl0Zh6VmsAl-oD_vOjY4wRJzUTz2AmKw8UWQqp2xCPeT7dWR3zA',
    category: 'Bebidas'
  },
  {
    id: 's2',
    name: 'Nudos de Ajo',
    description: '4 nudos de pan con mantequilla de ajo.',
    price: 3.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW3nPKgw2PPX_L7CmvBFQd5qKgOT6U5NMhY66gSLXRHdArAtcckU1sBiqaatav6V5J6Shn3mcT2itQpAUcm8TLNHMMd7BkWPNwfaoiFWSb68_3SnxzEkbA8_5BX1vPMDSUbfksob1kmfTniHaB6GOroC2lGDKZPeWzcGXIN-3pyyhuF8V316UmRqrWzW-sowzyHx0CrOvq4wdXdhDXHoireah5N9EZ-LQBUBhctDkQU1NGOlsQ1Do1PyinQqGTxAudv7UOBcjU6A',
    category: 'Entradas'
  }
];

export const CATEGORIES = ['Todas', 'Clásicas', 'Especiales', 'Vegetarianas'];

export const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBN9WkSEB6AmAUhUF6mlllpZFc_Eo7qxRWjHkxVRiGr4wvrRrPhjxLq-RYhvZfolPfpi1SjMR-XIrsSz3YT5dwcLmZELolBfdvb9Dhp2NTxYnMmfD0EJMDm1F2mDE3Hdwm-qNjB_5fJsJ4tyRwtmX67bfJ5hRuGTUbeZpXZ1XputDYB65YvxfE6QdQukm-_Ne67nymycyIUsOV25nGWLpDxYeFLSvlAusQrmHGUv3tWjCLHHsAZRn9GorgIsW_QW2Jc2GnqP43S8A';
