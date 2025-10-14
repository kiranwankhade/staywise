'use client';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { Home, Key, LogOut,BadgePlus } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-sw-secondary/95 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-3xl font-serif font-extrabold text-sw-dark">
            {/* STAYWISE */}
            <img src='https://res.cloudinary.com/dtv4en8be/image/upload/v1760463366/W_1_oxidj2.png' className="w-140 h-14 object-contain  transition duration-500 ease-in-out hover:scale-105"/>
          </Link>
          <nav className="flex space-x-8 items-center font-medium text-sw-dark">
            
            <Link href="/" className="hover:text-sw-primary transition flex items-center">
                <Home className="w-5 h-5 mr-1"/> Home
            </Link>
            <Link href="/properties" className="hover:text-sw-primary transition">
                Properties
            </Link>

            {user && (
              <Link href="/my-bookings" className="hover:text-sw-primary transition flex items-center">
                <Key className="w-5 h-5 mr-1" /> {isAdmin ? "All Bookings":"My Bookings"}
              </Link>
            )}

             {isAdmin && (
              <Link href="/add-property" className="hover:text-sw-primary transition flex items-center">
                <BadgePlus className="w-5 h-5 mr-1" /> Add Properties
              </Link>
            )}

            {user ? (
              <button
                onClick={logout}
                className="px-5 py-2 bg-sw-primary text-white hover:bg-sw-dark transition duration-300 rounded-lg flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </button>
            ) : (
              <Link href="/login" className="px-5 py-2 border-2 border-sw-primary text-sw-primary 
                hover:bg-sw-primary hover:text-white transition duration-300 rounded-lg">
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
