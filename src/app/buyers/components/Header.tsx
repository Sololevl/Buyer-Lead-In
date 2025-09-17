"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../providers/AuthProvider';
import '../../globals.css';
import { LogOut, LayoutGrid, UserPlus, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close the mobile menu when the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    // Make dashboard link active for all sub-routes of /buyers except /new
    if (path === '/buyers' && pathname !== '/buyers/new') {
        return pathname.startsWith(path);
    }
    // Exact match for other links
    return pathname === path;
  };

  return (
    // The header is now the main relative container for the mobile menu.
    <header className="relative sticky top-0 z-50 w-full bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50">
      <div className="flex items-center justify-between py-3 px-4 md:px-6">
        
        {/* Logo/Name */}
        <Link href="/buyers" className="flex items-center gap-2">
            <div className="bg-yellow-400 p-2 rounded-md">
                <LayoutGrid className="w-5 h-5 text-gray-900" />
            </div>
            <h1 className="text-lg md:text-xl font-bold text-gray-100 tracking-tight">
                Buyer Lead Intake
            </h1>
        </Link>

        {/* Desktop Navigation Links - Center */}
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
                isActive('/buyers/new')
                  ? 'bg-yellow-400 text-gray-900 shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Add New Lead
            </Link>
          </nav>
        )}

        {/* Right Side Actions: User Info & Hamburger Menu */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300 font-medium text-sm">
                  {user.email}
                </span>
              </div>
              <button
                onClick={signOut}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition-all duration-200 hover:shadow-red-500/30 transform hover:-translate-y-px"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
              
              {/* --- Hamburger Menu Button (Mobile Only) --- */}
              <div className="md:hidden">
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-300 hover:text-white">
                      {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
              </div>
            </>
          ) : (
            <div className="h-9"></div> // Placeholder
          )}
        </div>
      </div>

      {/* --- Mobile Menu (Now a direct child of the sticky header) --- */}
      {user && (
          <div className={`absolute left-0 z-40 w-full bg-gray-800/95 backdrop-blur-md border-b border-gray-700 md:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
              <nav className="flex flex-col p-4 space-y-2">
                  <span className="px-4 py-2 text-gray-400 text-sm font-medium border-b border-gray-700">{user.email}</span>
                  <Link
                      href="/buyers"
                      className="flex items-center gap-3 px-4 py-3 rounded-md text-gray-200 hover:bg-yellow-400/10 hover:text-yellow-300"
                  >
                      <LayoutGrid className="w-5 h-5" />
                      Dashboard
                  </Link>
                  <Link
                      href="/buyers/new"
                      className="flex items-center gap-3 px-4 py-3 rounded-md text-gray-200 hover:bg-yellow-400/10 hover:text-yellow-300"
                  >
                      <UserPlus className="w-5 h-5" />
                      Add New Lead
                  </Link>
              </nav>
          </div>
      )}
    </header>
  );
}

