import { Request, Response, NextFunction } from 'express';

declare module "express-serve-static-core" {
  interface Request {
    user: {
      isAdmin: boolean
    }
  }
}

export default function authorize(req: Request, res: Response, next: NextFunction) {
  if (!req.user.isAdmin)
    return res
      .status(403)
      .send(
        'Elavated privilege needed to access this resource. Access Denied!',
      );
  return next();
}
