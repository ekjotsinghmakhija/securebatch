import React from 'react';
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ArrowRight, Layers, Workflow, ShieldCheck } from "lucide-react";
import Link from 'next/link';

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-24">
             <h1 className="text-5xl font-extrabold mb-8">The Product</h1>
             <p className="text-xl text-gray-400 max-w-3xl mx-auto">
               SecureBatch is a comprehensive suite of tools designed to handle media processing workflows without compromising data integrity.
             </p>
          </div>

          {/* Section 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
            <div className="flex-1">
               <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-6">
                 <Workflow size={24} />
               </div>
               <h2 className="text-3xl font-bold mb-4">Workflow Automation</h2>
               <p className="text-gray-400 leading-relaxed mb-6">
                 Stop manually converting files one by one. Create presets for common tasks like "Social Media Ready" or "Archival Quality" and apply them to thousands of files instantly.
               </p>
               <Link href="/features" className="text-blue-400 font-bold hover:text-blue-300 inline-flex items-center">
                 See Features <ArrowRight size={16} className="ml-2"/>
               </Link>
            </div>
            <div className="flex-1 bg-gray-900 h-64 rounded-2xl border border-gray-800 flex items-center justify-center text-gray-600">
               {/* Placeholder for Product Image */}
               [Product UI Mockup]
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="flex-1">
               <div className="w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center mb-6">
                 <Layers size={24} />
               </div>
               <h2 className="text-3xl font-bold mb-4">Tech Stack Integration</h2>
               <p className="text-gray-400 leading-relaxed mb-6">
                 We integrate seamlessly with your existing S3 buckets and local file systems. Use our Node.js SDK to trigger local processing jobs from your backend.
               </p>
               <Link href="/api-reference" className="text-purple-400 font-bold hover:text-purple-300 inline-flex items-center">
                 View API Docs <ArrowRight size={16} className="ml-2"/>
               </Link>
            </div>
            <div className="flex-1 bg-gray-900 h-64 rounded-2xl border border-gray-800 flex items-center justify-center text-gray-600">
               {/* Placeholder for Product Image */}
               [Integration Diagram]
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
