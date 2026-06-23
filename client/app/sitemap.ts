import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://premium-portfolio-d9z7.vercel.app';
  
  // Initialize empty array in case backend is unreachable
  let blogs = [];
  
  try {
    // Fetching from your live backend API
    const res = await fetch('https://premium-portfolio-kohl.vercel.app/api/blogs', {
      cache: 'no-store'
    });
    
    if (res.ok) {
      const data = await res.json();
      // Unwrapping data just like you did in your blog reader
      blogs = data.data || data.blogs || data || [];
    }
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
  }

  // Generate URLs for all your dynamic blogs
  const blogEntries = blogs.map((blog: any) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.updatedAt || blog.publishedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Generate URLs for your static pages (Home, Projects, Blogs, Contact)
  const staticRoutes = ['', '/projects', '/blogs', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...staticRoutes, ...blogEntries];
}