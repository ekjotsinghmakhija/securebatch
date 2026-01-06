import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, ServerOff, Cpu } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Navigation */}
        <div className="mb-8">
          <Link href="/" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12 border-b border-gray-800 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-900/20 p-4 rounded-2xl border border-blue-900/50">
               <Shield size={48} className="text-blue-500" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-6">
            Security by Design
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            SecureBatch isn't just a name. It's our architecture. We utilize a <span className="text-blue-400">Zero-Knowledge</span> processing model.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

            {/* Feature 1: Local Processing */}
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-blue-600/30 transition-colors">
                <div className="w-10 h-10 bg-emerald-900/20 text-emerald-400 rounded-lg flex items-center justify-center mb-4">
                    <ServerOff size={20} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">No Server Uploads</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Your files <strong>never</strong> leave your device. Unlike traditional converters that upload your data to a cloud server, SecureBatch runs entirely in your browser using WebAssembly technology.
                </p>
            </div>

            {/* Feature 2: Browser Sandboxing */}
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-blue-600/30 transition-colors">
                <div className="w-10 h-10 bg-purple-900/20 text-purple-400 rounded-lg flex items-center justify-center mb-4">
                    <Cpu size={20} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Client-Side Compute</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    We utilize your computer's CPU power to process videos. This ensures that sensitive data (like legal depositions, personal footage, or copyrighted material) remains strictly under your control.
                </p>
            </div>

             {/* Feature 3: Encryption */}
             <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-blue-600/30 transition-colors">
                <div className="w-10 h-10 bg-blue-900/20 text-blue-400 rounded-lg flex items-center justify-center mb-4">
                    <Lock size={20} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Local Encryption</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Even though data doesn't transmit over the network, our temporary local storage utilizes browser sandboxing standards, ensuring other malicious websites cannot access your batch data.
                </p>
            </div>

            {/* Feature 4: Code Integrity */}
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-blue-600/30 transition-colors">
                <div className="w-10 h-10 bg-amber-900/20 text-amber-400 rounded-lg flex items-center justify-center mb-4">
                    <Shield size={20} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Verified Builds</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Our source code is audited, and we serve our application via secure HTTPS connections with strict Content Security Policies (CSP) to prevent XSS attacks.
                </p>
            </div>

        </div>

        {/* Contact Section */}
        <div className="text-center border-t border-gray-800 pt-12">
            <h3 className="text-lg font-semibold text-white mb-2">Have a security concern?</h3>
            <p className="text-gray-400 text-sm mb-6">
                If you believe you've found a vulnerability, please report it to our security team immediately.
            </p>
            <a
                href="mailto:ekjotmakhija@gmail.com?subject=Security Vulnerability Report"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-blue-900 bg-blue-100 hover:bg-blue-200 transition-colors"
            >
                Report a Vulnerability
            </a>
        </div>

      </div>
    </div>
  );
}
