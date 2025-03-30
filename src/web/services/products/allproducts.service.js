import prisma from "../../../DB/db.config.js";

export default async function allproductsService(req, res) {
    try{
        const limit = 12;
        const pagenumber = Number(req.query.page)*limit

        const data = await prisma.$queryRaw`
            WITH product_data AS (
                SELECT 
                    id, product_id, product_name, 
                    rating, price, discount, category,
                    image[0] AS coverimage
                FROM "Product"
                ORDER BY id
                LIMIT ${limit} OFFSET ${pagenumber}
            )
            SELECT 
                COALESCE(json_agg(product_data), '[]'::json) AS products, 
                (SELECT CEIL(COUNT(*)::FLOAT / ${limit}) FROM "Product") AS total_count
            FROM product_data;
        `;

        if(data[0].products && data[0].products.length){
            return data[0].products
        }
        return []
        
    }catch(err){
        console.log(" all product service - prisma db error :", err)
        return []
    }
}