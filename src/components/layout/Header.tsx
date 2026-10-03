import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import SearchModal from './SearchModal';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Length', path: '/length-converter' },
    { name: 'Weight', path: '/weight-converter' },
    { name: 'Temperature', path: '/temperature-converter' },
    { name: 'Volume', path: '/volume-converter' },
    { name: 'Area', path: '/area-converter' },
    { name: 'Speed', path: '/speed-converter' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="container-custom flex h-14 sm:h-16 items-center justify-between">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1.5"
          >
            UnitFlow
          </Link>

          {/* Zone 2: Navigation Links (Clean text with subtle underline/color on hover) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-600">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`transition-colors whitespace-nowrap hover:text-gray-900 ${
                    isActive ? 'text-blue-600 font-semibold' : ''
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Search + Mobile Menu) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-lg border border-gray-200 bg-gray-50/80 text-gray-500 hover:text-gray-900 hover:border-gray-300 hover:bg-white text-xs sm:text-sm transition-all min-h-[40px] min-w-[40px] justify-center"
              aria-label="Search units and conversions"
            >
              <Search className="w-4 h-4 text-gray-400" />
              <span className="hidden sm:inline">Search units...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono text-gray-400 bg-white border border-gray-200 rounded">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-gray-100">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="pt-2 flex flex-col gap-1 text-sm text-gray-600">
              <Link
                to="/popular"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-1.5 rounded-lg hover:bg-gray-50 hover:text-gray-900"
              >
                Popular Conversions
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-1.5 rounded-lg hover:bg-gray-50 hover:text-gray-900"
              >
                About UnitFlow
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-1.5 rounded-lg hover:bg-gray-50 hover:text-gray-900"
              >
                Contact & Support
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Dialog */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
