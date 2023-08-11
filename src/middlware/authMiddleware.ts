import { Request, Response, NextFunction } from "express";
import { User } from "../Entities/User";
import { Role } from '../Entities/Role';
import jwt from "jsonwebtoken"

interface ReqUser extends Request{
    user: any;
}

// Protect Route
const JWT_SECRET = "typescriptormsequelizepractice";

export const requireSignIn = async (req: any, res: Response, next: NextFunction) => {
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
        const userdet=await User.findOne({where:{id:decode.userId}})
        req.user = userdet;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const isAdmin = async (req: any, res: Response, next: NextFunction) => {
    const userRepository = (User);
    const roleRepository =(Role);

    try {
        console.log(req.user?.role)
        // const users = await User.findOne({ where:{email: user.email}});

        // if (!users) {
        //     return res.status(401).json({ message: "User not found" });
        // }

        // const admin = await Role.findOne({ where: { id: 1 } })
        
        // if (!admin) {
        //     return res.status(401).send({
        //         success: false,
        //         message: "Unauthorized Access"
        //     })
        // } else {
        //     next();
            
        // }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};