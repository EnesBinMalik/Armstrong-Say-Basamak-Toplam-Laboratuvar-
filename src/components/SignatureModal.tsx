import React, { useState } from 'react';
import { X, Check, Copy, Printer, Award, FileText, UserCheck, ShieldCheck } from 'lucide-react';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignatureModal: React.FC<SignatureModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const homeworkText = `===================================================================
ALGORİTMA VE PROGRAMLAMA DERSİ ÖDEV TESLİM BELGESİ
===================================================================
ÖĞRENCİ BİLGİLERİ:
Adı Soyadı       : Enes Öztürk
Ders             : Algoritma ve Programlama (Java)
Tarih            : ${new Date().toLocaleDateString('tr-TR')}
Durum            : Tamamlandı & Doğrulandı

ÖDEV TANIMI:
"Bir sayının basamak sayılarının toplamını hesaplayan program yazınız."
Örnek : 1643 = 1 + 6 + 4 + 3 = 14

ÇÖZÜM ALGORİTMASI (Java):
1. Kullanıcıdan Scanner ile tam sayı alınır.
2. Sayı 0 olana kadar while (tempNumber != 0) döngüsü çalıştırılır.
3. basValue = tempNumber % 10 ile sayının son basamağı elde edilir.
4. toplam += basValue ile basamak kümülatif toplama dahil edilir.
5. tempNumber /= 10 ile son basamak atılarak bir sonraki basamağa geçilir.
6. Sonuç ekrana basılır: 1643 için 1 + 6 + 4 + 3 = 14.

ARMSTRONG SAYI EK ANALİZİ:
- 407 = 4^3 + 0^3 + 7^3 = 64 + 0 + 343 = 407 (Armstrong Sayıdır)
- 1634 = 1^4 + 6^4 + 3^4 + 4^4 = 1 + 1296 + 81 + 256 = 1634 (Armstrong Sayıdır)
- 1342 = 1^4 + 3^4 + 4^4 + 2^4 = 354 != 1342 (Armstrong Değildir)

İMZA VE TAAHHÜT:
Bu ödev çalışması şahsım tarafından eksiksiz olarak kodlanmış,
test edilmiş ve belgelenmiştir.

İmza: Enes Öztürk
===================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(homeworkText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Official Header */}
        <div className="text-center pb-6 border-b border-slate-200 space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-2xl mb-1">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Ödev Teslim & Doğrulama Belgesi
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            Algoritma & Programlama Dersi Ödev Portalı
          </p>
        </div>

        {/* Student & Assignment Card */}
        <div className="mt-6 space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">Öğrenci / Hazırlayan:</span>
              <strong className="text-sm text-slate-900 font-bold flex items-center gap-1.5 mt-0.5">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                Enes Öztürk
              </strong>
            </div>

            <div>
              <span className="text-slate-500 block">Ödev Konusu:</span>
              <strong className="text-slate-800 font-semibold block mt-0.5">
                Basamak Sayıları Toplamı & Armstrong Analizi
              </strong>
            </div>

            <div>
              <span className="text-slate-500 block">Referans Örnek:</span>
              <strong className="text-slate-800 font-mono block mt-0.5">
                1643 = 1 + 6 + 4 + 3 = 14
              </strong>
            </div>

            <div>
              <span className="text-slate-500 block">Doğrulama Durumu:</span>
              <strong className="text-emerald-700 flex items-center gap-1 font-semibold mt-0.5">
                <ShieldCheck className="w-4 h-4" /> Eksiksiz Tamamlandı
              </strong>
            </div>
          </div>

          {/* Formatted Text Box */}
          <div className="bg-slate-950 text-slate-200 rounded-xl p-4 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-56 overflow-y-auto border border-slate-800">
            <pre className="whitespace-pre-wrap">{homeworkText}</pre>
          </div>

          {/* Signature Verification Stamp */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-950">
                  İmzalı Ödev Onayı
                </div>
                <div className="text-[11px] text-emerald-800">
                  Hazırlayan: <strong>Enes Öztürk</strong>
                </div>
              </div>
            </div>
            <div className="font-serif italic text-base font-bold text-emerald-900 pr-2">
              Enes Öztürk
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Rapor Panoya Kopyalandı' : 'Rapor Metnini Kopyala'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Yazdır / PDF</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
