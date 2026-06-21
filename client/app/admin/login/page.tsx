'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Authentication rejected');
      }

      // Store the secure JWT token stream in localStorage
      localStorage.setItem('adminToken', data.token);
      
      // Redirect cleanly into the main admin workspace
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid master verification sequence.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-950/40 p-8 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs space-y-6">
        <div className="text-center space-y-2">
          <h1 className="font-serif text-3xl font-bold text-zinc-950 dark:text-zinc-50">Secure Gate</h1>
          <p className="text-sm text-zinc-400 font-mono">AUTHORIZED PERSONNEL ONLY</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-mono text-red-500 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1.5">Master Token Passphrase</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-50 outline-none focus:border-blue-500 tracking-widest font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 text-sm font-semibold rounded-xl hover:opacity-90 active:scale-[0.98] transition disabled:opacity-50"
          >
            {loading ? 'Decrypting Session...' : 'Unlock Engine'}
          </button>
        </form>
      </div>
    </div>
  );
}