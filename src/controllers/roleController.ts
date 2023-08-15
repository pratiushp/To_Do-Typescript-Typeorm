import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Role } from './../Entities/Role';
import { User } from "../Entities/User";





export const addRole =async (req:Request, res: Response) => {
     const roleRepository = getRepository(Role); //Database Operation used
   
    try {
        const { roleName } = req.body
        
        const roledef =  roleRepository.create({
            role_name: roleName,
        }).save()
        res.status(201).send({
            success: true,
            message: "Role Added Successfully",
            roledef,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        })
        
    }
}


export const updateRole = async (req: Request, res: Response) => {
    const roleRepository = getRepository(Role);
    const userRepository = getRepository(User);
    
    try {
        const {   userid, roleid } = req.body;
        
        const role = await roleRepository.findOne({where: {id:roleid}});
        const user = await userRepository.findOne({where: {id:userid}});

        if (!role || !user) {
            res.status(404).send({
                success: false,
                message: "Role or User not found",
            });
            return;
        }

        
        user.role = [role];
        await user.save();

        res.status(200).send({
            success: true,
            message: "User added to role successfully",
            
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error,
        });
    }
}



export const getSupervisor = async(req: Request, res: Response)=> {
      const roleId = 2; // Role ID  of Supervisor
  
      try {
        const userRepository = (User);
        const usersWithRole = await User
          .createQueryBuilder("user")
          .leftJoinAndSelect("user.role", "role") 
          .where("role.id = :roleId", { roleId })
          .getMany();
  
          res.status(200).send({
              success: true,
              message: "Successfully get User whose role is Supervisor",
              usersWithRole,
          });
      } catch (error) {
        console.error("Error fetching users by role ID:", error);
        res.status(500).json({ error: "An error occurred" });
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
    
            res.status(200).send({
                success: true,
                message: "Successfully get User whose role is Admin ",
                usersWithRole,
            });
        } catch (error) {
          console.log( error);
            res.status(500).json({
                success: false,
                message: "Error in fetching the User whose Role is Admin",

            });
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
    
            res.status(200).send({
                success: true,
                message: "Successfully get User whose role is User ",
                usersWithRole,
            });
        } catch (error) {
          console.log( error);
            res.status(500).json({
                success: false,
                message: "Error in fetching the User whose Role is User",

            });
        }
      }