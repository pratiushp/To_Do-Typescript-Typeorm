import fs from "fs";
import { Request, Response, NextFunction } from "express";


export const imageController =async (req:any, res: Response, next:NextFunction) => {
    try {
        const picture = req.headers['content-type']?.startsWith('multipart/form-data')
        if (!picture) {
            return res.status(400).send("Bad Request");

        }

        const fileName = req.file.filename;
        const filePath = `PictureUpload/${fileName}`;


    } catch (error) {
        console.log(error);
    }
}