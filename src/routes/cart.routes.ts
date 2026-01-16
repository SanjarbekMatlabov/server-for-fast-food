import express from 'express';

import { addToCart, getCart, getProducts } from '../controllers/cart.controller.ts';
import { productMiddleware } from '../middleware/productMiddleware.ts';

const router = express.Router();

router.get('/products', getProducts);
router.get('/cart', getCart)
router.post('/add/:id',productMiddleware , addToCart )

export default router;