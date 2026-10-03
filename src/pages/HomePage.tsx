import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, CheckCircle2, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import MainConverter from '../components/converter/MainConverter';
import AdPlaceholder from '../components/ui/AdPlaceholder';
import SEOHead from '../components/seo/SEOHead';
import { categories } from '../data/categories';
import { conversionPairs } from '../data/conversions';
import { getUnitById } from '../lib/conversion-engine';

export default function HomePage() {
  const popularPairs = conversionPairs.filter((p) => p.popular);
  const morePairs = conversionPairs.filter((p) => !p.popular).slice(0, 12);

  return (
    <div className="flex flex-col gap-10 sm:gap-14 py-4 sm:py-8">
      <SEOHead
        title="Free Online Unit Converter — Fast, Accurate & Simple"
        description="Convert length, weight, temperature, volume, area, speed, time, and more instantly with extreme accuracy. Free calculator for US, UK, Canada, and global units."
        canonicalPath="/"
      />

      {/* 1. HERO SECTION: Heading + Subtitle + MAIN CONVERTER immediately visible */}
      <section className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-2 sm:mb-2.5 text-balance">
            Free Online Unit <span className="text-blue-600">Converter</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 text-balance">
            Convert length, weight, temperature, volume, area, speed, time, and more instantly.
          </p>
        </div>

        {/* Main Converter Tool (The Hero) */}
        <MainConverter initialCategory="length" />

        {/* Reserved Ad Container (Below tool with generous spacing) */}
        <div className="max-w-[900px] mx-auto mt-6 sm:mt-8">
          <AdPlaceholder className="h-[90px] w-full" />
        </div>
      </section>

      {/* 2. POPULAR CONVERSIONS */}
      <section className="bg-white border-y border-gray-200 py-10 sm:py-14">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Popular Conversions</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Most requested everyday conversions in the US, UK, Canada, and Australia
              </p>
            </div>
            <Link
              to="/popular"
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              Browse all conversions
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5">
            {popularPairs.map((pair) => {
              const from = getUnitById(pair.fromId);
              const to = getUnitById(pair.toId);
              return (
                <Link
                  key={pair.slug}
                  to={`/convert/${pair.slug}`}
                  className="p-3.5 sm:p-4 rounded-xl border border-gray-200 bg-gray-50/40 hover:bg-white hover:border-blue-500 hover:shadow-xs transition-all group flex flex-col justify-between min-h-[76px]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors truncate">
                      {from?.name} to {to?.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                  <div className="text-xs text-gray-500 mt-1 font-mono">
                    {from?.symbol} → {to?.symbol}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CONVERSION CATEGORIES */}
      <section className="container-custom">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-1.5 sm:mb-2">
            Conversion Categories
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Select a measurement category to access dedicated calculators and reference tables.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/${cat.slug}`}
              className="p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    {cat.id.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">{cat.description}</p>
              </div>

              <div className="text-xs sm:text-sm font-semibold text-blue-600 flex items-center gap-1 group-hover:underline">
                Open {cat.name} Converter
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. USEFUL INFORMATION */}
      <section className="container-custom">
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-5 sm:p-8 lg:p-10 shadow-2xs">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">
            Engineered for Precision &amp; Everyday Speed
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 text-xs sm:text-sm text-gray-600">
            <div className="space-y-1.5">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                <Zap className="w-4 h-4 text-blue-600 shrink-0" /> Instant Browser-Side Execution
              </h3>
              <p className="leading-relaxed">
                Conversions run locally in your web browser with zero API latency. No slow page
                reloads, no unnecessary network requests, and zero delay as you type or adjust units.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Standardized Reference Factors
              </h3>
              <p className="leading-relaxed">
                All multiplicative coefficients align strictly with international standards
                organizations including the International System of Units (SI) and NIST guidelines.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" /> Private &amp; Account-Free
              </h3>
              <p className="leading-relaxed">
                UnitFlow requires no user registration, email, or subscription. Your recent calculations
                and favorite conversions are saved only on your local device.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" /> Multi-Region Compatibility
              </h3>
              <p className="leading-relaxed">
                Full coverage of Imperial, US Customary, and Metric systems tailored for users across
                the United States, Canada, the United Kingdom, Australia, and worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MORE POPULAR CONVERSIONS */}
      {morePairs.length > 0 && (
        <section className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-base sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
              More Quick Conversions
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {morePairs.map((p) => {
                const from = getUnitById(p.fromId);
                const to = getUnitById(p.toId);
                return (
                  <Link
                    key={`more-${p.slug}`}
                    to={`/convert/${p.slug}`}
                    className="p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:text-blue-600 text-gray-700 text-xs font-semibold transition-colors flex items-center justify-between"
                  >
                    <span className="truncate">
                      {from?.name} → {to?.name}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
