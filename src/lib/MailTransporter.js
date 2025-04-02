import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.EMAILADDRESS}`,
      pass: `${process.env.EPASSCODE}`,
    },
});