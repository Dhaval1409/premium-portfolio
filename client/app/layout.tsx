// import type { Metadata } from "next";
// import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
// import "./globals.css"; // Ensure this path matches where your global css sits

// // Premium Sans font for UI elements and Body text
// const sans = Plus_Jakarta_Sans({ 
//   subsets: ["latin"],
//   variable: "--font-sans" 
// });

// // Premium Serif font for striking headings & blog titles
// const serif = Playfair_Display({ 
//   subsets: ["latin"],
//   variable: "--font-serif" 
// });

// export const metadata: Metadata = {
//   title: "Premium Portfolio & Blog",
//   description: "A digital space showcasing high-end engineering, full-stack projects, and deep-dive technical articles.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className="scroll-smooth">
//       <body className={`${sans.variable} ${serif.variable} font-sans bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 antialiased min-h-screen flex flex-col`}>
//         {/* Navigation placeholder */}
//         <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
//           <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
         
//             <span className="font-serif text-xl font-bold tracking-tight" >Portfolio</span>
//             <nav className="flex gap-6 text-sm font-medium">
//               <a href="/" className="hover:text-blue-500 transition">Home</a>
//               <a href="/projects" className="hover:text-blue-500 transition">Projects</a>
//               <a href="/blogs" className="hover:text-blue-500 transition">Blog</a>
//               <a href="/contact" className="hover:text-blue-500 transition">Contact</a>
//             </nav>
//           </div>
//         </header>

//         {/* Main Content Area */}
//         <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-12">
//           {children}
//         </main>

//         {/* Footer placeholder */}
//         <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 mt-12 bg-white dark:bg-zinc-950 text-center text-xs text-zinc-500">
//           <div className="max-w-6xl mx-auto px-6">
//             © {new Date().getFullYear()} Premium Portfolio. Built with Next.js & Node.js
//           </div>
//         </footer>
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-sans" 
});

const serif = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif" 
});

export const metadata: Metadata = {
  title: "Premium Portfolio & Blog",
  description: "A digital space showcasing high-end engineering, full-stack projects, and deep-dive technical articles.",
  // Yahan Google Verification add ho gaya:
  verification: {
    google: "e7Bzvj6difCXNpUdLwp0ctE4nnzJYPaBCWTPy-o2b-o",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${sans.variable} ${serif.variable} font-sans bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 antialiased min-h-screen flex flex-col`}>
        
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <span className="font-serif text-xl font-bold tracking-tight">Portfolio</span>
            <nav className="flex gap-6 text-sm font-medium">
              <a href="/" className="hover:text-blue-500 transition">Home</a>
              <a href="/projects" className="hover:text-blue-500 transition">Projects</a>
              <a href="/blogs" className="hover:text-blue-500 transition">Blog</a>
              <a href="/contact" className="hover:text-blue-500 transition">Contact</a>
            </nav>
          </div>
        </header>

        <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-12">
          {children}
        </main>

        <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 mt-12 bg-white dark:bg-zinc-950 text-center text-xs text-zinc-500">
          <div className="max-w-6xl mx-auto px-6">
            © {new Date().getFullYear()} Premium Portfolio. Built with Next.js & Node.js
          </div>
        </footer>
      </body>
    </html>
  );
}