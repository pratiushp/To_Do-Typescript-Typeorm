import { Response, NextFunction } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import ErrorHandler from '../utils/ErrorHandler';
import successMiddleware from '../helper/successResponse';
import { Upload } from '../Entities/Upload';
import { TaskFile } from '../Entities/taskFile';


export const uploadImageController = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id.toString();

    if (!userId) {
      return next(new ErrorHandler("Invalid User", 400))
    }

    const userUploadDir = path.join('uploads', userId);
    const uploadsDir = path.join(__dirname, 'uploads');


    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    if (!fs.existsSync(userUploadDir)) {
      fs.mkdirSync(userUploadDir, { recursive: true });
    }
    
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, userUploadDir);
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    });

    const uploadMiddleware = multer({
      storage: storage,
    }).single('image');

    // Delete image and upload new one
    fs.readdir(userUploadDir, async (err, files) => {
      if (err) {
        console.error(err);
        return next(new ErrorHandler("Error On deleting Picture", 500))
      }

      files.forEach((file) => {
        const filePath = path.join(userUploadDir, file);
        fs.unlinkSync(filePath);
      });
      
      uploadMiddleware(req, res, async (err) => {
        if (err) {
          console.error(err);
          return next(new ErrorHandler("Error on Uploading Picture", 500))
        }
        
        const uploadRepository = (Upload); 
        const newUpload = new Upload();
        newUpload.picturePath = path.join(userUploadDir, req.file.filename);
        newUpload.user = userId; 

        try {
          const savedUpload = await uploadRepository.save(newUpload);
          successMiddleware({
            message: "Successfully Uploaded Picture",
            data: savedUpload, 
          }, req, res, next);
        } catch (error) {
          console.error(error);
          return next(new ErrorHandler("Error on Saving Picture Info", 500))
        }
      });
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message, 500))
  }
};




//Task File Upload
export const uploadFile = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id.toString();
    const name = req.user?.name;
    console.log(name);

    if (!userId) {
      return next(new ErrorHandler("Invalid User", 400))
    }

    const userUploadDir = path.join('fileuploads', userId);
    const uploadsDir = path.join(__dirname, 'fileuploads');


  

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
      // fs.rename(req.file.path, path.join())
    }

    if (!fs.existsSync(userUploadDir)) {
      fs.mkdirSync(userUploadDir, { recursive: true });
    }

  
    const storage = multer.diskStorage({
      
      destination: (req, file, cb) => {
        cb(null, userUploadDir);
      },
      filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const newFilename = `${name}${extension}`; 
        cb(null, newFilename);
      },

      fileFilter: (req, file, cb) => {
        if (path.extname(file.orignalname) === ".pdf" || path.extname(file.orignalname) === ".docx" ||
          path.extname(file.orignalname) === ".xlsx" || path.extname(file.orignalname) === ".png" ||
          path.extname(file.orignalname) === ".jpg") {
          
          return cb(null, true);
        }
        return next(new ErrorHandler("Unsupported File Format", 400))
        
      }
    
    });

  
    const uploadMiddleware = multer({
      storage: storage,
    }).single('file');

    // Delete image and upload new one
    fs.readdir(userUploadDir, async (err, files) => {
      if (err) {
        console.error(err);
        return next(new ErrorHandler("Error On deleting File", 500))
      }

      files.forEach((file) => {
        const filePath = path.join(userUploadDir, file);
        fs.unlinkSync(filePath);
      });

      // console.log(files);
      
      uploadMiddleware(req, res, async (err) => {
        if (err) {
          console.error(err);
          return next(new ErrorHandler("Error on Uploading Picture", 500))
        }
        
        const taskFileRepo = (TaskFile); 
        const newUpload = new TaskFile();
        newUpload.filePath = path.join(userUploadDir, req.file.filename);
        newUpload.user = userId; 
    
    

        try {
          const savedUpload = await taskFileRepo.save(newUpload);
          successMiddleware({
            message: "Successfully Uploaded File",
            data: savedUpload, 
          }, req, res, next);
        } catch (error) {
          console.error(error);
          return next(new ErrorHandler("Error on Saving Picture Info", 500))
        }
      });
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message, 500))
  }
};