import { Router } from 'express';
import { getBlogs, createBlog, getBlogBySlug, updateBlog, deleteBlog } from '../controllers/blogController';
import { protect } from '../middleware/authMiddleware'; // Import guard middleware

const router = Router();

router.route('/')
  .get(getBlogs)
  .post(protect, createBlog); // Protected

router.route('/:slug')
  .get(getBlogBySlug);

router.route('/id/:id')
  .put(protect, updateBlog) // Protected
  .delete(protect, deleteBlog); // Protected

export default router;