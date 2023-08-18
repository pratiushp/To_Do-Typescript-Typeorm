export const errorResponse = (message: string, error?: any) => {
    return {
      success: false,
      message,
      error,
    };
  };
  