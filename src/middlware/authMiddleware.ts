// import { Request, Response, NextFunction } from "express";
// import { User } from "../Entities/User";
// import { Role } from '../Entities/Role';
// import jwt from "jsonwebtoken"



// // Protect Route
// const JWT_SECRET = "typescriptormsequelizepractice";

// export const requireSignIn = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const token = req.headers.authorization;
//         if (!token) {
//             return res.status(401).json({ message: "Authentication token is missing" });
//         }
//         const decode = jwt.verify(token, JWT_SECRET); 
//         if (!decode) {
//             return res.status(401).json({ message: "Invalid token" });
//         }
//         // req.user = decode;
//         next();
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }
// export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
//     const userRepository = (User);
//     const roleRepository =(Role);

//     try {
        
        
//         const users = await User.findOne({ relations: {Role},where:{email: user.email}});

//         if (!users) {
//             return res.status(401).json({ message: "User not found" });
//         }

//         const admin = await Role.findOne({ where: { id: 1 } })
        
//         if (!admin) {
//             return res.status(401).send({
//                 success: false,
//                 message: "Unauthorized Access"
//             })
//         } else {
//             next();
            
//         }
//     } catch (error) {
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };