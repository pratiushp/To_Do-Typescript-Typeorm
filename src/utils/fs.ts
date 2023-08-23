import { Response, NextFunction } from "express";
import fs from "fs"
import path from "path";


export const userDirectory = async (req: any, res: Response, next: NextFunction) => {
  
const userId = req.user?.id.toString()
  try {
    if (!userId) {
      return res.status(400).send("User Not Found")
    }

    const userDirect = path.join(__dirname, userId)

    if (!fs.existsSync(userDirect)) {
      fs.mkdirSync(userDirect);
      
    }
    
    path.join(__dirname,  userDirect) 
  } catch (error) {
    
  }
 
}

export const uploadDirectory = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
  
}