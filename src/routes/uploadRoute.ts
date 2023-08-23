import express from "express"
import { uploadImageController } from "../controllers/uploadController";

const router = express.Router();

//Upload Image

router.post("/upload-image",  uploadImageController)


export default router 