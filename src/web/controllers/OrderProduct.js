

class OrderProductClass {

    static async createOrderProduct(req, res) {
        // const { product_id, quantity, userId } = req.body;

        processMultipleOrders(orders)
        .then((result) => console.log(result))
        .catch((error) => console.error("Error processing orders:", error.message));


        res.send(req.body);
    }
}

export default OrderProductClass;


const processMultipleOrders = async (orders) => {
    return prisma.$transaction(async (tx) => {
      // Fetch product details for stock validation
      const productIds = orders.map((order) => order.productId);
      const products = await tx.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, stock: true },
      });
  
      // Map product stock by ID
      const productStockMap = new Map(products.map((p) => [p.id, p.stock]));
  
      // Validate stock availability
      for (const order of orders) {
        const availableStock = productStockMap.get(order.productId) ?? 0;
        if (order.quantity > availableStock) {
          throw new Error(`Insufficient stock for product ID: ${order.productId}`);
        }
      }
  
      // Update stock and insert orders
      const updateStockPromises = orders.map((order) =>
        tx.product.update({
          where: { id: order.productId },
          data: { stock: { decrement: order.quantity } },
        })
      );
  
      const createOrdersPromises = orders.map((order) =>
        tx.order.create({
          data: {
            userId: order.userId,
            productId: order.productId,
            quantity: order.quantity,
          },
        })
      );
  
      // Execute all updates and inserts in parallel
      const successOrder = await Promise.all([...updateStockPromises, ...createOrdersPromises]);
  
      console.log("Orders placed:-----", successOrder);
      console.log("End placed:----------------------------",);

      return { message: "Orders placed successfully!" };
    });
  };