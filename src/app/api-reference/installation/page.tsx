"use client";

import React, { useState } from 'react';
import { Copy, Check, Terminal, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function InstallationPage() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install @securebatch/sdk");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl text-gray-300">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-4">Installation</h1>
        <p className="text-gray-400 leading-relaxed text-lg">
          SecureBatch provides a TypeScript SDK that wraps our WebAssembly engine. This allows you to integrate batch processing directly into your frontend or Node.js applications.
        </p>
      </div>

      <hr className="border-gray-800 mb-10" />

      {/* 1. Prerequisites (Full Width) */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <AlertCircle size={20} className="text-blue-500" />
          Prerequisites
        </h3>
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-green-500 mt-1 shrink-0" />
              <div>
                <span className="text-white font-medium">Node.js 18.x or higher</span>
                <p className="text-sm text-gray-500 mt-0.5">Required for server-side implementations.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-green-500 mt-1 shrink-0" />
              <div>
                <span className="text-white font-medium">Browsers with SharedArrayBuffer support</span>
                <p className="text-sm text-gray-500 mt-0.5">
                  Chrome 92+, Firefox 79+, Edge 92+, Safari 15.2+
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* 2. Install SDK (Full Width & Functional) */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Terminal size={20} className="text-green-500" />
          Install the SDK
        </h3>
        <p className="text-gray-400 mb-4">Run the following command in your project root:</p>

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

      {/* 3. Configuration */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Configuration (Next.js)</h3>
        <p className="text-gray-400 mb-6 leading-relaxed">
          Because we use WebAssembly, you must enable specific headers in your <code className="text-sm bg-gray-800 text-white px-1.5 py-0.5 rounded">next.config.js</code> to allow <code className="text-sm bg-gray-800 text-blue-300 px-1.5 py-0.5 rounded">SharedArrayBuffer</code>:
        </p>

        <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden shadow-sm">
          <div className="bg-gray-900/50 px-4 py-3 border-b border-gray-800 text-xs text-gray-500 font-mono flex items-center justify-between">
            <span>next.config.js</span>
            <span className="text-xs uppercase tracking-wider opacity-50">JavaScript</span>
          </div>
          <pre className="p-6 overflow-x-auto text-gray-300 font-mono text-sm leading-relaxed">
{`/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;`}
          </pre>
        </div>
      </div>

    </div>
  );
}
