import express from 'express';

import { addToCart, cleanCart, getCart, getProducts, removeFromCart } from '../controllers/cart.controller.ts';
import { productMiddleware } from '../middleware/productMiddleware.ts';

const router = express.Router();

router.get('/products', getProducts);
router.get('/cart', getCart)
router.post('/add/:id',productMiddleware , addToCart )
router.post('/del/:id',productMiddleware , removeFromCart )
router.post('/del/cart/:id',productMiddleware , cleanCart )

export default router;