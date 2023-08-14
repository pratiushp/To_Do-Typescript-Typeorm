import jwt from "jsonwebtoken";
import { Role } from '../Entities/Role';

const secretKey = "typescriptormsequelizepractice"; 

export const generateToken = (userId: number, roleName:String[]): string => {
  const token = jwt.sign({ userId,roleName }, secretKey, { expiresIn: "7d" });
  return token;
};
