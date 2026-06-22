// import { Request, Response } from 'express';
// import { Project } from '../models/Project';

// // @desc    Get all projects (or only featured ones)
// // @route   GET /api/projects
// export const getProjects = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { featured } = req.query;
//     const filter = featured === 'true' ? { featured: true } : {};

//     const projects = await Project.find(filter).sort({ createdAt: -1 });
//     res.status(200).json(projects);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error retrieving project dataset', error });
//   }
// };

// // @desc    Get a single project by its unique slug
// // @route   GET /api/projects/:slug
// export const getProjectBySlug = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const project = await Project.findOne({ slug: req.params.slug });
    
//     if (!project) {
//       res.status(404).json({ message: 'Project case study not found' });
//       return;
//     }
    
//     res.status(200).json(project);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error retrieving project details', error });
//   }
// };

// // @desc    Create a new project showcase entry
// // @route   POST /api/projects
// export const createProject = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const newProject = await Project.create(req.body);
//     res.status(201).json(newProject);
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid project layout data structure', error });
//   }
// };

// // @desc    Update an existing project entry by ID
// // @route   PUT /api/projects/:id
// export const updateProject = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedProject) {
//       res.status(404).json({ message: 'Target project record not found' });
//       return;
//     }

//     res.status(200).json(updatedProject);
//   } catch (error) {
//     res.status(400).json({ message: 'Failed to update project data matrix', error });
//   }
// };

// // @desc    Delete a project entry by ID
// // @route   DELETE /api/projects/:id
// export const deleteProject = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const deletedProject = await Project.findByIdAndDelete(req.params.id);

//     if (!deletedProject) {
//       res.status(404).json({ message: 'Target project record not found' });
//       return;
//     }

//     res.status(200).json({ success: true, message: 'Project layout record securely wiped from cluster' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to execute drop process on target project', error });
//   }
// };


import { Request, Response } from 'express';
import { Project } from '../models/Project';

// @desc    Get all projects (or only featured ones)
// @route   GET /api/projects
export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const { featured } = req.query;
    const filter = featured === 'true' ? { featured: true } : {};

    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving project dataset', error });
  }
};

// @desc    Get a single project by its unique slug
// @route   GET /api/projects/:slug
export const getProjectBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    // FIXED: Explicitly cast to string and validate
    const slug = req.params.slug as string;

    if (!slug) {
      res.status(400).json({ message: 'Slug parameter is required' });
      return;
    }

    const project = await Project.findOne({ slug });
    
    if (!project) {
      res.status(404).json({ message: 'Project case study not found' });
      return;
    }
    
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving project details', error });
  }
};

// @desc    Create a new project showcase entry
// @route   POST /api/projects
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: 'Invalid project layout data structure', error });
  }
};

// @desc    Update an existing project entry by ID
// @route   PUT /api/projects/:id
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    // FIXED: Explicitly cast req.params.id to string
    const updatedProject = await Project.findByIdAndUpdate(req.params.id as string, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      res.status(404).json({ message: 'Target project record not found' });
      return;
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update project data matrix', error });
  }
};

// @desc    Delete a project entry by ID
// @route   DELETE /api/projects/:id
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    // FIXED: Explicitly cast req.params.id to string
    const deletedProject = await Project.findByIdAndDelete(req.params.id as string);

    if (!deletedProject) {
      res.status(404).json({ message: 'Target project record not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Project layout record securely wiped from cluster' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to execute drop process on target project', error });
  }
};