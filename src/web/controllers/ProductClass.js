import prisma from "../../DB/db.config.js";


class ProductClass {
    // static async singleProductQuickView (req, res) {
    //     const peoductid = await req?.params?.id
    //     const quickViewData = await prisma.product.findUnique({
    //         select: {
    //             id: true,
    //             product_id: true,
    //             product_name: true,
    //             stock_Status: true,
    //             rating: true,
    //             price: true,
    //             discount: true,
    //             brand_name: true,
    //             short_Description: true,
    //             category: true,
    //             image: true
    //         },
    //         where: {
    //             product_id: peoductid
    //         }
    //     })

    //     console.log(peoductid)
    //     res.send(quickViewData)
    // }
    static async singleProductView (req, res) {

        const peoductid = await req?.params?.id

        const quickViewData = await prisma.product.findUnique({
            select: {
                id: true,
                product_id: true,
                product_name: true,
                stock_Status: true,
                rating: true,
                price: true,
                discount: true,
                brand_name: true,
                short_Description: true,
                category: true,
                image: true,
                description: true,
                qty: true,
                scale: true,
                type: true,
                tag: true,

            },
            where: {
                product_id: peoductid
            }
        })

        console.log(peoductid)
        res.send(quickViewData)
    }
    static async allProducts (req, res) {
        const data = await prisma.$queryRaw`
            SELECT 
                id, product_id, product_name, 
                rating, price, discount,
                image[0] AS coverimage 
            FROM "Product";`

        console.log("hit url ui")
        res.send(data)
    }
}

export default ProductClass;