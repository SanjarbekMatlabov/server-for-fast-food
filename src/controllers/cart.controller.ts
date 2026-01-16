import { Request, Response } from 'express';
import prisma from '../utils/prismaConfig.ts';
import { add, getCartItems, removeFromCartService } from '../services/productServices.ts';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const [products, productCount] = await Promise.all([
      prisma.product.findMany(),
      prisma.product.count(),
    ]);

    res.json({
      products,
      productCount,
      message: "Products fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getCart = async (req: Request, res: Response) => {
  const cartId = req.cookies.cartId;
  if (!cartId) {
    return res.status(400).json({ message: "No cart ID found in cookies", cart: [] });
  }
  const data =  await getCartItems(cartId);
  res.json({ message: "Cart fetched successfully", cart: data });
}

export const addToCart = async (req: Request, res: Response) => {
  const cartId = req.cartId;
  const productId = req.params.id;
  const data = await add(cartId, productId);
  res.json({ message: "Product added to cart successfully", data });
}

export const removeFromCart = async (req: Request, res: Response) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.id;
  const qty = req.body.qty
  const data = await removeFromCartService(cartId, productId, qty);
  return data
}
