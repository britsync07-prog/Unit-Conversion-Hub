import React from 'react';
import SEOHead from '../components/seo/SEOHead';

export default function CookiePolicyPage() {
  return (
    <div className="container-custom py-12 sm:py-16 max-w-3xl">
      <SEOHead
        title="Cookie Policy — UnitFlow"
        description="Learn about cookies and local storage usage on UnitFlow."
        canonicalPath="/cookie-policy"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Cookie Policy', url: '/cookie-policy' },
        ]}
      />
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
        Cookie Policy
      </h1>
      <p className="text-xs text-gray-500 mb-8">Effective Date: October 3, 2026</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your computer or mobile device by websites you visit.
            They are widely used to make websites function efficiently and provide reporting insights.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">2. How UnitFlow Uses Cookies &amp; Local Storage</h2>
          <p>
            UnitFlow does not set first-party tracking cookies. We utilize standard client-side browser
            storage (<code>localStorage</code>) to remember:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
            <li>Your recent conversions for rapid one-click re-calculation</li>
            <li>Your starred favorite conversion pairs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">3. Advertising Partner Cookies</h2>
          <p>
            Third-party vendors, including Google, use cookies to serve ads based on a user's prior
            visits to this or other websites. Google's use of advertising cookies enables it and its
            partners to serve ads to users based on their visit to UnitFlow and/or other sites on the
            Internet.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">4. Managing Your Preferences</h2>
          <p>
            You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.
            Additionally, you may opt out of personalized advertising by visiting{' '}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              www.aboutads.info
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
