import prisma from "../../DB/db.config.js";
import { Prisma } from "@prisma/client";
import isExistsUser from "../../lib/isExistsUser.js";

class PtoductDetailsByUser {
  static async singupUser(req, res) {
    return registerUser(req, res);
  }

  static async addToCardProductWithUser(...args) {
    return await addToCardProductWithUser(...args);
  }
  static async getAllCartProductWithUser(...args) {
    return await userAllCartProduct(...args);
  }
}

export default PtoductDetailsByUser;



const userAllCartProduct = async (req, res) => {
  try {

    const userId = req.params.userId

    


    const userExists = await isExistsUser(userId);
 
    if (!userExists) {
      res.send({
        success: false,
        message: "Invalid user: The user does not exist",
      });
    }


    // console.log("userId", userExists)

    const cardinfo = await prisma.addToCart.findMany({
      where: {
        userId,
      },
      select: {
        cart_id: true,
        userId: true,
        product_id: true,
        quantity: true,
        product: {
          select: {
            product_name: true,
            price: true,
            discount: true,
            image: true,
          },
        },
      },
    });

    console.log(cardinfo)
    res.send({ cardinfo });


  } catch (error) {
    console.error("Error in upsert operation:", error);
    req.send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const addToCardProductWithUser = async (req, res) => {
  try {
    const { product_id, quantity, userId } = req.body;

    const userExists = isExistsUser(userId);
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
    });
    res.send({ "cardInfo-create": cardInfo2 });

  } catch (error) {
    console.error("Error in upsert operation:", error);
    return {
      success: false,
      message: `Error: ${error.message}`,
    };
  }
};

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.send(user);
  } catch (error) {
    // if (error instanceof prisma.PrismaClientKnownRequestError) {
    //   if (error.code === 'P2002') {
    //     return res.status(400).json({ error: "Email must be unique" });
    //   }
    // }
    // res.status(500).json({ error: "Internal Server Error" });

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res
          .status(400)
          .send("Unique constraint violation: Email must be unique.");
      } else {
        res.status(400).send("Prisma known request error:", error.message);
      }
      // throw new Error({ error: error.message });
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).send("Validation error:", error.message);
    } else {
      res.status(400).send("Unexpected error:", error);
    }
  }
}
