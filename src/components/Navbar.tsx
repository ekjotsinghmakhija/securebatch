"use client";

import React, { useState } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const APP_ROUTE = "/dashboard";

  return (
    <nav className="w-full bg-gray-950 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo Button (Responsive font size) */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="group flex items-center gap-2 py-2 rounded-lg"
            >
              <div className="bg-blue-600 text-white p-1.5 rounded-md shadow-sm group-hover:bg-blue-500 transition-colors">
                <ShieldCheck size={20} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg sm:text-xl text-white tracking-tight group-hover:text-blue-400 transition-colors">
                SecureBatch
              </span>
            </Link>
          </div>

          {/* Desktop Launch Button (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href={APP_ROUTE}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20"
            >
              Launch App
            </Link>
          </div>

          {/* Hamburger Menu Button (Only Mobile) */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-950 border-t border-gray-800 absolute w-full left-0 z-50 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="px-4 py-6 space-y-4">
            <Link
              href={APP_ROUTE}
              className="block w-full text-center px-4 py-4 rounded-xl text-base font-bold text-white bg-blue-600 active:scale-95 transition-transform"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Launch App
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
