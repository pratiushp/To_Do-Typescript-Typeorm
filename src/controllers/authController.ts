import { NextFunction, Request, Response } from "express";
import { User } from '../Entities/User';
import { comparePasswords, hashPassword } from "../helper/authHelper";
import { generateToken } from "../helper/jwtUtils";
import jwt from "jsonwebtoken"
import { sendMail } from "../helper/sendMail";
import ErrorHandler from "../utils/ErrorHandler";
import successMiddleware from './../helper/successResponse';

const RESET_SECRET = "typescriptormsequelizepractice"


//global error handling
//global success response

//Register User
export const registerUser = async (req: Request, res: Response, next:NextFunction) => {
  const userRepository = (User);

  const { name, email, password } = req.body;

  const existUser = await userRepository.findOne({ where: { email } })
  
  if (existUser) {
    const errors = ("User Already Exist");
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

    successMiddleware({
      message: "User Register Successfully",
      data: newUser,
    }, req, res, next);
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message, 500))
  
  }
};


//Login Controller
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
 const userRepository = (User);

  const { email, password } = req.body;

  try {
    const user = await userRepository.findOne({ where: { email, status: true } });

    if (!user) {
      return res.status(401).json({ message: "User not Found or Inactive" });
    }

    const passwordMatches = await comparePasswords(password, user.password);

    if (!passwordMatches) {
      const errorRes = ("Invalid Password");
      return res.status(400).send(errorRes);
    }

    const token = generateToken(user.id, user.role.map(role => role.role_name));

    successMiddleware({
      message: "Login Success",
      data: token,
    }, req, res, next);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500))
  }
};


//get Single User
export const getSingleUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return next(new ErrorHandler("User Not Found" , 404));
    }
    const { password, role, resetToken, status, ...userDet } = user;

    successMiddleware({
      message: "Successfully Get User By ID",
      data: userDet,
    }, req, res, next);

  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500))
  }
};


const createResetToken = (user: any) => {
  return jwt.sign({ id: user.id }, RESET_SECRET, {
    expiresIn: '1h', 
  });
};

export const forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({where: {email: email} }); 

    if (!user) {
      const err = ("User Not found")
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
    successMiddleware({
      message: `Please check your email: ${user.email} to reset your password`,
    
    }, req, res, next);

  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500))
  }
};


export const resetPasswordController = async (req: Request, res: Response, next:NextFunction) => {
  const { newPassword, resetToken } = req.body;

  try {
    const decoded = jwt.verify(resetToken, RESET_SECRET)as {id: number};

    // console.log("decoded", decoded);

    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      const err = ("User Not found")
      return res.status(404).json(err);
    }

    const pass = await hashPassword(newPassword)
    



    user.password = pass;
    user.resetToken = undefined;
    await user.save();
    // console.log("user::::", user);

  
    successMiddleware({
      message: "Password Reset Successfull",
    }, req, res, next);
    

  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500))
  }
};

export const getUsersWithPagination = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;
    const skip = (page - 1) * limit;
    const search = req.query.search as string;

    const userRepository = User.createQueryBuilder('user')
      .select(['user.id', 'user.name', 'user.email'])
      .where('user.status = :status', { status: true });

    if (search) {
      userRepository.andWhere('(user.name LIKE :search)', { search: `%${search}%` });
    }

    const [users, totalCount] = await userRepository
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully with pagination and search',
      users,
      page,
      totalPages,
      totalCount,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message, 500))
  }
};




export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id); //takes id as number
    
    const user = await User.findOne({ where:{id: id}});

    if (!user) {
      return res.status(404).send("User Not Found");
    }

    user.status = false;
    await user.save();

    successMiddleware({
      message: "User Deleted Successfully",

    }, req, res, next);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500))
  }
};