import prisma from "../utils/prismaConfig.ts";

export const add = async (cartId: string, productId: string) => {
  await prisma.cart.upsert({
    where: { id: cartId },
    update: {},
    create: { id: cartId }
  });

  await prisma.cartItem.upsert({
    where: {
      cartId_productId: { cartId, productId }
    },
    update: {
      qty: { increment: 1 }
    },
    create: {
      cartId,
      productId,
      qty: 1
    }
  });

  return getCartItems(cartId);
};

export const getCartItems = async (cartId: string) => {
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  return cart?.items || [];
};

export const removeFromCartService = async (
  cartId: string,
  productId: string
) => {
  const item = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId, productId } }
  });

  if (!item) return "not_found";

  if (item.qty <= 1) {
    await prisma.cartItem.delete({
      where: { cartId_productId: { cartId, productId } }
    });
    return "deleted";
  }

  await prisma.cartItem.update({
    where: { cartId_productId: { cartId, productId } },
    data: { qty: { decrement: 1 } }
  });

  return "decremented";
};
export const cleanCartService = async (cartId: string) => {
  await prisma.cartItem.deleteMany({
    where: {
      cartId
    }
  });
}