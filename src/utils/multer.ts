// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'Files_Uploads'); // Uploads directory where files will be stored
//   },
//   filename: (req, file, cb) => {
//     const extension = path.extname(file.originalname);
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + extension);
//   },
// });

// const fileFilter = (req: any, file: any, cb: any) => {
//   const allowedExtensions = ['.pdf', '.docx', '.xlsx', '.jpg', '.jpeg', '.png'];
//   const fileExtension = path.extname(file.originalname).toLowerCase();
//   if (allowedExtensions.includes(fileExtension)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file extension'));
//   }
// };

// const upload = multer({ storage, fileFilter });

// export { upload };
