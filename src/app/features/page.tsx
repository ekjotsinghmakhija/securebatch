import React from 'react';
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Shield, Zap, Lock, Cpu, Globe, FileCode } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Built for <span className="text-blue-500">Security-First</span> Teams
            </h1>
            <p className="text-xl text-gray-400">
              Explore the technology that makes SecureBatch the safest way to process sensitive media.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <FeatureDetail
              icon={Shield}
              title="Zero-Knowledge Architecture"
              desc="Your files never leave your device. All processing happens locally in your browser using WebAssembly, meaning we never see your data."
            />
            <FeatureDetail
              icon={Cpu}
              title="Client-Side Compute"
              desc="Leverage the full power of your local CPU/GPU. No server queues, no upload limits, and no waiting for cloud instances to spin up."
            />
            <FeatureDetail
              icon={Lock}
              title="Military-Grade Encryption"
              desc="Even temporary local storage is sandboxed and encrypted using AES-256 standards, preventing cross-site scripting access."
            />
            <FeatureDetail
              icon={Zap}
              title="Parallel Processing"
              desc="Process multiple videos simultaneously. Our engine optimizes thread usage to convert batches faster than traditional cloud APIs."
            />
             <FeatureDetail
              icon={FileCode}
              title="Format Agnostic"
              desc="Support for MP4, MOV, AVI, and MKV inputs with output options for optimized MP4, GIF, and MP3 audio extraction."
            />
            <FeatureDetail
              icon={Globe}
              title="Offline Capable"
              desc="Once the app loads, you can disconnect from the internet. SecureBatch works 100% offline for air-gapped security environments."
            />

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function FeatureDetail({ icon: Icon, title, desc }: any) {
  return (
    <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-all hover:bg-gray-900 group">
      <div className="w-12 h-12 bg-blue-900/20 text-blue-400 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
