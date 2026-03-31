'use client';

import { useState } from 'react';
import Link from 'next/link';

// TODO: Replace this form handler with NextAuth signIn() once a database is connected.
// For now, admin pages are NOT auth-protected — this login page is purely cosmetic in dev mode.

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate a brief network delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);
    showToast('Auth not connected yet — admin access is open in dev mode');
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
      {/* Toast */}
      {toast !== null && (
        <div className="fixed top-6 right-6 z-50 bg-[#2C2420] text-[#FAF7F2] text-sm px-4 py-3 rounded-xl shadow-lg max-w-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-start gap-2">
            <svg className="shrink-0 mt-0.5 text-[#E8722A]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {toast}
          </div>
        </div>
      )}

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#E8DDD3] shadow-sm p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#E8722A] flex items-center justify-center mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
            </div>
            <h1 className="font-satoshi font-bold text-2xl text-[#1A1A1A]">Jubilee Admin</h1>
            <p className="text-sm text-[#1A1A1A]/50 mt-1">Sign in to the management panel</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jubileejuice.com"
                required
                className="w-full px-4 py-2.5 text-sm border border-[#E8DDD3] rounded-lg bg-[#FAF7F2] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:ring-2 focus:ring-[#E8722A]/30 focus:border-[#E8722A] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 text-sm border border-[#E8DDD3] rounded-lg bg-[#FAF7F2] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:ring-2 focus:ring-[#E8722A]/30 focus:border-[#E8722A] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E8722A] hover:bg-[#d4611f] disabled:bg-[#E8722A]/60 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm mt-2"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>

        {/* Back link */}
        <p className="text-center mt-6 text-sm text-[#1A1A1A]/40">
          <Link href="/" className="hover:text-[#1A1A1A]/70 transition-colors">
            Back to Jubilee Juice & Grill
          </Link>
        </p>
      </div>
    </div>
  );
}
