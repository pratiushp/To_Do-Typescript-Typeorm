import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from '../Entities/User';
import { comparePasswords, hashPassword } from "../helper/authHelper";
import { generateToken } from "../helper/jwtUtils";
// import { transporter } from "../helper/sendMail";
import  jwt  from "jsonwebtoken";

// import { sendEmail } from "../helper/sendMail";
// import crypto from "crypto"

const RESET_SECRET = "typescriptormsequelizepractice"




//Register User
export const registerUser = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);

  const { name, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const newUser = userRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await userRepository.save(newUser);
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};


//Login Controller
export const loginUser = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);

  const { email, password } = req.body;

  try {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "User not Found" });
    }

    const passwordMatches = await comparePasswords(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    console.log(user.name)
    const token = generateToken(user.id, user.role.map(role=>role.role_name));

    res.status(200).json({
      success: true,
      message: "Login Success",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};


//Get all user
export const getallUser = async (req: Request, res: Response) => {
  try {
    
    const users = await User.find()


    return res.status(200).send({
      success: true,
      message: "Successfully get all users",
      users
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error
    });
  }
}


export const getSingleUser =async (req:any, res: Response) => {
  try {
    const userId = req.params.id

    const user = await User.findOne({ where: { id: userId } })
    
    if (!user) {
      return res.status(404).send("User Not Found");
    }

    return res.status(200).send({
      success: true,
      messasge: "Single User Retrieve Successfully",
      user,
    })


  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving Single User",
      error

    })
  }
}













// const createResetToken = (user: any) => {
//   return jwt.sign({ _id: user._id }, RESET_SECRET, {
//     expiresIn: "1h", // Token expires in 5 minutes
//   });
// };



// //Foeget password

// export const forgetPassword =async (req:Request, res: Response) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne(email)

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const resetToken = createResetToken(user);
//     user.resetToken = resetToken;
//     await user.save()


//      // Send the reset link to the user's email
//      const resetUrl = `http://localhost:5000/reset-password/${resetToken}`;
//      await sendEmail({
//        email: user.email,
//        subject: "Reset your password",
//        message: `Hello ${user.name}, Click on the link to reset your password: ${resetUrl}`,
//      });
 
//      res.status(201).json({
//        success: true,
//        message: `Please check your email: ${user.email} to reset your password`,
//      });
    
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in sending mail ",
//       error,
//     })
//   }
// }