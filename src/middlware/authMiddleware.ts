import { Request, Response, NextFunction } from "express";
import { User } from "../Entities/User";
import { Role } from '../Entities/Role';
import jwt from "jsonwebtoken"
import { ReqUser } from "./req";

// interface ReqUser<p,q,r,s> extends Request<p,q,r,s>{
//     user?: User;
// }

// Protect Route
const JWT_SECRET = "typescriptormsequelizepractice";

export const requireSignIn = async (req: ReqUser<any,any,any,any>, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Authentication token is missing" });
        }
        token = token.split(" ")[1];
        const decode :any= jwt.verify(token, JWT_SECRET); 
        if (!decode) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const userdet = await User.findOne({ where: { id: decode.userId } })
        if(userdet)
        req.user = userdet;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


//Admin Access
export const isAdmin = async (req: any, res: Response, next: NextFunction) => {

    try {
        const admin = req.user?.role;

        if (!admin) {
            return res.status(401).json({message:"Unauthorized Access"})
          
        } else {
            next()
        }
        
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

//Supervisor Access 
export const isSupervisor = async (req: any, res: Response, next: NextFunction) => {

    try {
        const supervisor = req.user?.role;

        if (!supervisor) {
            return res.status(401).json({message:"Unauthorized Access"})
          
        } else {
            next()
        }
        
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};