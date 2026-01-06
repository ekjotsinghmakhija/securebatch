import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-900 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">

          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-1 rounded-md text-white">
                <ShieldCheck size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">SecureBatch</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              The world's most secure batch processing engine for modern developer teams.
            </p>
            <div className="flex gap-4 text-gray-400">
              <a
                href="https://x.com/ek10sh"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white cursor-pointer transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/ekjot-singh-thefirst/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white cursor-pointer transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Product Column (NOW WORKING LINKS) */}
          <div>
            <Link href="/product" className="font-semibold text-white mb-4 block hover:text-blue-400 transition-colors">
              Product
            </Link>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/features" className="hover:text-blue-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/api-reference" className="hover:text-blue-400 transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-blue-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-blue-400 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              {/* Note: If you don't have a docs page yet, these can point to contact or # */}
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">System Status</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
              <li><Link href="/security" className="hover:text-blue-400 transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Area */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>
            © {new Date().getFullYear()} SecureBatch Inc. Built by{" "}
            <a
              href="https://ekjot.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block font-bold text-blue-400 transition-all duration-300 hover:text-blue-300 group"
            >
              {/* Glowing Text */}
              <span className="drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] group-hover:drop-shadow-[0_0_12px_rgba(96,165,250,1)]">
                Ekjot Singh
              </span>
              {/* Animated Underline */}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-300 cursor-pointer transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-300 cursor-pointer transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-gray-300 cursor-pointer transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
