class ApiError extends Error {
    statusCode: number;
    data: any;
    isOperational: boolean;
  
    constructor(
      statusCode: number,
      message: string,
      data: any,
      isOperational: boolean = true,
      stack: string = ""
    ) {
      super(message);
      this.statusCode = statusCode;
      this.data = data;
      this.isOperational = isOperational;
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  export default ApiError;
  