
// import pkg from '@prisma/client';
// const { Prisma } = pkg
import registerUserService from "../services/user/registerUser.service.js";
import loginUserService from "../services/user/loginUser.Service.js";
import OauthDataChecking from '../services/user/oauthChecking.service.js';
import prisma from "../../DB/db.config.js";
import AuthorizeJWT from "../../authorizeJWT/authorize_jwt.js";

class UserSystem {


  static async oauthChecking(req, res) {
      try{
        const useridentity = await OauthDataChecking(req.body);
        if (useridentity && useridentity.success) {
          return res.status(200).send(useridentity);
        }
        else{
          return res.status(406).send(useridentity);
        }
      }catch(err){
        console.log('oauthChecking Error ===', err )
        return res.status(500).send("something is wrong");
      } 
  }

  // TODO: get signup data with font end
  static async singupUser(req, res) {
    try{
      const newUserData = req.body;
      if(!newUserData.email || !newUserData.password || !newUserData.firstName ) {
        return res.status(400).send({ success: false, message: " 🤬🤬 fill all is required 🤬🤬 " });
      }
      // Check if the user already exists in the database
      const isExistsUser = await prisma.user.findFirst({where: {email: newUserData.email},});
      if (isExistsUser) {
        return res.status(409).send({ success: false, message: "You have Already account"});
      }
      // DB service
      const newUser = await registerUserService(newUserData);
      if(newUser.success){
        return res.status(200).send(newUser)
      }
    }catch(err){
      console.error("Error creating user - singupUser controller :", err);
      res.status(500).send({ success: false, error: "Internal Server Error signup" });
    }
  }

  static async loginprovider (req, res) {
    //TODO: form data validation
    const { provider, email, password } =  req.body
    try{
      return await loginUserService(req, res)
    }catch(err){
      console.log(' loginprovider :', err)
      res.status(500).send({success: false, error: 'something worg'})
    }

    // console.log()

    // if(email){
    //   return res.status(400).send(" no email ")
    // }
    
    // try{
    //   return await loginUserService(req, res)
    // }catch(err){
    //   console.log(" login server Error :", err)

    //   if (err instanceof Prisma.PrismaClientKnownRequestError) {
    //     console.log({ error: `Prisma Error: ${err.message}` })
    //     // return res.status(500).json();
    //   }

    //   return res.status(500).send({ success: false, error: "internal server issue"})
    // }

  }



  static async forgetPasswoard(req, res) {


    console.log("==========rest P t==========", req.body)

    // find email info
    try{
      const userinfo = await prisma.user.findUnique({
        where: req.body,
        select: {
          id: true,
          userId: true,
          provider: true,
          firstName: true,
          lastName: true,
          email: true,
          verify: true
        }
      })
      if(!userinfo){
        return res.status(401).send({error: 'check your email'})
      }
      const resetPasswordToken = await AuthorizeJWT.generateJWT(userinfo, '5m')

      res.send({rpToken: resetPasswordToken})

    }catch(err){
      console.log('reset Password Token - ', err)
      res.send({error: 'something this wrong code - s2'})
    }
  }

}
export default UserSystem;







// static async getUsersDetails( req, res) {

//   try{
//     const userDetails = await prisma.user.findMany({
//       select: {
//         email: true
//       },
//     });

//     console.log("userDetails", userDetails)

//     res.send(userDetails)


//   } catch (error) {
//     console.error("Error in upsert operation:", error);
//     res.send({
//       success: false,
//       message: `Error: ${error.message}`,
//     });
//   }


  
// }
