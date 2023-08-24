// import { Request, Response } from 'express';
// import { getRepository } from 'typeorm';


// import { User } from '../Entities/User';
// import { upload } from '../utils/multer';
// import { Upload } from '../Entities/Upload';
// import { error } from 'console';


// export const uploadPhoto = async (req: any, res: Response) => {
//     try {
//       // Assuming you have some form of authentication that provides user information
//       const userId = req.user?.id;
  
//       const uploadRepository = (Upload);
  
    
  
//         const picturePath = req.headers['content-type']?.startsWith('multipart/form-data')
  
//         if (!picturePath) {
//           return res.status(400).json({ message: 'No file uploaded' });
//         }
  
//         const newUpload = new Upload();
//         newUpload.picturePath = picturePath;
  
//         const user = new User();
//         user.id = userId; // Assuming the User entity has an 'id' property
  
//         newUpload.user = user;
  
//         await uploadRepository.save(newUpload);
  
//         return res.status(200).json({ message: 'Photo uploaded successfully' });
      
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   };
  