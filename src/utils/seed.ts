import prisma from "./prismaConfig.ts";
import { faker } from "@faker-js/faker"

const fastFoodNames = [
    'Cheeseburger',
    'Double Burger',
    'Chicken Burger',
    'Hot Dog',
    'Fried Chicken',
    'Chicken Nuggets',
    'Pepperoni Pizza',
    'Margherita Pizza',
    'BBQ Pizza',
    'Lavash',
    'Shawarma',
    'French Fries',
    'Onion Rings',
    'Club Sandwich',
    'Taco',
    'Burrito',
    'Doner Kebab',
    'Fish Burger',
    'Chicken Wrap',
    'Beef Wrap'
]

async function main() {
    console.log('🌱 Seeding 200 products...')

    const products = Array.from({ length: 200 }).map(() => {
        const name =
            fastFoodNames[Math.floor(Math.random() * fastFoodNames.length)] +
            ' ' +
            faker.word.adjective()

        return {
            name,
            price: faker.number.int({ min: 15000, max: 90000 }), 
            calories: faker.number.int({ min: 250, max: 1300 }),
            imageUrl: faker.image.urlPicsumPhotos({
                width: 600,
                height: 400
            })
        }
    })

    await prisma.product.createMany({
        data: products
    })

    console.log('✅ 200 products seeded successfully')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })