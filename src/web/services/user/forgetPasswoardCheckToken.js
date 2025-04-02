import AuthorizeJWT from "../../../authorizeJWT/authorize_jwt.js"
import prisma from "../../../DB/db.config.js"

export default async function forgetPasswoardCheckToken (req, res){
    const param = req.params
    try{
      const tokenCode = param.token
      const validJWT =  await AuthorizeJWT.varifyToken(tokenCode)
      if(!validJWT){
        return res.send({ success: false })
      }
      const validTokenDB = await prisma.user.findUnique({
        where: { userId: validJWT.userId },
        select: {
          verificationCode: true
        }
      })
      if(!validTokenDB.verificationCode){
        return res.send({ success: false })
      }
      return res.send({ success: true })
    }catch(err){
      console.log("forgetPasswoard_check_token ==== ", err)
      return res.send({ success: false })
    }
}
