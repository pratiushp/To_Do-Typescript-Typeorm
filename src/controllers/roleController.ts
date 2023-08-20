import { NextFunction, Request, Response } from "express";
import { Role } from './../Entities/Role';
import { User } from "../Entities/User";
import successMiddleware from "../helper/successResponse";
import ErrorHandler from "../utils/ErrorHandler";



export const addRole =async (req:Request, res: Response, next:NextFunction) => {
     const roleRepository = (Role); //Database Operation used
   
    try {
        const { roleName } = req.body
        
        const roledef =  roleRepository.create({
            role_name: roleName,
        }).save()
        successMiddleware({
            message: "Role Added Succesfully",
            data: roledef,
          }, req, res, next);
        
    } catch (error) {
        console.log(error)
        return next(new ErrorHandler(error.message, 500))
        
    }
}


export const updateRole = async (req: Request, res: Response, next: NextFunction) => {
    const roleRepository = Role;
    const userRepository = User;
  
    try {
      const { userid, roleid } = req.body;
  
      const role = await roleRepository.findOne({ where: { id: roleid } });
      const user = await userRepository.findOne({ where: { id: userid } });
  
      if (!role || !user) {
        const notFoundError = new ErrorHandler("Role or User not found", 404);
        return next(notFoundError);
      }
  
      user.role = [role];
      await user.save();
  
      successMiddleware({
        message: "User Added with Role",
      }, req, res, next);
  
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  };



      
export const getUsersByRole = async (req: Request, res: Response, next: NextFunction) => {
     try {
        const roleId = parseInt(req.query.role as string);
      
          if (!roleId) {
            return next(new ErrorHandler('Role ID Not Found', 404));
            
          }
      
          const role = await Role.findOne({ where: { id: roleId } });
      
          if (!role) {
            return next(new ErrorHandler('Role ID Not Found', 404));
          }
      
            const usersWithRole = await User.createQueryBuilder('user')
              .select(["user.id", 'user.name', 'user.email'])
            .leftJoinAndSelect('user.role', 'role')
            .where('role.id = :roleId', { roleId: role.id })
            .getMany();
      
          successMiddleware(
            {
              message: 'Users with  role retrieved successfully',
              data: usersWithRole,
            },
            req,
            res,
            next
          );
        } catch (error) {
          console.error(error);
          return next(new ErrorHandler(error.message, 500));
        }
      };