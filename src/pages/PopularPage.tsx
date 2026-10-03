import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Zap } from 'lucide-react';
import { conversionPairs } from '../data/conversions';
import { categories } from '../data/categories';
import { getUnitById } from '../lib/conversion-engine';
import AdPlaceholder from '../components/ui/AdPlaceholder';
import SEOHead from '../components/seo/SEOHead';

export default function PopularPage() {
  return (
    <div className="container-custom py-6 sm:py-10 flex flex-col gap-8 sm:gap-12">
      <SEOHead
        title="Popular Unit Conversions — Most Used Conversion Tools | UnitFlow"
        description="Browse the most requested online unit converters across length, weight, temperature, area, volume, and speed for US, UK, Canada, and global systems."
        canonicalPath="/popular"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Popular Conversions', url: '/popular' },
        ]}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-900 font-semibold">Popular Conversions</span>
      </nav>

      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-2 sm:mb-2.5 text-balance">
          Popular Unit Conversions
        </h1>
        <p className="text-xs sm:text-base text-gray-600 text-balance">
          Directory of the most commonly searched conversion calculators across length, weight,
          temperature, area, volume, and speed.
        </p>
      </section>

      <div className="max-w-[900px] mx-auto w-full">
        <AdPlaceholder className="h-[90px] w-full" />
      </div>

      {/* Grouped by Category */}
      <div className="space-y-6 sm:space-y-8 max-w-[900px] mx-auto w-full">
        {categories.map((cat) => {
          const catPairs = conversionPairs.filter((p) => p.categoryId === cat.id);
          if (catPairs.length === 0) return null;

          return (
            <div key={cat.id} className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-7 shadow-2xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-600 shrink-0" />
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">{cat.name} Conversions</h2>
                </div>
                <Link
                  to={`/${cat.slug}`}
                  className="text-xs sm:text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  Open {cat.name}
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
                {catPairs.map((pair) => {
                  const from = getUnitById(pair.fromId);
                  const to = getUnitById(pair.toId);
                  return (
                    <Link
                      key={pair.slug}
                      to={`/convert/${pair.slug}`}
                      className="p-3 sm:p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-blue-500 hover:shadow-2xs transition-all group flex items-center justify-between"
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
