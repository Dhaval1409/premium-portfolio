import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-[75vh] w-full flex flex-col justify-center items-start rounded-3xl overflow-hidden px-6 sm:px-12 py-20 border border-zinc-200/50 dark:border-zinc-800/50 shadow-xl dark:shadow-2xl/30">
      
      {/* Premium Background Asset */}
      <Image 
        src="/bg/bg.jpg" 
        alt="Premium background texture"
        fill 
        className="object-cover z-0 select-none pointer-events-none"
        priority 
      />
      
      {/* Dynamic Glassmorphism Overlay */}
      <div className="absolute inset-0 z-10 bg-white/70 dark:bg-zinc-950/85 backdrop-blur-md transition-colors" />

      {/* Hero Interactive Content Layout */}
      <div className="relative z-20 max-w-3xl space-y-6">
        
        {/* Subtle status tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Available for Opportunities
        </div>

        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05] text-zinc-900 dark:text-zinc-50">
          Crafting high-performance <span className="text-blue-500 dark:text-blue-400 font-semibold">web experiences</span>.
        </h1>
        
        <p className="text-zinc-700 dark:text-zinc-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
          Full-Stack Engineer specialized in developing clean, responsive architectures using React, Next.js, and specialized backend ecosystems.
        </p>

        {/* Action Triggers */}
        <div className="flex flex-wrap gap-4 pt-4">
          <a 
            href="#projects" 
            className="px-6 py-3 bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 rounded-xl text-sm font-semibold hover:opacity-90 shadow-md transition active:scale-95"
          >
            Explore Projects
          </a>
          <a 
            href="/contact" 
            className="px-6 py-3 border border-zinc-300 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 rounded-xl text-sm font-semibold hover:bg-white dark:hover:bg-zinc-900 transition text-zinc-900 dark:text-zinc-100 active:scale-95"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}