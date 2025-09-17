"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../providers/AuthProvider';
import '../../globals.css';
import { LogOut, LayoutGrid, UserPlus } from 'lucide-react'; // Using lucide-react for icons

export default function Header() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => {
    // Make dashboard link active for all sub-routes of /buyers
    return pathname.startsWith(path);
  };

  return (
    // New: Dark, semi-transparent, blurring header that feels modern and sticks to the top
    <header className="sticky top-0 z-50 w-full bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 py-3 px-4 md:px-6">
      <div className="flex items-center justify-between">
        
        {/* Logo/Name in a styled box */}
        <div className="flex items-center gap-2">
            <div className="bg-yellow-400 p-2 rounded-md">
                <LayoutGrid className="w-5 h-5 text-gray-900" />
            </div>
            <h1 className="text-lg md:text-xl font-bold text-gray-100 tracking-tight">
                Buyer Lead Intake
            </h1>
        </div>

        {/* Navigation Links - Center. Hidden on mobile, visible on medium screens and up. */}
        {user && (
          <nav className="hidden md:flex items-center space-x-2 p-1 bg-gray-800/50 rounded-lg border border-gray-700">
            <Link
              href="/buyers"
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 text-sm ${
                isActive('/buyers')
                  ? 'bg-yellow-400 text-gray-900 shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              href="/buyers/new"
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 text-sm ${
                pathname === '/buyers/new' // Exact match for this one
                  ? 'bg-yellow-400 text-gray-900 shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Add New Lead
            </Link>
          </nav>
        )}

        {/* User Info & Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                {/* User's email is hidden on mobile screens */}
                <span className="text-gray-300 font-medium text-sm hidden md:block">
                  {user.email}
                </span>
              </div>
              <button
                onClick={signOut}
                // New: Red logout button with icon and better hover effects
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition-all duration-200 hover:shadow-red-500/30 transform hover:-translate-y-px"
              >
                <LogOut className="w-4 h-4" />
                {/* "Logout" text is hidden on small screens to save space */}
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
             <div className="h-9"></div> // Placeholder to prevent layout shift
          )}
        </div>
      </div>
    </header>
  );
}

