import { Request, Response } from "express";
import { User } from '../Entities/User';
import { comparePasswords, hashPassword } from "../helper/authHelper";
import { generateToken } from "../helper/jwtUtils";
import jwt from "jsonwebtoken"
import { sendMail } from "../helper/sendMail";
import { successResponse } from '../helper/successResponse';
import { errorResponse } from '../helper/errorResponse';

const RESET_SECRET = "typescriptormsequelizepractice"


//global error handling
//global success response

//Register User
export const registerUser = async (req: Request, res: Response) => {
  const userRepository = (User);

  const { name, email, password } = req.body;

  const existUser = await userRepository.findOne({ where: { email } })
  
  if (existUser) {
    const errors = errorResponse("User Already Exist");
    return res.status(409).send(errors);
  }

  const hashedPassword = await hashPassword(password);

  const newUser = userRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await userRepository.save(newUser);

    const success = successResponse("User Register Successfully", newUser);
    res.status(200).send(success);
  } catch (error) {
    console.error(error);
    const errors = errorResponse("Internal Server Error");
    res.status(500).send(errors);
  
  }
};


//Login Controller
export const loginUser = async (req: Request, res: Response) => {
  const userRepository = (User);

  const { email, password } = req.body;

  try {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "User not Found" });
    }

    const passwordMatches = await comparePasswords(password, user.password);

    if (!passwordMatches) {
      const errorRes = errorResponse("Invalid Password");
      return res.status(400).send(errorRes);
    }
    console.log(user.name)
    const token = generateToken(user.id, user.role.map(role=>role.role_name));

const success= successResponse("Login Successful", token)
res.status(200).send(success);
  } catch (error) {
    const errors = errorResponse("Internal Server Error");
    res.status(500).send(errors);
  }
};


// Get all users
export const getallUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    // Exclude  password, role and  reset token
    const userDet = users.map(user => {
      const { password, role, resetToken, ...userDet } = user;
      return userDet;
    });

    const success = successResponse("Successfully get all users", userDet);
    return res.status(200).send(success);
  } catch (error) {
    console.error(error);
    const errors = errorResponse("Error in getting all Users");
    res.status(500).json(errors);
  }
};


//get Single User
export const getSingleUser = async (req: any, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).send("User Not Found");
    }
    const { password, role, resetToken, ...userDet } = user;

    const success = successResponse("Single User Retreive Successfully", userDet)
    return res.status(200).send(success);

  } catch (error) {
    console.log(error);
   const err = errorResponse("Error In retrieving Sing;e User", error)
    res.status(500).send(err);
  }
};


const createResetToken = (user: any) => {
  return jwt.sign({ id: user.id }, RESET_SECRET, {
    expiresIn: '1h', 
  });
};

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({where: {email: email} }); 

    if (!user) {
      const err = errorResponse("User Not found")
      return res.status(404).json(err);
    }

    const resetToken = createResetToken(user);
    user.resetToken = resetToken;
    await user.save();

    // Send the reset link to the user's email
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    await sendMail({
      email: user.email,
      subject: 'Reset your password',
      message: `Hello ${user.name}, Click on the link to reset your password: ${resetUrl}`,
    });
    const success = successResponse(`Please check your email: ${user.email} to reset your password`)
    res.status(201).json(success);
  } catch (error) {
    console.log(error);
    const err = errorResponse("Error in sending Mail", error)
    res.status(500).send(err);
  }
};


export const resetPasswordController = async (req: Request, res: Response) => {
  const { newPassword, resetToken } = req.body;

  try {
    const decoded = jwt.verify(resetToken, RESET_SECRET)as {id: number};

    // console.log("decoded", decoded);

    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      const err = errorResponse("User Not found")
      return res.status(404).json(err);
    }

    const pass = await hashPassword(newPassword)
    



    user.password = pass;
    user.resetToken = undefined;
    await user.save();
    // console.log("user::::", user);

  
      const success = successResponse("Password reset successful")
      return res.status(200).json(success);
    

  } catch (error) {
    console.log(error);
    const err= errorResponse("Invalid Or Expired Reset Token")
    return res.status(400).json(err);
  }
};

export const getUsersWithPagination = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;
    const skip = (page - 1) * limit;

    const userRepository = (User);

    const users= await userRepository.findAndCount({
      skip,
      take: limit,
    });

    return res.status(200).send({
      success: true,
      message: "Users retrieved successfully with pagination",
      users,

    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};



export const searchUser = async (req: Request, res: Response) => {
 
    const { username } = req.params;
    try {
      const results = await User.createQueryBuilder('user')
      .where('user.name LIKE :username', { username: `%${username}%` })
      .getMany();

      res.json(results);
    
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: "Internal Server Error",
        error,
      })
    }
  }
