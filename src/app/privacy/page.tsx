import React from 'react';

export default function PrivacyPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-12 border-b border-gray-800 pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm">
            Last Updated: <span className="text-gray-300">January 7, {currentYear}</span>
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-semibold prose-a:text-blue-400 hover:prose-a:text-blue-300">

          <p className="leading-relaxed text-gray-400 mb-8">
            This Privacy Policy describes how we collect, use, and handle your information when you use our services. We are a digital-first team committed to protecting your personal data and ensuring transparency in how we operate.
          </p>

          <section className="mb-10">
            <h2 className="text-xl text-white mb-4">1. Information Collection</h2>
            <p className="mb-4 text-sm text-gray-400">We collect information to provide better services to all our users. This includes:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400 text-sm">
              <li><strong>Voluntary Information:</strong> Information you provide to us directly (e.g., when you contact us via email).</li>
              <li><strong>Usage Data:</strong> We may collect data on how you interact with our services, such as access times, pages viewed, and your IP address.</li>
              <li><strong>Cookies:</strong> We use cookies to improve user experience. You can control cookie settings through your browser.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl text-white mb-4">2. Use of Information</h2>
            <p className="mb-4 text-sm text-gray-400">We use the collected data for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400 text-sm">
              <li>To provide and maintain our Service.</li>
              <li>To notify you about changes to our Service.</li>
              <li>To provide customer support.</li>
              <li>To monitor the usage of our Service and detect technical issues.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl text-white mb-4">3. Data Disclosure</h2>
            <p className="mb-4 text-sm text-gray-400">
               We do not sell your personal data. We may share your information only in the following situations:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400 text-sm">
              <li><strong>Legal Obligations:</strong> If required to do so by law or in response to valid requests by public authorities.</li>
              <li><strong>Service Providers:</strong> We may employ third-party companies to facilitate our Service (e.g., hosting, analytics), who have access to your data only to perform these tasks on our behalf.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl text-white mb-4">4. Security</h2>
            <p className="text-sm text-gray-400">
              The security of your data is important to us, but remember that no method of transmission over the Internet is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
              For any privacy-concerns, please contact us at <a href="mailto:ekjotmakhija@gmail.com" className="text-white hover:underline">ekjotmakhija@gmail.com</a>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
