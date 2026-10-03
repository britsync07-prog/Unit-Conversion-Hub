import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, ChevronDown, Check, X } from 'lucide-react';
import { Unit } from '../../data/units';

interface UnitSelectorProps {
  units: Unit[];
  selectedUnitId: string;
  onSelect: (id: string) => void;
  label?: string;
  className?: string;
}

export default function UnitSelector({
  units,
  selectedUnitId,
  onSelect,
  label,
  className = '',
}: UnitSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  const selectedUnit = units.find((u) => u.id === selectedUnitId) || units[0];

  const trimmed = search.trim().toLowerCase();

  // Filtered units when search is active
  const filteredUnits = useMemo(() => {
    if (!trimmed) return units;
    return units.filter(
      (u) =>
        u.name.toLowerCase().includes(trimmed) ||
        u.plural.toLowerCase().includes(trimmed) ||
        u.symbol.toLowerCase().includes(trimmed) ||
        u.aliases.some((a) => a.toLowerCase().includes(trimmed))
    );
  }, [units, trimmed]);

  // Split into Popular and All units when not actively searching
  const { popularUnits, allUnits } = useMemo(() => {
    const pop = units.filter((u) => u.popular);
    return {
      popularUnits: pop.length > 0 ? pop : units.slice(0, 4),
      allUnits: units,
    };
  }, [units]);

  // Click outside to close desktop dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Handle mobile body scroll lock and autofocus
  useEffect(() => {
    if (isOpen) {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        document.body.style.overflow = 'hidden';
        const timer = setTimeout(() => mobileSearchInputRef.current?.focus(), 80);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => searchInputRef.current?.focus(), 50);
        return () => clearTimeout(timer);
      }
    } else {
      document.body.style.overflow = '';
      setSearch('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSelectUnit = (unitId: string) => {
    onSelect(unitId);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className={`relative w-full ${className}`} ref={desktopDropdownRef}>
      {label && (
        <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
          {label}
        </span>
      )}

      {/* Main Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3.5 sm:px-4 py-3 bg-white border border-gray-200 rounded-xl text-left hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-base font-semibold shadow-xs active:bg-gray-50 min-h-[52px]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="truncate pr-2 flex items-center gap-1.5 min-w-0">
          {selectedUnit ? (
            <>
              <span className="text-gray-900 truncate font-semibold">{selectedUnit.name}</span>
              <span className="text-gray-500 font-mono text-sm shrink-0">({selectedUnit.symbol})</span>
            </>
          ) : (
            <span className="text-gray-400">Select unit...</span>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-150 ${
            isOpen ? 'rotate-180 text-blue-600' : ''
          }`}
        />
      </button>

      {/* ========================================================================= */}
      {/* 1. MOBILE BOTTOM SHEET (Screen width < 640px)                             */}
      {/* ========================================================================= */}
      {isOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />

          {/* Bottom Sheet Drawer */}
          <div className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] bg-white rounded-t-2xl shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-200">
            {/* Grab handle */}
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-1" />

            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-base">Select Unit</h3>
                <p className="text-xs text-gray-500">Tap to select or search below</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full transition-colors active:bg-gray-200"
                aria-label="Close unit selector"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sticky Search Input */}
            <div className="p-3 border-b border-gray-100 bg-gray-50/80">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  ref={mobileSearchInputRef}
                  type="text"
                  className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-9 py-2.5 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 shadow-xs"
                  placeholder="Search units (e.g. meter, in, kg)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-2.5 w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Unit List */}
            <div className="overflow-y-auto p-2 space-y-1 flex-1 overscroll-contain">
              {trimmed ? (
                filteredUnits.length > 0 ? (
                  filteredUnits.map((u) => {
                    const isSelected = selectedUnitId === u.id;
                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => handleSelectUnit(u.id)}
                        className={`w-full min-h-[48px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors ${
                          isSelected
                            ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                            : 'text-gray-800 hover:bg-gray-100 active:bg-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-base truncate">{u.name}</span>
                          <span className="text-sm font-mono text-gray-500 font-normal shrink-0">
                            ({u.symbol})
                          </span>
                        </div>
                        {isSelected && <Check className="w-5 h-5 text-blue-600 shrink-0 ml-2" />}
                      </button>
                    );
                  })
                ) : (
                  <div className="py-10 text-center text-sm text-gray-500">
                    No unit found matching "{search}"
                  </div>
                )
              ) : (
                <>
                  {/* Popular Units Section */}
                  <div className="pb-2">
                    <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Popular Units
                    </div>
                    <div className="space-y-0.5">
                      {popularUnits.map((u) => {
                        const isSelected = selectedUnitId === u.id;
                        return (
                          <button
                            key={`pop-${u.id}`}
                            type="button"
                            onClick={() => handleSelectUnit(u.id)}
                            className={`w-full min-h-[48px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors ${
                              isSelected
                                ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                                : 'text-gray-800 hover:bg-gray-100 active:bg-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="text-base truncate">{u.name}</span>
                              <span className="text-sm font-mono text-gray-500 font-normal shrink-0">
                                ({u.symbol})
                              </span>
                            </div>
                            {isSelected && <Check className="w-5 h-5 text-blue-600 shrink-0 ml-2" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* All Units Section */}
                  <div className="pt-2 border-t border-gray-100 pb-2">
                    <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      All Units
                    </div>
                    <div className="space-y-0.5">
                      {allUnits.map((u) => {
                        const isSelected = selectedUnitId === u.id;
                        return (
                          <button
                            key={`all-${u.id}`}
                            type="button"
                            onClick={() => handleSelectUnit(u.id)}
                            className={`w-full min-h-[48px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors ${
                              isSelected
                                ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                                : 'text-gray-800 hover:bg-gray-100 active:bg-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="text-base truncate">{u.name}</span>
                              <span className="text-sm font-mono text-gray-500 font-normal shrink-0">
                                ({u.symbol})
                              </span>
                            </div>
                            {isSelected && <Check className="w-5 h-5 text-blue-600 shrink-0 ml-2" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Bottom safe padding for mobile browser bar */}
            <div className="h-6 bg-white" />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DESKTOP POPOVER DROPDOWN (Screen width >= 640px)                       */}
      {/* ========================================================================= */}
      {isOpen && (
        <div className="hidden sm:block absolute z-50 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 min-w-[280px]">
          {/* Search bar inside desktop popover */}
          <div className="p-2.5 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400 ml-1 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              className="w-full bg-transparent border-none text-sm py-1 px-1 text-gray-900 placeholder-gray-400 focus:outline-none"
              placeholder="Search units..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Unit list */}
          <div className="max-h-[320px] overflow-y-auto p-1.5 space-y-0.5" role="listbox">
            {trimmed ? (
              filteredUnits.length > 0 ? (
                filteredUnits.map((u) => {
                  const isSelected = selectedUnitId === u.id;
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handleSelectUnit(u.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                        isSelected
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      <span className="truncate">
                        {u.name} <span className="text-gray-500 font-mono text-xs">({u.symbol})</span>
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0 ml-2" />}
                    </button>
                  );
                })
              ) : (
                <div className="py-6 text-center text-xs text-gray-500 italic">
                  No unit found matching "{search}"
                </div>
              )
            ) : (
              <>
                {/* Popular Section */}
                <div className="py-1">
                  <div className="px-2.5 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Popular
                  </div>
                  {popularUnits.map((u) => {
                    const isSelected = selectedUnitId === u.id;
                    return (
                      <button
                        key={`desk-pop-${u.id}`}
                        type="button"
                        onClick={() => handleSelectUnit(u.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                          isSelected
                            ? 'bg-blue-50 text-blue-700 font-semibold'
                            : 'text-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        <span className="truncate">
                          {u.name} <span className="text-gray-500 font-mono text-xs">({u.symbol})</span>
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>

                {/* All Units Section */}
                <div className="py-1 border-t border-gray-100">
                  <div className="px-2.5 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    All Units
                  </div>
                  {allUnits.map((u) => {
                    const isSelected = selectedUnitId === u.id;
                    return (
                      <button
                        key={`desk-all-${u.id}`}
                        type="button"
                        onClick={() => handleSelectUnit(u.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                          isSelected
                            ? 'bg-blue-50 text-blue-700 font-semibold'
                            : 'text-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        <span className="truncate">
                          {u.name} <span className="text-gray-500 font-mono text-xs">({u.symbol})</span>
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
