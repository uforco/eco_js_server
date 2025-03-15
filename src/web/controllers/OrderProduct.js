import generateUniqueOrderId from "../../lib/generateUniqueOrderId.js";
import prisma from "./../../DB/db.config.js";

class OrderProductClass {
  static async createOrderProduct(req, res) {
    // const { product_id, quantity, userId } = req.body;
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
      console.error("Error creating order:", error.message);
      res.status(401).send({ message: "something is Wrong please Order try again" });
    } finally {
      await prisma.$disconnect();
    }

    // try {
    //   await prisma.orderHistory.deleteMany({});
    //   await prisma.deliyveryAddress.deleteMany({});
    //   await prisma.order.deleteMany({});

    //   console.log("All data deleted successfully.");
    // } catch (error) {
    //   console.error("Error deleting data:", error);
    // } finally {
    //   await prisma.$disconnect();
    // }

    // console.log(req.body)

    
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
