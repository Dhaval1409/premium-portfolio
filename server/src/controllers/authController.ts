import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// @desc    Authenticate admin user credentials
// @route   POST /api/auth/login
export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
  const { password } = req.body;

  try {
    const masterPassword = process.env.ADMIN_PASSWORD || 'fallbackpassword';
    
    // Validate string equality directly or match via local compare checks
    if (password !== masterPassword) {
      res.status(401).json({ message: 'Invalid admin authentication signature' });
      return;
    }

    // Generate token valid for 7 days
    const token = jwt.sign(
      { role: 'admin' }, 
      process.env.JWT_SECRET || 'fallback_secret', 
      { expiresIn: '7d' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login internal task process crash error', error });
  }
};