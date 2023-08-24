import { Response, NextFunction } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

export const uploadImageController = async (req: any, res: Response, next: NextFunction) => {
  try {
  
    const userId = req.user?.id.toString();

    if (!userId) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const userUploadDir = path.join('uploads', userId);
        
        if (!fs.existsSync(userUploadDir)) {
          fs.mkdirSync(userUploadDir, { recursive: true });
        }
        cb(null, userUploadDir); 
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    });

    const uploadMiddleware = multer({
      storage: storage,
    }).single('image');

    uploadMiddleware(req, res, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred while uploading' });
      }
      return res.status(201).json({ message: 'Picture uploaded and saved successfully' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

// export const taskFileController =async (req:any, res:Response, next:NextFunction) => {
//   try {
//     const file = req.headers['content-type']?.startsWith('multipart/form-data');
//     if (!file) {
//       return res.status(400).send("Bad Request");
//     }

//     const userId = req.user?.id;

//     const user = await User.findOne({where:{id: userId}})

//     if (!user) {
//       return res.status(400).send("Bad Request");
//     }




//   } catch (error) {
    
//   }
// }