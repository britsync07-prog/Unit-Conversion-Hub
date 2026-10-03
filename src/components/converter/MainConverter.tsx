import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ArrowRightLeft, ArrowUpDown, Copy, Check, RotateCcw, Star } from 'lucide-react';
import { categories } from '../../data/categories';
import { convert, formatValue, getUnitsByCategory, getUnitById } from '../../lib/conversion-engine';
import {
  addRecentConversion,
  getRecentConversions,
  getFavoriteConversions,
  toggleFavoriteConversion,
  isFavoriteConversion,
  SavedConversion,
} from '../../lib/storage';
import UnitSelector from '../ui/UnitSelector';

interface MainConverterProps {
  initialCategory?: string;
  initialFrom?: string;
  initialTo?: string;
  initialValue?: string;
  onConversionChange?: (fromId: string, toId: string, catId: string) => void;
}

export default function MainConverter({
  initialCategory = 'length',
  initialFrom,
  initialTo,
  initialValue = '100',
  onConversionChange,
}: MainConverterProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [fromValue, setFromValue] = useState<string>(initialValue);
  const [fromUnitId, setFromUnitId] = useState<string>('');
  const [toUnitId, setToUnitId] = useState<string>('');
  const [precision, setPrecision] = useState<number | 'auto'>('auto');
  const [copied, setCopied] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [recentConversions, setRecentConversions] = useState<SavedConversion[]>([]);
  const [favoriteConversions, setFavoriteConversions] = useState<SavedConversion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Active category
  const category = useMemo(
    () => categories.find((c) => c.id === activeCategory) || categories[0],
    [activeCategory]
  );
  const categoryUnits = useMemo(() => getUnitsByCategory(category.id), [category.id]);

  // Set initial units when activeCategory changes
  useEffect(() => {
    if (initialFrom && initialTo && initialCategory === activeCategory) {
      setFromUnitId(initialFrom);
      setToUnitId(initialTo);
    } else {
      const u = getUnitsByCategory(activeCategory);
      setFromUnitId(u[0]?.id || '');
      setToUnitId(u[1]?.id || u[0]?.id || '');
    }
  }, [activeCategory, initialCategory, initialFrom, initialTo]);

  // Sync favorites & recents on mount and unit change
  useEffect(() => {
    if (fromUnitId && toUnitId) {
      setIsFav(isFavoriteConversion(fromUnitId, toUnitId));
      addRecentConversion({ fromId: fromUnitId, toId: toUnitId, categoryId: activeCategory });
      setRecentConversions(getRecentConversions());
      setFavoriteConversions(getFavoriteConversions());
      if (onConversionChange) {
        onConversionChange(fromUnitId, toUnitId, activeCategory);
      }
    }
  }, [fromUnitId, toUnitId, activeCategory, onConversionChange]);

  // Numerical validation
  const parsedValue = useMemo(() => {
    const cleanStr = fromValue.trim().replace(/,/g, '');
    if (cleanStr === '') return 0;
    const num = Number(cleanStr);
    return isNaN(num) ? NaN : num;
  }, [fromValue]);

  const isInvalid = isNaN(parsedValue);

  // Converted result
  const rawResult = useMemo(() => {
    if (isInvalid || !fromUnitId || !toUnitId) return 0;
    return convert(parsedValue, fromUnitId, toUnitId);
  }, [parsedValue, fromUnitId, toUnitId, isInvalid]);

  const formattedResult = useMemo(() => {
    if (isInvalid) return '—';
    return formatValue(rawResult, precision);
  }, [rawResult, precision, isInvalid]);

  const fromUnit = getUnitById(fromUnitId);
  const toUnit = getUnitById(toUnitId);

  // Unit rate calculations (1 From = ? To, and 1 To = ? From)
  const unitRate = useMemo(() => {
    if (!fromUnitId || !toUnitId) return '';
    const rate = convert(1, fromUnitId, toUnitId);
    return formatValue(rate, 6);
  }, [fromUnitId, toUnitId]);

  const reverseUnitRate = useMemo(() => {
    if (!fromUnitId || !toUnitId) return '';
    const rate = convert(1, toUnitId, fromUnitId);
    return formatValue(rate, 6);
  }, [fromUnitId, toUnitId]);

  const handleSwap = () => {
    const temp = fromUnitId;
    setFromUnitId(toUnitId);
    setToUnitId(temp);
  };

  const handleCopy = () => {
    if (isInvalid || !fromUnit || !toUnit) return;
    const textToCopy = `${fromValue} ${fromUnit.symbol} = ${formattedResult} ${toUnit.symbol}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setFromValue('100');
    const u = getUnitsByCategory(activeCategory);
    setFromUnitId(u[0]?.id || '');
    setToUnitId(u[1]?.id || u[0]?.id || '');
    inputRef.current?.focus();
  };

  const handleToggleFavorite = () => {
    if (!fromUnitId || !toUnitId) return;
    const updated = toggleFavoriteConversion({
      fromId: fromUnitId,
      toId: toUnitId,
      categoryId: activeCategory,
    });
    setIsFav(updated);
    setFavoriteConversions(getFavoriteConversions());
  };

  const handleSelectSaved = (saved: SavedConversion) => {
    setActiveCategory(saved.categoryId);
    setFromUnitId(saved.fromId);
    setToUnitId(saved.toId);
  };

  return (
    <div className="w-full max-w-[900px] mx-auto">
      {/* 1. Category Switcher Tabs */}
      <div className="relative mb-3">
        <div
          className="flex overflow-x-auto pb-2 gap-1.5 no-scrollbar scroll-smooth items-center"
          style={{ WebkitOverflowScrolling: 'touch' }}
          role="tablist"
          aria-label="Conversion categories"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all select-none shrink-0 min-h-[40px] flex items-center ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Converter Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xs p-4 sm:p-6 lg:p-7">
        {/* Converter Card Header */}
        <div className="flex items-center justify-between pb-3.5 mb-4 sm:mb-6 border-b border-gray-100">
          <div>
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-gray-900">
              {category.name} Converter
            </h2>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleToggleFavorite}
              className={`p-2 rounded-lg border transition-all text-xs font-semibold flex items-center gap-1 min-h-[36px] ${
                isFav
                  ? 'bg-amber-50 border-amber-200 text-amber-700'
                  : 'border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
              title={isFav ? 'Remove from favorites' : 'Save as favorite'}
              aria-label="Toggle favorite conversion"
            >
              <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400 text-amber-500' : ''}`} />
              <span className="hidden sm:inline">{isFav ? 'Favorited' : 'Favorite'}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
              title="Reset to 100"
              aria-label="Reset fields"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP LAYOUT (Screen width >= 768px): Horizontal Side-by-Side           */}
        {/* ========================================================================= */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {/* FROM PANEL */}
          <div className="flex-1 space-y-3">
            <label
              htmlFor="desktop-amount-input"
              className="block text-xs font-bold uppercase tracking-wider text-gray-500"
            >
              From
            </label>

            {/* Large Amount Input */}
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                id="desktop-amount-input"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                placeholder="Enter value"
                className={`w-full bg-white border border-gray-200 rounded-xl pl-4 py-3 pr-16 text-2xl font-bold font-mono text-gray-900 tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all h-[60px] shadow-2xs ${
                  isInvalid ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : ''
                }`}
              />
              {fromValue && (
                <button
                  type="button"
                  onClick={() => {
                    setFromValue('');
                    inputRef.current?.focus();
                  }}
                  className="absolute right-3 px-2 py-1 text-xs font-semibold text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  aria-label="Clear value"
                >
                  Clear
                </button>
              )}
            </div>

            {/* From Unit Selector */}
            <UnitSelector
              units={categoryUnits}
              selectedUnitId={fromUnitId}
              onSelect={setFromUnitId}
            />
          </div>

          {/* SWAP BUTTON (Centered between From and To) */}
          <div className="flex flex-col items-center justify-center pt-6">
            <button
              type="button"
              onClick={handleSwap}
              className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all flex items-center justify-center shadow-2xs active:scale-95"
              aria-label="Swap from and to units"
              title="Swap units"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>
          </div>

          {/* TO PANEL */}
          <div className="flex-1 space-y-3">
            <label
              htmlFor="desktop-result-display"
              className="block text-xs font-bold uppercase tracking-wider text-gray-500"
            >
              To
            </label>

            {/* Converted Result Box (Same height as input) */}
            <div
              id="desktop-result-display"
              className="w-full bg-blue-50/40 border border-blue-200 rounded-xl px-4 py-3 text-2xl font-bold font-mono text-blue-700 tabular-nums flex items-center h-[60px] overflow-x-auto no-scrollbar shadow-2xs select-all whitespace-nowrap"
              aria-live="polite"
            >
              <span>{formattedResult}</span>
            </div>

            {/* To Unit Selector */}
            <UnitSelector
              units={categoryUnits}
              selectedUnitId={toUnitId}
              onSelect={setToUnitId}
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE LAYOUT (Screen width < 768px): Vertical Stacked                    */}
        {/* ========================================================================= */}
        <div className="md:hidden flex flex-col gap-3.5">
          {/* FROM SECTION */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="mobile-amount-input"
                className="block text-xs font-bold uppercase tracking-wider text-gray-500"
              >
                From
              </label>
              {isInvalid && (
                <span className="text-xs text-red-600 font-medium">Enter a valid number</span>
              )}
            </div>

            {/* Amount Input: 56px height, font-size >= 16px to prevent iOS zoom */}
            <div className="relative flex items-center">
              <input
                id="mobile-amount-input"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                placeholder="Enter value"
                className={`w-full bg-white border border-gray-200 rounded-xl pl-4 py-3 pr-16 text-xl font-bold font-mono text-gray-900 tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all min-h-[56px] shadow-2xs ${
                  isInvalid ? 'border-red-400 focus:border-red-500' : ''
                }`}
              />
              {fromValue && (
                <button
                  type="button"
                  onClick={() => setFromValue('')}
                  className="absolute right-3 px-2 py-1 text-xs font-semibold text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  aria-label="Clear value"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Unit Selector */}
            <UnitSelector
              units={categoryUnits}
              selectedUnitId={fromUnitId}
              onSelect={setFromUnitId}
            />
          </div>

          {/* SWAP BUTTON (Stacked between From and To with comfortable touch size) */}
          <div className="flex justify-center my-0.5">
            <button
              type="button"
              onClick={handleSwap}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 font-bold text-sm min-h-[48px] active:scale-95 shadow-2xs"
              aria-label="Swap units"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span>Swap Units</span>
            </button>
          </div>

          {/* TO SECTION */}
          <div className="space-y-2">
            <label
              htmlFor="mobile-result-display"
              className="block text-xs font-bold uppercase tracking-wider text-gray-500"
            >
              To
            </label>

            {/* Result Box */}
            <div
              id="mobile-result-display"
              className="w-full bg-blue-50/40 border border-blue-200 rounded-xl px-4 py-3 text-xl font-bold font-mono text-blue-700 tabular-nums flex items-center min-h-[56px] overflow-x-auto no-scrollbar shadow-2xs select-all whitespace-nowrap"
              aria-live="polite"
            >
              <span>{formattedResult}</span>
            </div>

            {/* Unit Selector */}
            <UnitSelector
              units={categoryUnits}
              selectedUnitId={toUnitId}
              onSelect={setToUnitId}
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. DEDICATED RESULT CARD (Section 18: Prominent, clear output)             */}
        {/* ========================================================================= */}
        <div className="mt-6 pt-5 border-t border-gray-100 bg-gray-50/60 rounded-xl p-4 sm:p-5 border border-gray-200/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Conversion Result
            </span>
            {fromUnit && toUnit && (
              <span className="text-xs text-gray-500 font-mono">
                1 {fromUnit.symbol} = {unitRate} {toUnit.symbol}
              </span>
            )}
          </div>

          {/* Obvious Result Presentation */}
          <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight break-all mb-4">
            <span>{fromValue || '0'}</span>{' '}
            <span className="text-gray-500 font-medium text-base sm:text-xl">
              {fromUnit?.plural.toLowerCase() || 'units'}
            </span>
            <span className="mx-2 text-gray-400 font-normal">=</span>
            <span className="text-blue-600 font-mono">{formattedResult}</span>{' '}
            <span className="text-blue-700 font-medium text-base sm:text-xl font-sans">
              {toUnit?.plural.toLowerCase() || 'units'}
            </span>
          </div>

          {/* Action Row: Copy Button + Precision Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-200/60">
            {/* Copy Result Button */}
            <button
              type="button"
              onClick={handleCopy}
              disabled={isInvalid}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold shadow-2xs transition-all active:scale-95 flex items-center justify-center gap-2 min-h-[46px] ${
                copied
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 shrink-0" />
                  Copied Result
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 shrink-0" />
                  Copy Result
                </>
              )}
            </button>

            {/* Decimals Selector */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="font-semibold text-gray-400 uppercase tracking-wider">Decimals:</span>
              <div className="flex bg-white p-0.5 rounded-lg border border-gray-200 shadow-2xs">
                {(['auto', 2, 4, 6] as const).map((p) => {
                  const isSelected = precision === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPrecision(p as any)}
                      className={`px-2.5 py-1 rounded-md font-semibold transition-all min-h-[28px] ${
                        isSelected
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {p === 'auto' ? 'Auto' : `${p}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Favorites & Recent Shortcuts */}
      {(favoriteConversions.length > 0 || recentConversions.length > 0) && (
        <div className="mt-3 px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          {favoriteConversions.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="flex items-center gap-1 text-gray-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 shrink-0" /> Favorites:
              </span>
              {favoriteConversions.slice(0, 4).map((f, i) => {
                const uFrom = getUnitById(f.fromId);
                const uTo = getUnitById(f.toId);
                return (
                  <button
                    key={`fav-${i}`}
                    onClick={() => handleSelectSaved(f)}
                    className="px-2.5 py-1 bg-white border border-gray-200 rounded-md hover:border-blue-400 hover:text-blue-600 text-gray-800 font-semibold transition-colors shadow-2xs"
                  >
                    {uFrom?.symbol} → {uTo?.symbol}
                  </button>
                );
              })}
            </div>
          )}

          {recentConversions.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap sm:ml-auto">
              <span className="text-gray-400 font-medium">Recent:</span>
              {recentConversions.slice(0, 3).map((r, i) => {
                const uFrom = getUnitById(r.fromId);
                const uTo = getUnitById(r.toId);
                return (
                  <button
                    key={`rec-${i}`}
                    onClick={() => handleSelectSaved(r)}
                    className="px-2 py-0.5 bg-gray-100 rounded text-gray-600 hover:bg-gray-200 transition-colors font-mono"
                  >
                    {uFrom?.symbol}→{uTo?.symbol}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
