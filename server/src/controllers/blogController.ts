// import { Request, Response } from 'express';
// import { Blog } from '../models/Blog';

// // @desc    Get all published blog posts
// // @route   GET /api/blogs
// export const getBlogs = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const blogs = await Blog.find({ status: 'published' }).sort({ publishedAt: -1 });
//     res.status(200).json(blogs);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error retrieving blog feed data', error });
//   }
// };

// // @desc    Get a single blog post by slug
// // @route   GET /api/blogs/:slug
// export const getBlogBySlug = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const blog = await Blog.findOne({ slug: req.params.slug });
    
//     if (!blog) {
//       res.status(404).json({ message: 'Article not found' });
//       return;
//     }
    
//     res.status(200).json(blog);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error retrieving article data', error });
//   }
// };

// // @desc    Create a new blog post
// // @route   POST /api/blogs
// export const createBlog = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const newBlog = await Blog.create(req.body);
//     res.status(201).json(newBlog);
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid blog data structure provided', error });
//   }
// };

// // @desc    Update an existing blog post by ID
// // @route   PUT /api/blogs/:id
// export const updateBlog = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedBlog) {
//       res.status(404).json({ message: 'Target blog post record not found' });
//       return;
//     }

//     res.status(200).json(updatedBlog);
//   } catch (error) {
//     res.status(400).json({ message: 'Failed to update blog record parameters', error });
//   }
// };

// // @desc    Delete a blog post by ID
// // @route   DELETE /api/blogs/:id
// export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

//     if (!deletedBlog) {
//       res.status(404).json({ message: 'Target blog post record not found' });
//       return;
//     }

//     res.status(200).json({ success: true, message: 'Blog post securely deleted from cluster' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to execute drop process on target blog', error });
//   }
// };


import { Request, Response } from 'express';
import { Blog } from '../models/Blog';
import slugify from 'slugify';

// @desc Get all published blog posts
// @route GET /api/blogs
export const getBlogs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const blogs = await Blog.find({
      status: 'published',
    }).sort({ publishedAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: 'Server error retrieving blog feed data',
      error,
    });
  }
};

// @desc Get a single blog post by slug
// @route GET /api/blogs/:slug
export const getBlogBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
    });

    if (!blog) {
      res.status(404).json({
        message: 'Article not found',
      });
      return;
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({
      message: 'Server error retrieving article data',
      error,
    });
  }
};

// @desc Create a new blog post
// @route POST /api/blogs
export const createBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const slug = slugify(req.body.title, {
      lower: true,
      strict: true,
      trim: true,
    });

    const newBlog = await Blog.create({
      ...req.body,
      slug,
    });

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({
      message: 'Invalid blog data structure provided',
      error,
    });
  }
};

// @desc Update an existing blog post by ID
// @route PUT /api/blogs/:id
export const updateBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updateData = {
      ...req.body,
      slug: slugify(req.body.title, {
        lower: true,
        strict: true,
        trim: true,
      }),
    };

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBlog) {
      res.status(404).json({
        message: 'Target blog post record not found',
      });
      return;
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update blog record parameters',
      error,
    });
  }
};

// @desc Delete a blog post by ID
// @route DELETE /api/blogs/:id
export const deleteBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(
      req.params.id
    );

    if (!deletedBlog) {
      res.status(404).json({
        message: 'Target blog post record not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Blog post securely deleted from cluster',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to execute drop process on target blog',
      error,
    });
  }
};