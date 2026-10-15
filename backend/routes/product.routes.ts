import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  resetProducts
} from '../controllers/product.controller.js';

const router = Router();

// REST API Endpoints for Products
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.post('/reset/seed', resetProducts);

export default router;
