import React, { useState, useEffect, useMemo, useRef } from 'react';
import { generateDigitSumSimulation, generateArmstrongSimulation } from '../utils/mathUtils';
import { Play, Pause, SkipForward, RotateCcw, Cpu, Terminal, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface AlgorithmSimulatorProps {
  initialNumber?: number;
  initialMode?: 'digitSum' | 'armstrong';
}

export const AlgorithmSimulator: React.FC<AlgorithmSimulatorProps> = ({
  initialNumber = 1643,
  initialMode = 'digitSum'
}) => {
  const [selectedMode, setSelectedMode] = useState<'digitSum' | 'armstrong'>(initialMode);
  const [simNumber, setSimNumber] = useState<number>(initialNumber);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1200);

  // Generate simulation steps based on current number & algorithm mode
  const steps = useMemo(() => {
    if (selectedMode === 'digitSum') {
      return generateDigitSumSimulation(simNumber);
    } else {
      return generateArmstrongSimulation(simNumber);
    }
  }, [simNumber, selectedMode]);

  // Keep step index within bounds if steps change
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [simNumber, selectedMode]);

  // Handle auto-playing
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speedMs);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, steps.length, speedMs]);

  const currentStep = steps[currentStepIndex] || steps[0];

  const handleStepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const presets = selectedMode === 'digitSum' 
    ? [1643, 2451, 987, 407, 54748] 
    : [407, 1634, 1342, 54748, 153];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Simulator Control Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
              <Cpu className="w-4 h-4" />
              <span>İnteraktif Döngü & Bellek İzleyici</span>
              <span aria-hidden="true">·</span>
              <span>Java JVM Yürütme Simülasyonu</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Algoritma Simülatörü
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Java döngüsünü adım adım yürütün; bellek değişkenlerinin her adımdaki değerini canlı inceleyin.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setSelectedMode('digitSum')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedMode === 'digitSum'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ödev: Basamak Toplamı
            </button>
            <button
              onClick={() => setSelectedMode('armstrong')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedMode === 'armstrong'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Armstrong Kontrolü
            </button>
          </div>
        </div>

        {/* Number Selector & Presets */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700 uppercase">Test Sayısı:</span>
            <input
              type="number"
              value={simNumber}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                if (!isNaN(v)) setSimNumber(v);
              }}
              className="w-28 px-3 py-1.5 font-mono text-sm font-bold bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Hazır Sayılar:</span>
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setSimNumber(p)}
                className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-colors ${
                  simNumber === p
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Simulator Playback Deck & Dual View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Code execution view & step progress (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Controls Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Durdur' : 'Otomatik Oynat'}</span>
              </button>
              <button
                onClick={handleStepForward}
                disabled={currentStepIndex >= steps.length - 1}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-40"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>Sonraki Adım</span>
              </button>
              <button
                onClick={handleReset}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                title="Başa Dön"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">Hız:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md text-xs font-mono">
                <button
                  onClick={() => setSpeedMs(1800)}
                  className={`px-2 py-0.5 rounded ${speedMs === 1800 ? 'bg-white font-bold text-slate-900 shadow-2xs' : 'text-slate-600'}`}
                >
                  0.5x
                </button>
                <button
                  onClick={() => setSpeedMs(1200)}
                  className={`px-2 py-0.5 rounded ${speedMs === 1200 ? 'bg-white font-bold text-slate-900 shadow-2xs' : 'text-slate-600'}`}
                >
                  1.0x
                </button>
                <button
                  onClick={() => setSpeedMs(600)}
                  className={`px-2 py-0.5 rounded ${speedMs === 600 ? 'bg-white font-bold text-slate-900 shadow-2xs' : 'text-slate-600'}`}
                >
                  2.0x
                </button>
              </div>
            </div>
          </div>

          {/* Current Step Explanation Card */}
          <div className="bg-white rounded-xl border border-indigo-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Adım {currentStepIndex + 1} / {steps.length}: {currentStep.label}
              </span>
              <span className="text-xs font-mono text-slate-500">
                İlerleme: %{Math.round(((currentStepIndex + 1) / steps.length) * 100)}
              </span>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full transition-all duration-300"
                style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              />
            </div>

            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              {currentStep.explanation}
            </p>
          </div>

          {/* Code Viewer with active line execution */}
          <div className="bg-slate-950 text-slate-100 rounded-xl p-5 border border-slate-800 font-mono text-xs shadow-inner">
            <div className="text-slate-400 text-[11px] pb-2 mb-3 border-b border-slate-800 flex items-center justify-between">
              <span>Şu An Yürütülen Java Kod Bloğu:</span>
              <span className="text-emerald-400">Canlı Satır</span>
            </div>
            <pre className="text-emerald-400 bg-slate-900/90 p-3 rounded-lg border border-emerald-500/30 overflow-x-auto leading-relaxed">
              <code>{currentStep.codeSnippet}</code>
            </pre>
          </div>
        </div>

        {/* Right: Virtual Memory Registers (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-indigo-600" />
              Sanal Bellek Tablosu (JVM Stack)
            </span>
            <span className="text-[11px] font-mono text-slate-400">Runtime Heap</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {/* number */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-slate-500 block text-[11px]">int number (Sabit)</span>
                <span className="font-bold text-slate-900">Girdi Sayısı</span>
              </div>
              <span className="text-base font-extrabold text-slate-900 bg-white px-2.5 py-1 rounded border border-slate-200 tabular-nums">
                {currentStep.variables.number}
              </span>
            </div>

            {/* tempNumber */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-slate-500 block text-[11px]">int tempNumber</span>
                <span className="font-bold text-slate-900">İşlenen Kalan Değer</span>
              </div>
              <span className="text-base font-extrabold text-indigo-700 bg-white px-2.5 py-1 rounded border border-slate-200 tabular-nums">
                {currentStep.variables.tempNumber}
              </span>
            </div>

            {/* basValue */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-slate-500 block text-[11px]">int basValue</span>
                <span className="font-bold text-slate-900">Çekilen Son Basamak (% 10)</span>
              </div>
              <span className="text-base font-extrabold text-amber-700 bg-white px-2.5 py-1 rounded border border-slate-200 tabular-nums">
                {currentStep.variables.basValue !== null ? currentStep.variables.basValue : '-'}
              </span>
            </div>

            {/* basPow (for Armstrong) */}
            {selectedMode === 'armstrong' && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 block text-[11px]">int basPow</span>
                  <span className="font-bold text-slate-900">Basamak Kuvveti (basValue^n)</span>
                </div>
                <span className="text-base font-extrabold text-purple-700 bg-white px-2.5 py-1 rounded border border-slate-200 tabular-nums">
                  {currentStep.variables.basPow !== undefined && currentStep.variables.basPow !== null
                    ? currentStep.variables.basPow
                    : '-'}
                </span>
              </div>
            )}

            {/* result / toplam */}
            <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-200 flex items-center justify-between">
              <div>
                <span className="text-indigo-600 block text-[11px] font-bold">
                  {selectedMode === 'digitSum' ? 'int toplam' : 'int result'}
                </span>
                <span className="font-bold text-indigo-950">Biriken Sonuç</span>
              </div>
              <span className="text-xl font-extrabold text-indigo-800 bg-white px-3 py-1 rounded border border-indigo-200 tabular-nums">
                {currentStep.variables.result}
              </span>
            </div>
          </div>

          {/* Academic Signature footnote */}
          <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100">
            <span>Döngü Mantığı Simülasyonu</span>
            <span className="text-indigo-600 font-semibold">Hazırlayan: Enes Öztürk</span>
          </div>
        </div>
      </div>
    </div>
  );
};
