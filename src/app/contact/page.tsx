import React from 'react';
import { Mail, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white">

      {/* Hero Section */}
      <div className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Get in touch
          </h1>
          <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We are a 100% remote team operating globally. Whether you have a feature request, a bug report, or a business proposal, we are ready to listen.
          </p>
        </div>
      </div>

      {/* Contact Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Support */}
          <div className="group bg-gray-900/50 rounded-2xl p-8 border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Product Support</h3>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">
              Facing issues or have feedback? Our team reads every message to improve the product.
            </p>
            <a
              href="mailto:ekjotmakhija@gmail.com?subject=Product Support Request"
              className="inline-flex items-center text-blue-400 font-medium hover:text-blue-300 transition-colors"
            >
              Contact Support <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>

          {/* Business */}
          <div className="group bg-gray-900/50 rounded-2xl p-8 border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/10">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 border border-purple-500/20 group-hover:border-purple-500/50 transition-colors">
              <Mail className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Partnerships</h3>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">
              Interested in collaborating or discussing potential business opportunities?
            </p>
            <a
              href="mailto:ekjotmakhija@gmail.com?subject=Partnership Inquiry"
              className="inline-flex items-center text-purple-400 font-medium hover:text-purple-300 transition-colors"
            >
              Email for Inquiries <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>

          {/* Legal */}
          <div className="group bg-gray-900/50 rounded-2xl p-8 border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/10">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Legal & Privacy</h3>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">
              Questions about our Terms of Service, Privacy Policy, or data handling practices?
            </p>
            <a
              href="mailto:ekjotmakhija@gmail.com?subject=Legal Inquiry"
              className="inline-flex items-center text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
            >
              Contact Legal <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>

        </div>

        {/* Remote Statement */}
        <div className="mt-20 text-center border-t border-gray-800 pt-12">
          <p className="text-gray-500 text-sm">
            We operate fully remotely without a physical headquarters. <br className="hidden sm:block"/>
            Electronic communication is the fastest and most reliable way to reach us.
          </p>
        </div>
      </div>
    </div>
  );
}
