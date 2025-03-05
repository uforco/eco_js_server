import prisma from "../../DB/db.config.js";

class PtoductDetailsByUser {
  static async addToCardProductWithUser(req, res) {
    const { product_id, quantity, user_id } = req.body;

    // const cardInfo = await prisma.addToCart.create({
    //   data: req.body
    // });

    // const cardInfo = await prisma.$queryRaw`
    //     INSERT INTO addToCart (user_id, product_id, quantity, updatedAt)
    //     VALUES (${user_id}, ${product_id}, 1, NOW())
    //     ON CONFLICT (user_id, product_id)
    //     DO UPDATE SET quantity = cart.quantity + ${quantity}, updatedAt = NOW()
    //     RETURNING *;`
    const cardInfo = await prisma.$queryRaw`
        SELECT * FROM Product WHERE state = 'active';`

    console.log(cardInfo);

    res.send(cardInfo);
  }
}

export default PtoductDetailsByUser;
