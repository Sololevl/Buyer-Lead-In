"use client";
import '../globals.css';
import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { loginWithEmail } from '../providers/AuthProvider';

import { Metadata } from "next";

// --- Skeleton Loader Component ---
// A reusable component for the loading state to keep the main return statement clean.
const SkeletonLoader = () => (
  <div className="space-y-6 animate-pulse">
    {/* Skeleton for the heading */}
    <div className="space-y-2">
      <div className="h-8 bg-gray-700 rounded-md w-3/4 mx-auto"></div>
      <div className="h-4 bg-gray-700 rounded-md w-1/2 mx-auto"></div>
    </div>
    
    {/* Skeleton for the input field */}
    <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded-md w-1/3"></div>
        <div className="h-12 bg-gray-700 rounded-xl w-full"></div>
    </div>
    
    {/* Skeleton for the button */}
    <div className="h-12 bg-gray-700 rounded-xl w-full mt-4"></div>
  </div>
);


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    const error = await loginWithEmail(email);
    
    // Keep loading for a moment to make the transition feel smoother
    setTimeout(() => {
        setLoading(false);
        if (error) {
            setMsg(error.message);
        } else {
            setMsg("Login link sent! Please check your inbox.");
        }
    }, 1500); // Simulate a network delay for a better UX
  }

  return (
    // New background: Dark charcoal with a subtle grid pattern
    <div className="flex justify-center items-center min-h-screen bg-gray-900 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:16px_16px]">
      <form
        onSubmit={handleSubmit}
        // New form style: Solid dark gray card with a glowing yellow border
        className="flex flex-col gap-6 p-10 border border-yellow-500/30 rounded-lg bg-gray-800/60 backdrop-blur-md min-w-[420px] shadow-2xl shadow-yellow-500/10"
      >
        {loading ? (
          // Show Skeleton Loader when loading is true
          <SkeletonLoader />
        ) : (
          // Show the main form content when not loading
          <>
            <div className="text-center">
              {/* New headline with yellow accent */}
              <h2 className="text-3xl font-bold text-gray-100 mb-2">
                Unlock Your <span className="text-yellow-400">Dashboard</span>
              </h2>
              {/* New sub-headline */}
              <p className="text-gray-400 text-sm">
                Enter your email to receive a secure login link.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="font-semibold text-gray-300 text-sm tracking-wide flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                // New input style: Dark with a sharp red focus state
                className="w-full px-4 py-3 border border-gray-600/60 text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200 placeholder:text-gray-500 bg-gray-900/50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              // New button style: Yellow with black text and enhanced hover effects
              className="mt-2 py-3 px-6 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-300 font-bold transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98] shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {/* New button text */}
                Get Secure Link
            </button>
            
            {/* New message box style */}
            {msg && (
              <div className="mt-2 p-3 rounded-lg bg-gray-800 border border-gray-700">
                <p role="status" className="text-sm text-gray-300 flex items-center justify-center gap-2 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {msg}
                </p>
              </div>
            )}
          </>
        )}
      </form>
    </div>
  );
}
