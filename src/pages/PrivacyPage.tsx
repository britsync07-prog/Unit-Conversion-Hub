import React from 'react';
import SEOHead from '../components/seo/SEOHead';

export default function PrivacyPage() {
  return (
    <div className="container-custom py-12 sm:py-16 max-w-3xl">
      <SEOHead
        title="Privacy Policy — UnitFlow"
        description="Read the UnitFlow privacy policy. We do not store personal information or calculation data."
        canonicalPath="/privacy"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Privacy Policy', url: '/privacy' },
        ]}
      />
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
        Privacy Policy
      </h1>
      <p className="text-xs text-gray-500 mb-8">Effective Date: October 3, 2026</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">1. Overview</h2>
          <p>
            UnitFlow ("we", "our", or "us") provides a free online unit conversion utility. We believe
            that simple web calculators should not require sharing sensitive personal information.
            This Privacy Policy describes our practices regarding information collection.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">2. Information We Do NOT Collect</h2>
          <p>
            When you use UnitFlow to convert measurements (such as centimeters to inches or kilograms to
            pounds), your numerical inputs and calculations execute locally within your browser. We do
            not transmit, log, or store your conversion values on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">3. Local Storage</h2>
          <p>
            We use HTML5 <code>localStorage</code> to store your recently used units and favorited
            conversions solely for your convenience. This data remains on your physical device and is
            never shared with third parties or sent to remote servers. You can clear this data at any
            time using your browser's history settings.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">4. Third-Party Advertising &amp; Cookies</h2>
          <p>
            To keep this service free for all users worldwide, UnitFlow may display non-intrusive banner
            advertisements through reputable advertising partners such as Google AdSense. These
            advertising partners may use standard cookies or web beacons to serve ads based on prior
            visits to this or other websites. You may opt out of personalized advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Google Ads Settings
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">5. Updates to This Policy</h2>
          <p>
            We may occasionally update this Privacy Policy to reflect technical improvements or legal
            guidelines. Revisions will be posted on this page with an updated effective date.
          </p>
        </section>
      </div>
    </div>
  );
}
