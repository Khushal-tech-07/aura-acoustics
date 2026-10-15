import fs from 'node:fs';
import path from 'node:path';

export interface Product {
  id: string;
  name: string;
  category: 'Bluetooth' | 'Home Theatre' | 'Portable' | 'Smart Speaker';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  description: string;
  specifications: {
    wattage: string;
    frequencyResponse?: string;
    connectivity?: string;
    batteryLife?: string;
    impedance?: string;
    drivers?: string;
    dimensions?: string;
    weight?: string;
    waterproofRating?: string;
  };
  imageUrl: string;
  imageAlt: string;
  stock: number;
  inStock: boolean;
  featured: boolean;
  badge?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  status: 'confirmed' | 'processing' | 'shipped';
  createdAt: string;
}

export interface DatabaseSchema {
  products: Product[];
  contacts: ContactMessage[];
  newsletter: NewsletterSubscriber[];
  orders: Order[];
}

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'spk-001',
    name: 'AURA Zenith Reference 9',
    category: 'Home Theatre',
    price: 1499,
    originalPrice: 1699,
    rating: 4.9,
    reviewsCount: 84,
    shortDescription: 'Flagship 3-way floorstanding tower speaker with dual carbon-fiber woofers and beryllium dome tweeter.',
    description: 'The Zenith Reference 9 represents the pinnacle of electro-acoustic engineering. Handcrafted with an anechoically optimized cabinet and dual 8-inch woven carbon woofers, it delivers ultra-low distortion, visceral dynamic impact, and transparent high frequencies that reveal the subtle breath of every live recording.',
    specifications: {
      wattage: '350W RMS (700W Peak Handling)',
      frequencyResponse: '28Hz – 42kHz ±2dB',
      connectivity: 'Bi-wire Gold-Plated Binding Posts, HDMI eARC, XLR Balanced',
      impedance: '8 Ohms nominal (4.2 Ohms minimum)',
      drivers: '1x 1" Pure Beryllium Tweeter, 1x 5.25" Ceramic Midrange, 2x 8" Carbon Woofers',
      dimensions: '1120 x 240 x 380 mm',
      weight: '34.5 kg per tower'
    },
    imageUrl: '/images/zenith-9.jpg',
    imageAlt: 'AURA Zenith Reference 9 Floorstanding Tower Speaker',
    stock: 8,
    inStock: true,
    featured: true,
    badge: 'Flagship Master',
    createdAt: new Date('2026-01-10').toISOString()
  },
  {
    id: 'spk-002',
    name: 'AURA Studio Monitor X5',
    category: 'Bluetooth',
    price: 699,
    originalPrice: 799,
    rating: 4.8,
    reviewsCount: 142,
    shortDescription: 'High-resolution active nearfield studio monitors with lossless aptX HD and studio-grade DSP tuning.',
    description: 'Engineered for audio mastering engineers and serious audiophiles alike. Features custom bi-amplified Class-D architecture driving matched 5.25-inch Kevlar woofers and silk dome tweeters for surgical acoustic precision across any workspace.',
    specifications: {
      wattage: '160W Bi-amplified (80W per monitor)',
      frequencyResponse: '42Hz – 28kHz',
      connectivity: 'Bluetooth 5.3 aptX HD / LDAC, Optical Toslink, USB-C 24-bit/192kHz, Dual TRS Balanced',
      drivers: '5.25" Kevlar Cone Woofer, 1" High-dispersion Silk Dome',
      dimensions: '280 x 178 x 215 mm',
      weight: '6.8 kg (pair)'
    },
    imageUrl: '/images/studio-x5.jpg',
    imageAlt: 'AURA Studio Monitor X5 Active Pair',
    stock: 15,
    inStock: true,
    featured: true,
    badge: 'Studio Grade',
    createdAt: new Date('2026-01-15').toISOString()
  },
  {
    id: 'spk-003',
    name: 'AURA Nomad Pro Explorer',
    category: 'Portable',
    price: 299,
    rating: 4.9,
    reviewsCount: 219,
    shortDescription: 'Military-grade IP67 waterproof outdoor speaker with 360-degree dispersion and 32-hour battery life.',
    description: 'Built to conquer wilderness expeditions and beachside gatherings without sacrificing acoustic fidelity. Encased in ballistic woven nylon and CNC machined aircraft aluminum end caps with dual high-excursion passive radiators.',
    specifications: {
      wattage: '65W RMS Dynamic Bass Boost',
      frequencyResponse: '50Hz – 20kHz',
      batteryLife: '32 Hours (10,400mAh with USB-C PowerBank reverse charge)',
      connectivity: 'Bluetooth 5.4, Auracast Multi-unit Broadcast, 3.5mm AUX',
      waterproofRating: 'IP67 Submersible (up to 1m for 30 minutes)',
      dimensions: '230 x 95 x 95 mm',
      weight: '1.45 kg'
    },
    imageUrl: '/images/nomad-pro.jpg',
    imageAlt: 'AURA Nomad Pro Explorer Rugged Outdoor Speaker',
    stock: 28,
    inStock: true,
    featured: true,
    badge: 'Best Seller',
    createdAt: new Date('2026-01-20').toISOString()
  },
  {
    id: 'spk-004',
    name: 'AURA CinemaSphere 7.1.4 Soundbar',
    category: 'Home Theatre',
    price: 1199,
    originalPrice: 1399,
    rating: 4.9,
    reviewsCount: 96,
    shortDescription: 'Discrete 11-channel spatial audio system with Dolby Atmos, DTS:X, and wireless 10-inch 300W subwoofer.',
    description: 'Transform your living room into an immersive cinema hall. Fourteen precision-angled drivers direct sound off your ceiling and walls, paired with intelligent room acoustic calibration to place every soundtrack effect in 3D physical space.',
    specifications: {
      wattage: '820W Total System Power (520W Bar + 300W Sub)',
      frequencyResponse: '24Hz – 22kHz',
      connectivity: 'Dual HDMI 2.1 eARC (4K 120Hz Passthrough), Wi-Fi 6, AirPlay 2, Spotify Connect, Optical',
      drivers: '14 Custom Transducers including up-firing height channels + 10" Wireless Sub',
      dimensions: 'Soundbar: 1180 x 68 x 120 mm | Sub: 320 x 410 x 320 mm',
      weight: 'Soundbar: 5.6 kg | Sub: 12.8 kg'
    },
    imageUrl: '/images/cinemasphere.jpg',
    imageAlt: 'AURA CinemaSphere 7.1.4 Dolby Atmos Soundbar System',
    stock: 9,
    inStock: true,
    featured: true,
    badge: 'Dolby Atmos',
    createdAt: new Date('2026-01-25').toISOString()
  },
  {
    id: 'spk-005',
    name: 'AURA Pulse Smart Node',
    category: 'Smart Speaker',
    price: 349,
    rating: 4.7,
    reviewsCount: 168,
    shortDescription: 'Intelligent acoustic sphere with high-res multi-room streaming, room-sensing acoustics, and capacitive dial.',
    description: 'The convergence of minimalist geometric design and audiophile acoustic reproduction. Equipped with 3-microphone beamforming arrays and automated room calibration, the Pulse Smart Node sounds sublime in any room corner.',
    specifications: {
      wattage: '90W RMS Omni-directional Array',
      frequencyResponse: '38Hz – 24kHz',
      connectivity: 'AirPlay 2, Google Cast, Spotify Connect, Bluetooth 5.3, Gigabit Ethernet',
      drivers: '1x 4.5" Down-firing Woofer, 3x 1.25" Silk Dome Mid-Tweeters',
      dimensions: '190 x 190 x 205 mm',
      weight: '2.9 kg'
    },
    imageUrl: '/images/pulse-node.jpg',
    imageAlt: 'AURA Pulse Smart Node Speaker',
    stock: 19,
    inStock: true,
    featured: false,
    badge: 'Multi-Room',
    createdAt: new Date('2026-02-01').toISOString()
  },
  {
    id: 'spk-006',
    name: 'AURA Apex Bookshelf V2',
    category: 'Bluetooth',
    price: 549,
    originalPrice: 620,
    rating: 4.8,
    reviewsCount: 112,
    shortDescription: 'Walnut & brushed aluminum active bookshelf speakers with integrated phono pre-amp for vinyl turntables.',
    description: 'Designed specifically for vinyl record collectors and digital streaming purists. Features a built-in low-noise MM phono stage, custom magnetic acoustically transparent grills, and warm, lifelike mid-range reproduction.',
    specifications: {
      wattage: '120W Total RMS',
      frequencyResponse: '48Hz – 24kHz',
      connectivity: 'Switchable Phono/Line RCA, Optical, Bluetooth 5.2 LDAC, Subwoofer Out',
      drivers: '4.5" Anodized Aluminum Cone, 0.75" Titanium Dome Tweeter',
      dimensions: '245 x 155 x 190 mm',
      weight: '5.4 kg (pair)'
    },
    imageUrl: '/images/apex-bookshelf.jpg',
    imageAlt: 'AURA Apex Bookshelf V2 Active Speakers',
    stock: 11,
    inStock: true,
    featured: false,
    createdAt: new Date('2026-02-05').toISOString()
  },
  {
    id: 'spk-007',
    name: 'AURA SoundPebble Mini',
    category: 'Portable',
    price: 149,
    rating: 4.6,
    reviewsCount: 340,
    shortDescription: 'Ultra-compact pocket transducer engineered with dual titanium passive radiators for shocking bass depth.',
    description: 'Weighing less than 500 grams, the SoundPebble Mini slips easily into your jacket or backpack while producing sound pressure levels that defy its micro silhouette. Rugged drop-proof silicone bumpers make it road-ready.',
    specifications: {
      wattage: '30W RMS Deep Bass Tuning',
      frequencyResponse: '75Hz – 18kHz',
      batteryLife: '18 Hours (Fast Charge: 15 min gives 3 hours)',
      connectivity: 'Bluetooth 5.3, Stereo Party Link',
      waterproofRating: 'IP68 Dust & Waterproof',
      dimensions: '140 x 85 x 45 mm',
      weight: '490 g'
    },
    imageUrl: '/images/soundpebble.jpg',
    imageAlt: 'AURA SoundPebble Mini Ultra Portable Speaker',
    stock: 45,
    inStock: true,
    featured: false,
    createdAt: new Date('2026-02-10').toISOString()
  },
  {
    id: 'spk-008',
    name: 'AURA Grand Stage 500 Master',
    category: 'Home Theatre',
    price: 2499,
    originalPrice: 2800,
    rating: 5.0,
    reviewsCount: 38,
    shortDescription: 'Handcrafted master reference tower with acoustic labyrinth bass reflex and planar magnetic ribbon tweeters.',
    description: 'Our uncompromising statement piece. Crafted in a bespoke limited production run, the Grand Stage 500 features proprietary planar magnetic ribbon drivers that achieve transient response speeds previously considered impossible in dynamic loudspeakers.',
    specifications: {
      wattage: '500W RMS Continuous Handling',
      frequencyResponse: '20Hz – 50kHz Ultra-wideband',
      connectivity: 'Bi-wire Solid Silver Binding Posts, Balanced Neutrik SpeakON',
      impedance: '4 Ohms nominal',
      drivers: '3" Pure Planar Ribbon Tweeter, 6.5" Neodymium Midrange, Dual 10" Poly-composite Subwoofers',
      dimensions: '1340 x 290 x 440 mm',
      weight: '48.0 kg per tower'
    },
    imageUrl: '/images/grand-stage-500.jpg',
    imageAlt: 'AURA Grand Stage 500 Master Reference Tower',
    stock: 4,
    inStock: true,
    featured: true,
    badge: 'Limited Masterpiece',
    createdAt: new Date('2026-02-12').toISOString()
  },
  {
    id: 'spk-009',
    name: 'AURA Orbit Wireless Surround Pair',
    category: 'Smart Speaker',
    price: 479,
    rating: 4.7,
    reviewsCount: 78,
    shortDescription: 'Zero-latency wireless rear satellite pair designed to expand CinemaSphere or function as stereo satellites.',
    description: 'Eliminate speaker wire runs across your floor. Operating over proprietary 5.8GHz low-latency wireless transmission, the Orbit pair provides pinpoint rear sound localization for movies, concerts, and next-gen gaming.',
    specifications: {
      wattage: '2x 75W Class-D Amplifiers',
      frequencyResponse: '55Hz – 22kHz',
      batteryLife: 'Optional 12-Hour Rechargeable Pack or Direct AC Power',
      connectivity: '5.8GHz Ultra-low latency (<2ms), Wi-Fi, Bluetooth 5.2',
      dimensions: '160 x 120 x 135 mm each',
      weight: '1.8 kg each'
    },
    imageUrl: '/images/orbit-surround.jpg',
    imageAlt: 'AURA Orbit Wireless Surround Pair',
    stock: 16,
    inStock: true,
    featured: false,
    createdAt: new Date('2026-02-18').toISOString()
  },
  {
    id: 'spk-010',
    name: 'AURA Carbon Sub 12 Pro',
    category: 'Home Theatre',
    price: 899,
    originalPrice: 999,
    rating: 4.9,
    reviewsCount: 92,
    shortDescription: '12-inch 600W front-firing active powered subwoofer with dual passive radiators and app-controlled EQ.',
    description: 'Subterranean bass that shakes the floor with absolute musical discipline. The Carbon Sub 12 Pro reaches into infrasonic octaves without bloat, utilizing closed-loop digital servo control to eliminate cone overshoot.',
    specifications: {
      wattage: '600W RMS (1200W Peak Dynamic)',
      frequencyResponse: '18Hz – 180Hz (-3dB)',
      connectivity: 'LFE Balanced XLR, Stereo Line In, Wireless Link Module',
      drivers: '12" High-excursion Carbon Driver + Dual 10" Opposed Radiators',
      dimensions: '420 x 400 x 420 mm',
      weight: '26.2 kg'
    },
    imageUrl: '/images/carbon-sub-12.jpg',
    imageAlt: 'AURA Carbon Sub 12 Pro Active Subwoofer',
    stock: 7,
    inStock: true,
    featured: false,
    badge: 'Deep Bass 18Hz',
    createdAt: new Date('2026-02-22').toISOString()
  },
  {
    id: 'spk-011',
    name: 'AURA Horizon Soundbar Compact',
    category: 'Home Theatre',
    price: 399,
    rating: 4.6,
    reviewsCount: 135,
    shortDescription: 'Compact all-in-one soundbar with integrated bass ports, dialogue enhancement, and optical/HDMI ARC.',
    description: 'Streamlined design tailored for compact apartments and desktop entertainment setups. Delivers crisp movie dialogue with dedicated speech enhancement algorithms and deep ambient stereo width.',
    specifications: {
      wattage: '120W Total Dynamic Output',
      frequencyResponse: '50Hz – 20kHz',
      connectivity: 'HDMI ARC, Optical Toslink, Bluetooth 5.1, 3.5mm AUX',
      drivers: '4x Full-range Neodymium Oval Drivers, 2x Bass Reflex Ports',
      dimensions: '650 x 60 x 95 mm',
      weight: '2.4 kg'
    },
    imageUrl: '/images/horizon-compact.jpg',
    imageAlt: 'AURA Horizon Soundbar Compact',
    stock: 22,
    inStock: true,
    featured: false,
    createdAt: new Date('2026-02-25').toISOString()
  },
  {
    id: 'spk-012',
    name: 'AURA Trekker Tactical Sound System',
    category: 'Portable',
    price: 379,
    rating: 4.8,
    reviewsCount: 154,
    shortDescription: 'Heavy-duty outdoor party speaker with acoustic light ring, 1/4" mic/instrument input, and 24-hr battery.',
    description: 'Built for tailgates, musicians, outdoor fitness trainers, and rooftop parties. Equipped with a dynamic acoustic light indicator that responds to frequency beats, dual microphone inputs, and an armored chassis.',
    specifications: {
      wattage: '140W RMS (104dB Max SPL)',
      frequencyResponse: '45Hz – 22kHz',
      batteryLife: '24 Hours (Fast charge: 20 min = 4 hrs playback)',
      connectivity: 'Bluetooth 5.3, Dual 1/4" Instrument/Mic Inputs, USB Playback & Powerbank',
      waterproofRating: 'IPX5 Water Resistant',
      dimensions: '360 x 220 x 200 mm',
      weight: '4.8 kg'
    },
    imageUrl: '/images/trekker-tactical.jpg',
    imageAlt: 'AURA Trekker Tactical Sound System',
    stock: 13,
    inStock: true,
    featured: false,
    createdAt: new Date('2026-03-01').toISOString()
  }
];

export const INITIAL_CONTACTS: ContactMessage[] = [
  {
    id: 'msg-001',
    name: 'Marcus Vance',
    email: 'marcus.vance@soundlab.io',
    subject: 'Studio Acoustic Installation Inquiry',
    message: 'Hello AURA team, we are designing a 7.1.4 Dolby Atmos mixing suite in Seattle and would love to consult on integrating the Zenith Reference 9 alongside CinemaSphere surrounds.',
    status: 'read',
    createdAt: new Date('2026-02-14T10:30:00Z').toISOString()
  },
  {
    id: 'msg-002',
    name: 'Elena Rostova',
    email: 'elena@audiophilemag.com',
    subject: 'Press Review Sample Request: Studio X5',
    message: 'We are conducting our annual Active Nearfield Monitor shootout for the upcoming Q2 editorial. We would be honored to include the Studio Monitor X5 pair.',
    status: 'unread',
    createdAt: new Date('2026-03-02T14:15:00Z').toISOString()
  }
];

class DatabaseManager {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.load();
  }

  private load(): DatabaseSchema {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.products && Array.isArray(parsed.products)) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Error loading database file, initializing defaults:', err);
    }

    const initialData: DatabaseSchema = {
      products: INITIAL_PRODUCTS,
      contacts: INITIAL_CONTACTS,
      newsletter: [
        { id: 'sub-001', email: 'audiophile.fan@example.com', subscribedAt: new Date().toISOString() }
      ],
      orders: []
    };

    this.saveDirect(initialData);
    return initialData;
  }

  private saveDirect(data: DatabaseSchema) {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write database file:', err);
    }
  }

  public save() {
    this.saveDirect(this.data);
  }

  public getProducts(): Product[] {
    return this.data.products;
  }

  public getProductById(id: string): Product | undefined {
    return this.data.products.find((p) => p.id === id);
  }

  public addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
    const newProduct: Product = {
      ...product,
      id: `spk-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString()
    };
    this.data.products.unshift(newProduct);
    this.save();
    return newProduct;
  }

  public deleteProduct(id: string): boolean {
    const initialLength = this.data.products.length;
    this.data.products = this.data.products.filter((p) => p.id !== id);
    if (this.data.products.length !== initialLength) {
      this.save();
      return true;
    }
    return false;
  }

  public getContacts(): ContactMessage[] {
    return this.data.contacts;
  }

  public addContact(contact: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>): ContactMessage {
    const newContact: ContactMessage = {
      ...contact,
      id: `msg-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    this.data.contacts.unshift(newContact);
    this.save();
    return newContact;
  }

  public updateContactStatus(id: string, status: 'unread' | 'read' | 'replied'): ContactMessage | null {
    const item = this.data.contacts.find((c) => c.id === id);
    if (item) {
      item.status = status;
      this.save();
      return item;
    }
    return null;
  }

  public addNewsletter(email: string): boolean {
    const cleanEmail = email.toLowerCase().trim();
    const exists = this.data.newsletter.some((s) => s.email.toLowerCase() === cleanEmail);
    if (exists) return true;

    this.data.newsletter.unshift({
      id: `sub-${Date.now().toString(36)}`,
      email: cleanEmail,
      subscribedAt: new Date().toISOString()
    });
    this.save();
    return true;
  }

  public createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    this.data.orders.unshift(newOrder);
    this.save();
    return newOrder;
  }

  public resetToDefaults() {
    this.data = {
      products: [...INITIAL_PRODUCTS],
      contacts: [...INITIAL_CONTACTS],
      newsletter: [
        { id: 'sub-001', email: 'audiophile.fan@example.com', subscribedAt: new Date().toISOString() }
      ],
      orders: []
    };
    this.save();
    return this.data;
  }
}

export const db = new DatabaseManager();
