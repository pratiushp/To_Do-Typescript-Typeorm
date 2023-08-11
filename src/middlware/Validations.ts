import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { body } from "express-validator";


export const registerValidationRules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ];
  
  export const loginValidationRules = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
  

  export const addTaskValidateRules = [
    body("task_name").notEmpty().withMessage("Task Name is requiredd"),
    body("Assigned By").notEmpty().withMessage("Add by Whom the Task is assigned by"),
    body("Assigned to").notEmpty().withMessage("Add to Whom the Task is assigned to"),
  ];


  export const validate = (validations: any[]) => {
    return async (req: Request, res: Response, next: any) => {
      await Promise.all(validations.map((validation) => validation.run(req)));
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      res.status(400).json({ errors: errors.array() });
    };
  };
  