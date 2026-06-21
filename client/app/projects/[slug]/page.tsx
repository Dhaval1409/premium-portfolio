import React from 'react';
import { fetchAPI } from '@/src/lib/api';
import { Project } from '@/src/types';
import { notFound } from 'next/navigation';

export const revalidate = 0; // Ensures fresh lookups on every request

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProjectDetails(slug: string): Promise<Project | null> {
  try {
    // Calls GET http://localhost:5000/api/projects/:slug
    return await fetchAPI(`/projects/${slug}`);
  } catch (error) {
    console.error(`Error loading case study for [${slug}]:`, error);
    return null;
  }
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = await getProjectDetails(resolvedParams.slug);

  // If the backend returns a 404 or can't find the record, trigger Next.js native 404
  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto space-y-12 py-6">
      {/* Back to Work Nav Link */}
      <nav>
        <a 
          href="/#projects" 
          className="text-sm font-mono text-zinc-400 hover:text-blue-500 transition-colors"
        >
          ← Back to Portfolio
        </a>
      </nav>

      {/* Header Info Block */}
      <header className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tech) => (
            <span 
              key={tech} 
              className="text-xs font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1 rounded-md text-zinc-600 dark:text-zinc-400 uppercase tracking-wider"
            >
              {tech}
            </span>
          ))}
        </div>

        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          {project.title}
        </h1>

        <p className="text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-3xl">
          {project.description}
        </p>

        {/* 🌐 ACTION LINKS: GITHUB & LIVE DEPLOYMENT */}
        <div className="flex flex-wrap gap-4 pt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-mono border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 text-zinc-800 dark:text-zinc-200 shadow-xs transition"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Source Code
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-mono bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-xs transition"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Preview
            </a>
          )}
        </div>
      </header>

      {/* Main Project Cover Image Asset (Full Width, Clear) */}
      {project.thumbnail && (
        <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm bg-zinc-100 dark:bg-zinc-900">
          <img
            src={project.thumbnail}
            alt={`${project.title} cover blueprint layout`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Divider */}
      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Case Study Core Body Rendering Content */}
      <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-300 font-light leading-relaxed text-base md:text-lg whitespace-pre-line">
        {project.content}
      </div>

      {/* Footer Nav Block */}
      <footer className="pt-12 border-t border-zinc-200 dark:border-zinc-800 text-center">
        <p className="text-sm font-mono text-zinc-400">
          End of Specification • Created on {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </footer>
    </article>
  );
}