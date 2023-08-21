import express from "express";
import { addRole, getUsersByRole, updateRole } from '../controllers/roleController';
import { isAdmin, requireSignIn } from "../middlware/authMiddleware";
import { deleteUser, getSingleUser, getUsersWithPagination } from "../controllers/authController";

const router = express.Router()

//Role Routes
router.post("/add-role", addRole)
router.post("/update-role",isAdmin, updateRole)
// router.get("/get-supervisor", requireSignIn, isAdmin, getSupervisor)
// router.get("/get-admin", requireSignIn, isAdmin, getAdmin)
// router.get("/get-user", requireSignIn, isAdmin, getUser)
router.get("/role-user", getUsersByRole)




export default router