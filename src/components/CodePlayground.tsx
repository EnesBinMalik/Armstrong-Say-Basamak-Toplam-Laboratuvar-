import React, { useState } from 'react';
import { JAVA_HOMEWORK_CODE, JAVA_ARMSTRONG_CODE, PYTHON_HOMEWORK_CODE, CPP_HOMEWORK_CODE } from '../data/sourceCodes';
import { Copy, Check, Terminal, Code2, BookOpen } from 'lucide-react';

export const CodePlayground: React.FC = () => {
  const [activeLang, setActiveLang] = useState<'java_hw' | 'java_arm' | 'python' | 'cpp'>('java_hw');
  const [copied, setCopied] = useState(false);

  const getActiveCode = () => {
    switch (activeLang) {
      case 'java_hw':
        return {
          code: JAVA_HOMEWORK_CODE,
          filename: 'BasamakToplami.java',
          lang: 'Java (Ödev Çözümü)',
          badge: 'Ödev: Basamak Toplamı'
        };
      case 'java_arm':
        return {
          code: JAVA_ARMSTRONG_CODE,
          filename: 'ArmstrongSayi.java',
          lang: 'Java (Armstrong Sayı)',
          badge: 'Armstrong Sayı Kontrolü'
        };
      case 'python':
        return {
          code: PYTHON_HOMEWORK_CODE,
          filename: 'basamak_toplami.py',
          lang: 'Python 3',
          badge: 'Python Alternatifi'
        };
      case 'cpp':
        return {
          code: CPP_HOMEWORK_CODE,
          filename: 'basamak_toplami.cpp',
          lang: 'C++',
          badge: 'C++ Alternatifi'
        };
    }
  };

  const activeData = getActiveCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(activeData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
              <Code2 className="w-4 h-4" />
              <span>Programlama Kaynak Kodları</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">İmza: Enes Öztürk</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Kaynak Kod Kütüphanesi
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Ders ve ödev için hazırlanmış, tam açıklamalı ve çalışmaya hazır kaynak kodlar.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-sm self-start md:self-auto"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Kopyalandı!' : 'Kodu Kopyala'}</span>
          </button>
        </div>

        {/* Language Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveLang('java_hw')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeLang === 'java_hw'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Ödev: Basamak Toplamı (Java)
          </button>
          <button
            onClick={() => setActiveLang('java_arm')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeLang === 'java_arm'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Armstrong Sayı (Java)
          </button>
          <button
            onClick={() => setActiveLang('python')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeLang === 'python'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Python Çözümü
          </button>
          <button
            onClick={() => setActiveLang('cpp')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeLang === 'cpp'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            C++ Çözümü
          </button>
        </div>

        {/* Code display card */}
        <div className="mt-6 bg-slate-950 text-slate-100 rounded-xl overflow-hidden border border-slate-800 shadow-md">
          <div className="px-5 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="text-slate-300 font-medium flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              {activeData.filename}
            </span>
            <span>Hazırlayan: Enes Öztürk</span>
          </div>

          <div className="p-5 font-mono text-xs overflow-x-auto leading-relaxed max-h-[500px] overflow-y-auto">
            <pre>
              <code>{activeData.code}</code>
            </pre>
          </div>
        </div>

        {/* Algorithm notes */}
        <div className="mt-6 bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-600">
          <div className="font-semibold text-slate-900 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            Önemli Kod Notları:
          </div>
          <p>
            &bull; <strong className="text-slate-800">tempNumber % 10:</strong> Sayının birler basamağını elde etmek için modüler aritmetik kullanılır.
          </p>
          <p>
            &bull; <strong className="text-slate-800">tempNumber /= 10:</strong> Tamsayı bölmesi (integer division) sayesinde ondalık kısım atılarak sayı bir basamak küçültülür.
          </p>
          <p>
            &bull; <strong className="text-slate-800">Math.abs():</strong> Negatif sayılarda basamak toplamı hesabı yapılırken mutlak değer alınması matematiksel tutarlılığı sağlar.
          </p>
        </div>
      </div>
    </div>
  );
};
