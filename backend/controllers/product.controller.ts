import { Request, Response } from 'express';
import { db, Product } from '../db/database.js';

export const getProducts = (req: Request, res: Response) => {
  try {
    const { category, search, sort, minPrice, maxPrice, inStockOnly } = req.query;
    let products = db.getProducts();

    if (category && category !== 'All') {
      products = products.filter((p) => p.category.toLowerCase() === (category as string).toLowerCase());
    }

    if (search && typeof search === 'string' && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.specifications.wattage.toLowerCase().includes(q) ||
          (p.specifications.connectivity && p.specifications.connectivity.toLowerCase().includes(q))
      );
    }

    if (inStockOnly === 'true') {
      products = products.filter((p) => p.inStock && p.stock > 0);
    }

    if (minPrice && !isNaN(Number(minPrice))) {
      products = products.filter((p) => p.price >= Number(minPrice));
    }

    if (maxPrice && !isNaN(Number(maxPrice))) {
      products = products.filter((p) => p.price <= Number(maxPrice));
    }

    if (sort) {
      switch (sort) {
        case 'price-asc':
          products = [...products].sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          products = [...products].sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          products = [...products].sort((a, b) => b.rating - a.rating);
          break;
        case 'name':
          products = [...products].sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'featured':
        default:
          products = [...products].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
          break;
      }
    }

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving products' });
  }
};

export const getProductById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = db.getProductById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: `Product with ID '${id}' not found` });
    }

    // Also find related products from same or adjacent category
    const all = db.getProducts();
    const related = all
      .filter((p) => p.id !== product.id && (p.category === product.category || p.featured))
      .slice(0, 3);

    res.json({
      success: true,
      data: product,
      related
    });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving product' });
  }
};

export const createProduct = (req: Request, res: Response) => {
  try {
    const { name, category, price, shortDescription, specifications, rating, stock, imageUrl } = req.body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ success: false, message: 'Valid product name is required' });
    }
    if (!category || !['Bluetooth', 'Home Theatre', 'Portable', 'Smart Speaker'].includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Category must be one of: Bluetooth, Home Theatre, Portable, Smart Speaker'
      });
    }
    if (price === undefined || isNaN(Number(price)) || Number(price) <= 0) {
      return res.status(400).json({ success: false, message: 'Valid price greater than 0 is required' });
    }
    if (!shortDescription || typeof shortDescription !== 'string') {
      return res.status(400).json({ success: false, message: 'Product short description is required' });
    }

    const newProduct = db.addProduct({
      name: name.trim(),
      category: category as Product['category'],
      price: Number(price),
      originalPrice: req.body.originalPrice ? Number(req.body.originalPrice) : undefined,
      rating: rating && !isNaN(Number(rating)) ? Math.min(5, Math.max(1, Number(rating))) : 5.0,
      reviewsCount: 1,
      shortDescription: shortDescription.trim(),
      description: req.body.description?.trim() || shortDescription.trim(),
      specifications: {
        wattage: specifications?.wattage || '100W RMS',
        frequencyResponse: specifications?.frequencyResponse || '45Hz – 20kHz',
        connectivity: specifications?.connectivity || 'Bluetooth 5.3, AUX',
        batteryLife: specifications?.batteryLife,
        impedance: specifications?.impedance,
        drivers: specifications?.drivers || 'High Performance Audio Transducer',
        dimensions: specifications?.dimensions || 'Compact Acoustic Enclosure',
        weight: specifications?.weight || '2.5 kg',
        waterproofRating: specifications?.waterproofRating
      },
      imageUrl: imageUrl?.trim() || '/images/default-speaker.jpg',
      imageAlt: `${name} Speaker`,
      stock: stock !== undefined && !isNaN(Number(stock)) ? Math.max(0, Number(stock)) : 10,
      inStock: stock !== undefined ? Number(stock) > 0 : true,
      featured: Boolean(req.body.featured),
      badge: req.body.badge?.trim() || undefined
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: 'Failed to create product' });
  }
};

export const deleteProduct = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteProduct(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: `Product with ID '${id}' not found` });
    }

    res.json({
      success: true,
      message: `Product with ID '${id}' deleted successfully`
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
};

export const resetProducts = (_req: Request, res: Response) => {
  try {
    db.resetToDefaults();
    res.json({
      success: true,
      message: 'Database reset to default audiophile sample catalog'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to reset database' });
  }
};
