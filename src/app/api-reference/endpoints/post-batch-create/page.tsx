"use client";

import React, { useState } from 'react';
import { Copy, Check, FileInput, Settings } from 'lucide-react';

export default function PostCreatePage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const requestBody = `{
  "files": [FileObject, FileObject], // Array of JS File objects
  "settings": {
    "format": "mp4",
    "quality": "high",
    "resolution": "1080p",
    "watermark": {
       "type": "text",
       "content": "CONFIDENTIAL"
    }
  }
}`;

  const responseBody = `{
  "id": "batch_123456789",
  "status": "processing",
  "created_at": "2024-01-08T12:00:00Z",
  "job_count": 2
}`;

  const copyText = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="max-w-4xl text-gray-300">

      {/* Header */}
      <div className="mb-10 flex items-start justify-between">
        <div>
           <div className="flex items-center gap-3 mb-4">
            <span className="bg-green-500 text-black px-3 py-1 rounded font-bold text-sm">POST</span>
            <h1 className="text-3xl font-bold text-white m-0">/batch/create</h1>
          </div>
          <p className="text-gray-400 text-lg">Initiates a new processing job for a list of files.</p>
        </div>
      </div>

      <hr className="border-gray-800 mb-10" />

      {/* 1. Request Body */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4">Request Body</h3>
        <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden shadow-sm">
          <div className="bg-gray-900/50 px-4 py-3 border-b border-gray-800 text-xs text-gray-500 font-mono flex items-center justify-between">
            <span>application/json</span>
            <button
              onClick={() => copyText(requestBody, 'req')}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              {copiedSection === 'req' ? <><Check size={14} className="text-green-500"/> Copied</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
          <pre className="p-6 overflow-x-auto text-gray-300 font-mono text-sm leading-relaxed">
            {requestBody}
          </pre>
        </div>
      </div>

      {/* 2. Parameters Card */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4">Parameters</h3>
        <div className="grid grid-cols-1 gap-4">

           <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-800 flex items-start gap-4">
              <div className="p-2 bg-blue-900/20 text-blue-400 rounded-lg shrink-0 mt-1"><FileInput size={20}/></div>
              <div>
                 <p className="font-mono text-white font-bold text-sm">files <span className="text-red-400 ml-2 text-xs font-sans uppercase bg-red-900/20 px-1.5 py-0.5 rounded">Required</span></p>
                 <p className="text-sm text-gray-400 mt-1">An array of browser <code>File</code> objects to be processed.</p>
              </div>
           </div>

           <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-800 flex items-start gap-4">
              <div className="p-2 bg-purple-900/20 text-purple-400 rounded-lg shrink-0 mt-1"><Settings size={20}/></div>
              <div>
                 <p className="font-mono text-white font-bold text-sm">settings <span className="text-gray-500 ml-2 text-xs font-sans uppercase bg-gray-800 px-1.5 py-0.5 rounded">Optional</span></p>
                 <p className="text-sm text-gray-400 mt-1">Configuration object. Defaults: <code>mp4</code> format, <code>medium</code> quality.</p>
              </div>
           </div>

        </div>
      </div>

      {/* 3. Response */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Response</h3>
        <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden shadow-sm">
          <div className="bg-gray-900/50 px-4 py-3 border-b border-gray-800 text-xs text-gray-500 font-mono flex items-center justify-between">
            <span>200 OK</span>
            <button
              onClick={() => copyText(responseBody, 'res')}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              {copiedSection === 'res' ? <><Check size={14} className="text-green-500"/> Copied</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
          <pre className="p-6 overflow-x-auto text-gray-300 font-mono text-sm leading-relaxed">
            {responseBody}
          </pre>
        </div>
      </div>

    </div>
  );
}
