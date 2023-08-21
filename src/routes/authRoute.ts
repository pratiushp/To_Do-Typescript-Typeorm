import express from "express"
import {   forgetPassword, loginUser, registerUser, resetPasswordController } from "../controllers/authController"
import { loginValidationRules, registerValidationRules, validate } from "../middlware/Validations";


const router = express.Router();

  
//Register route with validation
router.post("/register", validate(registerValidationRules), registerUser);
router.post("/login", validate(loginValidationRules), loginUser);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPasswordController);

// router.get("/user-get", getUsersWithPagination)
// router.get("/user/search/:username", searchUser )


export default router 