'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchAPI } from '@/src/lib/api';

const GENRES = [
  { id: 'all', label: '✨ All Postings' },
  { id: 'tech', label: '💻 Tech & Dev' },
  { id: 'drama', label: '🎬 Drama & Cast' },
  { id: 'movies', label: '🍿 New Movies' },
  { id: 'study', label: '📚 Study Guides' }
];

export default function PublicBlogFeed() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [rawCount, setRawCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  // 1. Prevent Hydration Errors from local dates/extensions
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await fetchAPI('/blogs');
        console.log("Database payload received:", data);
        
        // Handle both raw arrays and nested database data wrappers safely
        if (Array.isArray(data)) {
          setBlogs(data);
          setRawCount(data.length);
        } else if (data && typeof data === 'object') {
          const possibleArray = data.data || data.blogs || [];
          setBlogs(possibleArray);
          setRawCount(possibleArray.length);
        }
      } catch (err) {
        console.error('Failed fetching editorial indexes:', err);
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  // Filter & Search Logic
  const filteredBlogs = blogs.filter(blog => {
    if (!blog) return false;
    
    const itemCategory = String(blog.category || '').toLowerCase().trim();
    const currentFilter = selectedCategory.toLowerCase().trim();

    const matchesCategory = currentFilter === 'all' || 
      itemCategory === currentFilter ||
      itemCategory.includes(currentFilter) ||
      (currentFilter === 'tech' && (itemCategory === 'systems' || itemCategory === 'development' || itemCategory === 'coding'));

    const titleStr = String(blog.title || '').toLowerCase();
    const summaryStr = String(blog.summary || '').toLowerCase();
    const searchStr = searchQuery.toLowerCase();

    return matchesCategory && (titleStr.includes(searchStr) || summaryStr.includes(searchStr));
  });

  // Render a clean structural placeholder matching the server view until hydration finishes
  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4 space-y-12">
        <p className="font-mono text-sm text-zinc-400 text-center py-20">Initializing content alignment system...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-12" suppressHydrationWarning>
      <header className="space-y-4 max-w-2xl">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-zinc-950 dark:text-zinc-50">Editorial Logs</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light">
          Deep dives into tech trends, drama cast breakdowns, cinema trackers, and technical study material.
        </p>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-xs font-mono text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Total Records Found in DB Connection: <strong>{rawCount}</strong></span>
        </div>
      </header>

      {/* Control Navigation Strip */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="flex flex-wrap gap-2">
          {GENRES.map(genre => (
            <button
              key={genre.id}
              onClick={() => setSelectedCategory(genre.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all border ${
                selectedCategory === genre.id 
                  ? 'bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 border-transparent font-semibold shadow-xs' 
                  : 'bg-transparent text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {genre.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search articles..."
          className="w-full md:w-64 px-4 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:border-blue-500"
        />
      </div>

      {loading ? (
        <p className="font-mono text-sm text-zinc-400 text-center py-20">Rehydrating content engine...</p>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-20 space-y-3 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <p className="text-zinc-400 font-light">No matching articles found in this category slot.</p>
          {rawCount > 0 && (
            <p className="text-xs font-mono text-zinc-500">
              Tip: You have {rawCount} blogs in DB, but none match the category filter "{selectedCategory}".
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map(blog => {
            const normalizedCat = String(blog.category || '').toLowerCase().trim();
            const isEntertainment = normalizedCat.includes('drama') || normalizedCat.includes('movie') || normalizedCat.includes('movies');
            const isStudy = normalizedCat.includes('study');

            let displayTag = '💻 Tech & Systems';
            if (normalizedCat.includes('drama')) displayTag = '🎬 K-Drama Tracker';
            else if (normalizedCat.includes('movie') || normalizedCat.includes('movies')) displayTag = '🍿 Cinema Release';
            else if (normalizedCat.includes('study')) displayTag = '📚 CS Study Guide';

            return (
              <Link
                key={blog._id || blog.slug}
                href={`/blogs/${blog.slug}`}
                className="group flex flex-col space-y-4 border border-zinc-200/60 dark:border-zinc-800/60 p-4 rounded-2xl bg-white/50 dark:bg-zinc-900/20 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/20 relative">
                  <img
                    src={blog.coverImage || 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c'}
                    alt={blog.title || 'Article Cover'}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className={`uppercase tracking-wider font-bold ${
                    isEntertainment 
                      ? 'text-purple-500 dark:text-purple-400' 
                      : isStudy 
                      ? 'text-emerald-500 dark:text-emerald-400'
                      : 'text-blue-500'
                  }`}>
                    {displayTag}
                  </span>
                  <span>{blog.readTime || '5 min read'}</span>
                </div>

                <div className="space-y-2 flex-1">
                  <h3 className={`text-xl font-bold text-zinc-950 dark:text-zinc-50 leading-snug group-hover:text-blue-500 transition-colors ${
                    isEntertainment ? 'font-serif' : 'font-sans'
                  }`}>
                    {blog.title || 'Untitled Publication'}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 font-light leading-relaxed">
                    {blog.summary || 'No overview summary provided for this layout block record.'}
                  </p>
                </div>

                <div className="pt-2 text-xs font-semibold text-blue-500 flex items-center gap-1 border-t border-zinc-100 dark:border-zinc-800/50">
                  Read Article <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}