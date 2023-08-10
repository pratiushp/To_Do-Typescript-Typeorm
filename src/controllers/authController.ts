import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from '../Entities/User';
import { comparePasswords, hashPassword } from "../helper/authHelper";
import { generateToken } from "../helper/jwtUtils";
// import { transporter } from "../helper/sendMail";
// import  jwt  from "jsonwebtoken";
// import crypto from "crypto"

// const RESET_SECRET = "thereyougoboydontbesorrybebet"




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
      return res.status(401).json({ message: "Authentication failed" });
    }

    const passwordMatches = await comparePasswords(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = generateToken(user.id);

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

export const getAllUser =async (req:Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const users = await userRepository.find();

    res.json({
      success: true,
      message: "Successfully get all User ",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving users',
      error,
    });
  }
};