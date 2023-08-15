import express from "express"
import {  getSingleUser,  getallUser, loginUser, registerUser } from "../controllers/authController"
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

// router.get("/get-supervisor", requireSignIn, isAdmin, getSupervisor);
// router.delete("/del-user/:id", requireSignIn, isAdmin, delUser);
// router.post("/forget-password", forgetPassword )



//Role Routes
router.post("/add-role", addRole)
router.post("/update-role", requireSignIn, isAdmin, updateRole)
router.get("/get-supervisor", requireSignIn, isAdmin, getSupervisor)
router.get("/get-admin", requireSignIn, isAdmin, getAdmin)
router.get("/get-user", requireSignIn, isAdmin, getUser)



//Task Routes
router.post("/add-task", requireSignIn, isAdmin, addTaskController, validate(addTaskValidateRules) )
router.put("/edit-task/:id", requireSignIn, isAdmin, editTaskController)
router.delete("/del-task/:id", requireSignIn, isAdmin, delTask)
router.get("/get-task/:id", requireSignIn, isSupervisor,  getSingleTaskController)
router.get("/getall-task", requireSignIn, isAdmin,  getAllTask)

export { router }