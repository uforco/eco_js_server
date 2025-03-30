import prisma from "../../../DB/db.config.js";
import argon2 from "argon2";


export default async function registerUserService(newUserData) {
    const email = newUserData.email; 
    const firstName = newUserData.firstName; 
    const lastName = newUserData.lastName;
    const password = newUserData.password; 
  
    try {
    
        const hash = await argon2.hash(password);
      // Create a new user in the database
      const newUser = await prisma.user.create({
        data: {
          email: email,
          password: hash,
          provider: 'credentials',
          firstName: firstName,
          lastName: lastName,
        },
        select: {
          userId: true,
          email: true,
          firstName: true,
          lastName: true,
          verify: true,
        }
      });
      // const decodePassword = bcrypt.compareSync(password, hash)
      return {success: true, newUser};
    } catch (error) {
      console.error("Error creating user - signup prisma db error registerUserService: ", error);
      return { success: false, message: "Internal server Issue"}
    }
  }



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