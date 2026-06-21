export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string; // Detailed case study markdown
  thumbnail: string;
  images: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // Markdown content
  coverImage: string;
  tags: string[];
  status: 'draft' | 'published';
  publishedAt: string;
  readTime: string;
}