import { Request, Response } from "express";
import prisma from "../utils/prismaConfig.ts";
import {
  add,
  cleanCartService,
  getCartItems,
  removeFromCartService
} from "../services/productServices.ts";

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const [products, productCount] = await Promise.all([
      prisma.product.findMany(),
      prisma.product.count()
    ]);

    res.json({
      products,
      productCount,
      message: "Products fetched successfully"
    });
  } catch {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getCart = async (req: Request, res: Response) => {
  const cartId = req.cookies?.cartId;

  if (!cartId) {
    return res.json({
      message: "Cart is empty",
      cart: []
    });
  }

  const cart = await getCartItems(cartId);

  res.json({
    message: "Cart fetched successfully",
    cart
  });
};


export const addToCart = async (req: Request, res: Response) => {
  const cartId = req.cartId;
  const productId = req.params.id;

  const cart = await add(cartId, productId);

  res.json({
    message: "Product added to cart successfully",
    cart
  });
};

export const removeFromCart = async (req: Request, res: Response) => {
  const cartId = req.cartId;
  const productId = req.params.id;

  const result = await removeFromCartService(cartId, productId);

  res.json({
    message: "Product removed from cart",
    result
  });
};

export const cleanCart = async (req: Request, res: Response) => {
  const cartId = req.cartId;
  const data = await cleanCartService(cartId);
  res.json({
    message: "Cart cleaned successfully",
    data
  });
}
