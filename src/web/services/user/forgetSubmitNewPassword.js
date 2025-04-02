import AuthorizeJWT from "../../../authorizeJWT/authorize_jwt.js"
import argon2 from "argon2";
import prisma from "../../../DB/db.config.js";

export default async function forgetSubmitNewPassword(req, res) {
    try {
        const param = req.params;
        const data = req.body;
        const validJWT = await AuthorizeJWT.varifyToken(param.token);
        if (!validJWT) {
          return res.send({ success: false, error: "Time out Please Try Again" });
        }
        const newpassword = await argon2.hash(data?.newpassword);
        const savePassword = await prisma.user.update({
          where: { userId: validJWT.userId },
          data: {
            verificationCode: null,
            password: newpassword,
          },
          select: {
            userId: true,
          },
        });
        if (!savePassword.userId) {
          return res.send({ success: false, error: "Time out Please Try Again" });
        }
        return res.send({
          success: true,
          message: "Succesfully Change Your Password",
        });
      } catch (err) {
        console.log("forgetPasswoard_check_token ==== ", err);
        return res.send({ success: false });
      }

}
