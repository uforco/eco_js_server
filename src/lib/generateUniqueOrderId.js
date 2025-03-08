import prisma from "../DB/db.config.js";


async function generateUniqueOrderId() {
    let order_id;
    let exists = true;
  
    while (exists) {
      order_id = `#${Math.floor(100000 + Math.random() * 900000)}`;
  
      const existingOrder = await prisma.order.findUnique({
        where: { order_id },
      });
  
      exists = !!existingOrder; 
    }
  
    return order_id;
  }

  export default generateUniqueOrderId;