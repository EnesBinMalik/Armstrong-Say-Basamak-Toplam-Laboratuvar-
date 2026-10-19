import React from 'react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
  onOpenSignature: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onOpenSignature }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onTabChange('homework')}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-indigo-600 transition-colors text-left"
        >
          Matematik & Kod Lab
        </button>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onTabChange('homework')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeTab === 'homework'
                ? 'text-indigo-600 border-indigo-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            Ödev: Basamak Toplamı
          </button>
          <button
            onClick={() => onTabChange('armstrong')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeTab === 'armstrong'
                ? 'text-indigo-600 border-indigo-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            Armstrong Sayıları
          </button>
          <button
            onClick={() => onTabChange('simulator')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeTab === 'simulator'
                ? 'text-indigo-600 border-indigo-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            Döngü Simülatörü
          </button>
          <button
            onClick={() => onTabChange('catalog')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeTab === 'catalog'
                ? 'text-indigo-600 border-indigo-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            Sayı Kataloğu
          </button>
          <button
            onClick={() => onTabChange('code')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeTab === 'code'
                ? 'text-indigo-600 border-indigo-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            Java Kodları
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSignature}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1.5"
          >
            <span>Ödev İmzası: Enes Öztürk</span>
          </button>
        </div>
      </div>
    </header>
  );
};
