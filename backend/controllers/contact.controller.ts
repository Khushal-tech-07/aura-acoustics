import { Request, Response } from 'express';
import { db } from '../db/database.js';

export const getContacts = (_req: Request, res: Response) => {
  try {
    const contacts = db.getContacts();
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving contact messages' });
  }
};

export const createContact = (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Please provide a valid name (minimum 2 characters)' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return res.status(400).json({ success: false, message: 'Message must be at least 10 characters long' });
    }

    const newContact = db.addContact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: (subject && typeof subject === 'string' && subject.trim()) || 'General Audio Inquiry',
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been received by our acoustic engineering team.',
      data: newContact
    });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ success: false, message: 'Failed to submit contact message' });
  }
};

export const updateContactStatus = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['unread', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be unread, read, or replied' });
    }

    const updated = db.updateContactStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.json({
      success: true,
      message: 'Message status updated',
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update message status' });
  }
};

export const subscribeNewsletter = (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    db.addNewsletter(email);
    res.json({
      success: true,
      message: 'Welcome to AURA ACOUSTICS Inner Circle. You will receive private release notifications.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to subscribe to newsletter' });
  }
};

export const createOrder = (req: Request, res: Response) => {
  try {
    const { customer, items, subtotal, discount, shipping, tax, total, paymentMethod } = req.body;

    if (!customer || !customer.name || !customer.email || !customer.address) {
      return res.status(400).json({ success: false, message: 'Customer name, email, and shipping address are required' });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart items cannot be empty' });
    }

    const order = db.createOrder({
      customer,
      items,
      subtotal: Number(subtotal) || 0,
      discount: Number(discount) || 0,
      shipping: Number(shipping) || 0,
      tax: Number(tax) || 0,
      total: Number(total) || 0,
      paymentMethod: paymentMethod || 'credit-card'
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ success: false, message: 'Failed to process order' });
  }
};
