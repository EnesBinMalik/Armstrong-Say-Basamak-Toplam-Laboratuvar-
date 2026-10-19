import React, { useState } from 'react';
import { KNOWN_ARMSTRONG_NUMBERS, findArmstrongInRange } from '../utils/mathUtils';
import { Search, Sparkles, BookOpen, ArrowRight, Check } from 'lucide-react';

interface ArmstrongCatalogProps {
  onSelectNumber: (num: number) => void;
}

export const ArmstrongCatalog: React.FC<ArmstrongCatalogProps> = ({ onSelectNumber }) => {
  const [rangeStart, setRangeStart] = useState<number>(1);
  const [rangeEnd, setRangeEnd] = useState<number>(10000);
  const [customResults, setCustomResults] = useState<number[] | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleScanRange = () => {
    setIsSearching(true);
    setTimeout(() => {
      const found = findArmstrongInRange(rangeStart, rangeEnd);
      setCustomResults(found);
      setIsSearching(false);
    }, 200);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Catalog Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="pb-6 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
            <span>Sayılar Teorisi Kataloğu</span>
            <span aria-hidden="true">·</span>
            <span>Narsisistik Sayılar Arşivi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bilinen Armstrong Sayıları Kataloğu
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Tüm bilinen 1 ila 6 basamaklı Armstrong sayıları. İncelemek istediğiniz sayıya tıklayarak anında detaylı basamak çözümünü görebilirsiniz.
          </p>
        </div>

        {/* Categorized list by digit count */}
        <div className="mt-6 space-y-6">
          {KNOWN_ARMSTRONG_NUMBERS.map((group) => (
            <div key={group.digits} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {group.digits} Basamaklı Armstrong Sayıları
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  (Kuvvet: d<sup>{group.digits}</sup>)
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {group.numbers.map((n) => (
                  <button
                    key={n}
                    onClick={() => onSelectNumber(n)}
                    className="px-3.5 py-2 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-900 hover:text-indigo-700 rounded-xl text-sm font-bold font-mono transition-all shadow-2xs flex items-center gap-2 group"
                  >
                    <span>{n}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Range Scanner Tool */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-indigo-600" />
            Özel Aralıkta Armstrong Sayısı Tarayıcısı
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Belirttiğiniz iki sayı arasındaki tüm Armstrong sayılarını bulan tarayıcı motoru (Maksimum: 100.000).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Başlangıç Değeri:</label>
            <input
              type="number"
              value={rangeStart}
              onChange={(e) => setRangeStart(parseInt(e.target.value, 10) || 0)}
              className="w-full px-3 py-2 font-mono text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Bitiş Değeri:</label>
            <input
              type="number"
              value={rangeEnd}
              onChange={(e) => setRangeEnd(parseInt(e.target.value, 10) || 0)}
              className="w-full px-3 py-2 font-mono text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={handleScanRange}
            disabled={isSearching}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            <Search className="w-4 h-4" />
            <span>{isSearching ? 'Taranıyor...' : 'Aralığı Tara'}</span>
          </button>
        </div>

        {customResults !== null && (
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-semibold text-slate-700">
                Bulunan Sonuçlar: {customResults.length} adet Armstrong sayısı
              </span>
              <span className="text-slate-500 font-mono">
                [{rangeStart} — {rangeEnd}]
              </span>
            </div>

            {customResults.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {customResults.map((num) => (
                  <button
                    key={num}
                    onClick={() => onSelectNumber(num)}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-lg font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <span>{num}</span>
                    <span className="text-[10px] text-emerald-600">İncele &rarr;</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-500 italic p-4 bg-slate-50 rounded-lg text-center">
                Bu aralıkta hiçbir Armstrong sayısı bulunamadı.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mathematical Trivia Card */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          Matematiksel Bilgi: Neden 2 Basamaklı Armstrong Sayı Yoktur?
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          2 basamaklı bir sayı için basamaklar <em>a</em> ve <em>b</em> olsun (sayı = 10<em>a</em> + <em>b</em>). Armstrong şartı: 
          <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 ml-1">a² + b² = 10a + b</code>.
          Basamakların alabileceği en büyük değer 9 olduğundan (9² + 9² = 162), 10 ile 99 arasındaki hiçbir tam sayı bu eşitliği sağlamaz. Bu sebeple 1 basamaklı sayılardan sonraki ilk Armstrong sayı <strong>153</strong>'tür.
        </p>
      </div>
    </div>
  );
};
