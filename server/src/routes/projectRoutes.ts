import { Router } from 'express';
import { getProjects, getProjectBySlug, createProject, updateProject, deleteProject } from '../controllers/projectController';
import { protect } from '../middleware/authMiddleware'; // Import guard middleware

const router = Router();

router.route('/')
  .get(getProjects)
  .post(protect, createProject); // Protected

router.route('/:slug')
  .get(getProjectBySlug);

router.route('/id/:id')
  .put(protect, updateProject) // Protected
  .delete(protect, deleteProject); // Protected

export default router;