import React, { useState, useMemo, useEffect } from 'react';
import { checkArmstrong } from '../utils/mathUtils';
import { CheckCircle2, XCircle, Sparkles, ArrowRight, HelpCircle, Calculator, BookOpen, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ArmstrongSectionProps {
  onOpenSimulator: (num: number) => void;
}

export const ArmstrongSection: React.FC<ArmstrongSectionProps> = ({ onOpenSimulator }) => {
  const [inputValue, setInputValue] = useState<string>('407');

  const numericValue = useMemo(() => {
    const parsed = parseInt(inputValue, 10);
    return isNaN(parsed) ? 0 : parsed;
  }, [inputValue]);

  const result = useMemo(() => {
    return checkArmstrong(numericValue);
  }, [numericValue]);

  // Trigger subtle confetti when an Armstrong number is discovered
  useEffect(() => {
    if (result.isArmstrong && result.originalNumber > 9) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#6366f1', '#10b981', '#f59e0b', '#3b82f6']
        });
      } catch (e) {
        // Ignore in environments without canvas
      }
    }
  }, [result.isArmstrong, result.originalNumber]);

  const presetExamples = [
    { num: 407, label: '407 (Armstrong - 3 Basamak)', isArm: true },
    { num: 1634, label: '1634 (Armstrong - 4 Basamak)', isArm: true },
    { num: 54748, label: '54748 (Armstrong - 5 Basamak)', isArm: true },
    { num: 1342, label: '1342 (Armstrong Değil)', isArm: false },
    { num: 153, label: '153', isArm: true },
    { num: 370, label: '370', isArm: true },
    { num: 371, label: '371', isArm: true },
    { num: 9474, label: '9474', isArm: true },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Definition & Concept Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
              <span>Matematiksel Teori & Algoritma</span>
              <span aria-hidden="true">·</span>
              <span>Sayılar Teorisi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Armstrong Sayı Nedir?
            </h1>
          </div>
          <div className="text-xs text-slate-500 font-mono bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
            N haneli sayı: &sum; (basamak)<sup>N</sup> = Sayı
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600 leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" /> Tanım
            </h2>
            <p>
              <strong className="text-slate-800">N haneli</strong> bir sayının basamaklarının <strong className="text-slate-800">n'inci kuvvetlerinin</strong> (üstlerinin) toplamı, sayının kendisine eşitse bu sayılara <strong>Armstrong sayı</strong> (veya Narsisistik sayı) denir.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-emerald-600" /> Pozitif Örnek (407)
            </h2>
            <p className="font-mono text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200">
              407 (3 basamaklı):<br />
              (4<sup>3</sup>) + (0<sup>3</sup>) + (7<sup>3</sup>)<br />
              = 64 + 0 + 343 = <strong className="text-emerald-700">407 &#10004;</strong>
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-rose-600" /> Negatif Örnek (1342)
            </h2>
            <p className="font-mono text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200">
              1342 (4 basamaklı):<br />
              (1<sup>4</sup>) + (3<sup>4</sup>) + (4<sup>4</sup>) + (2<sup>4</sup>)<br />
              = 1 + 81 + 256 + 16 = <strong className="text-rose-700">354 &ne; 1342 &#10008;</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Inspector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Input & Quick Presets */}
          <div className="w-full lg:w-5/12 space-y-6">
            <div>
              <label htmlFor="armstrong-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Test Etmek İstediğiniz Sayıyı Giriniz
              </label>
              <input
                id="armstrong-input"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Örn: 407 veya 1634"
                className="w-full px-4 py-3.5 text-2xl font-bold font-mono text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all tabular-nums"
              />
              <p className="text-xs text-slate-500 mt-2">
                Sayı basamak sayısı otomatik hesaplanır ve her basamak bu kuvvetle çarpılır.
              </p>
            </div>

            <div>
              <span className="block text-xs font-medium text-slate-500 mb-2">Metindeki Örnek Sayılar:</span>
              <div className="flex flex-wrap gap-2">
                {presetExamples.map((item) => (
                  <button
                    key={item.num}
                    onClick={() => setInputValue(item.num.toString())}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                      inputValue === item.num.toString()
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : item.isArm
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                        : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick action to simulator */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" /> Java Döngü Simülatörü
                </span>
                <span className="text-[11px] text-slate-500 font-mono">for (1..basNumber)</span>
              </div>
              <p className="text-xs text-slate-600">
                Bu sayının Armstrong algoritmasında nasıl işlendiğini satır satır gözlemleyin.
              </p>
              <button
                onClick={() => onOpenSimulator(result.originalNumber)}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>{result.originalNumber} ile Algoritmayı Simüle Et</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Validation Card */}
          <div className="w-full lg:w-7/12 space-y-6">
            {/* Status Result Card */}
            <div
              className={`p-6 rounded-2xl border transition-all ${
                result.isArmstrong
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50/70 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-start gap-3">
                {result.isArmstrong ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-7 h-7 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold">
                    {result.originalNumber}{' '}
                    {result.isArmstrong
                      ? 'sayısı bir Armstrong sayıdır!'
                      : 'sayısı bir Armstrong sayısı DEĞİLDİR.'}
                  </h2>
                  <p className="text-xs sm:text-sm mt-1 opacity-90 leading-relaxed">
                    {result.isArmstrong ? (
                      <>
                        Basamaklarının {result.digitCount}. kuvvetlerinin toplamı{' '}
                        <strong>({result.totalSum})</strong>, sayının kendisine{' '}
                        <strong>({result.originalNumber})</strong> tam olarak eşittir.
                      </>
                    ) : (
                      <>
                        Kuvvetler toplamı <strong>{result.totalSum}</strong> çıktı; ancak sayı{' '}
                        <strong>{result.originalNumber}</strong> idi. Aradaki fark: {result.difference}.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Power Decomposition Blocks */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Kuvvet Açılımı & Basamak Değerleri ({result.digitCount} Basamak)
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Üs: n = {result.digitCount}
                </span>
              </div>

              {/* Power Tiles Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                {result.powerResults.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shadow-2xs space-y-1"
                  >
                    <div className="text-xs text-slate-500">Basamak #{idx + 1}</div>
                    <div className="text-lg font-bold text-indigo-700">
                      {item.digit}
                      <sup className="text-xs text-slate-600 font-semibold">{item.power}</sup>
                    </div>
                    <div className="text-xs font-semibold text-slate-800 tabular-nums">
                      = {item.result}
                    </div>
                  </div>
                ))}
              </div>

              {/* Formula string */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 overflow-x-auto">
                <span className="text-slate-500 font-sans text-xs block mb-1">Hesaplama Formülü:</span>
                <div className="whitespace-nowrap">
                  {result.powerResults.map((p, idx) => (
                    <span key={idx}>
                      ({p.digit}<sup>{p.power}</sup>)
                      {idx < result.powerResults.length - 1 ? ' + ' : ' '}
                    </span>
                  ))}
                  = {result.powerResults.map((p) => p.result).join(' + ')} ={' '}
                  <strong className={result.isArmstrong ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                    {result.totalSum}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
