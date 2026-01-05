"use client"; // <--- Needed to check the current URL

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // <--- Hook to get current path
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Terminal, Book, Key, AlertTriangle, Server } from "lucide-react";

export default function ApiLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Helper to check if a link is active
  const isActive = (path: string) => pathname === path;

  // Base style for all links
  const baseLinkStyle = "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-all duration-200";

  // Active vs Inactive styles
  const activeStyle = "bg-gray-800 text-white font-medium shadow-sm shadow-blue-900/10";
  const inactiveStyle = "text-gray-400 hover:text-white hover:bg-gray-900";

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 flex flex-col">
      <Navbar />

      <div className="flex-1 flex max-w-7xl mx-auto w-full pt-16">

        {/* SIDEBAR NAVIGATION */}
        <aside className="hidden lg:block w-64 border-r border-gray-800 shrink-0 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto py-8 pr-6">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-sm mb-6 px-2">
             <Terminal size={16} /> developer.securebatch
          </div>

          <nav className="space-y-8">
            <div>
              <p className="font-semibold text-white px-2 mb-3 text-sm">Getting Started</p>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/api-reference"
                    className={`${baseLinkStyle} ${isActive('/api-reference') ? activeStyle : inactiveStyle}`}
                  >
                    <Book size={14} className={isActive('/api-reference') ? "text-blue-400" : ""} />
                    Introduction
                  </Link>
                </li>
                <li>
                  <Link
                    href="/api-reference/installation"
                    className={`${baseLinkStyle} ${isActive('/api-reference/installation') ? activeStyle : inactiveStyle}`}
                  >
                    <Server size={14} className={isActive('/api-reference/installation') ? "text-blue-400" : ""} />
                    Installation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/api-reference/authentication"
                    className={`${baseLinkStyle} ${isActive('/api-reference/authentication') ? activeStyle : inactiveStyle}`}
                  >
                    <Key size={14} className={isActive('/api-reference/authentication') ? "text-blue-400" : ""} />
                    Authentication
                  </Link>
                </li>
                <li>
                  <Link
                    href="/api-reference/errors"
                    className={`${baseLinkStyle} ${isActive('/api-reference/errors') ? activeStyle : inactiveStyle}`}
                  >
                    <AlertTriangle size={14} className={isActive('/api-reference/errors') ? "text-blue-400" : ""} />
                    Errors
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-white px-2 mb-3 text-sm">Endpoints</p>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/api-reference/endpoints/post-batch-create"
                    className={`${baseLinkStyle} ${isActive('/api-reference/endpoints/post-batch-create') ? activeStyle : inactiveStyle}`}
                  >
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded mr-1 ${isActive('/api-reference/endpoints/post-batch-create') ? "bg-green-500 text-black" : "bg-green-900/50 text-green-400"}`}>POST</span>
                    Create Batch
                  </Link>
                </li>
                <li>
                  <Link
                    href="/api-reference/endpoints/get-batch-id"
                    className={`${baseLinkStyle} ${isActive('/api-reference/endpoints/get-batch-id') ? activeStyle : inactiveStyle}`}
                  >
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded mr-1 ${isActive('/api-reference/endpoints/get-batch-id') ? "bg-blue-500 text-black" : "bg-blue-900/50 text-blue-400"}`}>GET</span>
                    Get Status
                  </Link>
                </li>
                <li>
                  <Link
                    href="/api-reference/endpoints/delete-batch-id"
                    className={`${baseLinkStyle} ${isActive('/api-reference/endpoints/delete-batch-id') ? activeStyle : inactiveStyle}`}
                  >
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded mr-1 ${isActive('/api-reference/endpoints/delete-batch-id') ? "bg-red-500 text-black" : "bg-red-900/50 text-red-400"}`}>DEL</span>
                    Cancel Batch
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 px-4 sm:px-8 py-8 overflow-x-hidden">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
