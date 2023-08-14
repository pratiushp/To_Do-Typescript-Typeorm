// // import nodemailer from "nodemailer"


// //    export const transporter = nodemailer.createTransport({
       
// //         auth: {
// //           user: 'pratiushpraain2002@gmail.com',
// //           pass: 'Apple12345@'
// //         }
// //     });
    


// import nodemailer from "nodemailer"



// export const sendEmail = async (email, subject, text) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: "smtp.gmail.com",
//             port: 465,
//             secure: true,
//             auth: {
//                 user: "pratiushprasain2002@gmail.com",
//                 pass: "umcxluunevjhctnk"
//             },
//         });

//         await transporter.sendMail({
//             from: "pratiushprasain2002@gmail.com",
//             to: email,
//             subject: subject,
//             text: text,
//         });

//         console.log("email sent sucessfully");
//     } catch (error) {
//         console.log(error, "email not sent");
//     }
// };

