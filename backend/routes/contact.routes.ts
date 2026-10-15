import { Router } from 'express';
import {
  getContacts,
  createContact,
  updateContactStatus,
  subscribeNewsletter,
  createOrder
} from '../controllers/contact.controller.js';

const router = Router();

// Contact messages endpoints
router.get('/', getContacts);
router.post('/', createContact);
router.patch('/:id/status', updateContactStatus);

// Newsletter & Order endpoints
router.post('/newsletter', subscribeNewsletter);
router.post('/order', createOrder);

export default router;
