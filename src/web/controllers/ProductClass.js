import prisma from "../../DB/db.config.js";


class ProductClass {
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