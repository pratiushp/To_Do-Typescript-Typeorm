import express from "express";
import { isAdmin, isSupervisor, requireSignIn } from "../middlware/authMiddleware";
import { addTaskController, delTask, editTaskController, getSingleTaskController, getAllTask } from '../controllers/taskController';
import { addTaskValidateRules, validate } from "../middlware/Validations";

const router = express.Router()

//Task Routes
router.post("/add-task", requireSignIn, isAdmin, addTaskController, validate(addTaskValidateRules) )
router.put("/edit-task/:id", requireSignIn, isAdmin, editTaskController)
router.delete("/del-task/:id", requireSignIn, isAdmin, delTask)
router.get("/get-task/:id", requireSignIn, isSupervisor,  getSingleTaskController)
router.get("/getall-task", requireSignIn, isAdmin,  getAllTask)


export default router