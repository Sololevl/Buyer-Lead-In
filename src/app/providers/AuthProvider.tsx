'use client'

import { useState, useEffect, createContext, useContext, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'
import type { User } from '@supabase/supabase-js'

const AuthContext = createContext<{
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}>({
  user: null,
  loading: true,
  signOut: async () => {}
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// Auth Provider Component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  // useRef to prevent multiple redirects on fast state changes
  const hasRedirected = useRef(false) 

  useEffect(() => {
    // Check initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
        
        // --- NEW REDIRECT LOGIC ---
        if (event === 'SIGNED_IN' && session && !hasRedirected.current) {
          hasRedirected.current = true; // Prevent this from running again
          router.push('/buyers');
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router]) // router is a stable dependency

  const signOut = async () => {
    await supabase.auth.signOut()
    hasRedirected.current = false; // Reset redirect flag on sign out
    router.push("/")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

// Protected Route Wrapper - CORRECTED TO FIX HYDRATION ERROR
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  // 1. Add a new state to track if the component has mounted on the client
  const [isMounted, setIsMounted] = useState(false);

  // 2. This useEffect will only run once on the client, after the initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // 3. We only run the redirect logic if the component is mounted and auth is settled
    if (isMounted && !loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router, isMounted])

  // 4. While NOT mounted on the client OR while auth is loading, show a consistent loading screen.
  // This prevents the hydration mismatch because the server and client both render this initially.
  if (!isMounted || loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-lg text-gray-300">Loading Session...</div>
      </div>
    )
  }

  // If mounted and loading is done, but there's still no user, we can return null
  // as the useEffect above will handle the redirect.
  if (!user) {
    return null 
  }

  // If everything checks out, render the protected content.
  return <>{children}</>
}


// This is a helper function. To make it work, you need to call it from your login page.
export async function loginWithEmail(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // This option tells Supabase where to send the user AFTER they click the link.
      // It's a good first step, and our AuthProvider logic is the safety net.
      emailRedirectTo: `${window.location.origin}/buyers`
    }
  })

  if (error) {
    console.error('Login error:', error.message)
    // We should return the error to be handled in the UI
    return error;
  } else {
    console.log('Secure Link sent!')
    return null;
  }
}

