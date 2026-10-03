import React from 'react';
import SEOHead from '../components/seo/SEOHead';

export default function TermsPage() {
  return (
    <div className="container-custom py-12 sm:py-16 max-w-3xl">
      <SEOHead
        title="Terms of Use — UnitFlow"
        description="Review the terms and conditions for using UnitFlow free unit conversion tools."
        canonicalPath="/terms"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Terms of Use', url: '/terms' },
        ]}
      />
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
        Terms of Use
      </h1>
      <p className="text-xs text-gray-500 mb-8">Effective Date: October 3, 2026</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using UnitFlow, you acknowledge and agree to abide by these Terms of Use.
            If you disagree with any portion of these terms, you should discontinue use of the website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">2. Permitted Use</h2>
          <p>
            UnitFlow is provided free of charge for personal, educational, research, and non-commercial
            commercial utility purposes. Automated scraping, bulk denial-of-service attempts, or
            malicious misuse of our site resources is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">3. Accuracy &amp; Mathematical Disclaimers</h2>
          <p>
            While every effort has been taken to ensure all conversion multipliers, algorithms, and
            benchmarks adhere rigorously to international standards (including SI and NIST definitions),
            the tools on UnitFlow are provided on an "as is" and "as available" basis without warranties
            of any kind.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            For critical applications such as aviation, medical dosing, structural engineering, or
            legal compliance, always independently verify critical calculations with certified authorities.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">4. Limitation of Liability</h2>
          <p>
            Under no circumstances shall UnitFlow or its operators be held liable for any direct,
            indirect, incidental, or consequential damages resulting from the use or inability to use
            the conversion tools provided on this website.
          </p>
        </section>
      </div>
    </div>
  );
}
