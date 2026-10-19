import React from 'react';
import { UserCheck } from 'lucide-react';

interface FooterProps {
  onOpenSignature: () => void;
  onTabChange: (tab: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSignature, onTabChange }) => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white py-10 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="font-bold text-slate-800 text-sm mb-1">
            Armstrong Sayı & Basamak Toplamı Laboratuvarı
          </div>
          <p className="text-slate-500 max-w-md">
            Algoritma ve Programlama dersi ödev projesi. Java ile basamak ayrıştırma ve Armstrong sayı kontrolü algoritmaları.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <nav className="flex items-center gap-4 text-xs font-medium text-slate-600">
            <button
              onClick={() => onTabChange('homework')}
              className="hover:text-slate-900 transition-colors"
            >
              Ödev Çözümü
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onTabChange('armstrong')}
              className="hover:text-slate-900 transition-colors"
            >
              Armstrong Sayıları
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onTabChange('code')}
              className="hover:text-slate-900 transition-colors"
            >
              Java Kodları
            </button>
          </nav>

          <button
            onClick={onOpenSignature}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>İmza: Enes Öztürk</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
