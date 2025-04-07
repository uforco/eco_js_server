import prisma from "../../DB/db.config.js";

class AdminProductAnalytics {
  static async totalProductChartMonth(req, res) {
    const products = await prisma.product.findMany({
      select: { createdAt: true },
    });

    const monthCounts = products.reduce((acc, product) => {
      const month = new Date(product.createdAt).toLocaleString("en-US", {
        month: "long",
      });

      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    const formattedData = Object.entries(monthCounts).map(
      ([month, Product]) => ({
        month,
        Product,
      })
    );

    res.send({ totalchart: formattedData });
  }
  static async createProduct(req, res) {
    try {

      // const data = await prisma.product.create({
      //   data: req.body,
      // });
      const data = await prisma.product.createMany({
        data: req.body,
      });
      res.send(data);


    } catch (error) {
      res.send({
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  }
  static async getProductStock(req, res) {
    // const products = await prisma.product.findMany({
    //   select: {
    //     id: true,
    //     product_name: true,
    //     category: true,
    //     brand_name: true,
    //     short_Description: true,
    //     image: true,
    //     price: true,
    //     discount: true,
    //     stock_Status: true,
    //     rating: true,
    //   },
    // });
    // console.log(products);

    try{
      const products = await prisma.$queryRaw`
        SELECT 
            id, product_id, product_name, category, brand_name,
            "short_Description", image[0] AS coverimage, price, discount, 
            "stock_Status", rating
        FROM "Product";
      `;
      res.send(products);
    }catch(err){
      console.log("get product stock - prisma db error :", err)
      res.send([]);
    }
    
  }
  static async updateStock(req, res) {
    const { id, stockStatus, stock } = req.body;

    const products = await prisma.product.update({
      where: {
        id,
      },
      data: {
        stock_Status: {
          increment: Number(stock),
        },
      },
    });
    res.send({ stock_Status: products.stock_Status });
  }
}

export default AdminProductAnalytics;
