import { Request, Response } from "express";
import { Role } from './../Entities/Role';
import { User } from "../Entities/User";
import { successResponse } from "../helper/successResponse";
import { errorResponse } from "../helper/errorResponse";


export const addRole =async (req:Request, res: Response) => {
     const roleRepository = (Role); //Database Operation used
   
    try {
        const { roleName } = req.body
        
        const roledef =  roleRepository.create({
            role_name: roleName,
        }).save()
        const success = successResponse("Role Added Successfully", roledef);
        res.status(201).send(success);
        
    } catch (error) {
        console.log(error)
        const errorR = errorResponse("Internal Server Error", error);
    res.status(500).send(errorR);
        
    }
}


export const updateRole = async (req: Request, res: Response) => {
    const roleRepository = Role;
    const userRepository = User;
  
    try {
      const { userid, roleid } = req.body;
  
      const role = await roleRepository.findOne({ where: { id: roleid } });
      const user = await userRepository.findOne({ where: { id: userid } });
  
      if (!role || !user) {
        const notFoundResponse = errorResponse("Role or User not found");
        return res.status(404).send(notFoundResponse);
      }
  
      user.role = [role];
      await user.save();
  
      const success = successResponse("User Added to Role Successfully");
      res.status(200).send(success);
    } catch (error) {
      console.log(error);
      const err = errorResponse("Internal Server Error", error);
      res.status(500).send(err);
    }
  };


export const getSupervisor = async (req: Request, res: Response) => {
    const { type } = req.query
    //type=supervisor||admin||user
      const roleId = 2; // Role ID  of Supervisor
  
      try {
        const userRepository = (User);
        const usersWithRole = await User
          .createQueryBuilder("user")
          .leftJoinAndSelect("user.role", "role") 
          .where("role.id = :roleId", { roleId })
          .getMany();
          const success = successResponse("Successfully get User whose role is Supervisor ", usersWithRole)
          res.status(200).send(success);
      } catch (error) {
          console.log(error);
          const err = errorResponse("Error in fetching the User whose Role is Supervisor")
          res.status(500).json(err);
      }
    }
  

    export const getAdmin = async(req: Request, res: Response)=> {
        const roleId = 1; 
    
        try {
          const userRepository = (User);
          const usersWithRole = await User
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.role", "role") 
            .where("role.id = :roleId", { roleId })
            .getMany();
    
            const success = successResponse("Successfully get User whose role is Admin ", usersWithRole)
            res.status(200).send(success);
        } catch (error) {
            console.log(error);
            const err = errorResponse("Error in fetching the User whose Role is Admin")
            res.status(500).json(err);
        }
      }
    


      export const getUser = async(req: Request, res: Response)=> {
        const roleId = 3; 
    
        try {
          const userRepository = (User);
          const usersWithRole = await User
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.role", "role") 
            .where("role.id = :roleId", { roleId })
            .getMany();
    

            const success = successResponse("Successfully get User whose role is User ", usersWithRole)
            res.status(200).send(success);
        } catch (error) {
            console.log(error);
            const err = errorResponse("Error in fetching the User whose Role is User")
            res.status(500).json(err);
        }
      }