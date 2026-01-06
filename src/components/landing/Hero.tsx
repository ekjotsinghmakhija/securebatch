import React from 'react';
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative pt-12 pb-20 lg:pt-32 px-4">
      <div className="max-w-7xl mx-auto text-center relative z-10">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-800 text-blue-300 px-3 py-1 rounded-full text-xs font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          v2.0 is now live
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-white">
          Batch processing, <br className="hidden sm:block" />
          <span className="text-blue-500">securely redefined.</span>
        </h1>

        <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          SecureBatch gives developers the power to manage high-volume transactions with enterprise-grade security.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-xl active:scale-95 transition-all hover:bg-blue-500 shadow-lg shadow-blue-600/20"
          >
            Launch App <ArrowRight className="ml-2 w-5 h-5" />
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-300 bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 transition-all"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
};
