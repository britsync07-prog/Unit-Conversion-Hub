import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Calculator, HelpCircle, ArrowLeftRight } from 'lucide-react';
import { conversionPairs } from '../data/conversions';
import { categories } from '../data/categories';
import { getUnitById, convert, formatValue } from '../lib/conversion-engine';
import MainConverter from '../components/converter/MainConverter';
import AdPlaceholder from '../components/ui/AdPlaceholder';
import SEOHead from '../components/seo/SEOHead';

export default function ConversionPairPage() {
  const { pairSlug } = useParams<{ pairSlug: string }>();

  const pair = conversionPairs.find((p) => p.slug === pairSlug);

  const fromUnit = pair ? getUnitById(pair.fromId) : undefined;
  const toUnit = pair ? getUnitById(pair.toId) : undefined;
  const category = pair ? categories.find((c) => c.id === pair.categoryId) : undefined;

  if (!pair || !fromUnit || !toUnit || !category) {
    return <Navigate to="/404" replace />;
  }

  // Benchmark values
  const benchmarkValues = [1, 2, 5, 10, 15, 20, 25, 50, 75, 100, 250, 500, 1000];

  // Reverse pair slug if exists
  const reversePair = conversionPairs.find(
    (p) => p.fromId === toUnit.id && p.toId === fromUnit.id
  );
  const reverseUrl = reversePair
    ? `/convert/${reversePair.slug}`
    : `/?from=${toUnit.id}&to=${fromUnit.id}&cat=${category.id}`;

  // Related conversions in the same category
  const relatedConversions = conversionPairs
    .filter((p) => p.categoryId === category.id && p.slug !== pair.slug)
    .slice(0, 4);

  // Exact 1-unit conversion factor
  const oneUnitFactor = convert(1, fromUnit.id, toUnit.id);
  const formattedFactor = formatValue(oneUnitFactor, 6);

  // Reverse 1-unit factor
  const reverseFactor = convert(1, toUnit.id, fromUnit.id);
  const formattedReverseFactor = formatValue(reverseFactor, 6);

  // FAQs for Schema.org JSON-LD
  const faqs = [
    {
      question: `How many ${toUnit.plural.toLowerCase()} are in 1 ${fromUnit.name.toLowerCase()}?`,
      answer: `There are exactly ${formattedFactor} ${toUnit.plural.toLowerCase()} in 1 ${fromUnit.name.toLowerCase()}.`,
    },
    {
      question: `How do I quickly convert ${fromUnit.symbol} to ${toUnit.symbol}?`,
      answer: `To convert ${fromUnit.plural.toLowerCase()} to ${toUnit.plural.toLowerCase()}, multiply the value by ${formattedFactor}.`,
    },
    {
      question: `Is the ${fromUnit.symbol} to ${toUnit.symbol} conversion formula standardized?`,
      answer: `Yes, this conversion strictly adheres to International System of Units (SI) and NIST definitions.`,
    },
  ];

  return (
    <div className="container-custom py-6 sm:py-10 flex flex-col gap-8 sm:gap-12">
      <SEOHead
        title={`${fromUnit.plural} to ${toUnit.plural} Converter (${fromUnit.symbol} to ${toUnit.symbol}) — Free Calculator`}
        description={`Convert ${fromUnit.plural.toLowerCase()} to ${toUnit.plural.toLowerCase()} instantly. Free ${fromUnit.symbol} to ${toUnit.symbol} calculator with conversion formula, quick answers, and comparison table.`}
        canonicalPath={`/convert/${pair.slug}`}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: `${category.name} Converter`, url: `/${category.slug}` },
          { name: `${fromUnit.name} to ${toUnit.name}`, url: `/convert/${pair.slug}` },
        ]}
        faqs={faqs}
      />

      {/* Breadcrumb List for SEO */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-medium flex-wrap" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link to={`/${category.slug}`} className="hover:text-blue-600 transition-colors">
          {category.name}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-900 font-semibold truncate">
          {fromUnit.name} to {toUnit.name}
        </span>
      </nav>

      {/* Page Header (H1 + Intent Description) */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-2 sm:mb-2.5 text-balance">
          {fromUnit.plural} to {toUnit.plural} Converter
        </h1>
        <p className="text-xs sm:text-base text-gray-600 text-balance">
          Convert {fromUnit.plural.toLowerCase()} ({fromUnit.symbol}) to {toUnit.plural.toLowerCase()} ({toUnit.symbol}) with
          live calculations, exact formula, and reference table.
        </p>
      </section>

      {/* MAIN CONVERTER PRE-CONFIGURED (Immediate focus) */}
      <MainConverter
        initialCategory={category.id}
        initialFrom={fromUnit.id}
        initialTo={toUnit.id}
        initialValue="100"
      />

      {/* Reserved Ad Container 1: Below tool */}
      <div className="max-w-[900px] mx-auto w-full">
        <AdPlaceholder className="h-[90px] w-full" />
      </div>

      {/* Two-Column Layout: Main Content + Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-8 lg:gap-10 items-start">
        <div className="space-y-8 sm:space-y-10 min-w-0">
          {/* Quick Summary Card */}
          <div className="w-full bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-blue-700 font-bold mb-0.5">
                Quick Conversion Fact
              </div>
              <div className="text-base sm:text-lg font-bold text-gray-900">
                1 {fromUnit.name} ={' '}
                <span className="text-blue-700 font-mono">{formattedFactor}</span>{' '}
                {toUnit.plural.toLowerCase()}
              </div>
              <div className="text-xs text-gray-600 mt-0.5">
                Conversely, 1 {toUnit.name} ={' '}
                <span className="font-mono text-gray-800">{formattedReverseFactor}</span>{' '}
                {fromUnit.plural.toLowerCase()}
              </div>
            </div>

            <Link
              to={reverseUrl}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-colors shrink-0"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-blue-600" />
              Swap: {toUnit.symbol} to {fromUnit.symbol}
            </Link>
          </div>

          {/* Formula & How-To Section */}
          <section className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-7 shadow-2xs">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-600" />
              How to Convert {fromUnit.plural} to {toUnit.plural}
            </h2>

            <div className="space-y-3.5 text-xs sm:text-sm text-gray-600 leading-relaxed">
              {category.id === 'temperature' ? (
                <>
                  <p>
                    Temperature conversions rely on explicit linear functions rather than simple multiplication,
                    because the degree scales possess different zero-point offsets:
                  </p>
                  <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs sm:text-sm text-gray-900 font-semibold overflow-x-auto">
                    {fromUnit.id === 'celsius' && toUnit.id === 'fahrenheit' && (
                      <p>°F = (°C × 9/5) + 32</p>
                    )}
                    {fromUnit.id === 'fahrenheit' && toUnit.id === 'celsius' && (
                      <p>°C = (°F - 32) × 5/9</p>
                    )}
                    {fromUnit.id === 'celsius' && toUnit.id === 'kelvin' && (
                      <p>K = °C + 273.15</p>
                    )}
                    {fromUnit.id === 'fahrenheit' && toUnit.id === 'kelvin' && (
                      <p>K = (°F - 32) × 5/9 + 273.15</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <p>
                    To convert any measurement in <strong>{fromUnit.plural.toLowerCase()}</strong> to{' '}
                    <strong>{toUnit.plural.toLowerCase()}</strong>, multiply the quantity by the conversion
                    factor <strong>{formattedFactor}</strong>:
                  </p>
                  <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs sm:text-sm text-gray-900 font-semibold overflow-x-auto">
                    {toUnit.plural.toLowerCase()} = {fromUnit.plural.toLowerCase()} × {formattedFactor}
                  </div>
                </>
              )}

              <div className="pt-1">
                <h3 className="font-semibold text-gray-900 mb-1">Step-by-Step Example</h3>
                <p>
                  To convert <strong>5 {fromUnit.plural.toLowerCase()}</strong> into {toUnit.plural.toLowerCase()}:
                </p>
                <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-lg text-gray-800 font-mono text-xs mt-1">
                  5 × {formattedFactor} ={' '}
                  <strong className="text-blue-700">
                    {formatValue(convert(5, fromUnit.id, toUnit.id), 6)} {toUnit.symbol}
                  </strong>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Conversion Table */}
          <section className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-7 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {fromUnit.name} to {toUnit.name} Conversion Table
              </h2>
              <span className="text-xs text-gray-500 font-medium">Standard Values</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">
              Quickly look up common everyday quantities without manual arithmetic:
            </p>

            <div className="overflow-x-auto border border-gray-200 rounded-xl">
              <table className="w-full text-left text-xs sm:text-sm divide-y divide-gray-200">
                <thead className="bg-gray-50 text-gray-700 font-semibold text-[11px] sm:text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-3.5 sm:px-5 py-3">{fromUnit.name} ({fromUnit.symbol})</th>
                    <th className="px-3.5 sm:px-5 py-3 text-right">{toUnit.name} ({toUnit.symbol})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {benchmarkValues.map((val) => {
                    const converted = convert(val, fromUnit.id, toUnit.id);
                    return (
                      <tr key={val} className="hover:bg-gray-50/70 transition-colors">
                        <td className="px-3.5 sm:px-5 py-2.5 sm:py-3 font-semibold text-gray-900 tabular-nums">
                          {val} {fromUnit.symbol}
                        </td>
                        <td className="px-3.5 sm:px-5 py-2.5 sm:py-3 text-right font-mono font-bold text-blue-600 tabular-nums">
                          {formatValue(converted, 4)} {toUnit.symbol}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Reserved Ad Container 2: Mid-content */}
          <AdPlaceholder className="h-[100px] w-full" />

          {/* Common Frequently Asked Questions (FAQ) */}
          <section className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-7 shadow-2xs">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4 divide-y divide-gray-100 text-xs sm:text-sm">
              <div className="pt-2 first:pt-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                  How many {toUnit.plural.toLowerCase()} are in 1 {fromUnit.name.toLowerCase()}?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  There are exactly <strong>{formattedFactor} {toUnit.plural.toLowerCase()}</strong> in 1{' '}
                  {fromUnit.name.toLowerCase()}.
                </p>
              </div>

              <div className="pt-3">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                  How do I quickly estimate {fromUnit.symbol} to {toUnit.symbol} in my head?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  For quick estimates, round the factor to {oneUnitFactor < 1 ? oneUnitFactor.toFixed(2) : Math.round(oneUnitFactor * 10) / 10}.
                  For instance, if 1 {fromUnit.symbol} ≈ {Math.round(oneUnitFactor * 10) / 10} {toUnit.symbol}, multiply by {Math.round(oneUnitFactor * 10) / 10} to obtain a rapid mental calculation.
                </p>
              </div>

              <div className="pt-3">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                  Is this conversion formula internationally standardized?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes, this conversion adheres strictly to the International System of Units (SI) and
                  standard National Institute of Standards and Technology (NIST) definitions.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sticky Desktop Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-20">
          {/* Related High-Value Pairs in this Category */}
          {relatedConversions.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-2xs">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                Related Converters
              </h3>
              <div className="space-y-2">
                {relatedConversions.map((p) => {
                  const f = getUnitById(p.fromId);
                  const t = getUnitById(p.toId);
                  return (
                    <Link
                      key={p.slug}
                      to={`/convert/${p.slug}`}
                      className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-blue-500 hover:shadow-2xs transition-all group flex items-center justify-between"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-semibold text-gray-900 text-xs sm:text-sm group-hover:text-blue-600 transition-colors truncate">
                          {f?.name} to {t?.name}
                        </div>
                        <div className="text-[11px] text-gray-500 font-mono">
                          {f?.symbol} → {t?.symbol}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Category Hub Link Card */}
          <div className="bg-gray-50/80 border border-gray-200 rounded-2xl p-4 sm:p-5 text-center">
            <h4 className="font-bold text-gray-900 text-sm mb-1">
              Explore All {category.name} Units
            </h4>
            <p className="text-xs text-gray-500 mb-3">
              Full table of all units, factors, and SI references.
            </p>
            <Link
              to={`/${category.slug}`}
              className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors shadow-2xs"
            >
              Open {category.name} Hub
            </Link>
          </div>

          {/* Sidebar Ad Placement */}
          <AdPlaceholder className="h-[250px] w-full" />
        </aside>
      </div>
    </div>
  );
}
