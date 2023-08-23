import express from "express"
import { taskFileController } from "../controllers/uploadController";


const router = express.Router();

//File Upload

router.post("/file-upload",  taskFileController)


export default router;