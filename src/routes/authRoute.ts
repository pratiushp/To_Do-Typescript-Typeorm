import express from "express"
import {  forgetPassword, getSingleUser,  getUsersWithPagination,  getallUser, loginUser, registerUser, resetPasswordController, searchUser } from "../controllers/authController"
import { addRole,    getAdmin,    getSupervisor,    getUser,    updateRole } from "../controllers/roleController";
import { addTaskValidateRules, loginValidationRules, registerValidationRules, validate } from "../middlware/Validations";
import {  addTaskController, delTask, editTaskController, getAllTask, getSingleTaskController } from "../controllers/taskController";
import { isAdmin, isSupervisor, requireSignIn } from "../middlware/authMiddleware";



const router = express.Router();

  
//Register route with validation
router.post("/register", validate(registerValidationRules), registerUser);
router.post("/login", validate(loginValidationRules), loginUser);
router.get("/get-all-users", requireSignIn, isAdmin, getallUser);
router.get("/get-user/:id", requireSignIn, isAdmin, getSingleUser);
router.post("/forget-password", forgetPassword)
router.post("/reset-password", resetPasswordController)
router.get("/user-get", getUsersWithPagination)
router.get("/user/search/:username", searchUser )








export default router 