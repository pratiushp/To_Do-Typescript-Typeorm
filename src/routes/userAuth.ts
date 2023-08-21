import express from "express"
import { isAdmin } from "../middlware/authMiddleware";
import { deleteUser, getSingleUser, getUsersWithPagination } from "../controllers/authController";

const router = express.Router();

router.get("/get-user/:id", isAdmin, getSingleUser);
router.get("/get-all-user",  isAdmin, getUsersWithPagination);
router.put("/del-user/:id", deleteUser)

export default router 