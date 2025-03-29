import { Prisma } from "@prisma/client";
import prisma from "../../DB/db.config.js";

class ProductClass {


    static async submitSearchfiletr(req, res) {
        try{
            const searchParams = `%${req.params.title.toLowerCase()}%`
            const data = await prisma.$queryRaw`
                SELECT  id, product_id, product_name, 
                rating, price, discount, category,
                image[0] AS coverimage
                FROM "Product"
                WHERE product_name ILIKE ${searchParams}
            `
            res.send(data)
        }catch(err){
            console.log(err)
            res.send('something is wrong')
        }
    }

    static async likesearchfiletr(req, res) {
        try{
            const searchParams = `%${req.params.title.toLowerCase()}%`
            const data = await prisma.$queryRaw`
                SELECT  product_id,
                    image[0] AS coverimage,
                    product_name,  -- Convert to lowercase
                    rating
                FROM "Product"
                WHERE product_name ILIKE ${searchParams}
                LIMIT 8
            `
            res.send(data)
        }catch(err){
            console.log(err)
            res.send('something is wrong')
        }
    }


  static async singleProductView(req, res) {
    const peoductid = await req?.params?.id;
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
        product_id: peoductid,
      },
    });

    console.log(peoductid);
    res.send(quickViewData);
  }

  static async allProducts(req, res) {
    // const data = await prisma.$queryRaw`
    //         SELECT 
    //             id, product_id, product_name, 
    //             rating, price, discount, category,
    //             image[0] AS coverimage 
    //         FROM "Product"
    //         ORDER BY product_id
    //         LIMIT 5
    //         OFFSET 5
    //         `;
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

    console.log(data[0].products.length);
    res.send(data[0]);
  }



  static async featuredProducts(req, res) {
    const data = await prisma.$queryRaw`
            SELECT 
                id, product_id, product_name, 
                rating, price, discount, category,
                image[0] AS coverimage
            FROM "Product"
            ORDER BY "createdAt"
            LIMIT 8;`;
    res.send(data);
  }

  static async hotBestRatedProduct(req, res) {
    try {
      const dara = await prisma.$queryRaw`  
            WITH BestSeller AS (
                SELECT 
                    p.product_id,
                    p.image[0] AS coverimage,
                    p.product_name,
                    p.price::DECIMAL AS price,
                    p.rating
                FROM "orderHistory" oh
                JOIN "Product" p ON oh.product_id = p.product_id
                GROUP BY p.product_id, p.product_name, p.price, p.rating, coverimage
                ORDER BY SUM(oh.quantity) DESC
                LIMIT 3
            ),
            TopRated AS (
                SELECT 
                    product_id,
                    image[0] AS coverimage,
                    product_name,
                    price::DECIMAL AS price,
                    rating
                FROM "Product"
                ORDER BY rating DESC
                LIMIT 3
            ),
            HotDeals AS (
                SELECT 
                    product_id,
                    image[0] AS coverimage,
                    product_name,
                    price::DECIMAL AS price,
                    rating
                FROM "Product"
                ORDER BY price
                LIMIT 3
            )
            SELECT json_agg(category) AS result
            FROM (
                SELECT json_build_object('Hot Deals', (SELECT json_agg(HotDeals) FROM HotDeals)) AS category
                UNION ALL
                SELECT json_build_object('Best Seller', (SELECT json_agg(BestSeller) FROM BestSeller)) AS category
                UNION ALL
                SELECT json_build_object('Top Rated', (SELECT json_agg(TopRated) FROM TopRated)) AS category
            ) AS categories;
        `;
        res.send(dara[0]['result']);

    } catch (err) {
      console.log(err);
      res.send("something wrong");
    }
  }

  static async relatedProducts(req, res) {
    try {
      const data = await prisma.$queryRaw`
            SELECT 
                id, product_id, product_name, 
                rating, price, discount,
                image[0] AS coverimage 
            FROM "Product" 
            WHERE category = ${req.query.category}
            AND product_id != ${req.query.product_id}
            LIMIT 4;`;

      res.send(data);
    } catch (err) {
      console.log(err);
      res.send({ msg: "related product", error_msg: err });
    }
  }

  static async wishlist(req, res) {
    try {
      const query = req.query.item;

      let isQueryArray;
      if (!query) return res.send([]);
      if (query && !Array.isArray(query)) {
        isQueryArray = [query];
      } else {
        isQueryArray = query;
      }

      const data = await prisma.$queryRaw(Prisma.sql`
                SELECT 
                    id, product_id, product_name, 
                    price, discount, "stock_Status",
                    image[0] AS coverimage 
                FROM "Product" WHERE product_id IN (${Prisma.join(
                  isQueryArray
                )});`);
      res.send(data);
    } catch (err) {
      console.log("wishlist", err);
      res.send("internal server Error");
    }
  }

  static async fillter(req, res) {
    try {
      const data = await prisma.$queryRaw`
                SELECT 
                    DISTINCT category
                FROM "Product"
            `;
      res.send(data);
    } catch (err) {
      console.log(err);
      res.send("Error - ", err);
    }
  }
}

export default ProductClass;
