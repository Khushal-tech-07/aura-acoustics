export interface ProductSpecifications {
  wattage: string;
  frequencyResponse: string;
  connectivity: string;
  batteryLife?: string;
  impedance?: string;
  drivers?: string;
  dimensions?: string;
  weight?: string;
  waterproofRating?: string;
}

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
  specifications: ProductSpecifications;
  imageUrl: string;
  imageAlt: string;
  stock: number;
  inStock: boolean;
  featured: boolean;
  badge?: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
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

export type PageRoute = 'home' | 'products' | 'product-detail' | 'about' | 'contact' | 'cart' | 'admin';
