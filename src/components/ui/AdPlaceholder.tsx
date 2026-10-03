import React from 'react';

export default function AdPlaceholder({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-gray-50/70 border border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-3 overflow-hidden text-center select-none ${className}`}
      aria-hidden="true"
    >
      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">
        Advertisement
      </span>
      <span className="text-xs text-gray-400/80 italic font-mono">
        Reserved ad placement · Fixed layout container
      </span>
    </div>
  );
}
