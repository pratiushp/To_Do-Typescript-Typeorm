
import nodemailer from "nodemailer";
import { EmailMessage } from "../Entities/Email"; // Adjust the path based on your file structure

export const sendMail = async (options: any) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    // service: process.env.SMTP_SERVICE,
    auth: {
      user:  "pratiushprasain2002@gmail.com",
      pass:  "umcxluunevjhctnk"
    },
  });

  const mailOptions = {
    from: "pratiushprasain2002@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);

  const emailMessage = new EmailMessage();
  emailMessage.to = options.email;
  emailMessage.subject = options.subject;
  emailMessage.message = options.message;
  await emailMessage.save();
};
