import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';
import { categories } from '../data/categories';
import SEOHead from '../components/seo/SEOHead';

export default function NotFoundPage() {
  return (
    <div className="container-custom py-16 sm:py-24 text-center max-w-xl">
      <SEOHead
        title="404 — Page Not Found | UnitFlow"
        description="The requested conversion page could not be found. Browse our conversion directory or return home."
      />
      <div className="inline-block px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-full mb-4">
        404 — Page Not Found
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
        Conversion Tool Not Found
      </h1>
      <p className="text-gray-600 text-sm sm:text-base mb-8">
        The unit conversion or page you requested could not be located. You can return to our homepage
        or jump into one of our core categories below:
      </p>

      <div className="flex justify-center mb-10">
        <Link to="/" className="btn-primary py-3 px-6 text-sm font-semibold">
          <Home className="w-4 h-4 mr-2" />
          Back to Converter Home
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 text-left shadow-xs">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Popular Categories
        </h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {categories.slice(0, 8).map((c) => (
            <Link
              key={c.id}
              to={`/${c.slug}`}
              className="p-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 flex items-center justify-between transition-colors"
            >
              <span>{c.name}</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
