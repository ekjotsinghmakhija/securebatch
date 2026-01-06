import React from 'react';

export default function TermsPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-12 border-b border-gray-800 pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-500 text-sm">
            Effective Date: <span className="text-gray-300">January 7, {currentYear}</span>
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-semibold prose-strong:text-white">

          <p className="leading-relaxed text-gray-400 mb-8">
            Please read these Terms of Service ("Terms") carefully before using our website and services. By accessing or using the Service, you agree to be bound by these Terms.
          </p>

          <section className="mb-10">
            <h2 className="text-xl text-white mb-4">1. General Terms</h2>
            <p className="text-sm text-gray-400 mb-4">
               We provide this Service on an "as is" and "as available" basis. We reserve the right to modify, suspend, or discontinue the Service at any time without notice. We will not be liable if, for any reason, all or any part of the Service is unavailable at any time or for any period.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl text-white mb-4">2. Intellectual Property</h2>
            <p className="text-sm text-gray-400">
              The Service and its original content, features, and functionality are and will remain the exclusive property of the creators. The Service is protected by copyright, trademark, and other laws of India and foreign countries.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl text-white mb-4">3. Prohibited Uses</h2>
            <p className="text-sm text-gray-400 mb-4">You agree not to use the Service:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400 text-sm">
              <li>In any way that violates any applicable national or international law or regulation.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
              <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl text-white mb-4">4. Limitation of Liability</h2>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
              <p className="text-xs text-gray-400 uppercase tracking-wider leading-loose font-medium">
                IN NO EVENT SHALL THE OPERATORS, DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl text-white mb-4">5. Governing Law</h2>
            <p className="text-sm text-gray-400">
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl text-white mb-4">6. Changes to Terms</h2>
            <p className="text-sm text-gray-400">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
              Questions regarding these Terms should be sent to <a href="mailto:ekjotmakhija@gmail.com" className="text-white hover:underline">ekjotmakhija@gmail.com</a>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
