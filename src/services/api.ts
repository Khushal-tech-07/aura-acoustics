import { Product, ContactMessage, Order } from '../types';

export interface ProductFilters {
  category?: string;
  search?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
}

export const api = {
  // Products
  async getProducts(filters?: ProductFilters): Promise<{ products: Product[]; count: number }> {
    const params = new URLSearchParams();
    if (filters?.category && filters.category !== 'All') {
      params.append('category', filters.category);
    }
    if (filters?.search) {
      params.append('search', filters.search);
    }
    if (filters?.sort) {
      params.append('sort', filters.sort);
    }
    if (filters?.minPrice !== undefined) {
      params.append('minPrice', filters.minPrice.toString());
    }
    if (filters?.maxPrice !== undefined) {
      params.append('maxPrice', filters.maxPrice.toString());
    }
    if (filters?.inStockOnly) {
      params.append('inStockOnly', 'true');
    }

    const res = await fetch(`/api/products?${params.toString()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }
    const json = await res.json();
    return {
      products: json.data || [],
      count: json.count || 0
    };
  },

  async getProductById(id: string): Promise<{ product: Product; related: Product[] }> {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch product with id ${id}`);
    }
    const json = await res.json();
    return {
      product: json.data,
      related: json.related || []
    };
  },

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to create product');
    }
    const json = await res.json();
    return json.data;
  },

  async deleteProduct(id: string): Promise<boolean> {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to delete product');
    }
    const json = await res.json();
    return json.success;
  },

  async resetDefaultProducts(): Promise<void> {
    const res = await fetch('/api/products/reset/seed', {
      method: 'POST'
    });
    if (!res.ok) {
      throw new Error('Failed to reset default catalog');
    }
  },

  // Contact Form
  async submitContact(data: { name: string; email: string; subject?: string; message: string }): Promise<ContactMessage> {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to submit contact inquiry');
    }
    const json = await res.json();
    return json.data;
  },

  async getContacts(): Promise<ContactMessage[]> {
    const res = await fetch('/api/contact');
    if (!res.ok) {
      throw new Error('Failed to fetch contact inquiries');
    }
    const json = await res.json();
    return json.data || [];
  },

  async updateContactStatus(id: string, status: 'unread' | 'read' | 'replied'): Promise<ContactMessage> {
    const res = await fetch(`/api/contact/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) {
      throw new Error('Failed to update message status');
    }
    const json = await res.json();
    return json.data;
  },

  // Newsletter
  async subscribeNewsletter(email: string): Promise<string> {
    const res = await fetch('/api/contact/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to subscribe');
    }
    const json = await res.json();
    return json.message;
  },

  // Orders / Checkout
  async createOrder(orderPayload: any): Promise<Order> {
    const res = await fetch('/api/contact/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to process order');
    }
    const json = await res.json();
    return json.data;
  }
};
