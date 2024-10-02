import { Request, Response, NextFunction } from 'express';

// Middleware to convert BigInt to string in the response
export const bigintMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;

  // Override the default `res.json` function
  res.json = function (data) {
    const transformedData = JSON.parse(
      JSON.stringify(data, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )
    );
    return originalJson.call(this, transformedData);
  };

  next();
};