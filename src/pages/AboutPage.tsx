import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Globe, Cpu, CheckCircle } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';

export default function AboutPage() {
  return (
    <div className="container-custom py-12 sm:py-16 max-w-4xl">
      <SEOHead
        title="About UnitFlow — Free High-Precision Unit Converter"
        description="Learn about UnitFlow, our mission to provide lightning-fast, privacy-first, and NIST-verified unit conversion calculators for everyone."
        canonicalPath="/about"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About UnitFlow', url: '/about' },
        ]}
      />

      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
        About UnitFlow
      </h1>
      <p className="text-lg text-gray-600 mb-10 leading-relaxed">
        UnitFlow is a fast, free, and privacy-focused unit conversion platform engineered specifically
        for everyday users, students, engineers, and professionals.
      </p>

      <div className="space-y-10 text-gray-700 leading-relaxed text-sm sm:text-base">
        <section className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Our Core Philosophy</h2>
          <p className="mb-4">
            Most legacy converter websites were built decades ago. They are crowded with intrusive popups,
            confusing nested dropdowns, and slow server-rendered scripts that refresh the whole page.
          </p>
          <p>
            UnitFlow was created to answer one question immediately:
            <strong className="text-gray-900 block mt-2 p-3 bg-gray-50 border-l-4 border-blue-600 rounded">
              "What do I need to enter, what units am I converting, and what is the answer?"
            </strong>
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-5">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Instant Client-Side Engine</h3>
            <p className="text-sm text-gray-600">
              Every calculation occurs instantly inside your browser without backend network latency,
              delivering sub-millisecond responsiveness as you type.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">No Accounts &amp; Zero Tracking</h3>
            <p className="text-sm text-gray-600">
              No login required, no subscriptions, and no paywalls. Your recent conversions and
              favorite pairs are stored only in your local browser storage.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">International Standards (NIST/SI)</h3>
            <p className="text-sm text-gray-600">
              Conversion coefficients and temperature algorithms strictly follow guidelines published
              by the National Institute of Standards and Technology and the SI Bureau.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Mobile-First Accessibility</h3>
            <p className="text-sm text-gray-600">
              Touch targets are sized for thumb navigation on 360px+ screens with full support for
              decimal inputs and keyboard shortcuts.
            </p>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Supported Measurement Domains</h2>
          <p className="mb-4 text-sm text-gray-600">
            We support over 100 units across 14 dedicated categories:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs sm:text-sm font-medium text-gray-800">
            <span className="p-2 rounded bg-gray-50 border border-gray-100 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Length &amp; Distance
            </span>
            <span className="p-2 rounded bg-gray-50 border border-gray-100 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Weight &amp; Mass
            </span>
            <span className="p-2 rounded bg-gray-50 border border-gray-100 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Temperature
            </span>
            <span className="p-2 rounded bg-gray-50 border border-gray-100 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Volume &amp; Capacity
            </span>
            <span className="p-2 rounded bg-gray-50 border border-gray-100 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Area &amp; Land
            </span>
            <span className="p-2 rounded bg-gray-50 border border-gray-100 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Speed &amp; Velocity
            </span>
            <span className="p-2 rounded bg-gray-50 border border-gray-100 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Time &amp; Duration
            </span>
            <span className="p-2 rounded bg-gray-50 border border-gray-100 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Pressure
            </span>
            <span className="p-2 rounded bg-gray-50 border border-gray-100 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Energy &amp; Work
            </span>
            <span className="p-2 rounded bg-gray-50 border border-gray-100 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Power
            </span>
            <span className="p-2 rounded bg-gray-50 border border-gray-100 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Digital Storage
            </span>
            <span className="p-2 rounded bg-gray-50 border border-gray-100 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Angles &amp; Degrees
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
