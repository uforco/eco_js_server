import prisma from "../../DB/db.config.js";
import { Prisma } from "@prisma/client";
import isExistsUser from "../../lib/isExistsUser.js";


class Shoppingcart {
  static async getAllCartProductWithUser(req, res) {
    try {
      const userId = req.params.userId;

    const cardinfo = await prisma.$queryRaw(
        Prisma.sql`
            SELECT c.cart_id, c."userId", c.product_id, c.quantity,
                    p.product_name,
                    p.price::FLOAT AS price, 
                    p.discount::INTEGER AS discount,
                    p.scale,
                    p."stock_Status",
                    image[0] as coverimage
            FROM "addToCart" c
            JOIN "Product" p ON c.product_id = p.product_id
            WHERE c."userId" = ${userId}
            `
        )
      console.log(cardinfo);
      res.send(cardinfo);
    } catch (error) {
      console.error("Error in upsert operation:", error);
      req.send({
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  }

  static async addToCardProductWithUser(req, res) {
    try {
      const { product_id, quantity, userId } = req.body;

      const userExists = await isExistsUser(userId);

      if (!userExists) {
        res.send({
          success: false,
          message: "Invalid user: The user does not exist",
        });
      }
      const cardInfo2 = await prisma.addToCart.upsert({
        where: {
          userId_product_id: { userId, product_id }, // Must match the unique constraint
        },
        update: {
          quantity: { increment: quantity }, // Increase quantity if product exists
          updatedAt: new Date(),
        },
        create: {
          userId,
          product_id,
          quantity,
          updatedAt: new Date(),
        },
        select: {
          cart_id: true,
          product_id: true,
        },
      });
      res.send(cardInfo2);
    } catch (error) {
      console.error("Error in upsert operation:", error);
      return {
        success: false,
        message: `Error: ${error.message}`,
      };
    }
  }

  static async deleteSinglCart (req, res){

    try{

        const cartid = req.params.cartid

        console.log(cartid)

        // const deleteitem = prisma.$queryRaw`
        //         DELETE FROM addToCart WHERE cart_id = ${cartid}
        //     `

        const deleteitem = await prisma.addToCart.delete({
            where: {
              cart_id: cartid, // Ensure this matches the schema definition
            },
          });

        res.send(deleteitem)


    }catch(err){
        console.log("delete cart item", err.message)
        res.send({
            success: false,
            message: 'internal server something is wrong'
        })
    }finally{
        console.log('delete cart item')
    }



    

  }


}

export default Shoppingcart;
