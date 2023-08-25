import express from "express"
import {  uploadFile, uploadImageController } from "../controllers/uploadController";



const router = express.Router();

//Upload Image
router.post("/upload-image",  uploadImageController)

//Upload Task
router.post("/upload-task",  uploadFile)

export default router 