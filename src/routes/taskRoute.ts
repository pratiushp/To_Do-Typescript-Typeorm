import express from "express";
import { isAdmin, isSupervisor, requireSignIn } from "../middlware/authMiddleware";
import { addTaskController, delTask, editTaskController, getSingleTaskController, getAllTask, getAllAdminTasks, getTasksAssignedByLoggedInAdmin } from '../controllers/taskController';
import { addTaskValidateRules, validate } from "../middlware/Validations";

const router = express.Router()

//Task Routes
router.post("/add-task",   addTaskController, validate(addTaskValidateRules) )
router.put("/edit-task/:id", isAdmin, editTaskController)
router.delete("/del-task/:id", isAdmin, delTask)
router.get("/get-task/:id",  isSupervisor,  getSingleTaskController)
router.get("/getall-task", isAdmin, getAllTask)
router.get("/admin-task",  isAdmin, getAllAdminTasks)
router.get("/admin-assigned-task", isAdmin, getTasksAssignedByLoggedInAdmin)


export default router