import React from 'react';
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">

          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Simple, transparent pricing</h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-16">
            Start for free, scale securely. No hidden data fees because we don't host your data.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {/* Free Tier */}
            <PricingCard
              name="Developer"
              price="$0"
              desc="Perfect for hobbyists and local testing."
              features={["Unlimited Local Batches", "720p Max Output", "Community Support", "Basic Watermarking"]}
            />

            {/* Pro Tier (Popular) */}
            <div className="relative">
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-blue-900/50">
                 MOST POPULAR
               </div>
               <PricingCard
                name="Pro Team"
                price="$29"
                period="/mo"
                desc="For teams requiring 4K and advanced formats."
                features={["4K Processing Support", "GIF & MP3 Output", "Priority Email Support", "Custom Image Watermarks", "API Access"]}
                isPopular
              />
            </div>

            {/* Enterprise Tier */}
            <PricingCard
              name="Enterprise"
              price="Custom"
              desc="For organizations with strict compliance needs."
              features={["SSO / SAML Login", "Audit Logs", "Dedicated Account Manager", "Custom SLAs", "On-Premise Deployment"]}
            />

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function PricingCard({ name, price, period, desc, features, isPopular }: any) {
  return (
    <div className={`p-8 rounded-2xl border flex flex-col h-full ${isPopular ? 'bg-gray-900 border-blue-500/50 shadow-2xl shadow-blue-900/20' : 'bg-black border-gray-800'}`}>
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-extrabold">{price}</span>
        {period && <span className="text-gray-500">{period}</span>}
      </div>
      <p className="text-gray-400 text-sm mb-8">{desc}</p>

      <div className="space-y-4 mb-8 flex-grow">
        {features.map((f: string, i: number) => (
          <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
            <div className="mt-0.5 bg-blue-900/30 text-blue-400 rounded-full p-0.5">
              <Check size={12} strokeWidth={3} />
            </div>
            {f}
          </div>
        ))}
      </div>

      <button className={`w-full py-3 rounded-lg font-bold transition-all ${isPopular ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}>
        Get Started
      </button>
    </div>
  );
}
