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
        const { roleid, userid } = req.body;

        // Find the role and user by their respective IDs
        const role = await roleRepository.findOne({where: {id:roleid}});
        const user = await userRepository.findOne({where: {id:userid}});

        if (!role || !user) {
            res.status(404).send({
                success: false,
                message: "Role or User not found",
            });
            return;
        }

        
        role.users = [user];
        await role.save();

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
