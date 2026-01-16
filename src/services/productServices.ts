import prisma from "../utils/prismaConfig.ts";



export const add = async (cartId: string, productId: string) => {
    await prisma.cart.upsert({
        where: { id: cartId },
        update: {},
        create: { id: cartId }
    })
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
    })
    return getCartItems(cartId);
}

export const getCartItems = async (cartId: string) => {

    const cart = await prisma.cart.findUnique({
        where: { id: cartId },
        include:{
            items:{
                include:{
                    product:true
                }
            }
        }
    })
    
}

export const removeFromCartService = async (cartId: string, productId: string,qty:number) => {
    if(qty <=0){
        await prisma.cartItem.delete({
            where: {cartId_productId: {cartId, productId} }
        })
        return "success delete"
    }
    await prisma.cartItem.update({
        where: { cartId_productId: { cartId, productId } },
        data: { qty }
    });
    return "success update"
}