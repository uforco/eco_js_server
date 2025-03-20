import generateUniqueOrderId from "../../lib/generateUniqueOrderId.js";
import prisma from "./../../DB/db.config.js";

class OrderProductClass {
  static async createOrderProduct(req, res) {
    try {
      const orderId = await generateUniqueOrderId();
      const newOrder = await prisma.order.create({
        data: {
          order_id: orderId,
          userId: req.body.userId,
          order_items: {
            create: req.body.order_items,
          },
          deliveryAddress: {
            create: req.body.deliveryAddress,
          },
        },
        include: {
          order_items: true,
          deliveryAddress: true,
        },
      });
      console.log("Order created successfully:", newOrder);
      res.send({message: "successfully", newOrder: newOrder })

    } catch (error) {
      console.error("Error creating order:", error);
      res.status(401).send({ message: "something is Wrong please Order try again" });
    } finally {
      await prisma.$disconnect();
    }
  }


  static async getAllOrdersbyUser(req, res) {
    try{
      const params = req.params.userid

      const data = await prisma.$queryRaw`
        SELECT 
          o.order_id,
          o.order_date,
          SUM(oi.total_price)::FLOAT AS total_price,
          CAST(COUNT(oi.id) AS TEXT)::INTEGER AS total_products,
          o.order_status
        FROM "Order" o
        LEFT JOIN "orderHistory" oi ON o.id = oi.order_cid
        WHERE o."userId" = ${params}
        GROUP BY o.id;
    `;
      res.send(data)
    }catch(err){
      console.log(err)
      res.send("server problem")
    }
  }



  static async getOrderDetailsByOrderId(req, res) {
    
    try{
      const params = `#${req.params.orderid}`

      const data = await prisma.$queryRaw`
        SELECT 
          o.id,
          o.order_date,
          CAST(COUNT(oi.id) AS TEXT)::INTEGER AS total_products,
          JSON_BUILD_OBJECT(
                'name', da.name,
                'address', da.address,
                'email', da.email,
                'phone', da.phone
          ) AS deliyveryAddress,
          o.order_progress,
          o.order_id,
          SUM(oi.price * oi.quantity)::FLOAT AS subtotal,
          SUM(oi.total_price)::FLOAT AS total,
          SUM(oi.discount) / COUNT(oi.id)::INTEGER AS total_discount,
          JSON_AGG(
              JSON_BUILD_OBJECT(
                  'item_name', p.product_name,
                  'image', p.Image[0],
                  -- 'price', CAST(oi.price - (oi.price * (oi.discount / 100)) AS DECIMAL(10,2)),
                  'price', oi.price,
                  'quantity', oi.quantity,
                  'subtotal', (oi.price * oi.quantity)
              )
          ) FILTER (WHERE oi.id IS NOT NULL) AS orderHistory
        FROM "Order" o
        LEFT JOIN "orderHistory" oi ON o.id = oi.order_cid
        LEFT JOIN "Product" p ON oi.product_id = p.product_id
        LEFT JOIN "deliyveryAddress" da ON o.id = da.order_cid
        WHERE o."order_id" = ${params}
        GROUP BY o.id, o.order_date, o.order_id, da.id, da.postcode, da.name, da.address, da.email, da.phone;
    `;

// ${params}

console.log(data)

      res.send(data)

    }catch(err){
      console.log(err)
      res.send("server problem")
    }
  }


}

export default OrderProductClass;

// const processMultipleOrders = async (orders) => {
//     return prisma.$transaction(async (tx) => {
//       // Fetch product details for stock validation
//       const productIds = orders.map((order) => order.productId);
//       const products = await tx.product.findMany({
//         where: { id: { in: productIds } },
//         select: { id: true, stock: true },
//       });

//       // Map product stock by ID
//       const productStockMap = new Map(products.map((p) => [p.id, p.stock]));

//       // Validate stock availability
//       for (const order of orders) {
//         const availableStock = productStockMap.get(order.productId) ?? 0;
//         if (order.quantity > availableStock) {
//           throw new Error(`Insufficient stock for product ID: ${order.productId}`);
//         }
//       }

//       // Update stock and insert orders
//       const updateStockPromises = orders.map((order) =>
//         tx.product.update({
//           where: { id: order.productId },
//           data: { stock: { decrement: order.quantity } },
//         })
//       );

//       const createOrdersPromises = orders.map((order) =>
//         tx.order.create({
//           data: {
//             userId: order.userId,
//             productId: order.productId,
//             quantity: order.quantity,
//           },
//         })
//       );

//       // Execute all updates and inserts in parallel
//       const successOrder = await Promise.all([...updateStockPromises, ...createOrdersPromises]);

//       console.log("Orders placed:-----", successOrder);
//       console.log("End placed:----------------------------",);

//       return { message: "Orders placed successfully!" };
//     });
//   };
