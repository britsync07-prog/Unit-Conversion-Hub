import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronRight, ArrowRight, Layers, TableProperties } from 'lucide-react';
import { categories } from '../data/categories';
import { conversionPairs } from '../data/conversions';
import { getUnitsByCategory, formatValue, convert } from '../lib/conversion-engine';
import MainConverter from '../components/converter/MainConverter';
import AdPlaceholder from '../components/ui/AdPlaceholder';
import SEOHead from '../components/seo/SEOHead';

export default function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    return <Navigate to="/404" replace />;
  }

  const categoryUnits = getUnitsByCategory(category.id);
  const relatedPairs = conversionPairs.filter((p) => p.categoryId === category.id);
  const baseUnit = categoryUnits.find((u) => u.id === category.baseUnitId) || categoryUnits[0];

  return (
    <div className="container-custom py-6 sm:py-10 flex flex-col gap-8 sm:gap-12">
      <SEOHead
        title={`${category.name} Converter — Fast & Free Online Calculator | UnitFlow`}
        description={`Convert between all common ${category.name.toLowerCase()} units including metric, imperial, and US customary measurements. Fast, free, and accurate.`}
        canonicalPath={`/${category.slug}`}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: `${category.name} Converter`, url: `/${category.slug}` },
        ]}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-medium" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-900 font-semibold">{category.name} Converter</span>
      </nav>

      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-2 sm:mb-2.5 text-balance">
          {category.name} Converter
        </h1>
        <p className="text-xs sm:text-base text-gray-600 text-balance">
          {category.description}
        </p>
      </section>

      {/* Main Converter Pre-Configured (Immediate focus) */}
      <MainConverter initialCategory={category.id} />

      {/* Reserved Ad Container below tool */}
      <div className="max-w-[900px] mx-auto w-full">
        <AdPlaceholder className="h-[90px] w-full" />
      </div>

      {/* Layout with Main Explanatory Column + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-8 lg:gap-10 items-start">
        <div className="space-y-8 sm:space-y-10 min-w-0">
          {/* Related High-Intent Pairs in this Category */}
          {relatedPairs.length > 0 && (
            <section className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-7 shadow-2xs">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Popular {category.name} Conversions
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedPairs.map((pair) => {
                  const from = categoryUnits.find((u) => u.id === pair.fromId);
                  const to = categoryUnits.find((u) => u.id === pair.toId);
                  return (
                    <Link
                      key={pair.slug}
                      to={`/convert/${pair.slug}`}
                      className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-blue-500 hover:shadow-2xs transition-all group flex items-center justify-between"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-semibold text-gray-900 text-xs sm:text-sm group-hover:text-blue-600 transition-colors truncate">
                          {from?.name} to {to?.name}
                        </div>
                        <div className="text-[11px] text-gray-500 font-mono">
                          {from?.symbol} → {to?.symbol}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Supported Units Table */}
          <section className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-7 shadow-2xs">
            <div className="flex items-center gap-2 mb-4">
              <TableProperties className="w-4 h-4 text-blue-600 shrink-0" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Supported {category.name} Units &amp; Relative Values
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
              Comparison of standard units in this category relative to the standard base unit:{' '}
              <strong className="text-gray-900 font-semibold">{baseUnit?.name} ({baseUnit?.symbol})</strong>.
            </p>

            <div className="overflow-x-auto border border-gray-200 rounded-xl">
              <table className="w-full text-left text-xs sm:text-sm divide-y divide-gray-200">
                <thead className="bg-gray-50 text-gray-700 font-semibold text-[11px] sm:text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-3.5 sm:px-4 py-2.5">Unit</th>
                    <th className="px-3.5 sm:px-4 py-2.5">Symbol</th>
                    <th className="px-3.5 sm:px-4 py-2.5">System</th>
                    <th className="px-3.5 sm:px-4 py-2.5 text-right">Value in {baseUnit?.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {categoryUnits.map((u) => {
                    const relativeVal =
                      category.id === 'temperature'
                        ? u.id === 'celsius'
                          ? 'Base (0 °C)'
                          : u.id === 'fahrenheit'
                          ? '32 °F = 0 °C'
                          : '273.15 K = 0 °C'
                        : `1 ${u.symbol} = ${formatValue(convert(1, u.id, baseUnit.id), 6)} ${baseUnit.symbol}`;

                    return (
                      <tr key={u.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="px-3.5 sm:px-4 py-2.5 font-semibold text-gray-900">{u.name}</td>
                        <td className="px-3.5 sm:px-4 py-2.5 font-mono text-gray-600 font-medium">{u.symbol}</td>
                        <td className="px-3.5 sm:px-4 py-2.5 text-xs text-gray-500 capitalize">{u.system || 'Standard'}</td>
                        <td className="px-3.5 sm:px-4 py-2.5 text-right font-mono text-gray-800 tabular-nums">
                          {relativeVal}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Category Guide & Explanation */}
          <section className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-7 shadow-2xs">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
              Understanding {category.name} Measurements
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
              When converting between different units of {category.name.toLowerCase()}, choosing the correct
              standard ensures precision in engineering, construction, cooking, science, and trade.
              Different countries rely on differing primary systems—most notably the metric system in Canada,
              the UK, and Australia, compared with the US Customary system in the United States.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              UnitFlow applies NIST and International System of Units (SI) verified conversion factors
              to guarantee zero round-off deviation across all operations.
            </p>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-20">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-2xs">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
              All Conversion Categories
            </h3>
            <div className="space-y-1">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  to={`/${c.slug}`}
                  className={`block px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                    c.id === category.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          <AdPlaceholder className="h-[250px] w-full" />
        </aside>
      </div>
    </div>
  );
}
