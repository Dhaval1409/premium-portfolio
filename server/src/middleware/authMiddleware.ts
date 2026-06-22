//  import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// export interface AuthenticatedRequest extends Request {
//   user?: any;
// }

// export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {

//       token = req.headers.authorization.split(' ')[1];

//       // Decode token payload validation check
//       const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
//       req.user = decoded;

//       next();
//     } catch (error) {
//       res.status(401).json({ message: 'Authorization verified signature failed, token corrupt or expired' });
//     }
//   }

//   if (!token) {
//     res.status(401).json({ message: 'Access denied. No authentication credentials provided' });
//   }
// };

import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const protect: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      // Extract token
      const token = authHeader.split(' ')[1];

      // FIXED: Ensure token actually exists after the split
      if (!token) {
        res.status(401).json({ message: 'Not authorized, token missing' });
        return;
      }

      // Ensure secret exists
      const jwtSecret = process.env.JWT_SECRET || 'fallback_secret';
      
      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined');
      }

      // Both token and jwtSecret are now guaranteed strings
      const decoded = jwt.verify(token, jwtSecret as string);
      
      (req as AuthenticatedRequest).user = decoded;
      
      next();
      return;
    } catch (error) {
      res.status(401).json({ message: 'Token is corrupt or expired' });
      return;
    }
  }

  res.status(401).json({ message: 'Access denied. No authentication credentials provided' });
};