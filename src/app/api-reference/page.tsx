"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, ShieldCheck, Zap, Layers, Terminal } from 'lucide-react';

export default function ApiIntroPage() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install @securebatch/sdk");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl text-gray-300">

      {/* 1. Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-4">SecureBatch API Documentation</h1>
        <p className="text-gray-400 leading-relaxed text-lg">
          Welcome to the SecureBatch Developer API. Our platform allows you to process media files securely using local compute resources orchestrated via a simple REST-like interface.
        </p>
      </div>

      <hr className="border-gray-800 mb-10" />

      {/* 2. Zero-Knowledge Promise (Featured Card) */}
      <div className="bg-blue-900/10 border border-blue-900/30 p-6 rounded-xl mb-12 flex items-start gap-4">
        <div className="p-3 bg-blue-900/20 text-blue-400 rounded-lg shrink-0">
           <ShieldCheck size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-2">Zero-Knowledge Promise</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Unlike traditional APIs, SecureBatch does not upload files to a remote server for processing.
            When you use our SDK, the "API calls" actually trigger <span className="text-blue-200 font-medium">local WebAssembly workers</span> within your browser or Node.js runtime.
          </p>
        </div>
      </div>

      {/* 3. Quick Start */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
           <Zap size={20} className="text-amber-500" /> Quick Start
        </h3>
        <p className="text-gray-400 mb-4">Install the SDK to get started immediately:</p>

        <div className="bg-gray-950 rounded-xl border border-gray-800 p-5 flex justify-between items-center group shadow-md hover:border-gray-700 transition-colors">
          <div className="font-mono text-base">
            <span className="text-gray-600 mr-3">$</span>
            <span className="text-blue-400">npm install</span> <span className="text-white">@securebatch/sdk</span>
          </div>
          <button
            onClick={handleCopy}
            className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-md active:scale-95"
            aria-label="Copy command"
          >
            {isCopied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
          </button>
        </div>
      </div>

      {/* 4. Core Concepts */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-white mb-6">Core Concepts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Concept 1: Batches */}
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <Layers size={20} className="text-purple-400" />
              <h4 className="font-bold text-white">Batches</h4>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A collection of one or more files grouped together for processing with shared settings (e.g., "Convert to 1080p").
            </p>
          </div>

          {/* Concept 2: Jobs */}
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <Terminal size={20} className="text-emerald-400" />
              <h4 className="font-bold text-white">Jobs</h4>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              An individual task within a batch. If a batch has 10 videos, it spawns 10 separate jobs.
            </p>
          </div>

        </div>
      </div>

      {/* CTA */}
      <div className="mt-8">
        <Link href="/api-reference/installation" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20">
          Start Installation →
        </Link>
      </div>

    </div>
  );
}
