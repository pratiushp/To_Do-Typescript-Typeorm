import express from "express"
import {   getAllUser, loginUser, registerUser } from "../controllers/authController"
import { addRole, updateRole } from "../controllers/roleController";
import { loginValidationRules, registerValidationRules, validate } from "../middlware/Validations";


const router = express.Router();

  
//Register route with validation
router.post("/register", validate(registerValidationRules), registerUser);
router.post("/login", validate(loginValidationRules), loginUser);
router.get("/get-all-users", getAllUser);
// router.post("/forget-password", forgetPassword )


router.post("/add-role", addRole)
router.post ("/update-role", updateRole)


export { router }