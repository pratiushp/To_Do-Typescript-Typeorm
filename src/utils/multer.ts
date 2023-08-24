import multer from 'multer';

// Configure multer to handle file uploads
const storage = multer.diskStorage({
  destination: 'uploads', // Specify the upload directory
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
});

// Create the multer instance
const uploadMiddleware = multer({
  storage: storage,
});

export default uploadMiddleware;
