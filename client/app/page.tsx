import React from 'react';
import { fetchAPI } from '@/src/lib/api';
import { Project } from '@/src/types';

// Force Next.js to fetch fresh database content on every visit
export const revalidate = 0;

async function getFeaturedProjects(): Promise<Project[]> {
  try {
    // Fetches only the items marked as featured from your Express API
    return await fetchAPI('/projects?featured=true');
  } catch (error) {
    console.error('Failed to fetch featured projects:', error);
    return []; // Fallback to avoid crashing the landing page if the server is restarting
  }
}

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="space-y-24">
   <section className="relative min-h-[420px] md:min-h-[650px] overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">

  {/* Desktop Background */}
  <img
    src="/bg/bg-2.png"
    alt="Hero"
    className="absolute inset-0 w-full h-full object-cover hidden md:block"
  />

  {/* Mobile Background */}
  <img
    src="/bg/bg-4.jpg"
    alt="Hero"
    className="absolute inset-0 w-full h-full object-cover block md:hidden"
  />

  {/* Content */}
  <div className="relative z-10 flex items-center h-full">
    <div className="px-6 md:px-12 lg:px-20 py-12 max-w-xl">

      <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl font-medium leading-[0.95] tracking-tight text-zinc-900 dark:text-zinc-50">
        Crafting high-performance
        <br />
        web experiences.
      </h1>

      <p className="mt-4 text-sm sm:text-base md:text-xl leading-relaxed text-zinc-800 dark:text-zinc-200 max-w-xs sm:max-w-md">
        Full-Stack Engineer specialized in developing clean,
        responsive architectures using React, Next.js, and
        specialized backend ecosystems.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mt-6 items-start">
        <a
          href="/projects"
          className="px-4 py-2.5 bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 rounded-lg text-sm font-semibold w-fit shadow-md"
        >
          View My Work
        </a>

        <a
          href="/contact"
          className="px-4 py-2.5 border border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 rounded-lg text-sm font-semibold w-fit backdrop-blur-sm"
        >
          Get In Touch
        </a>
      </div>

    </div>
  </div>
</section>
      {/* Featured Work / Projects Grid section */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <h2 className="font-serif text-3xl font-bold text-zinc-950 dark:text-zinc-50">Featured Projects</h2>
          <a href="/projects" className="text-sm font-semibold text-blue-500 hover:underline">All Projects →</a>
        </div>

        {featuredProjects.length === 0 ? (
          <p className="text-zinc-500 font-light py-4">No featured case studies found in the system.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <a
                key={project._id}
                href={`/projects/${project.slug}`}
                className="group block p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900/50 hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-900 transition-all duration-300"
              >
                {/* Tech Tags Stack */}
                <div className="flex flex-wrap gap-2 text-xs font-mono tracking-wider text-zinc-400 uppercase">
                  {project.tags.map((tech) => (
                    <span key={tech} className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-500 dark:text-zinc-400">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold mt-3 text-zinc-950 dark:text-zinc-50 group-hover:text-blue-500 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="text-xs font-semibold text-blue-500 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Read Case Study →
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}