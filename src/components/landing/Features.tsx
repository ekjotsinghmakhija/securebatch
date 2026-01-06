import React from 'react';
import { ShieldCheck, Zap, Lock, BarChart3 } from "lucide-react";

export const Features = () => {
  return (
    <section id="features" className="py-16 bg-gray-950 border-y border-gray-900 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={Lock}
          title="Encrypted"
          desc="Military-grade AES-256 standards for all batch data."
        />
        <FeatureCard
          icon={Zap}
          title="Fast"
          desc="Distributed edge network for near-zero latency."
        />
        <FeatureCard
          icon={BarChart3}
          title="Insights"
          desc="Real-time monitoring and error logging out of the box."
        />
      </div>
    </section>
  );
};

// Sub-component for individual cards
function FeatureCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-blue-900/50 transition-colors group">
      <div className="w-12 h-12 bg-blue-900/20 text-blue-400 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
