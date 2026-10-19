import React, { useState, useMemo } from 'react';
import { calculateDigitSum } from '../utils/mathUtils';
import { JAVA_HOMEWORK_CODE } from '../data/sourceCodes';
import { Play, Copy, Check, Sparkles, RefreshCw, Terminal, BookOpen, UserCheck, ArrowRight } from 'lucide-react';

interface HomeworkSectionProps {
  onOpenSimulator: (num: number) => void;
  onOpenSignature: () => void;
}

export const HomeworkSection: React.FC<HomeworkSectionProps> = ({ onOpenSimulator, onOpenSignature }) => {
  const [inputValue, setInputValue] = useState<string>('1643');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedReport, setCopiedReport] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[] | null>(null);
  const [isRunningConsole, setIsRunningConsole] = useState(false);

  const numericValue = useMemo(() => {
    const parsed = parseInt(inputValue, 10);
    return isNaN(parsed) ? 0 : parsed;
  }, [inputValue]);

  const calculation = useMemo(() => {
    return calculateDigitSum(numericValue);
  }, [numericValue]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(JAVA_HOMEWORK_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyReport = () => {
    const report = `=====================================================
ALGORİTMA VE PROGRAMLAMA ÖDEV RAPORU
Konu: Bir Sayının Basamak Sayılarının Toplamı
Öğrenci / İmza: Enes Öztürk
Tarih: ${new Date().toLocaleDateString('tr-TR')}
=====================================================

GİRİLEN SAYI: ${calculation.originalNumber}
BASAMAK SAYISI: ${calculation.digitCount}
BASAMAKLAR: ${calculation.digits.join(', ')}

MATEMATİKSEL İFADE:
${calculation.digits.join(' + ')} = ${calculation.sum}

DÖNGÜ VE ALGORİTMA ADIMLARI (while temp != 0):
${calculation.steps.map(s => `[Adım ${s.stepIndex}] ${s.remainingNumberBefore} % 10 = ${s.digit} | Toplam: ${s.runningTotalBefore} + ${s.digit} = ${s.runningTotalAfter} | Kalan: ${s.remainingNumberAfter}`).join('\n')}

SONUÇ:
${calculation.originalNumber} sayısının basamakları toplamı: ${calculation.sum}

Bu çalışma Enes Öztürk tarafından hazırlanmıştır.
=====================================================`;
    navigator.clipboard.writeText(report);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const handleRunVirtualConsole = () => {
    setIsRunningConsole(true);
    setConsoleOutput(['> javac BasamakToplami.java', '> java BasamakToplami', 'Sayı Giriniz: ' + calculation.originalNumber]);
    
    setTimeout(() => {
      setConsoleOutput(prev => [
        ...(prev || []),
        'Hesaplanıyor: her basamak ayrıştırılıyor...',
        ...calculation.steps.map(s => `  Basamak bulundu: ${s.digit} (Ara Toplam: ${s.runningTotalAfter})`),
        '-------------------------------------------------',
        `Girilen Sayı       : ${calculation.originalNumber}`,
        `Basamak Sayısı     : ${calculation.digitCount}`,
        `Basamaklar Toplamı : ${calculation.sum}`,
        'Ödev Başarıyla Tamamlandı. İmza: Enes Öztürk',
        '[İşlem 0 hatayla tamamlandı]'
      ]);
      setIsRunningConsole(false);
    }, 600);
  };

  const setPreset = (val: number) => {
    setInputValue(val.toString());
    setConsoleOutput(null);
  };

  const placeNames = ['Birler', 'Onlar', 'Yüzler', 'Binler', 'On Binler', 'Yüz Binler', 'Milyonlar'];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Homework Header Banner with Enes Öztürk Signature */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-indigo-900/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-indigo-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-300 mb-2">
              <span>Programlama Ödevi</span>
              <span aria-hidden="true">·</span>
              <span>Döngüler & Aritmetik Operatörler</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 inline" /> İmza: Enes Öztürk
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
              Bir Sayının Basamak Sayılarının Toplamı
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Ödev Tanımı: Kullanıcıdan alınan bir sayının tüm basamaklarındaki rakamların toplamını hesaplayan algoritma ve Java uygulaması.
              <span className="block mt-1 font-mono text-indigo-200 text-xs sm:text-sm">
                Örnek: 1643 = 1 + 6 + 4 + 3 = 14
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={handleCopyReport}
              className="px-4 py-2.5 bg-indigo-700/80 hover:bg-indigo-700 active:bg-indigo-800 border border-indigo-500/40 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              {copiedReport ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedReport ? 'Ödev Raporu Kopyalandı' : 'Ödev Raporunu Kopyala'}</span>
            </button>
            <button
              onClick={onOpenSignature}
              className="px-4 py-2.5 bg-white text-indigo-950 hover:bg-slate-100 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>İmza Belgesini Gör</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Calculation Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: Input & Presets */}
          <div className="w-full lg:w-5/12 space-y-6">
            <div>
              <label htmlFor="number-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Hesaplanacak Sayıyı Giriniz
              </label>
              <div className="relative">
                <input
                  id="number-input"
                  type="number"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setConsoleOutput(null);
                  }}
                  placeholder="Örn: 1643"
                  className="w-full px-4 py-3.5 text-2xl font-bold font-mono text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all tabular-nums"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Negatif sayılar için mutlak değer alınır. Herhangi bir büyüklükte tam sayı deneyebilirsiniz.
              </p>
            </div>

            {/* Presets */}
            <div>
              <span className="block text-xs font-medium text-slate-500 mb-2">Hızlı Örnekler:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setPreset(1643)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    inputValue === '1643'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  1643 (Ödev Örneği)
                </button>
                <button
                  onClick={() => setPreset(2451)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    inputValue === '2451'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  2451 (Notlardaki Sayı)
                </button>
                <button
                  onClick={() => setPreset(54748)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    inputValue === '54748'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  54748
                </button>
                <button
                  onClick={() => setPreset(987654)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    inputValue === '987654'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  987654
                </button>
                <button
                  onClick={() => setPreset(Math.floor(Math.random() * 90000) + 1000)}
                  className="px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Rastgele
                </button>
              </div>
            </div>

            {/* Quick action to simulator */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-indigo-600" /> Döngü Simülatörü
                </span>
                <span className="text-[11px] text-slate-500 font-mono">while (temp != 0)</span>
              </div>
              <p className="text-xs text-slate-600">
                Bu sayının bellek üzerindeki adım adım işlenişini satır satır izlemek ister misiniz?
              </p>
              <button
                onClick={() => onOpenSimulator(calculation.originalNumber)}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>{calculation.originalNumber} ile Simülatörü Başlat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Live Mathematical Result Display */}
          <div className="w-full lg:w-7/12 bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Hesaplama Sonucu
              </span>
              <div className="flex flex-wrap items-baseline gap-3">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {calculation.sum}
                </div>
                <div className="text-sm text-slate-600">
                  ({calculation.digitCount} basamaklı sayı)
                </div>
              </div>
            </div>

            {/* Visual Formula Display */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-semibold text-slate-500 block">Basamakların Ayrıştırılması & Toplamı:</span>
              <div className="flex flex-wrap items-center gap-2 font-mono text-base sm:text-lg font-bold text-indigo-950">
                <span className="text-slate-600 bg-slate-100 px-2 py-1 rounded">{calculation.originalNumber}</span>
                <span className="text-slate-400">=</span>
                {calculation.digits.map((digit, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center">
                      <span className="px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg shadow-2xs">
                        {digit}
                      </span>
                      <span className="text-[10px] text-slate-600 font-normal mt-0.5">
                        {placeNames[calculation.digits.length - 1 - idx] || `${calculation.digits.length - idx}.`}
                      </span>
                    </div>
                    {idx < calculation.digits.length - 1 && (
                      <span className="text-slate-400 self-center mb-3">+</span>
                    )}
                  </React.Fragment>
                ))}
                <span className="text-slate-400 self-center mb-3">=</span>
                <span className="px-3 py-1 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-lg self-center mb-3 text-xl">
                  {calculation.sum}
                </span>
              </div>
            </div>

            {/* Explanation box */}
            <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed bg-white/60 p-3.5 rounded-lg border border-slate-200/80">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> Algoritma Mantığı:
              </div>
              <p>
                1. <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-indigo-700">basValue = tempNumber % 10;</code> işlemiyle en sağdaki basamak çekilir.
              </p>
              <p>
                2. <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-indigo-700">toplam += basValue;</code> ile bu değer kümülatif toplama eklenir.
              </p>
              <p>
                3. <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-indigo-700">tempNumber /= 10;</code> ile işlenen basamak atılır ve sayı 0 olana kadar döngü yinelenir.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Loop Execution Table */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Adım Adım Döngü İzleme Tablosu (Trace Table)
              </h2>
              <p className="text-xs text-slate-500">
                Her döngü turunda değişkenlerin bellekteki değer değişimleri:
              </p>
            </div>
            <div className="text-xs font-mono text-slate-500">
              Toplam Adım: {calculation.steps.length}
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4 font-mono">Döngü Turu</th>
                  <th className="py-2.5 px-4 font-mono">tempNumber (Başlangıç)</th>
                  <th className="py-2.5 px-4 font-mono">basValue (% 10)</th>
                  <th className="py-2.5 px-4 font-mono">İşlem (toplam += basValue)</th>
                  <th className="py-2.5 px-4 font-mono">Yeni Toplam</th>
                  <th className="py-2.5 px-4 font-mono">tempNumber (/= 10)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white tabular-nums font-mono">
                {calculation.steps.map((step) => (
                  <tr key={step.stepIndex} className="hover:bg-indigo-50/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-indigo-700">Tur #{step.stepIndex}</td>
                    <td className="py-3 px-4 text-slate-900">{step.remainingNumberBefore}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded font-bold">
                        {step.digit}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {step.runningTotalBefore} + {step.digit}
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-600">
                      = {step.runningTotalAfter}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {step.remainingNumberAfter}
                      {step.remainingNumberAfter === 0 && (
                        <span className="ml-2 text-[10px] font-sans text-rose-600 font-semibold">
                          (Döngü Bitti)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Java Code & Virtual Runner Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
              <Terminal className="w-4 h-4" />
              <span>Resmi Java Çözüm Kodu</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">İmza: Enes Öztürk</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Ödev Java Kaynak Kodu ve Sanal Konsol Testi
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunVirtualConsole}
              disabled={isRunningConsole}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50 shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunningConsole ? 'Çalıştırılıyor...' : 'Kodu Çalıştır (Sanal Konsol)'}</span>
            </button>
            <button
              onClick={handleCopyCode}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
            </button>
          </div>
        </div>

        {/* Code Block with line numbering */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-slate-950 text-slate-100 rounded-xl p-4 sm:p-5 font-mono text-xs overflow-x-auto shadow-inner border border-slate-800 max-h-[420px] overflow-y-auto">
            <pre className="leading-relaxed">
              <code>{JAVA_HOMEWORK_CODE}</code>
            </pre>
          </div>

          {/* Virtual Terminal Console */}
          <div className="lg:col-span-5 bg-slate-900 text-slate-200 rounded-xl p-5 border border-slate-800 font-mono text-xs shadow-inner flex flex-col h-[420px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Java Virtual Terminal
              </span>
              <span className="text-[11px] text-slate-400">JDK 21</span>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-1.5 text-slate-300">
              {consoleOutput ? (
                consoleOutput.map((line, idx) => (
                  <div
                    key={idx}
                    className={`${
                      line.startsWith('>')
                        ? 'text-indigo-400 font-bold'
                        : line.includes('Hazırlayan') || line.includes('İmza')
                        ? 'text-emerald-400 font-semibold'
                        : line.includes('Basamaklar Toplamı')
                        ? 'text-amber-300 font-bold'
                        : 'text-slate-300'
                    }`}
                  >
                    {line}
                  </div>
                ))
              ) : (
                <div className="text-slate-400 italic py-8 text-center space-y-2">
                  <p>Terminal boşta.</p>
                  <p className="text-[11px] text-slate-400">
                    Yukarıdaki "Kodu Çalıştır (Sanal Konsol)" butonuna tıklayarak <span className="text-indigo-300 font-semibold">{calculation.originalNumber}</span> sayısı için Java programının konsol çıktısını simüle edebilirsiniz.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Durum: Hazır</span>
              <span className="text-indigo-300">İmza: Enes Öztürk</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
