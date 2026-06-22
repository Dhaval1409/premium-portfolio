


// 'use client';

// import React, { useState } from 'react';
// import { fetchAPI } from '@/src/lib/api';

// export default function ContactPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [subject, setSubject] = useState('');
//   const [message, setMessage] = useState('');
//   const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus('sending');

//     try {
//       await fetchAPI('/contact', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, subject, message }),
//       });

//       setStatus('success');
//       setName('');
//       setEmail('');
//       setSubject('');
//       setMessage('');
//     } catch (err) {
//       console.error('Contact transmission failed:', err);
//       setStatus('error');
//     }
//   };

//   return (
//     /* Changed wrapper to use h-screen and overflow-hidden on desktop to guarantee no scrolling.
//       Flex layout perfectly centers the card inside the available viewport block.
//     */
//     <div className="relative w-full h-screen lg:overflow-hidden flex flex-col justify-center items-center font-mono selection:bg-zinc-950 selection:text-white dark:selection:bg-white dark:selection:text-zinc-950 p-4 sm:p-6 lg:p-8">
      
//       {/* MOBILE BACKGROUND */}
//       <div
//         className="fixed inset-0 z-0 opacity-10 pointer-events-none bg-no-repeat bg-bottom bg-contain block md:hidden"
//         style={{
//           backgroundImage: "url('/bg/one-piece.jpg')", 
//         }}
//       />

//       {/* DESKTOP BACKGROUND */}
//       <div
//         className="fixed inset-0 z-0  pointer-events-none bg-no-repeat bg-bottom bg-cover hidden md:block"
//         style={{
//           backgroundImage: "url('/bg/bg-1.jpg')",
//         }}
//       />

//       {/* Main Structural Card Body */}
//       <div className="relative z-10 w-full max-w-5xl">
//         <div className="border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden bg-white dark:bg-zinc-950 grid grid-cols-1 lg:grid-cols-12 shadow-2xs">
          
//           {/* Left Panel Compartment (Branding Deck) */}
//           <div className="lg:col-span-5 p-5 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/10">
//             <div className="space-y-6 lg:space-y-10">
//               <nav>
//                 <a 
//                   href="/" 
//                   className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
//                 >
//                   ← Back to Index
//                 </a>
//               </nav>

//               <div className="space-y-3">
//                 <div className="text-[9px] tracking-[0.3em] uppercase text-zinc-400 dark:text-zinc-500 font-bold">
//                   // Contact Channel
//                 </div>
//                 <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-[0.95] tracking-tight text-zinc-900 dark:text-zinc-50">
//                   Let's
//                   <br />
//                   <span className="text-zinc-500 dark:text-zinc-400">Connect.</span>
//                 </h1>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 text-[10px] tracking-widest text-zinc-400 mt-6 lg:mt-0">
//               <div>
//                 <span className="text-zinc-950 dark:text-zinc-50 block font-bold text-[9px] mb-0.5">// FOCUS</span>
//                 <span className="uppercase text-[9px] text-zinc-400 dark:text-zinc-500">MERN • NEXTJS</span>
//               </div>
//               <div>
//                 <span className="text-zinc-950 dark:text-zinc-50 block font-bold text-[9px] mb-0.5">// LOCATION</span>
//                 <span className="uppercase text-[9px] text-zinc-400 dark:text-zinc-500">GUJARAT, IN</span>
//               </div>
//             </div>
//           </div>

//           {/* Right Panel Compartment (Form Processing Component Layer) */}
//           <div className="lg:col-span-7 p-5 sm:p-8 bg-white dark:bg-zinc-950 flex flex-col justify-center">
//             <form onSubmit={handleSendMessage} className="space-y-4 flex flex-col">
              
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="space-y-1">
//                     <label className="block text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-semibold pl-0.5">01 / Your Name</label>
//                     <input 
//                       type="text" 
//                       value={name} 
//                       onChange={(e) => setName(e.target.value)}
//                       required
//                       placeholder="John Doe" 
//                       className="w-full px-3.5 py-2.5 text-xs bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/80 rounded-xl text-zinc-950 dark:text-zinc-50 outline-none focus:border-zinc-950 dark:focus:border-zinc-50 focus:bg-white dark:focus:bg-zinc-950 transition-all uppercase tracking-wider"
//                     />
//                   </div>

//                   <div className="space-y-1">
//                     <label className="block text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-semibold pl-0.5">02 / Email Address</label>
//                     <input 
//                       type="email" 
//                       value={email} 
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                       placeholder="hello@example.com" 
//                       className="w-full px-3.5 py-2.5 text-xs bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/80 rounded-xl text-zinc-950 dark:text-zinc-50 outline-none focus:border-zinc-950 dark:focus:border-zinc-50 focus:bg-white dark:focus:bg-zinc-950 transition-all uppercase tracking-wider"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-1">
//                   <label className="block text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-semibold pl-0.5">03 / Subject</label>
//                   <input 
//                     type="text" 
//                     value={subject} 
//                     onChange={(e) => setSubject(e.target.value)}
//                     required
//                     placeholder="Project Inquiry / Collaboration" 
//                     className="w-full px-3.5 py-2.5 text-xs bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/80 rounded-xl text-zinc-950 dark:text-zinc-50 outline-none focus:border-zinc-950 dark:focus:border-zinc-50 focus:bg-white dark:focus:bg-zinc-950 transition-all uppercase tracking-wider"
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <label className="block text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-semibold pl-0.5">04 / Message</label>
//                   <textarea 
//                     value={message} 
//                     onChange={(e) => setMessage(e.target.value)}
//                     required
//                     rows={3}
//                     placeholder="Tell me about your project objectives..." 
//                     className="w-full px-3.5 py-2.5 text-xs bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/80 rounded-xl text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-300 dark:placeholder:text-zinc-800 outline-none focus:border-zinc-950 dark:focus:border-zinc-50 focus:bg-white dark:focus:bg-zinc-950 transition-all uppercase tracking-wider resize-none leading-relaxed"
//                   />
//                 </div>

//               {/* Action Submit Control Input Layer */}
//               <div className="pt-2 self-stretch sm:self-end">
//                 <button 
//                   type="submit" 
//                   disabled={status === 'sending'}
//                   className="w-full sm:w-auto px-6 py-2.5 bg-zinc-950 text-white hover:bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 rounded-xl text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300 transform active:scale-[0.98] disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 disabled:cursor-not-allowed cursor-pointer"
//                 >
//                   {status === 'sending' ? (
//                     <span>Sending...</span>
//                   ) : status === 'success' ? (
//                     <span>✓ Sent</span>
//                   ) : (
//                     <span>Send Message →</span>
//                   )}
//                 </button>
//               </div>

//               {status === 'error' && (
//                 <div className="text-[9px] text-center border border-dashed border-red-200 dark:border-red-900/50 rounded-xl py-2 text-red-500 dark:text-red-400 uppercase tracking-widest mt-2">
//                   Error: Failed to deliver message. Please try again.
//                 </div>
//               )}
//             </form>
//           </div>

//         </div>
//       </div>
//     </div>
//   );  
// }


'use client';

import React, { useState } from 'react';
import { fetchAPI } from '@/src/lib/api';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await fetchAPI('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      setStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error('Contact transmission failed:', err);
      setStatus('error');
    }
  };

  return (
    /* Changed wrapper to use h-screen and overflow-hidden on desktop to guarantee no scrolling.
       Flex layout perfectly centers the card inside the available viewport block.
    */
    <div className="relative w-full h-screen lg:overflow-hidden flex flex-col justify-center items-center font-mono selection:bg-zinc-950 selection:text-white dark:selection:bg-white dark:selection:text-zinc-950 p-4 sm:p-6 lg:p-8">
      
      {/* MOBILE BACKGROUND */}
      <div
        className="fixed inset-0 z-0 opacity-10 pointer-events-none bg-no-repeat bg-bottom bg-contain block md:hidden"
        style={{
          backgroundImage: "url('/bg/one-piece.jpg')", 
        }}
      />

      {/* DESKTOP BACKGROUND */}
      <div
        className="fixed inset-0 z-0  pointer-events-none bg-no-repeat bg-bottom bg-contain hidden md:block"
        style={{
          backgroundImage: "url('/bg/bg-1.jpg')",
        }}
      />

      {/* Main Structural Card Body */}
      <div className="relative z-10 w-full max-w-5xl">
        {/* CHANGED: Swapped shadow-2xs for shadow-2xl and dark:shadow-zinc-950/50 for a clean dark mode glow/depth */}
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden bg-white dark:bg-zinc-950 grid grid-cols-1 lg:grid-cols-12 shadow-2xl dark:shadow-zinc-950/50">
          
          {/* Left Panel Compartment (Branding Deck) */}
          <div className="lg:col-span-5 p-5 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/10">
            <div className="space-y-6 lg:space-y-10">
              <nav>
                <a 
                  href="/" 
                  className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                >
                  ← Back to Index
                </a>
              </nav>

              <div className="space-y-3">
                <div className="text-[9px] tracking-[0.3em] uppercase text-zinc-400 dark:text-zinc-500 font-bold">
                  // Contact Channel
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-[0.95] tracking-tight text-zinc-900 dark:text-zinc-50">
                  Let's
                  <br />
                  <span className="text-zinc-500 dark:text-zinc-400">Connect.</span>
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 text-[10px] tracking-widest text-zinc-400 mt-6 lg:mt-0">
              <div>
                <span className="text-zinc-950 dark:text-zinc-50 block font-bold text-[9px] mb-0.5">// FOCUS</span>
                <span className="uppercase text-[9px] text-zinc-400 dark:text-zinc-500">MERN • NEXTJS</span>
              </div>
              <div>
                <span className="text-zinc-950 dark:text-zinc-50 block font-bold text-[9px] mb-0.5">// LOCATION</span>
                <span className="uppercase text-[9px] text-zinc-400 dark:text-zinc-500">GUJARAT, IN</span>
              </div>
            </div>
          </div>

          {/* Right Panel Compartment (Form Processing Component Layer) */}
          <div className="lg:col-span-7 p-5 sm:p-8 bg-white dark:bg-zinc-950 flex flex-col justify-center">
            <form onSubmit={handleSendMessage} className="space-y-4 flex flex-col">
              
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-semibold pl-0.5">01 / Your Name</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="John Doe" 
                      className="w-full px-3.5 py-2.5 text-xs bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/80 rounded-xl text-zinc-950 dark:text-zinc-50 outline-none focus:border-zinc-950 dark:focus:border-zinc-50 focus:bg-white dark:focus:bg-zinc-950 transition-all uppercase tracking-wider"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-semibold pl-0.5">02 / Email Address</label>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="hello@example.com" 
                      className="w-full px-3.5 py-2.5 text-xs bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/80 rounded-xl text-zinc-950 dark:text-zinc-50 outline-none focus:border-zinc-950 dark:focus:border-zinc-50 focus:bg-white dark:focus:bg-zinc-950 transition-all uppercase tracking-wider"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-semibold pl-0.5">03 / Subject</label>
                  <input 
                    type="text" 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder="Project Inquiry / Collaboration" 
                    className="w-full px-3.5 py-2.5 text-xs bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/80 rounded-xl text-zinc-950 dark:text-zinc-50 outline-none focus:border-zinc-950 dark:focus:border-zinc-50 focus:bg-white dark:focus:bg-zinc-950 transition-all uppercase tracking-wider"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-semibold pl-0.5">04 / Message</label>
                  <textarea 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={3}
                    placeholder="Tell me about your project objectives..." 
                    className="w-full px-3.5 py-2.5 text-xs bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/80 rounded-xl text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-300 dark:placeholder:text-zinc-800 outline-none focus:border-zinc-950 dark:focus:border-zinc-50 focus:bg-white dark:focus:bg-zinc-950 transition-all uppercase tracking-wider resize-none leading-relaxed"
                  />
                </div>

              {/* Action Submit Control Input Layer */}
              <div className="pt-2 self-stretch sm:self-end">
                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="w-full sm:w-auto px-6 py-2.5 bg-zinc-950 text-white hover:bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 rounded-xl text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300 transform active:scale-[0.98] disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === 'sending' ? (
                    <span>Sending...</span>
                  ) : status === 'success' ? (
                    <span>✓ Sent</span>
                  ) : (
                    <span>Send Message →</span>
                  )}
                </button>
              </div>

              {status === 'error' && (
                <div className="text-[9px] text-center border border-dashed border-red-200 dark:border-red-900/50 rounded-xl py-2 text-red-500 dark:text-red-400 uppercase tracking-widest mt-2">
                  Error: Failed to deliver message. Please try again.
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </div>
  );  
}