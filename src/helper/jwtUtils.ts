import jwt from "jsonwebtoken";
import { Role } from '../Entities/Role';

const secretKey = "typescriptormsequelizepractice"; 

export const generateToken = (userId: number, name:String, roleName:String[]): string => {
  const token = jwt.sign({ userId, name, roleName }, secretKey, { expiresIn: "7d" });
  return token;
};
