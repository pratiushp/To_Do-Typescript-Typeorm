import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Role } from './../Entities/Role';


export const addRole =async (req:Request, res: Response) => {
     const roleRepository = getRepository(Role); //Database Operation used
   
    try {
        const { roleName } = req.body
        
        const roledef = roleRepository.create({
            role_name: roleName,
        })

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