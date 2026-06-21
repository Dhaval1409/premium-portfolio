import React from 'react';
import { fetchAPI } from '@/src/lib/api';
import { notFound } from 'next/navigation';

export const revalidate = 0; // Ensures fresh lookups on every request

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogDetails(slug: string) {
  try {
    // Decodes %20 into regular spaces securely on the server side
    const decodedSlug = decodeURIComponent(slug);
    return await fetchAPI(`/blogs/${decodedSlug}`);
  } catch (error) {
    console.error(`Error loading article for [${slug}]:`, error);
    return null;
  }
}

export default async function SingleArticleReader({ params }: PageProps) {
  const resolvedParams = await params;
  const blog = await getBlogDetails(resolvedParams.slug);

  // If the backend doesn't find the blog post, trigger Next.js native 404 page
  if (!blog) {
    notFound();
  }

  const isEntertainment = blog.category === 'drama' || blog.category === 'movies' || blog.category === 'entertainment';
  const isStudy = blog.category === 'study';

  return (
    <article className="max-w-4xl mx-auto py-12 px-4 space-y-10 selection:bg-blue-500/20">
      
      {/* Back to Archive Nav */}
      <nav>
        <a 
          href="/blogs" 
          className="text-sm font-mono text-zinc-400 hover:text-blue-500 transition-colors"
        >
          ← Back to Blogs
        </a>
      </nav>

      {/* ==========================================
          HEADER SECTION: Changes based on Genre
         ========================================== */}
      <header className="space-y-4 text-center">
        <span className={`text-xs px-3 py-1 rounded-full font-mono uppercase tracking-widest font-bold ${
          isEntertainment 
            ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' 
            : isStudy 
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
            : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
        }`}>
          {blog.category === 'drama' ? '🎬 K-Drama Tracker' : blog.category === 'movies' ? '🍿 Cinema Release' : blog.category === 'study' ? '📚 CS Study Guide' : '💻 Tech & Systems'}
        </span>
        
        <h1 className={`font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight ${
          isEntertainment 
            ? 'font-serif text-5xl md:text-6xl italic' 
            : 'font-sans text-4xl md:text-5xl font-extrabold tracking-tight' 
        }`}>
          {blog.title}
        </h1>
        
        <div className="flex justify-center items-center gap-4 text-xs font-mono text-zinc-400">
          <span>{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : new Date().toLocaleDateString()}</span>
          <span>•</span>
          <span>{blog.readTime || '5 min read'}</span>
        </div>
      </header>

      {/* Hero Banner Cover */}
      {blog.coverImage && (
        <div className="w-full aspect-video rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-xl border border-zinc-200/20">
          <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Summary Block */}
      {blog.summary && (
        <p className={`text-xl font-light leading-relaxed border-l-4 pl-4 ${
          isEntertainment ? 'text-purple-900/80 dark:text-purple-300/80 border-purple-500 italic' : 'text-zinc-600 dark:text-zinc-400 border-blue-500'
        }`}>
          {blog.summary}
        </p>
      )}

      {/* ==========================================
          BODY RENDER LOOP: Fully differentiated layouts
         ========================================== */}
      <main className="space-y-12 text-zinc-800 dark:text-zinc-200 leading-relaxed text-base md:text-lg">
        
        {/* Core plain-text content body backup if present */}
        {blog.content && (
          <div className={`prose dark:prose-invert max-w-none whitespace-pre-line font-light ${isEntertainment ? 'font-serif' : 'font-sans'}`}>
            {blog.content}
          </div>
        )}

        {blog.contentBlocks?.map((block: any, index: number) => {
          switch (block.type) {
            
            // 1. Text Markdown block
            case 'markdown':
              return (
                <div key={index} className={`prose dark:prose-invert max-w-none whitespace-pre-wrap font-light ${isEntertainment ? 'font-serif' : 'font-sans'}`}>
                  {block.body}
                </div>
              );

            // 2. Cast Profiles
            case 'cast_grid':
              return (
                <div key={index} className="space-y-6 pt-4">
                  <h3 className={`text-2xl font-bold border-b border-zinc-200 dark:border-zinc-800 pb-2 ${isEntertainment ? 'font-serif text-purple-950 dark:text-purple-400' : 'font-sans text-zinc-950 dark:text-zinc-50'}`}>
                    {isEntertainment ? '🌟 Star-Studded Cast & Character Profiles' : '👥 Core Contributors & Architects'}
                  </h3>
                  
                  <div className={isEntertainment ? "grid grid-cols-1 gap-6" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
                    {block.castMembers?.map((member: any, mIdx: number) => (
                      isEntertainment ? (
                        /* PREMIUM CINEMATIC CAST CARD */
                        <div key={mIdx} className="group flex flex-col md:flex-row gap-6 p-6 border border-purple-500/10 rounded-3xl bg-linear-to-br from-purple-500/5 to-transparent dark:from-purple-500/5 dark:to-zinc-900/30 items-center md:items-start transition-all hover:border-purple-500/30">
                          <div className="w-32 h-44 rounded-2xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-800 shrink-0 relative">
                            <img src={member.actorImage || '/bg/avatar-fallback.png'} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div className="space-y-2 text-center md:text-left flex-1">
                            <div className="flex flex-col md:flex-row md:items-baseline md:gap-3">
                              <h4 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">{member.name}</h4>
                              <span className="text-sm font-mono text-purple-500 font-semibold tracking-wider uppercase">as {member.characterName}</span>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-serif font-light leading-relaxed">{member.description}</p>
                          </div>
                        </div>
                      ) : (
                        /* CLEAN TECH ARCHITECT CARD */
                        <div key={mIdx} className="flex gap-4 p-4 border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/20 items-center">
                          <img src={member.actorImage || '/bg/avatar-fallback.png'} alt={member.name} className="w-12 h-12 rounded-full object-cover border border-zinc-200 dark:border-zinc-700 shadow-xs shrink-0" />
                          <div className="space-y-0.5">
                            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{member.name}</h4>
                            <p className="text-xs font-mono text-zinc-400">{member.characterName}</p>
                            <p className="text-xs text-zinc-500 font-light line-clamp-1">{member.description}</p>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              );

            // 3. Highlight Alerts
            case 'highlight_alert':
              return (
                <div key={index} className={`p-5 border rounded-2xl flex gap-3 items-start ${
                  isEntertainment 
                    ? 'bg-purple-500/5 border-purple-500/20 text-purple-900 dark:text-purple-300' 
                    : isStudy
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-900 dark:text-emerald-300'
                    : 'bg-blue-500/5 border-blue-500/20 text-blue-900 dark:text-blue-300'
                }`}>
                  <span className="text-xl">{isEntertainment ? '🎬' : isStudy ? '💡' : '⚙️'}</span>
                  <div className={`text-sm md:text-base leading-relaxed ${isEntertainment ? 'font-serif italic' : 'font-mono'}`}>
                    <strong className="block not-italic uppercase tracking-wider text-xs mb-1 font-bold">
                      {isEntertainment ? 'Production Insider Note' : isStudy ? 'Exam Formula Sheet Check' : 'System Manifest Note'}
                    </strong>
                    {block.body}
                  </div>
                </div>
              );

            default:
              return null;
          }
        })}
      </main>

      {/* Footer Specification End Metadata */}
      <footer className="pt-12 border-t border-zinc-200 dark:border-zinc-800 text-center">
        <p className="text-sm font-mono text-zinc-400">
          End of Article • Published on {new Date(blog.publishedAt || blog.createdAt || new Date()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </footer>
    </article>
  );
}