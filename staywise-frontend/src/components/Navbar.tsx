'use client';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { Home, Key, LogOut, BadgePlus, Menu, X ,MapPinHouse } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-sw-secondary/95 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Row */}
        <div className="flex justify-between items-center h-20">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="https://res.cloudinary.com/dtv4en8be/image/upload/v1760463366/W_1_oxidj2.png"
              alt="Staywise Logo"
              className="w-36 h-14 object-contain transition duration-500 ease-in-out hover:scale-105"
            />
          </Link>

          {/* Right: Properties + Hamburger */}
          <div className="flex items-center space-x-4">
            {/* Always visible on mobile */}
            <Link
              href="/properties"
              className="hover:text-sw-primary transition flex items-center font-medium text-sw-dark block lg:hidden"
              onClick={() => setMenuOpen(false)}
            >
              <MapPinHouse className="w-5 h-5 mr-1"/>Properties
            </Link>

            {/* Hamburger Icon (mobile only) */}
            <button
              className="lg:hidden text-sw-dark focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-8 font-medium text-sw-dark">
              <Link href="/" className="hover:text-sw-primary transition flex items-center">
                <Home className="w-5 h-5 mr-1" /> Home
              </Link>

              <Link href="/properties" className="hover:text-sw-primary transition flex items-center">
              <MapPinHouse className="w-5 h-5 mr-1"/>Properties 
              </Link>

              {user && (
                <Link
                  href="/my-bookings"
                  className="hover:text-sw-primary transition flex items-center"
                >
                  <Key className="w-5 h-5 mr-1" /> {isAdmin ? 'All Bookings' : 'My Bookings'}
                </Link>
              )}

              {isAdmin && (
                <Link
                  href="/add-property"
                  className="hover:text-sw-primary transition flex items-center"
                >
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
                <Link
                  href="/login"
                  className="px-5 py-2 border-2 border-sw-primary text-sw-primary hover:bg-sw-primary hover:text-white transition duration-300 rounded-lg"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Right-Aligned) */}
        <div
          className={`lg:hidden absolute right-4 -mt-4 ml-4 bg-sw-secondary/95 shadow-lg rounded-xl p-4 font-medium text-sw-dark transition-all duration-500 ease-in-out ${
            menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'
          }`}
        >
          <div className="flex flex-col items-start space-y-3">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-sw-primary transition flex items-center"
            >
              <Home className="w-5 h-5 mr-1" /> Home
            </Link>

            {user && (
              <Link
                href="/my-bookings"
                onClick={() => setMenuOpen(false)}
                className="hover:text-sw-primary transition flex items-center"
              >
                <Key className="w-5 h-5 mr-1" /> {isAdmin ? 'All Bookings' : 'My Bookings'}
              </Link>
            )}

            {isAdmin && (
              <Link
                href="/add-property"
                onClick={() => setMenuOpen(false)}
                className="hover:text-sw-primary transition flex items-center"
              >
                <BadgePlus className="w-5 h-5 mr-1" /> Add Properties
              </Link>
            )}

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="px-5 py-2 bg-sw-primary text-white hover:bg-sw-dark transition duration-300 rounded-lg flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="px-5 py-2 border-2 border-sw-primary text-sw-primary hover:bg-sw-primary hover:text-white transition duration-300 rounded-lg"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
