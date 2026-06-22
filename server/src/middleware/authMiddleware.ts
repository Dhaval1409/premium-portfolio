 import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {

      token = req.headers.authorization.split(' ')[1];

      // Decode token payload validation check
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      req.user = decoded;

      next();
    } catch (error) {
      res.status(401).json({ message: 'Authorization verified signature failed, token corrupt or expired' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Access denied. No authentication credentials provided' });
  }
};