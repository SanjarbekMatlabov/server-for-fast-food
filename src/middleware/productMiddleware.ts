import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      cartId: string;
    }
  }
}

export const productMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let cartId = req.cookies?.cartId;

  if (!cartId) {
    cartId = crypto.randomUUID();
  }

  res.cookie("cartId", cartId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.MODE === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });   

  req.cartId = cartId;
  next();
};
