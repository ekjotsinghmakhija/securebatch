import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CookiePolicy() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Navigation */}
        <div className="mb-8">
          <Link href="/" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12 border-b border-gray-800 pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-500 text-sm">
            Last Updated: <span className="text-gray-300">January 8, {currentYear}</span>
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-semibold prose-strong:text-white">

          <p className="leading-relaxed text-gray-400 mb-8">
            This Cookie Policy explains how SecureBatch ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>

          <section className="mb-10">
            <h2 className="text-xl text-white mb-4">1. What are cookies?</h2>
            <p className="text-sm text-gray-400">
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl text-white mb-4">2. Essential Cookies</h2>
            <p className="text-sm text-gray-400 mb-4">
              These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas.
            </p>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <ul className="list-disc pl-5 space-y-2 text-gray-400 text-sm">
                <li><strong>Session Cookies:</strong> Temporary cookies used to remember you during the course of your visit to the website, and they expire when you close the web browser.</li>
                <li><strong>Preference Cookies:</strong> Used to remember your preferences (like your preferred batch settings) for future visits.</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl text-white mb-4">3. No Third-Party Tracking</h2>
            <p className="text-sm text-gray-400">
              We take privacy seriously. Unlike many other services, <strong>we do not use third-party advertising cookies</strong> or sell your browsing data to ad networks. Our analytics are strictly internal and anonymized to help us improve system performance.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl text-white mb-4">4. Managing Cookies</h2>
            <p className="text-sm text-gray-400">
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
              If you have any questions about our use of cookies, please email us at <a href="mailto:ekjotmakhija@gmail.com" className="text-blue-400 hover:text-blue-300">ekjotmakhija@gmail.com</a>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
