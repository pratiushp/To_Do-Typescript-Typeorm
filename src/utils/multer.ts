import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import { Callback } from "typeorm";

const storage = multer.diskStorage({
    destination: function (req: Request, res: Response, cb: Callback) {
        cb(null, path.join(__dirname, "./PictureUpload"))
    },
    filname: function (req: Request, file: any, cb: Callback) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = file.originalname.split("."[0]);
        cb(null, filename + "-" + uniqueSuffix + ".png");
    }
})

export default multer({storage: storage})