// import { Schema, model, Document } from 'mongoose';

// export interface IBlog extends Document {
//   title: string;
//   slug: string;
//   summary: string;
//   content: string; // Rich Markdown text
//   category: 'drama' | 'tech' | 'study' | 'movies'; // Multi-genre classification tags
//   coverImage: string;
//   tags: string[];
//   status: 'draft' | 'published';
//   readTime: string;
//   publishedAt: Date;
// }

// const BlogSchema = new Schema<IBlog>({
//   title: { type: String, required: true },
//   slug: { type: String, required: true, unique: true },
//   summary: { type: String, required: true },
//   content: { type: String, required: true },
//   category: { type: String, required: true, enum: ['drama', 'tech', 'study', 'movies'], default: 'tech' },
//   coverImage: { type: String, required: true },
//   tags: [{ type: String }],
//   status: { type: String, enum: ['draft', 'published'], default: 'draft' },
//   readTime: { type: String, required: true },
//   publishedAt: { type: Date, default: Date.now }
// });

// export const Blog = model<IBlog>('Blog', BlogSchema);



import { Schema, model, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: 'drama' | 'tech' | 'study' | 'movies';
  coverImage: string;
  tags: string[];
  status: 'draft' | 'published';
  readTime: string;
  publishedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    summary: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ['drama', 'tech', 'study', 'movies'],
      default: 'tech',
      required: true,
    },

    coverImage: {
      type: String,
      required: true,
    },

    tags: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },

    readTime: {
      type: String,
      required: true,
    },

    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = model<IBlog>('Blog', BlogSchema);