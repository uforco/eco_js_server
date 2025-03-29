import prisma from "../../DB/db.config.js";

class UserSystem {

  static async oauthChecking(req, res) {
    const { 
      userId: userid,
      provider,
      profileImage,
      firstName,
      lastName,
      email,
      verify,
     } = req.body;

    if(
      !userid || !provider || !profileImage || !firstName || !email || !verify
    ){
      return res.status(400).send({ success: false, message: "🤬🤬🤬🤬" });
    }

    try {
      const oauthUser = await prisma.$queryRaw`
        WITH check_user AS (
         SELECT "userId"
         FROM "User"
         WHERE "userId" = ${userid} AND "provider" = ${provider}
         ),
         insert_user AS (
             INSERT INTO "User" ("userId", "provider", "profileImage", "firstName", "lastName", "email", "verify")
             SELECT ${userid}, ${provider}, ${profileImage}, ${firstName}, ${lastName}, ${email}, ${verify}
             WHERE NOT EXISTS (SELECT 1 FROM check_user)
             RETURNING "userId"
         )
         SELECT "userId" 
         FROM check_user
         UNION ALL
         SELECT "userId"
         FROM insert_user
      `

      console.log("oauthUser", oauthUser)

      if( oauthUser.length === 0 || oauthUser[0].userId === null ){
        return res.status(404).send({ success: false, message: "DB Issue - Oauth Route"});
      }else {
        // console.log("oauthUser", oauthUser[0].userId)
        return res.status(200).send({ success: true, message: "Oauth User Created Successfully", userId: oauthUser[0].userId });
      }

    } catch (error) {
      console.error("Error checking user existence:", error);
      res.status(500).send({ success: false, message: "Internal Server Error" });
    }
  }


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
          email: true
        },
      });

      console.log("userDetails", userDetails)

      res.send(userDetails)


    } catch (error) {
      console.error("Error in upsert operation:", error);
      res.send({
        success: false,
        message: `Error: ${error.message}`,
      });
    }


    
  }

}

export default UserSystem;











const login = async (req, res) => {



  console.log(req.body)

 res.send(req.body)

  

}



async function registerUser(req, res) {
  const newUserData = req.body;


  const email = newUserData.email; 
  const firstName = newUserData.firstName; 
  const lastName = newUserData.lastName;
  const password = newUserData.password; 




  if(!email || !password || !firstName ) {
    return res.status(400).send({ success: false, message: " 🤬🤬 fill all is required 🤬🤬 " });
  }
  
  try {
    // Check if the user already exists in the database
    const isExistsUser = await prisma.user.findFirst({
      where: {
        email: email
      },
    });

    if (isExistsUser) {
      return res.status(409).send({ success: false, message: "You have Already account"});
    }
    // password hash system this area




    // Create a new user in the database
    // const newUser = await prisma.user.create({
    //   data: {
    //     email: email,
    //     password: password,
    //     provider: 'credentials',
    //     firstName: firstName,
    //     lastName: lastName,
    //   },
    //   select: {
    //     userId: true,
    //     email: true,
    //     firstName: true,
    //     lastName: true,
    //     verify: true,
    //   }
    // });

    res.send({success: true, password});


    // is pointed nice work is sql - don't delete this

    // const oauthUser = await prisma.$queryRaw`
    //     WITH check_user AS (
    //      SELECT "userId", "email", "firstName", "lastName", "verify"
    //      FROM "User"
    //      WHERE "email" = ${email}
    //      ),
    //      insert_user AS (
    //          INSERT INTO "User" ("email", "password", "firstName", "lastName")
    //          SELECT ${email}, ${password}, ${firstName}, ${lastName}
    //          WHERE NOT EXISTS (SELECT 1 FROM check_user)
    //          RETURNING "userId", "email", "firstName", "lastName", "verify"
    //      )
    //     SELECT "userId", "email", "firstName", "lastName", "verify"
    //     FROM insert_user
    //     UNION ALL
    //     SELECT * FROM check_user;
    //   `
    
  } catch (error) {
    console.error("Error creating user - signup:", error);
    res.status(500).send({ success: false, error: "Internal Server Error signup" });
  }
}
