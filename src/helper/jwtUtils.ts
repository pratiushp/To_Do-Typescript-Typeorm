import jwt from "jsonwebtoken";

const secretKey = "typescriptormsequelizepractice"; 

export const generateToken = (userId: number): string => {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
  return token;
};
