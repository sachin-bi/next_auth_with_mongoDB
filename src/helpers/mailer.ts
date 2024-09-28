// "use strict";
import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //Todo: configure mail for usage(done)
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findOneAndUpdate(
        { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
        // { isVerified: true }
      );
    } else if (emailType === "RESET") {
      await User.findOneAndUpdate(
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        }
        // { isVerified: true }
      );
    }



    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",    // should be in env
      port: 2525,      // should be in env
      auth: {
        user: "9a7500e2715e4f",   // should be in env
        pass: "0b8d38368c6f71",    // should be in env
      },
    });


    const mailOptions = {
      from: "sachin@sachin.com", 
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",

      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken} </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    console.log(".... mailResponse id src/helpers/mailer---", mailResponse.messageId);
    
    return mailResponse;


    
  } catch (error: any) {
    throw new Error(error.message);
  }
};
