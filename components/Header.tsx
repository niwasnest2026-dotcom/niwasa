'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { FaBars, FaTimes } from 'react-icons/fa';

interface HeaderProps {
  onSidebarToggle?: () => void;
  showSidebarToggle?: boolean;
}

export default function Header({ onSidebarToggle, showSidebarToggle = false }: HeaderProps) {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      try {
        const { data } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .maybeSingle();

        setIsAdmin((data as any)?.is_admin || false);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
    }

    checkAdmin();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b-2 bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/90 shadow-lg border-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Sidebar Toggle Button */}
              {showSidebarToggle && onSidebarToggle && (
                <button
                  onClick={onSidebarToggle}
                  className="p-3 rounded-xl hover:bg-gray-100 transition-colors text-neutral-700 hover:text-neutral-900 md:hidden"
                  aria-label="Toggle sidebar"
                >
                  <FaBars size={20} />
                </button>
              )}
              
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl sm:text-3xl font-bold text-neutral-900">
                  <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">Niwas</span> Nest
                </span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/listings"
                className="text-neutral-700 hover:text-neutral-900 font-semibold transition-colors text-lg"
              >
                Browse Listings
              </Link>

              {isAdmin && (
                <Link
                  href="/admin"
                  className="text-neutral-700 hover:text-neutral-900 font-semibold transition-colors text-lg"
                >
                  Admin
                </Link>
              )}

              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-neutral-600 text-sm truncate max-w-[150px] font-medium">
                    {user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:text-neutral-900 transition-colors rounded-xl hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:text-neutral-900 transition-colors rounded-xl hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-8 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border-2 border-transparent hover:border-white/20"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-neutral-700 hover:text-neutral-900 p-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-white/60 bg-white/95 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
              <Link
                href="/listings"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl font-semibold transition-colors text-lg"
              >
                Browse Listings
              </Link>

              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl font-semibold transition-colors text-lg"
                >
                  Admin
                </Link>
              )}

              {user ? (
                <>
                  <div className="px-4 py-3 text-neutral-600 text-sm border-t pt-4 font-medium">
                    {user.email}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl font-semibold transition-colors text-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3 pt-4 border-t">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-sm font-semibold text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-20"></div>
    </>
  );
}
