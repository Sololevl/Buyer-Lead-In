"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "./providers/AuthProvider";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // We wait until the app has finished checking the user's login status.
    if (loading) {
      return; 
    }

    // If the check is done and the user IS logged in, send them to the dashboard.
    if (user) {
      router.replace('/buyers');
    } 
    // If the check is done and the user IS NOT logged in, send them to the login page.
    else {
      router.replace('/login');
    }
  }, [user, loading, router]);

  // While the redirect is happening (which is almost instant), show a clean loading screen.
  // This prevents any weird flashing of content.
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-lg text-gray-300">Loading...</div>
    </div>
  );
}

