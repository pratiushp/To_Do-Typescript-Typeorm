import nodemailer from "nodemailer"


   export const transporter = nodemailer.createTransport({
       
        auth: {
          user: 'pratiushpraain2002@gmail.com',
          pass: 'Apple12345@'
        }
    });
    
