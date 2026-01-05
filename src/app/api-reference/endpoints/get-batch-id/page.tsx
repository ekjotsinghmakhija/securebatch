"use client";

import React, { useState } from 'react';
import { Copy, Check, Hash } from 'lucide-react';

export default function GetBatchPage() {
  const [isCopied, setIsCopied] = useState(false);

  const responseBody = `{
  "id": "batch_123456789",
  "status": "processing",
  "progress": 45.5,
  "jobs": [
    {
      "id": "job_1",
      "file_name": "video1.mp4",
      "status": "done",
      "output_url": "blob:..."
    },
    {
      "id": "job_2",
      "file_name": "video2.mov",
      "status": "processing",
      "progress": 12
    }
  ]
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(responseBody);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl text-gray-300">

      {/* Header */}
      <div className="mb-10">
         <div className="flex items-center gap-3 mb-4">
          <span className="bg-blue-500 text-black px-3 py-1 rounded font-bold text-sm">GET</span>
          <h1 className="text-3xl font-bold text-white m-0">/batch/:id</h1>
        </div>
        <p className="text-gray-400 text-lg">Retrieves the real-time status and progress of a specific batch.</p>
      </div>

      <hr className="border-gray-800 mb-10" />

      {/* 1. Path Parameters */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4">Path Parameters</h3>
        <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-800 flex items-center gap-4">
           <div className="p-2 bg-gray-800 text-gray-300 rounded-lg shrink-0"><Hash size={20}/></div>
           <div>
              <p className="font-mono text-white font-bold text-sm">id <span className="text-red-400 ml-2 text-xs font-sans uppercase bg-red-900/20 px-1.5 py-0.5 rounded">Required</span></p>
              <p className="text-sm text-gray-400 mt-1">The unique identifier of the batch (returned upon creation).</p>
           </div>
        </div>
      </div>

      {/* 2. Response */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Response</h3>
        <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden shadow-sm">
          <div className="bg-gray-900/50 px-4 py-3 border-b border-gray-800 text-xs text-gray-500 font-mono flex items-center justify-between">
            <span>200 OK</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              {isCopied ? <><Check size={14} className="text-green-500"/> Copied</> : <><Copy size={14} /> Copy</>}
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
