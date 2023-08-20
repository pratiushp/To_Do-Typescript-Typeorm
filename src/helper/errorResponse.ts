// import { Request, Response, NextFunction } from 'express';

// const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
//   // Set default status code and message for the error
//   err.statusCode = err.statusCode || 500;
//   err.message = err.message || 'Internal Server Error';

//   // Handle Already Exist error
//   if (err.message === 'Already Exist') {
//     err.statusCode = 409;
//   }

//   // Handle 404 Not Found error
//   if (err.statusCode === 404) {
//     err.message = 'Not found';
//   }

//   // Return the error response
//   res.status(err.statusCode).json({
//     success: false,
//     message: err.message,
//   });
// };

// export default errorMiddleware;
