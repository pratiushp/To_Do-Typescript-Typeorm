import express from "express"
import {   getAllUser, loginUser, registerUser } from "../controllers/authController"
import { addRole, updateRole } from "../controllers/roleController";
import { addTaskValidateRules, loginValidationRules, registerValidationRules, validate } from "../middlware/Validations";
import { addTask, editTask } from "../controllers/taskController";
import { isAdmin, requireSignIn } from "../middlware/authMiddleware";
// import { isAdmin } from '../middlware/authMiddleware';


const router = express.Router();

  
//Register route with validation
router.post("/register", validate(registerValidationRules), registerUser);
router.post("/login", validate(loginValidationRules), loginUser);
router.get("/get-all-users", getAllUser);
// router.post("/forget-password", forgetPassword )


// //Admin Route
// router.get("/admin-access", isAdmin, (req, res) => {
    
// })

router.post("/add-role", addRole)
router.post ("/update-role", updateRole)


router.post("/add-task",requireSignIn,isAdmin, validate(addTaskValidateRules) , addTask)
router.put("/edit-task", editTask)


export { router }