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
  static async getLogin(...args) {
    return await login (...args);
  }

  static async getUsersDetails( req, res) {

    try{
      const userDetails = await prisma.user.findMany({
        select: {
          profileImage: true,
          firstName: true,
          lastName: true,
          email: true,
          phoneNamber: true,
          password: true
        },
      });

      console.log("userDetails", userDetails)

      res.send({
        success: true,
        message: `User Details: ${userDetails}`,
      })


    } catch (error) {
      console.error("Error in upsert operation:", error);
      res.send({
        success: false,
        message: `Error: ${error.message}`,
      });
    }


    
  }
  static async singuponly( req, res) {

    console.log("req.body", req.body)

    const { userAddress, ...userData } = req.body;

    console.log("userData", userData)
    console.log("=====================================")
    console.log("userData", userAddress)

    try{
      const userDetails = await prisma.user.create({
        data: {
          ...userData,
          userAddress: {
            create: userAddress,
          },
        },
      });

      console.log("userDetails", userDetails)

      res.send({
        success: true,
        message: `User Details: ${userDetails}`,
      })


    } catch (error) {
      console.error("Error in upsert operation:", error);
      res.send({
        success: false,
        message: `Error: ${error.message}`,
      });
    }


    
  }
}

export default PtoductDetailsByUser;






const login = async (req, res) => {


  const { email, password } = req.body

  console.log(req.body)


  if(email == 'srka780@gmail.com' && password == '123456'){ res.send({
    success: true,
    data: {email: req.body.email}
  })}else{
    res.send({
      success: false,
      mag: "fill all input"
    })
  }

  

}









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
  const usersData = req.body;

  try {


    for (const userData of usersData) {
      const userExists = await prisma.user.create({
        data: userData,
      });
      console.log("create user", userExists)
    }



    // const user = await prisma.user.createMany({
    //   data: req.body,
    // });

    res.send({ success: true, message: "Users created successfully!" });





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

    // console.error("Error creating user:", error);
  }
}
