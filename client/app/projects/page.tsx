// import React from 'react';
// import { fetchAPI } from '@/src/lib/api';
// import { Project } from '@/src/types';

// export const revalidate = 0; // Ensures data is fetched fresh on page reload

// async function getAllProjects(): Promise<Project[]> {
//   try {
//     // Calls GET http://localhost:5000/api/projects
//     const data = await fetchAPI('/projects');
//     return Array.isArray(data) ? data : [];
//   } catch (error) {
//     console.error('Error loading portfolio project matrices:', error);
//     return [];
//   }
// }

// export default async function AllProjectsPage() {
//   const projects = await getAllProjects();

//   return (
//     <div className="max-w-6xl mx-auto py-12 px-4 space-y-12">
//       {/* Page Title Header */}
//       <header className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-6">
//         <h1 className="font-serif text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
//           Selected Engineering Works
//         </h1>
//         <p className="text-zinc-500 dark:text-zinc-400 font-mono text-sm">
//           A showcase of full-stack ecosystems, intelligent AI agents, and custom builds.
//         </p>
//       </header>

//       {/* Empty State Tracker */}
//       {projects.length === 0 ? (
//         <div className="text-center py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
//           <p className="text-zinc-400 font-mono text-sm">No live production pipelines indexed in this database cluster slot.</p>
//         </div>
//       ) : (
//         /* Projects Grid Matrix Layout */
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {projects.map((project) => (
//             <article 
//               key={project._id} 
//               className="group flex flex-col space-y-4 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl bg-zinc-50/30 dark:bg-zinc-900/10 hover:border-blue-500/50 dark:hover:border-blue-500/40 transition-all duration-300 shadow-xs"
//             >
//               {/* Cover Thumbnail Frame */}
//               {project.thumbnail && (
//                 <a 
//                   href={`/projects/${project.slug}`}
//                   className="block w-full aspect-[16/9] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900"
//                 >
//                   <img
//                     src={project.thumbnail}
//                     alt={`${project.title} blueprint thumbnail layout`}
//                     className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
//                   />
//                 </a>
//               )}

//               {/* Technical Badges Matrix */}
//               <div className="flex flex-wrap gap-1.5">
//                 {project.tags?.slice(0, 3).map((tag) => (
//                   <span 
//                     key={tag} 
//                     className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded-md text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//                 {project.tags?.length > 3 && (
//                   <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 px-1 py-0.5">
//                     +{project.tags.length - 3} more
//                   </span>
//                 )}
//               </div>

//               {/* Title & Core Summary Context */}
//               <div className="flex-1 space-y-2">
//                 <h2 className="font-serif text-xl font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-blue-500 transition-colors">
//                   <a href={`/projects/${project.slug}`}>
//                     {project.title}
//                   </a>
//                 </h2>
//                 <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 font-light leading-relaxed">
//                   {project.description}
//                 </p>
//               </div>

//               {/* Lower Navigation Anchor Link */}
//               <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-center">
//                 <a 
//                   href={`/projects/${project.slug}`}
//                   className="text-xs font-mono text-blue-500 font-bold tracking-wide group-hover:underline inline-flex items-center gap-1"
//                 >
//                   Explore Breakdown →
//                 </a>
                
//                 {project.githubUrl && (
//                   <a 
//                     href={project.githubUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
//                   >
//                     <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
//                       <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
//                     </svg>
//                   </a>
//                 )}
//               </div>
//             </article>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import React from 'react';
import { Project } from '@/src/types';

export const revalidate = 0; // Ensures data is fetched fresh on page reload

async function getAllProjects(): Promise<Project[]> {
  try {
    // 🚨 FIXED: Hardcoded live backend URL to completely bypass fetchAPI and Vercel cache bugs
    const res = await fetch('https://premium-portfolio-kohl.vercel.app/api/projects', {
      cache: 'no-store'
    });

    if (!res.ok) {
      console.error(`Backend returned status ${res.status}`);
      return [];
    }

    const data = await res.json();
    
    // Safely extract the array whether your Express API sends a direct array or an object
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    if (data && Array.isArray(data.projects)) return data.projects;
    
    return [];
  } catch (error) {
    console.error('Error loading portfolio project matrices:', error);
    return [];
  }
}

export default async function AllProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-12">
      {/* Page Title Header */}
      <header className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Selected Engineering Works
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 font-mono text-sm">
          A showcase of full-stack ecosystems, intelligent AI agents, and custom builds.
        </p>
      </header>

      {/* Empty State Tracker */}
      {projects.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <p className="text-zinc-400 font-mono text-sm">No live production pipelines indexed in this database cluster slot.</p>
        </div>
      ) : (
        /* Projects Grid Matrix Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <article 
              key={project._id} 
              className="group flex flex-col space-y-4 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl bg-zinc-50/30 dark:bg-zinc-900/10 hover:border-blue-500/50 dark:hover:border-blue-500/40 transition-all duration-300 shadow-xs"
            >
              {/* Cover Thumbnail Frame */}
              {project.thumbnail && (
                <a 
                  href={`/projects/${project.slug}`}
                  className="block w-full aspect-[16/9] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900"
                >
                  <img
                    src={project.thumbnail}
                    alt={`${project.title} blueprint thumbnail layout`}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </a>
              )}

              {/* Technical Badges Matrix */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags?.slice(0, 3).map((tag) => (
                  <span 
                    key={tag} 
                    className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded-md text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags?.length > 3 && (
                  <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 px-1 py-0.5">
                    +{project.tags.length - 3} more
                  </span>
                )}
              </div>

              {/* Title & Core Summary Context */}
              <div className="flex-1 space-y-2">
                <h2 className="font-serif text-xl font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-blue-500 transition-colors">
                  <a href={`/projects/${project.slug}`}>
                    {project.title}
                  </a>
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Lower Navigation Anchor Link */}
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-center">
                <a 
                  href={`/projects/${project.slug}`}
                  className="text-xs font-mono text-blue-500 font-bold tracking-wide group-hover:underline inline-flex items-center gap-1"
                >
                  Explore Breakdown →
                </a>
                
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}