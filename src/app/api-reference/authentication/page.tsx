"use client";

import React, { useState } from 'react';
import { Key, Lock, Copy, Check, ShieldAlert } from 'lucide-react';

export default function AuthPage() {
  const [isCopied, setIsCopied] = useState(false);

  const codeSnippet = `import { SecureBatch } from '@securebatch/sdk';

const client = new SecureBatch({
  apiKey: 'sb_live_892347289347...', // Your Key
  environment: 'local'
});`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl text-gray-300">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-4">Authentication</h1>
        <p className="text-gray-400 leading-relaxed text-lg">
          Since SecureBatch processes data locally, "Authentication" is primarily used to verify your license tier (e.g., unlocking 4K processing or removing watermarks).
        </p>
      </div>

      <hr className="border-gray-800 mb-10" />

      {/* 1. Obtaining Key */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Key size={20} className="text-amber-500" /> Obtaining an API Key
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 text-center">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">1</div>
            <p className="text-sm">Log in to your <span className="text-blue-400">Dashboard</span></p>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 text-center">
             <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">2</div>
            <p className="text-sm">Navigate to <span className="text-white">Settings &gt; Developer Keys</span></p>
          </div>
           <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 text-center">
             <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">3</div>
            <p className="text-sm">Click <span className="text-white">Generate New Key</span></p>
          </div>
        </div>
      </div>

      {/* 2. Using the Key */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Lock size={20} className="text-blue-500" /> Implementation
        </h3>
        <p className="text-gray-400 mb-4">Pass the key when initializing the client in your application.</p>

        <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden shadow-sm">
          <div className="bg-gray-900/50 px-4 py-3 border-b border-gray-800 text-xs text-gray-500 font-mono flex items-center justify-between">
            <span>client.ts</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              {isCopied ? <><Check size={14} className="text-green-500"/> Copied</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
          <pre className="p-6 overflow-x-auto text-gray-300 font-mono text-sm leading-relaxed">
            {codeSnippet}
          </pre>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-amber-900/10 border border-amber-900/30 p-6 rounded-xl flex items-start gap-4">
        <ShieldAlert size={24} className="text-amber-500 shrink-0" />
        <div>
          <h4 className="text-white font-bold mb-1">Security Warning</h4>
          <p className="text-sm text-amber-200/70 leading-relaxed">
            If you are using the SDK in a browser environment, ensure your API Key is restricted to your specific domain (e.g., <code>yourdomain.com</code>) in the dashboard settings to prevent unauthorized usage.
          </p>
        </div>
      </div>

    </div>
  );
}
