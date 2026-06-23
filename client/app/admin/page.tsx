// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Project } from '@/src/types';

// // 🚨 Guaranteed live backend connection bypassing the old fetchAPI utility
// const BACKEND_URL = 'https://premium-portfolio-kohl.vercel.app/api';

// const safeFetch = async (endpoint: string, options: RequestInit = {}) => {
//   const url = `${BACKEND_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
//   const res = await fetch(url, options);
  
//   if (!res.ok) {
//     const err = await res.text();
//     throw new Error(err || `API Error: ${res.status}`);
//   }
  
//   const text = await res.text();
//   return text ? JSON.parse(text) : {};
// };

// export default function AdminDashboard() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState<'projects' | 'blogs' | 'messages'>('projects');
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [blogs, setBlogs] = useState<any[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState<string | null>(null);
//   const [expandedMessage, setExpandedMessage] = useState<string | null>(null);

//   // Unified Form States
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState<string | null>(null);
//   const [title, setTitle] = useState('');
//   const [slug, setSlug] = useState('');
//   const [description, setDescription] = useState('');
//   const [content, setContent] = useState('');
//   const [tags, setTags] = useState('');
  
//   // Custom Media / Parameters Form States
//   const [category, setCategory] = useState<string>('tech');
//   const [customImage, setCustomImage] = useState('');
//   const [githubUrl, setGithubUrl] = useState('');

//   useEffect(() => {
//     const savedToken = localStorage.getItem('adminToken');
//     if (!savedToken) {
//       router.push('/admin/login');
//     } else {
//       setToken(savedToken);
//     }
//   }, [router]);

//   const loadData = async () => {
//     setLoading(true);
//     try {
//       const projectsData = await safeFetch('/projects');
//       const blogsData = await safeFetch('/blogs');
//       setProjects(Array.isArray(projectsData) ? projectsData : (projectsData.data || []));
//       setBlogs(Array.isArray(blogsData) ? blogsData : (blogsData.data || []));
//     } catch (err) {
//       console.error('Error syncing backend database blocks:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMessages = async () => {
//     setLoading(true);
//     try {
//       const data = await safeFetch('/contact', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessages(Array.isArray(data) ? data : (data.data || []));
//     } catch (err) {
//       console.error('Error fetching contact messages:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) loadData();
//   }, [token]);

//   useEffect(() => {
//     if (token && activeTab === 'messages') loadMessages();
//   }, [token, activeTab]);

//   const handleDelete = async (id: string) => {
//     if (!confirm('Drop this record permanently from cluster?')) return;
//     try {
//       const endpoint =
//         activeTab === 'projects'
//           ? `/projects/id/${id}`
//           : activeTab === 'blogs'
//           ? `/blogs/id/${id}`
//           : `/contact/id/${id}`;

//       await safeFetch(endpoint, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (activeTab === 'messages') {
//         loadMessages();
//       } else {
//         loadData();
//       }
//     } catch (err) {
//       alert('Delete configuration failed.');
//     }
//   };

//   const startEdit = (item: any) => {
//     setIsEditing(true);
//     setEditId(item._id);
//     setTitle(item.title || '');
//     setSlug(item.slug || '');
//     setDescription(item.description || item.summary || '');
//     setContent(item.content || '');
//     setTags(Array.isArray(item.tags) ? item.tags.join(', ') : '');
    
//     if (activeTab === 'projects') {
//       setCategory(item.category || 'Development');
//       setCustomImage(item.projectImage || item.thumbnail || '');
//       setGithubUrl(item.githubLink || item.githubUrl || '');
//     } else {
//       setCategory(item.category || 'tech');
//       setCustomImage(item.coverImage || '');
//       setGithubUrl('');
//     }
//   };

//   const clearForm = () => {
//     setIsEditing(false);
//     setEditId(null);
//     setTitle('');
//     setSlug('');
//     setDescription('');
//     setContent('');
//     setTags('');
//     setCustomImage('');
//     setGithubUrl('');
//     setCategory(activeTab === 'projects' ? 'Development' : 'tech');
//   };

//   useEffect(() => {
//     setCategory(activeTab === 'projects' ? 'Development' : 'tech');
//   }, [activeTab]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const cleanTags = tags.split(',').map(t => t.trim()).filter(Boolean);

//     const payload = activeTab === 'projects' 
//       ? { 
//           title, 
//           slug, 
//           description, 
//           content, 
//           thumbnail: customImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c', 
//           githubUrl: githubUrl, 
//           tags: cleanTags,
//           featured: true
//         }
//       : { 
//           title, 
//           slug, 
//           summary: description, 
//           content, 
//           category, 
//           coverImage: customImage || 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c', 
//           tags: cleanTags, 
//           status: 'published', 
//           readTime: `${Math.max(1, Math.ceil(content.split(/\s+/).length / 200))} min read` 
//         };

//     try {
//       const endpoint = activeTab === 'projects' 
//         ? (isEditing ? `/projects/id/${editId}` : '/projects') 
//         : (isEditing ? `/blogs/id/${editId}` : '/blogs');

//       await safeFetch(endpoint, {
//         method: isEditing ? 'PUT' : 'POST',
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload),
//       });
      
//       clearForm();
//       loadData();
//     } catch (err: any) {
//       console.error('--- MUTATION FAILURE OBJECT ROUTE BREAKDOWN ---');
//       console.error('Error Details:', err);
//       alert(`Security mutation write error: ${err.message}`);
//     }
//   };

//   const formatDate = (dateStr: string) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
//   };

//   if (!token) return <div className="p-20 text-center font-mono text-zinc-500">Verifying security signature...</div>;

//   return (
//     <div className="max-w-7xl mx-auto py-10 px-4 space-y-10">
//       <header className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-zinc-200 dark:border-zinc-800 pb-5 gap-4">
//         <div>
//           <h1 className="font-serif text-3xl font-bold text-zinc-950 dark:text-zinc-50">Control Panel</h1>
//           <p className="text-sm text-zinc-500">Deploy high-traffic portfolio matrix blocks seamlessly.</p>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl">
//             <button 
//               type="button"
//               onClick={() => { setActiveTab('projects'); }} 
//               className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${activeTab === 'projects' ? 'bg-white dark:bg-zinc-800 text-blue-500 shadow-xs' : 'text-zinc-400'}`}
//             >
//               PROJECTS
//             </button>
//             <button 
//               type="button"
//               onClick={() => { setActiveTab('blogs'); }} 
//               className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${activeTab === 'blogs' ? 'bg-white dark:bg-zinc-800 text-blue-500 shadow-xs' : 'text-zinc-400'}`}
//             >
//               EDITORIAL LOGS
//             </button>
//             <button 
//               type="button"
//               onClick={() => { setActiveTab('messages'); }} 
//               className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${activeTab === 'messages' ? 'bg-white dark:bg-zinc-800 text-emerald-500 shadow-xs' : 'text-zinc-400'}`}
//             >
//               MESSAGES
//               {messages.length > 0 && (
//                 <span className="ml-1.5 px-1.5 py-0.5 bg-emerald-500 text-white rounded-full text-[9px]">
//                   {messages.length}
//                 </span>
//               )}
//             </button>
//           </div>
//           <button 
//             type="button"
//             onClick={() => { localStorage.removeItem('adminToken'); router.push('/admin/login'); }} 
//             className="px-3 py-2 text-xs font-mono border border-zinc-200 dark:border-zinc-800 text-red-500 rounded-xl hover:bg-red-500/5"
//           >
//             LOGOUT
//           </button>
//         </div>
//       </header>

//       {/* MESSAGES TAB */}
//       {activeTab === 'messages' ? (
//         <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-950/20">
//           <div className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between">
//             <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">Inbox — Contact Transmissions</span>
//             <span className="font-mono text-xs text-zinc-400">{messages.length} records</span>
//           </div>

//           {loading ? (
//             <div className="p-8 text-center font-mono text-zinc-400">Fetching message streams...</div>
//           ) : messages.length === 0 ? (
//             <div className="p-8 text-center font-mono text-zinc-400">No messages in the inbox yet.</div>
//           ) : (
//             <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
//               {messages.map((msg: any) => (
//                 <div key={msg._id} className="p-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors">
//                   <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
//                     <div className="flex-1 space-y-1">
//                       <div className="flex flex-wrap items-center gap-2">
//                         <span className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">{msg.name}</span>
//                         <span className="text-xs font-mono text-zinc-400">&lt;{msg.email}&gt;</span>
//                       </div>
//                       <div className="text-xs font-mono text-blue-500 uppercase tracking-wider">{msg.subject}</div>
//                       <div
//                         className={`text-sm text-zinc-600 dark:text-zinc-400 mt-1 ${
//                           expandedMessage === msg._id ? '' : 'line-clamp-2'
//                         }`}
//                       >
//                         {msg.message}
//                       </div>
//                       {msg.message && msg.message.length > 120 && (
//                         <button
//                           type="button"
//                           onClick={() => setExpandedMessage(expandedMessage === msg._id ? null : msg._id)}
//                           className="text-[10px] font-mono text-blue-400 hover:text-blue-500 mt-1"
//                         >
//                           {expandedMessage === msg._id ? '▲ Collapse' : '▼ Read full message'}
//                         </button>
//                       )}
//                     </div>
//                     <div className="flex flex-col items-end gap-2 shrink-0">
//                       <span className="text-[10px] font-mono text-zinc-400 whitespace-nowrap">
//                         {formatDate(msg.createdAt)}
//                       </span>
//                       <div className="flex gap-3">
//                         <a
//                           href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
//                           className="text-xs text-emerald-500 hover:underline font-mono"
//                         >
//                           Reply
//                         </a>
//                         <button
//                           type="button"
//                           onClick={() => handleDelete(msg._id)}
//                           className="text-xs text-red-500 hover:underline font-mono"
//                         >
//                           Drop
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ) : (
//         /* PROJECTS / BLOGS TAB — unchanged layout */
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//           <form onSubmit={handleSubmit} className="bg-zinc-50 dark:bg-zinc-900/40 p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4 h-fit">
//             <h2 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
//               {isEditing ? '⚡ Update Entry' : '＋ Add Entry'} ({activeTab})
//             </h2>
            
//             <div>
//               <label className="block text-xs font-mono text-zinc-400 mb-1">Title</label>
//               <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 outline-hidden focus:border-blue-500" />
//             </div>

//             <div>
//               <label className="block text-xs font-mono text-zinc-400 mb-1">Slug URL Link Path</label>
//               <input type="text" value={slug} onChange={e => setSlug(e.target.value)} required placeholder="e.g. sheshield-ai" className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 outline-hidden focus:border-blue-500" />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-xs font-mono text-zinc-400 mb-1">Category Classification</label>
//                 {activeTab === 'blogs' ? (
//                   <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 outline-hidden focus:border-blue-500">
//                     <option value="tech">💻 Tech Trends</option>
//                     <option value="drama">🎬 Drama & Cast</option>
//                     <option value="movies">🍿 Upcoming Movies</option>
//                     <option value="study">📚 Study Guides</option>
//                   </select>
//                 ) : (
//                   <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Full-Stack, IoT, AI" className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 outline-hidden focus:border-blue-500" />
//                 )}
//               </div>

//               <div>
//                 <label className="block text-xs font-mono text-zinc-400 mb-1">Showcase Image URL</label>
//                 <input type="text" value={customImage} onChange={e => setCustomImage(e.target.value)} placeholder="https://images.unsplash.com/..." className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 outline-hidden focus:border-blue-500" />
//               </div>
//             </div>

//             {activeTab === 'projects' && (
//               <div>
//                 <label className="block text-xs font-mono text-zinc-400 mb-1">GitHub Repository Link</label>
//                 <input type="url" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} required placeholder="https://github.com/username/repo" className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 outline-hidden focus:border-blue-500" />
//               </div>
//             )}

//             <div>
//               <label className="block text-xs font-mono text-zinc-400 mb-1">Brief Description / Summary</label>
//               <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={2} className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 outline-hidden focus:border-blue-500" />
//             </div>

//             <div>
//               <label className="block text-xs font-mono text-zinc-400 mb-1">Core Technical Breakdown (Markdown Body)</label>
//               <textarea value={content} onChange={e => setContent(e.target.value)} required rows={5} className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 outline-hidden focus:border-blue-500 font-mono" />
//             </div>

//             <div>
//               <label className="block text-xs font-mono text-zinc-400 mb-1">Keywords / Stack Tools (comma separated)</label>
//               <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="React, Next.js, MongoDB" className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 outline-hidden focus:border-blue-500" />
//             </div>

//             <div className="flex gap-2 pt-2">
//               <button type="submit" className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition">Save Record</button>
//               {(isEditing || title || slug || description) && (
//                 <button type="button" onClick={clearForm} className="px-4 py-2.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm transition">Clear</button>
//               )}
//             </div>
//           </form>

//           <div className="lg:col-span-2 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-950/20">
//             <table className="w-full text-left text-sm border-collapse">
//               <thead>
//                 <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-400">
//                   <th className="p-4">Title Info Mapping</th>
//                   <th className="p-4">Category</th>
//                   <th className="p-4 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
//                 {loading ? (
//                   <tr>
//                     <td colSpan={3} className="p-8 text-center font-mono text-zinc-400">Fetching collection streams...</td>
//                   </tr>
//                 ) : (activeTab === 'projects' ? projects : blogs).length === 0 ? (
//                   <tr>
//                     <td colSpan={3} className="p-8 text-center font-mono text-zinc-400">No collection indexes found in this database slot.</td>
//                   </tr>
//                 ) : (
//                   (activeTab === 'projects' ? projects : blogs).map((item: any) => (
//                     <tr key={item._id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors">
//                       <td className="p-4">
//                         <div className="font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</div>
//                         <div className="text-xs font-mono text-zinc-400">/{item.slug}</div>
//                       </td>
//                       <td className="p-4">
//                         <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-500 rounded-lg uppercase font-mono tracking-wider">
//                           {item.category || 'General'}
//                         </span>
//                       </td>
//                       <td className="p-4 text-right">
//                         <div className="inline-flex gap-3">
//                           <button onClick={() => startEdit(item)} className="text-xs text-blue-500 hover:underline">Edit</button>
//                           <button onClick={() => handleDelete(item._id)} className="text-xs text-red-500 hover:underline">Drop</button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@/src/types';

// 🚨 Guaranteed live backend connection bypassing the old fetchAPI utility
const BACKEND_URL = 'https://premium-portfolio-kohl.vercel.app/api';

const safeFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${BACKEND_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  const res = await fetch(url, options);
  
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `API Error: ${res.status}`);
  }
  
  const text = await res.text();
  return text ? JSON.parse(text) : {};
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'projects' | 'blogs' | 'messages'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);

  // Unified Form States
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [relatedSlugs, setRelatedSlugs] = useState(''); // NEW STATE FOR SEO LINKS
  
  // Custom Media / Parameters Form States
  const [category, setCategory] = useState<string>('tech');
  const [customImage, setCustomImage] = useState('');
  const [githubUrl, setGithubUrl] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (!savedToken) {
      router.push('/admin/login');
    } else {
      setToken(savedToken);
    }
  }, [router]);

  const loadData = async () => {
    setLoading(true);
    try {
      const projectsData = await safeFetch('/projects');
      const blogsData = await safeFetch('/blogs');
      setProjects(Array.isArray(projectsData) ? projectsData : (projectsData.data || []));
      setBlogs(Array.isArray(blogsData) ? blogsData : (blogsData.data || []));
    } catch (err) {
      console.error('Error syncing backend database blocks:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await safeFetch('/contact', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(Array.isArray(data) ? data : (data.data || []));
    } catch (err) {
      console.error('Error fetching contact messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadData();
  }, [token]);

  useEffect(() => {
    if (token && activeTab === 'messages') loadMessages();
  }, [token, activeTab]);

  const handleDelete = async (id: string) => {
    if (!confirm('Drop this record permanently from cluster?')) return;
    try {
      const endpoint =
        activeTab === 'projects'
          ? `/projects/id/${id}`
          : activeTab === 'blogs'
          ? `/blogs/id/${id}`
          : `/contact/id/${id}`;

      await safeFetch(endpoint, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (activeTab === 'messages') {
        loadMessages();
      } else {
        loadData();
      }
    } catch (err) {
      alert('Delete configuration failed.');
    }
  };

  const startEdit = (item: any) => {
    setIsEditing(true);
    setEditId(item._id);
    setTitle(item.title || '');
    setSlug(item.slug || '');
    setDescription(item.description || item.summary || '');
    setContent(item.content || '');
    setTags(Array.isArray(item.tags) ? item.tags.join(', ') : '');
    
    // Load existing related slugs for editing
    setRelatedSlugs(Array.isArray(item.relatedSlugs) ? item.relatedSlugs.join(', ') : '');
    
    if (activeTab === 'projects') {
      setCategory(item.category || 'Development');
      setCustomImage(item.projectImage || item.thumbnail || '');
      setGithubUrl(item.githubLink || item.githubUrl || '');
    } else {
      setCategory(item.category || 'tech');
      setCustomImage(item.coverImage || '');
      setGithubUrl('');
    }
  };

  const clearForm = () => {
    setIsEditing(false);
    setEditId(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setContent('');
    setTags('');
    setRelatedSlugs(''); // Clear related slugs
    setCustomImage('');
    setGithubUrl('');
    setCategory(activeTab === 'projects' ? 'Development' : 'tech');
  };

  useEffect(() => {
    setCategory(activeTab === 'projects' ? 'Development' : 'tech');
  }, [activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanTags = tags.split(',').map(t => t.trim()).filter(Boolean);
    const cleanRelatedSlugs = relatedSlugs.split(',').map(s => s.trim()).filter(Boolean);

    const payload = activeTab === 'projects' 
      ? { 
          title, 
          slug, 
          description, 
          content, 
          thumbnail: customImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c', 
          githubUrl: githubUrl, 
          tags: cleanTags,
          featured: true
        }
      : { 
          title, 
          slug, 
          summary: description, 
          content, 
          category, 
          coverImage: customImage || 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c', 
          tags: cleanTags, 
          relatedSlugs: cleanRelatedSlugs, // Attach related slugs payload
          status: 'published', 
          readTime: `${Math.max(1, Math.ceil(content.split(/\s+/).length / 200))} min read` 
        };

    try {
      const endpoint = activeTab === 'projects' 
        ? (isEditing ? `/projects/id/${editId}` : '/projects') 
        : (isEditing ? `/blogs/id/${editId}` : '/blogs');

      await safeFetch(endpoint, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });
      
      clearForm();
      loadData();
    } catch (err: any) {
      console.error('--- MUTATION FAILURE OBJECT ROUTE BREAKDOWN ---');
      console.error('Error Details:', err);
      alert(`Security mutation write error: ${err.message}`);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (!token) return <div className="p-20 text-center font-mono text-zinc-500">Verifying security signature...</div>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-10">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-zinc-200 dark:border-zinc-800 pb-5 gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-zinc-950 dark:text-zinc-50">Control Panel</h1>
          <p className="text-sm text-zinc-500">Deploy high-traffic portfolio matrix blocks seamlessly.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl">
            <button 
              type="button"
              onClick={() => { setActiveTab('projects'); }} 
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${activeTab === 'projects' ? 'bg-white dark:bg-zinc-800 text-blue-500 shadow-xs' : 'text-zinc-400'}`}
            >
              PROJECTS
            </button>
            <button 
              type="button"
              onClick={() => { setActiveTab('blogs'); }} 
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${activeTab === 'blogs' ? 'bg-white dark:bg-zinc-800 text-blue-500 shadow-xs' : 'text-zinc-400'}`}
            >
              EDITORIAL LOGS
            </button>
            <button 
              type="button"
              onClick={() => { setActiveTab('messages'); }} 
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${activeTab === 'messages' ? 'bg-white dark:bg-zinc-800 text-emerald-500 shadow-xs' : 'text-zinc-400'}`}
            >
              MESSAGES
              {messages.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-emerald-500 text-white rounded-full text-[9px]">
                  {messages.length}
                </span>
              )}
            </button>
          </div>
          <button 
            type="button"
            onClick={() => { localStorage.removeItem('adminToken'); router.push('/admin/login'); }} 
            className="px-3 py-2 text-xs font-mono border border-zinc-200 dark:border-zinc-800 text-red-500 rounded-xl hover:bg-red-500/5"
          >
            LOGOUT
          </button>
        </div>
      </header>

      {/* MESSAGES TAB */}
      {activeTab === 'messages' ? (
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-950/20">
          <div className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between">
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">Inbox — Contact Transmissions</span>
            <span className="font-mono text-xs text-zinc-400">{messages.length} records</span>
          </div>

          {loading ? (
            <div className="p-8 text-center font-mono text-zinc-400">Fetching message streams...</div>
          ) : messages.length === 0 ? (
            <div className="p-8 text-center font-mono text-zinc-400">No messages in the inbox yet.</div>
          ) : (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
              {messages.map((msg: any) => (
                <div key={msg._id} className="p-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">{msg.name}</span>
                        <span className="text-xs font-mono text-zinc-400">&lt;{msg.email}&gt;</span>
                      </div>
                      <div className="text-xs font-mono text-blue-500 uppercase tracking-wider">{msg.subject}</div>
                      <div
                        className={`text-sm text-zinc-600 dark:text-zinc-400 mt-1 ${
                          expandedMessage === msg._id ? '' : 'line-clamp-2'
                        }`}
                      >
                        {msg.message}
                      </div>
                      {msg.message && msg.message.length > 120 && (
                        <button
                          type="button"
                          onClick={() => setExpandedMessage(expandedMessage === msg._id ? null : msg._id)}
                          className="text-[10px] font-mono text-blue-400 hover:text-blue-500 mt-1"
                        >
                          {expandedMessage === msg._id ? '▲ Collapse' : '▼ Read full message'}
                        </button>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-[10px] font-mono text-zinc-400 whitespace-nowrap">
                        {formatDate(msg.createdAt)}
                      </span>
                      <div className="flex gap-3">
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                          className="text-xs text-emerald-500 hover:underline font-mono"
                        >
                          Reply
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDelete(msg._id)}
                          className="text-xs text-red-500 hover:underline font-mono"
                        >
                          Drop
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* PROJECTS / BLOGS TAB — unchanged layout */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <form onSubmit={handleSubmit} className="bg-zinc-50 dark:bg-zinc-900/40 p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4 h-fit">
            <h2 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
              {isEditing ? '⚡ Update Entry' : '＋ Add Entry'} ({activeTab})
            </h2>
            
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 outline-hidden focus:border-blue-500" />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Slug URL Link Path</label>
              <input type="text" value={slug} onChange={e => setSlug(e.target.value)} required placeholder="e.g. sheshield-ai" className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 outline-hidden focus:border-blue-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Category Classification</label>
                {activeTab === 'blogs' ? (
                  <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 outline-hidden focus:border-blue-500">
                    <option value="tech">💻 Tech Trends</option>
                    <option value="drama">🎬 Drama & Cast</option>
                    <option value="movies">🍿 Upcoming Movies</option>
                    <option value="study">📚 Study Guides</option>
                  </select>
                ) : (
                  <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Full-Stack, IoT, AI" className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 outline-hidden focus:border-blue-500" />
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Showcase Image URL</label>
                <input type="text" value={customImage} onChange={e => setCustomImage(e.target.value)} placeholder="https://images.unsplash.com/..." className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 outline-hidden focus:border-blue-500" />
              </div>
            </div>

            {activeTab === 'projects' && (
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">GitHub Repository Link</label>
                <input type="url" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} required placeholder="https://github.com/username/repo" className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 outline-hidden focus:border-blue-500" />
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Brief Description / Summary</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={2} className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 outline-hidden focus:border-blue-500" />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Core Technical Breakdown (Markdown Body)</label>
              <textarea value={content} onChange={e => setContent(e.target.value)} required rows={5} className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 outline-hidden focus:border-blue-500 font-mono" />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Keywords / Stack Tools (comma separated)</label>
              <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="React, Next.js, MongoDB" className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 outline-hidden focus:border-blue-500" />
            </div>

            {/* NEW SEO RELATED SLUGS INPUT - ONLY SHOWS FOR BLOGS */}
            {activeTab === 'blogs' && (
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Related Blog Slugs (SEO Links)</label>
                <input 
                  type="text" 
                  value={relatedSlugs} 
                  onChange={e => setRelatedSlugs(e.target.value)} 
                  placeholder="e.g. spider-man-release, nextjs-guide" 
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 outline-hidden focus:border-blue-500" 
                />
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button type="submit" className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition">Save Record</button>
              {(isEditing || title || slug || description) && (
                <button type="button" onClick={clearForm} className="px-4 py-2.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm transition">Clear</button>
              )}
            </div>
          </form>

          <div className="lg:col-span-2 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-950/20">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-400">
                  <th className="p-4">Title Info Mapping</th>
                  <th className="p-4">Category</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center font-mono text-zinc-400">Fetching collection streams...</td>
                  </tr>
                ) : (activeTab === 'projects' ? projects : blogs).length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center font-mono text-zinc-400">No collection indexes found in this database slot.</td>
                  </tr>
                ) : (
                  (activeTab === 'projects' ? projects : blogs).map((item: any) => (
                    <tr key={item._id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</div>
                        <div className="text-xs font-mono text-zinc-400">/{item.slug}</div>
                      </td>
                      <td className="p-4">
                        <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-500 rounded-lg uppercase font-mono tracking-wider">
                          {item.category || 'General'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="inline-flex gap-3">
                          <button onClick={() => startEdit(item)} className="text-xs text-blue-500 hover:underline">Edit</button>
                          <button onClick={() => handleDelete(item._id)} className="text-xs text-red-500 hover:underline">Drop</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}