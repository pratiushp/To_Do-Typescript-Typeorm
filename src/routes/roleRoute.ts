import express from "express";
import { addRole, getAdmin, getSupervisor, getUser, updateRole } from "../controllers/roleController";
import { isAdmin, requireSignIn } from "../middlware/authMiddleware";

const router = express.Router()

//Role Routes
router.post("/add-role", addRole)
router.post("/update-role", requireSignIn, isAdmin, updateRole)
router.get("/get-supervisor", requireSignIn, isAdmin, getSupervisor)
router.get("/get-admin", requireSignIn, isAdmin, getAdmin)
router.get("/get-user", requireSignIn, isAdmin, getUser)

export default router