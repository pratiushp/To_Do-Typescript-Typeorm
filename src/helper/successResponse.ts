import { Request, Response, NextFunction } from 'express';

const successMiddleware = (data: any, req: Request, res: Response, next: NextFunction) => {

  const statusCode = data.statusCode || 200;
  const message = data.message || 'Success';


  const response = {
    success: true,
    message: message,
    data: data.data || null, 
  };

  // Return the success response
  res.status(statusCode).json(response);
};

export default successMiddleware;
