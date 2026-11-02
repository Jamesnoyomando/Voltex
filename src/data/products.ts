export type Category = 'laptops' | 'phones' | 'tablets' | 'audio' | 'accessories'

export interface Product {
  id: string
  slug: string
  name: string
  category: Category
  tagline: string
  description: string
  price: number
  oldPrice?: number
  inStock: boolean
  colour: string
  image: string
  alt: string
  specs: { label: string; value: string }[]
}

export const CATEGORIES: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All devices' },
  { id: 'laptops', label: 'Laptops' },
  { id: 'phones', label: 'Phones' },
  { id: 'tablets', label: 'Tablets' },
  { id: 'audio', label: 'Audio' },
  { id: 'accessories', label: 'Accessories' },
]

export function categoryLabel(category: Category): string {
  return CATEGORIES.find((c) => c.id === category)?.label ?? 'Devices'
}

export function formatKwacha(amount: number): string {
  const rounded = Math.round(amount * 100) / 100
  return `K${rounded.toLocaleString('en-US', {
    minimumFractionDigits: Number.isInteger(rounded) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`
}

const shot = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const PRODUCTS: Product[] = [
  {
    id: 'p-aero-14',
    slug: 'aero-14-laptop',
    name: 'Aero 14 laptop',
    category: 'laptops',
    tagline: '16GB RAM, 512GB SSD, 14-inch display',
    description:
      'A 1.3kg aluminium laptop for lectures, spreadsheets and design work. The battery runs a full working day and the keyboard is backlit for load-shedding evenings.',
    price: 21500,
    oldPrice: 24900,
    inStock: true,
    colour: 'Silver',
    image: shot('1517336714731-489689fd1ca8'),
    alt: 'Silver laptop open on a wooden desk with its screen off',
    specs: [
      { label: 'Processor', value: '10-core, 3.4GHz' },
      { label: 'Memory', value: '16GB LPDDR5' },
      { label: 'Storage', value: '512GB SSD' },
      { label: 'Battery', value: 'Up to 14 hours' },
    ],
  },
  {
    id: 'p-studio-13',
    slug: 'studio-13-laptop',
    name: 'Studio 13 laptop',
    category: 'laptops',
    tagline: '8GB RAM, 256GB SSD, 13-inch display',
    description:
      'The everyday laptop for email, accounting and streaming. Light enough for a backpack, tough enough for a commuter bag.',
    price: 12400,
    inStock: true,
    colour: 'Graphite',
    image: shot('1496181133206-80ce9b88a853'),
    alt: 'Dark laptop on a desk beside an open notebook',
    specs: [
      { label: 'Processor', value: '6-core, 2.8GHz' },
      { label: 'Memory', value: '8GB' },
      { label: 'Storage', value: '256GB SSD' },
      { label: 'Weight', value: '1.1kg' },
    ],
  },
  {
    id: 'p-pro-16',
    slug: 'pro-16-laptop',
    name: 'Pro 16 laptop',
    category: 'laptops',
    tagline: '32GB RAM, 1TB SSD, dedicated graphics',
    description:
      'For video editors and engineers who render on the machine. Handles 4K timelines, large codebases and a second monitor without complaint.',
    price: 28900,
    inStock: true,
    colour: 'Space grey',
    image: shot('1593642632823-8f785ba67e45'),
    alt: 'Laptop on a white desk with an external monitor behind it',
    specs: [
      { label: 'Processor', value: '14-core, 4.1GHz' },
      { label: 'Memory', value: '32GB' },
      { label: 'Graphics', value: '8GB dedicated' },
      { label: 'Ports', value: 'HDMI, 2x USB-C, SD' },
    ],
  },
  {
    id: 'p-air-13',
    slug: 'air-13-laptop',
    name: 'Air 13 laptop',
    category: 'laptops',
    tagline: '16GB RAM, 512GB SSD, fanless body',
    description:
      'Silent, fanless and thin. Weighs under a kilogram, so it disappears into a tote bag and still runs a full day of tabs.',
    price: 17300,
    inStock: false,
    colour: 'Silver',
    image: shot('1541807084-5c52b6b3adef'),
    alt: 'Thin silver laptop standing open on a table',
    specs: [
      { label: 'Processor', value: '8-core, 3.2GHz' },
      { label: 'Memory', value: '16GB' },
      { label: 'Storage', value: '512GB SSD' },
      { label: 'Weight', value: '0.98kg' },
    ],
  },
  {
    id: 'p-nova-12',
    slug: 'nova-12-phone',
    name: 'Nova 12 phone',
    category: 'phones',
    tagline: '256GB storage, triple camera, 5G',
    description:
      'A 6.7-inch screen that stays readable in sunlight, a 5,000mAh battery and a camera that handles Lusaka evenings without a flash.',
    price: 8900,
    inStock: true,
    colour: 'Midnight',
    image: shot('1511707171634-5f897ff02aa9'),
    alt: 'Black smartphone held upright in a hand against a blurred street',
    specs: [
      { label: 'Display', value: '6.7-inch OLED' },
      { label: 'Storage', value: '256GB' },
      { label: 'Camera', value: '50MP + 12MP + 8MP' },
      { label: 'Battery', value: '5,000mAh' },
    ],
  },
  {
    id: 'p-nova-11',
    slug: 'nova-11-phone',
    name: 'Nova 11 phone',
    category: 'phones',
    tagline: '128GB storage, dual camera, dual SIM',
    description:
      'The dependable upgrade. Dual SIM keeps work and personal lines separate, and 128GB holds two years of photos.',
    price: 7400,
    oldPrice: 8200,
    inStock: true,
    colour: 'Pearl',
    image: shot('1592750475338-74b7b21085ab'),
    alt: 'White smartphone showing its rear camera module',
    specs: [
      { label: 'Display', value: '6.1-inch OLED' },
      { label: 'Storage', value: '128GB' },
      { label: 'Camera', value: '48MP + 12MP' },
      { label: 'SIM', value: 'Dual SIM' },
    ],
  },
  {
    id: 'p-orbit-x',
    slug: 'orbit-x-phone',
    name: 'Orbit X phone',
    category: 'phones',
    tagline: '512GB storage, periscope zoom, 5G',
    description:
      'The camera phone for weddings and events. A periscope lens pulls faces out of a crowded room and 512GB keeps the whole gallery.',
    price: 11200,
    inStock: true,
    colour: 'Slate',
    image: shot('1601784551446-20c9e07cdbdb'),
    alt: 'Dark smartphone lying flat on a pale surface',
    specs: [
      { label: 'Display', value: '6.8-inch OLED' },
      { label: 'Storage', value: '512GB' },
      { label: 'Camera', value: '108MP + 10x zoom' },
      { label: 'Battery', value: '5,200mAh' },
    ],
  },
  {
    id: 'p-nova-lite',
    slug: 'nova-lite-phone',
    name: 'Nova Lite phone',
    category: 'phones',
    tagline: '128GB storage, large battery, 4G',
    description:
      'Built for a first smartphone or a second line. Two days on a charge if you are careful, and a screen big enough to read on.',
    price: 5600,
    inStock: true,
    colour: 'Ocean',
    image: shot('1512499617640-c74ae3a79d37'),
    alt: 'Smartphone with a dark screen resting on a wooden table',
    specs: [
      { label: 'Display', value: '6.5-inch LCD' },
      { label: 'Storage', value: '128GB' },
      { label: 'Camera', value: '50MP + 5MP' },
      { label: 'Battery', value: '6,000mAh' },
    ],
  },
  {
    id: 'p-slate-11',
    slug: 'slate-11-tablet',
    name: 'Slate 11 tablet',
    category: 'tablets',
    tagline: '11-inch display, 256GB, stylus included',
    description:
      'A tablet for notes, scripts and Netflix on the sofa. The stylus comes in the box, so nothing is sold separately.',
    price: 9800,
    inStock: true,
    colour: 'Silver',
    image: shot('1561154464-82e9adf32764'),
    alt: 'Tablet on a wooden desk with a stylus resting beside it',
    specs: [
      { label: 'Display', value: '11-inch 120Hz' },
      { label: 'Storage', value: '256GB' },
      { label: 'Stylus', value: 'Included' },
      { label: 'Battery', value: 'Up to 12 hours' },
    ],
  },
  {
    id: 'p-slate-mini',
    slug: 'slate-mini-tablet',
    name: 'Slate Mini tablet',
    category: 'tablets',
    tagline: '8-inch display, 128GB, one-hand grip',
    description:
      'Small enough to hold in one hand on a bus, big enough for a school assignment. Kids can use it, and the case is included.',
    price: 6200,
    inStock: true,
    colour: 'Graphite',
    image: shot('1615663245857-ac93bb7c39e7'),
    alt: 'Tablet held in one hand against a plain background',
    specs: [
      { label: 'Display', value: '8.3-inch' },
      { label: 'Storage', value: '128GB' },
      { label: 'Weight', value: '310g' },
      { label: 'Extras', value: 'Protective case' },
    ],
  },
  {
    id: 'p-slate-pro',
    slug: 'slate-pro-tablet',
    name: 'Slate Pro tablet',
    category: 'tablets',
    tagline: '12.9-inch display, 512GB, keyboard folio',
    description:
      'A tablet that replaces a laptop for writing, drawing and presentations. Ships with the keyboard folio, not as an extra.',
    price: 13600,
    inStock: true,
    colour: 'Space grey',
    image: shot('1544244015-0df4b3ffc6b0'),
    alt: 'Large tablet propped on a desk with a keyboard folio',
    specs: [
      { label: 'Display', value: '12.9-inch OLED' },
      { label: 'Storage', value: '512GB' },
      { label: 'Keyboard', value: 'Folio included' },
      { label: 'Ports', value: 'USB-C' },
    ],
  },
  {
    id: 'p-halo-over',
    slug: 'halo-over-ear-headphones',
    name: 'Halo over-ear headphones',
    category: 'audio',
    tagline: 'Noise cancelling, 40-hour battery',
    description:
      'Cuts the noise of a minibus and a shared office. Forty hours on a charge, and the cups fold flat into the case.',
    price: 2200,
    inStock: true,
    colour: 'Black',
    image: shot('1505740420928-5e560c06d30e'),
    alt: 'Black over-ear headphones resting on a dark surface',
    specs: [
      { label: 'Driver', value: '40mm' },
      { label: 'Battery', value: '40 hours' },
      { label: 'Noise cancel', value: 'Hybrid ANC' },
      { label: 'Case', value: 'Included' },
    ],
  },
  {
    id: 'p-halo-studio',
    slug: 'halo-studio-headphones',
    name: 'Halo Studio headphones',
    category: 'audio',
    tagline: 'Wired studio pair, detachable cable',
    description:
      'Flat, honest sound for mixing and recording. No battery to charge, no pairing to fight with at 2am.',
    price: 3400,
    inStock: true,
    colour: 'Grey',
    image: shot('1583394838336-acd977736f90'),
    alt: 'Grey studio headphones with a coiled cable on a light background',
    specs: [
      { label: 'Driver', value: '45mm' },
      { label: 'Impedance', value: '32 ohm' },
      { label: 'Connection', value: '3.5mm, detachable' },
      { label: 'Cable', value: '2.5m coiled' },
    ],
  },
  {
    id: 'p-air-buds',
    slug: 'air-buds-pro',
    name: 'Air Buds Pro',
    category: 'audio',
    tagline: 'True wireless, charging case, IPX4',
    description:
      'Small buds that stay in during a run. The case adds three extra charges and fits in a coin pocket.',
    price: 1850,
    oldPrice: 2100,
    inStock: true,
    colour: 'White',
    image: shot('1600294037681-c80b4cb5b434'),
    alt: 'White wireless earbuds with their charging case open',
    specs: [
      { label: 'Battery', value: '6h + 18h case' },
      { label: 'Water', value: 'IPX4 splash' },
      { label: 'Charging', value: 'USB-C' },
      { label: 'Mic', value: 'Dual, call noise cut' },
    ],
  },
  {
    id: 'p-loud-mini',
    slug: 'loud-mini-speaker',
    name: 'Loud Mini speaker',
    category: 'audio',
    tagline: 'Portable Bluetooth, 12-hour battery',
    description:
      'Loud enough for a braai, small enough for a bag. Twelve hours of playtime and a strap loop for a fence post.',
    price: 1200,
    inStock: true,
    colour: 'Charcoal',
    image: shot('1608043152269-423dbba4e7e1'),
    alt: 'Portable Bluetooth speaker standing on a concrete ledge',
    specs: [
      { label: 'Output', value: '20W' },
      { label: 'Battery', value: '12 hours' },
      { label: 'Bluetooth', value: '5.3, 20m range' },
      { label: 'Water', value: 'IPX5' },
    ],
  },
  {
    id: 'p-tempo-watch',
    slug: 'tempo-watch',
    name: 'Tempo watch',
    category: 'accessories',
    tagline: 'Fitness tracking, 7-day battery',
    description:
      'Steps, heart rate and sleep on your wrist for a week at a time. Charging cable and an extra strap in the box.',
    price: 2600,
    inStock: true,
    colour: 'Black',
    image: shot('1523275335684-37898b6baf30'),
    alt: 'Black smartwatch with a leather strap lying on a white surface',
    specs: [
      { label: 'Battery', value: '7 days' },
      { label: 'Tracking', value: 'Steps, HR, sleep' },
      { label: 'Water', value: 'IP68' },
      { label: 'Strap', value: 'Two straps included' },
    ],
  },
  {
    id: 'p-type-65',
    slug: 'type-65-keyboard',
    name: 'Type 65 keyboard',
    category: 'accessories',
    tagline: 'Wireless mechanical, 3-device pairing',
    description:
      'A compact 65% keyboard that switches between your laptop, tablet and phone with one key.',
    price: 1450,
    inStock: true,
    colour: 'Cream',
    image: shot('1527814050087-3793815479db'),
    alt: 'Compact mechanical keyboard with light keycaps on a desk',
    specs: [
      { label: 'Layout', value: '65%, 68 keys' },
      { label: 'Connection', value: 'Bluetooth + USB-C' },
      { label: 'Battery', value: '3 months' },
      { label: 'Devices', value: '3 paired' },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}
