import express from "express"
import {  uploadImageController } from "../controllers/uploadController";
import uploadMiddleware from "../utils/multer";

const router = express.Router();

//Upload Image

router.post("/upload-image", uploadMiddleware.single("image"),  uploadImageController)


export default router 