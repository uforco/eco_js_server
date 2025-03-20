import prisma from "../../DB/db.config.js";
import { Prisma } from "@prisma/client";
import isExistsUser from "../../lib/isExistsUser.js";

class PtoductDetailsByUser {
  static async singupUser(req, res) {
    return registerUser(req, res);
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

    console.log("singuponly", req.body)


    const user = await prisma.user.create({
      data: req.body
    })

    return res.send(user)


    
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
