


import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import blogRoutes from './routes/blogRoutes';
import projectRoutes from './routes/projectRoutes';
import authRoutes from './routes/authRoutes'; 
import contactRoutes from './routes/contactRoutes';

// Load environment variables
dotenv.config();

const app: Application = express();

// Connect Database
// Note: Ensure your connectDB handles connection pooling 
// so it doesn't try to reconnect on every request.
connectDB();

// Middleware: Updated CORS to allow your live frontend
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'https://premium-portfolio-d9z7.vercel.app' // NO trailing slash here!
  ],
  credentials: true // Crucial for login/authentication to work
}));

app.use(express.json()); 

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy' });
});

console.log("hello");
// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Export the app for Vercel
export default app;