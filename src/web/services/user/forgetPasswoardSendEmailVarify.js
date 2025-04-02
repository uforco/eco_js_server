import AuthorizeJWT from "../../../authorizeJWT/authorize_jwt.js"
import prisma from "../../../DB/db.config.js"
import rest_password_email from "../../../emailTemplate/rest_password_email.js"
import DateAndTimeFormat from "../../../lib/DateAndTimeFormat.js"
import { transporter } from "../../../lib/MailTransporter.js"
// import nodemailer from 'nodemailer'



export default async function forgetPasswoardSendEmailVarify(req, res) {
    const { email, userAgent } = req.body
    try{
      const userinfo = await prisma.user.findUnique({
        where: {email: email},
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
      const saveToken = await prisma.user.update({
        where: {email: email},
        data: {
          verificationCode: resetPasswordToken
        },
        select: {
          firstName: true,
          lastName: true,
          email: true,
          verificationCode: true
        }
      })

      // const response = await fetch(`https://geocode.xyz/${latitude},${longitude}?json=1`).then((value) => value.json());
      
      const time = await DateAndTimeFormat()
      const infoEmail = {
          name: `${saveToken?.firstName} ${saveToken?.lastName}`,
          url: `${process.env.WEB_FONT_END}/system/forget-password/${saveToken?.verificationCode}`,
          When: time,
          Device_Type: `${userAgent?.browser} device using ${userAgent?.os} - ${userAgent?.deviceType}`
      } 

      // create a email template
      const message_view = await rest_password_email(infoEmail)
      const mailOptions = {
        from: 'ufore@gmail.com',
        to: [`${saveToken?.email}`],
        subject: "Forget Password with Eco-Bazar", // Subject line
        html: `${message_view}`, // html body
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.send({error: 'something this code - s2, m1'});
        } else {
          console.log('Email sent: ' + info.response);
          return res.send({success: true, mail: "successful - Check Your Email Address"});
        }
      });

    }catch(err){
      console.log('reset Password Token - ', err)
      res.send({error: 'something this wrong code - s2'})
    }
  }