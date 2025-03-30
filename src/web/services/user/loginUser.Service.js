import AuthorizeJWT from "../../../authorizeJWT/authorize_jwt.js";
import prisma from "../../../DB/db.config.js";
import argon2 from "argon2";

export default async function loginUserService(req, res) {
  const {userId: accountProviderId, provider, email, password } = req.body;

  try {
    const data = await prisma.$queryRaw`
        SELECT 
            "userId", "email", "password",
            CONCAT("firstName", ' ', "lastName") AS fullname,
            "profileImage", "verify", "provider"
        FROM "User" WHERE "email" = ${email};
    `;
    if (data.length < 1) {
      return res
        .status(401)
        .send({ success: false, error: "please signup first" });
    }
    const userInfo = {
        userId: data[0]?.userId,
        email: data[0]?.email,
        fullname: data[0]?.fullname,
        profileImage: data[0]?.profileImage,
        verify: data[0]?.verify
    }

    // signIn With google and Facebook system
    if((provider === 'google' || provider === 'facebook') && accountProviderId && email === data[0]?.email){
        // generate JWT token and set Headers
        const BearerToken = await AuthorizeJWT.generateJWT(userInfo)
        console.log( " google and facebook Provider JWT token :", BearerToken)
        res.setHeader("Authorization", `Bearer ${BearerToken}`)
        return res
            .status(200)
            .send({success: true, userInfo});
    }


    // credentials system
    if(provider === 'credentials' && (provider !== data[0].provider || !data[0]?.password)){
        return res
        .status(401)
        .send({ success: false, error: "Invalid Password"});
    }
    // check credentials password
    const isMatch = await argon2.verify(data[0]?.password, password);
    if(!isMatch){
        return res
        .status(401)
        .send({ success: false, error: "Invalid Password"});
    }else{
        // generate JWT token and set Headers
        const BearerToken = await AuthorizeJWT.generateJWT(userInfo)
        console.log( " credentials Provider JWT token :", BearerToken)
        res.setHeader("Authorization", `Bearer ${BearerToken}`)
        return res
            .status(200)
            .send({success: true, userInfo});
    }
    

  } catch (err) {
    console.log(' signIn service function Error - line number :', err)
    return res
      .status(401)
      .send({success: false, error: 'something worg'});
  }
}
