// import express, { Application, Request, Response } from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import dns from 'dns';
// import { connectDB } from './config/db';
// import blogRoutes from './routes/blogRoutes';
// import projectRoutes from './routes/projectRoutes';
// import authRoutes from './routes/authRoutes'; 
// import contactRoutes from './routes/contactRoutes';

// dns.setServers(['1.1.1.1', '8.8.8.8']);
// dotenv.config();

// const app: Application = express();
// const PORT = process.env.PORT || 5000;

// connectDB();

// // app.use(cors({ origin: 'http://localhost:3000' }));   
// app.use(cors()); //temraory deploy
// app.use(express.json()); 

// app.get('/health', (req: Request, res: Response) => {
//   res.status(200).json({ status: 'healthy' });
// });

// // 2. Mount resources paths
// app.use('/api/auth', authRoutes);
// app.use('/api/blogs', blogRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/contact', contactRoutes);

// app.listen(PORT, () => {
//   console.log(`🌐 Server running in development mode on port ${PORT}`);
// });

// export default app;



import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import blogRoutes from './routes/blogRoutes';
import projectRoutes from './routes/projectRoutes';
import authRoutes from './routes/authRoutes'; 
import contactRoutes from './routes/contactRoutes';

dotenv.config();

const app: Application = express();

// Connect Database
connectDB();

app.use(cors());
app.use(express.json()); 

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy' });
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// DO NOT USE app.listen() for Vercel
export default app;