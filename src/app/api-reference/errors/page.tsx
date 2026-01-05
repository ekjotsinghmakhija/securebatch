"use client";

import React, { useState } from 'react';
import { AlertTriangle, Copy, Check, FileJson } from 'lucide-react';

export default function ErrorsPage() {
  const [isCopied, setIsCopied] = useState(false);
  const errorJson = `{
  "error": {
    "code": "invalid_file_format",
    "message": "The file 'video.exe' is not a supported video format.",
    "doc_url": "https://securebatch.com/docs/errors/invalid_file_format"
  }
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(errorJson);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl text-gray-300">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-4">Error Handling</h1>
        <p className="text-gray-400 leading-relaxed text-lg">
          The SecureBatch API uses standard HTTP response codes to indicate the success or failure of an API request.
        </p>
      </div>

      <hr className="border-gray-800 mb-10" />

      {/* 1. Status Codes Table */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <AlertTriangle size={20} className="text-amber-500" /> Status Codes
        </h3>

        <div className="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-900 text-gray-400 font-semibold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Code</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              <tr className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 text-green-400 font-mono font-bold">200</td>
                <td className="px-6 py-4 text-white">OK</td>
                <td className="px-6 py-4 text-gray-400">The request was successful.</td>
              </tr>
              <tr className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 text-amber-400 font-mono font-bold">400</td>
                <td className="px-6 py-4 text-white">Bad Request</td>
                <td className="px-6 py-4 text-gray-400">Missing required parameters or invalid file formats.</td>
              </tr>
              <tr className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 text-amber-400 font-mono font-bold">401</td>
                <td className="px-6 py-4 text-white">Unauthorized</td>
                <td className="px-6 py-4 text-gray-400">Invalid or missing API Key.</td>
              </tr>
              <tr className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 text-amber-400 font-mono font-bold">429</td>
                <td className="px-6 py-4 text-white">Too Many Requests</td>
                <td className="px-6 py-4 text-gray-400">You have exceeded the Free Tier limits.</td>
              </tr>
              <tr className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 text-red-400 font-mono font-bold">500</td>
                <td className="px-6 py-4 text-white">Internal Error</td>
                <td className="px-6 py-4 text-gray-400">The WebAssembly engine crashed or ran out of memory.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Error Object */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
           <FileJson size={20} className="text-purple-400" /> Error Response Object
        </h3>
        <p className="text-gray-400 mb-4">All error responses follow this standard JSON format:</p>

        <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden shadow-sm">
          <div className="bg-gray-900/50 px-4 py-3 border-b border-gray-800 text-xs text-gray-500 font-mono flex items-center justify-between">
            <span>Response Body</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              {isCopied ? <><Check size={14} className="text-green-500"/> Copied</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
          <pre className="p-6 overflow-x-auto text-gray-300 font-mono text-sm leading-relaxed">
            {errorJson}
          </pre>
        </div>
      </div>

    </div>
  );
}
