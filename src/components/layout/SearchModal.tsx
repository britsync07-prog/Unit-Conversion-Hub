import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { units, Unit } from '../../data/units';
import { categories, Category } from '../../data/categories';
import { conversionPairs, ConversionPair } from '../../data/conversions';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // handled by parent or opened
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Search logic
  // 1. Check if query is in the form "X to Y" or "X in Y"
  const toMatch = trimmed.match(/^(.+?)\s+(?:to|in|into|->)\s+(.+)$/);
  let matchedPairs: { from: Unit; to: Unit; slug?: string }[] = [];

  if (toMatch) {
    const fromTerm = toMatch[1].trim();
    const toTerm = toMatch[2].trim();

    const fromUnits = units.filter(u =>
      u.name.toLowerCase().includes(fromTerm) ||
      u.symbol.toLowerCase() === fromTerm ||
      u.aliases.some(a => a.toLowerCase() === fromTerm)
    );
    const toUnits = units.filter(u =>
      u.name.toLowerCase().includes(toTerm) ||
      u.symbol.toLowerCase() === toTerm ||
      u.aliases.some(a => a.toLowerCase() === toTerm)
    );

    for (const f of fromUnits) {
      for (const t of toUnits) {
        if (f.categoryId === t.categoryId && f.id !== t.id) {
          const directPair = conversionPairs.find(
            p => p.fromId === f.id && p.toId === t.id
          );
          matchedPairs.push({ from: f, to: t, slug: directPair?.slug });
        }
      }
    }
  }

  // Matching units
  const matchedUnits = trimmed
    ? units.filter(
        u =>
          u.name.toLowerCase().includes(trimmed) ||
          u.symbol.toLowerCase().includes(trimmed) ||
          u.aliases.some(a => a.toLowerCase().includes(trimmed))
      ).slice(0, 6)
    : [];

  // Matching categories
  const matchedCategories = trimmed
    ? categories.filter(
        c =>
          c.name.toLowerCase().includes(trimmed) ||
          c.description.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  // Matching conversion pairs
  const filteredPairs = trimmed && !toMatch
    ? conversionPairs.filter(p => {
        const fromU = units.find(u => u.id === p.fromId);
        const toU = units.find(u => u.id === p.toId);
        const slugMatch = p.slug.toLowerCase().includes(trimmed);
        const namesMatch = `${fromU?.name} ${toU?.name} ${fromU?.symbol} ${toU?.symbol}`
          .toLowerCase()
          .includes(trimmed);
        return slugMatch || namesMatch;
      }).slice(0, 5)
    : [];

  const handleSelect = (url: string) => {
    navigate(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-xs">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-gray-200 bg-gray-50/50">
          <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type 'kg to lbs', 'cm', 'fahrenheit', or category..."
            className="w-full bg-transparent text-base text-gray-900 placeholder-gray-400 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-md"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs text-gray-400 bg-white border border-gray-200 rounded">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Body */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-gray-100">
          {/* If pair matched from expression "x to y" */}
          {matchedPairs.length > 0 && (
            <div className="py-2">
              <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Direct Conversion Matches
              </div>
              {matchedPairs.slice(0, 4).map((p, idx) => (
                <button
                  key={idx}
                  onClick={() =>
                    handleSelect(
                      p.slug ? `/convert/${p.slug}` : `/?from=${p.from.id}&to=${p.to.id}&cat=${p.from.categoryId}`
                    )
                  }
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-blue-50 text-left group transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 group-hover:text-blue-600">
                      {p.from.name} ({p.from.symbol})
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                    <span className="font-semibold text-gray-900 group-hover:text-blue-600">
                      {p.to.name} ({p.to.symbol})
                    </span>
                  </div>
                  <CornerDownLeft className="w-4 h-4 text-gray-300 group-hover:text-blue-600" />
                </button>
              ))}
            </div>
          )}

          {/* Preset conversion pairs */}
          {filteredPairs.length > 0 && (
            <div className="py-2">
              <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Popular Converters
              </div>
              {filteredPairs.map(p => {
                const f = units.find(u => u.id === p.fromId);
                const t = units.find(u => u.id === p.toId);
                return (
                  <button
                    key={p.slug}
                    onClick={() => handleSelect(`/convert/${p.slug}`)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-blue-50 text-left group transition-colors"
                  >
                    <div>
                      <span className="font-medium text-gray-900 group-hover:text-blue-600">
                        {f?.name} to {t?.name}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {f?.symbol} → {t?.symbol}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Matched units */}
          {matchedUnits.length > 0 && (
            <div className="py-2">
              <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Units
              </div>
              {matchedUnits.map(u => {
                const cat = categories.find(c => c.id === u.categoryId);
                return (
                  <button
                    key={u.id}
                    onClick={() => handleSelect(`/${cat?.slug || 'length-converter'}?unit=${u.id}`)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 text-left group transition-colors"
                  >
                    <div>
                      <span className="font-medium text-gray-900">{u.name}</span>
                      <span className="text-xs font-mono text-gray-500 ml-1.5">({u.symbol})</span>
                    </div>
                    <span className="text-xs text-gray-400">{cat?.name}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Matched categories */}
          {matchedCategories.length > 0 && (
            <div className="py-2">
              <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Categories
              </div>
              {matchedCategories.map(c => (
                <button
                  key={c.id}
                  onClick={() => handleSelect(`/${c.slug}`)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 text-left group transition-colors"
                >
                  <span className="font-medium text-gray-900">{c.name} Converter</span>
                  <span className="text-xs text-gray-400">{c.description}</span>
                </button>
              ))}
            </div>
          )}

          {/* Default popular list when empty */}
          {!trimmed && (
            <div className="p-3">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Quick Shortcuts
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSelect('/convert/kg-to-lbs')}
                  className="p-2 rounded-lg text-left text-sm font-medium hover:bg-blue-50 hover:text-blue-700 border border-gray-100 transition-colors"
                >
                  KG to LBS
                </button>
                <button
                  onClick={() => handleSelect('/convert/cm-to-inches')}
                  className="p-2 rounded-lg text-left text-sm font-medium hover:bg-blue-50 hover:text-blue-700 border border-gray-100 transition-colors"
                >
                  CM to Inches
                </button>
                <button
                  onClick={() => handleSelect('/convert/celsius-to-fahrenheit')}
                  className="p-2 rounded-lg text-left text-sm font-medium hover:bg-blue-50 hover:text-blue-700 border border-gray-100 transition-colors"
                >
                  Celsius to Fahrenheit
                </button>
                <button
                  onClick={() => handleSelect('/convert/km-to-miles')}
                  className="p-2 rounded-lg text-left text-sm font-medium hover:bg-blue-50 hover:text-blue-700 border border-gray-100 transition-colors"
                >
                  KM to Miles
                </button>
              </div>
            </div>
          )}

          {/* No results */}
          {trimmed &&
            matchedPairs.length === 0 &&
            filteredPairs.length === 0 &&
            matchedUnits.length === 0 &&
            matchedCategories.length === 0 && (
              <div className="py-8 text-center text-sm text-gray-500">
                No matching units or conversions found for "{query}". Try "kg to lbs", "cm", or "temperature".
              </div>
            )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
          <span>Search 100+ units across 14 categories</span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
