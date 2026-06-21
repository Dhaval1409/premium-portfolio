import { Schema, model, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  content: string; // Markdown details
  thumbnail: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  thumbnail: { type: String, required: true },
  tags: [{ type: String }],
  liveUrl: { type: String },
  githubUrl: { type: String },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Project = model<IProject>('Project', ProjectSchema);