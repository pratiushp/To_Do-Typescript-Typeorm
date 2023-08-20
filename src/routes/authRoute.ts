import express from "express"
import {  deleteUser, forgetPassword, getSingleUser, loginUser, registerUser, resetPasswordController } from "../controllers/authController"

import { addTaskValidateRules, loginValidationRules, registerValidationRules, validate } from "../middlware/Validations";
import {  addTaskController, delTask, editTaskController, getAllTask, getSingleTaskController } from "../controllers/taskController";
import { isAdmin, isSupervisor, requireSignIn } from "../middlware/authMiddleware";



const router = express.Router();

  
//Register route with validation
router.post("/register", validate(registerValidationRules), registerUser);
router.post("/login", validate(loginValidationRules), loginUser);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPasswordController);

// router.get("/user-get", getUsersWithPagination)
// router.get("/user/search/:username", searchUser )


export default router 