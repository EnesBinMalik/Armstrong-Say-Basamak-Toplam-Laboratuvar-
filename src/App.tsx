import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomeworkSection } from './components/HomeworkSection';
import { ArmstrongSection } from './components/ArmstrongSection';
import { AlgorithmSimulator } from './components/AlgorithmSimulator';
import { ArmstrongCatalog } from './components/ArmstrongCatalog';
import { CodePlayground } from './components/CodePlayground';
import { SignatureModal } from './components/SignatureModal';
import { Footer } from './components/Footer';
import { ActiveTab } from './types';
import { Calculator, Sparkles, Terminal, Cpu, Database, Award } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('homework');
  const [simulatorNumber, setSimulatorNumber] = useState<number>(1643);
  const [simulatorMode, setSimulatorMode] = useState<'digitSum' | 'armstrong'>('digitSum');
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState<boolean>(false);

  const handleOpenSimulatorWithNumber = (num: number, mode: 'digitSum' | 'armstrong' = 'digitSum') => {
    setSimulatorNumber(num);
    setSimulatorMode(mode);
    setActiveTab('simulator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCatalogNumber = (num: number) => {
    setSimulatorNumber(num);
    setActiveTab('armstrong');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Bar Navigation conforming to the 3-Zone Contract */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSignature={() => setIsSignatureModalOpen(true)}
      />

      {/* Mobile Segmented Tab Controls (Visible only on small viewports) */}
      <div className="md:hidden border-b border-slate-200 bg-white px-4 py-2 overflow-x-auto">
        <div className="flex items-center gap-1 min-w-max">
          <button
            onClick={() => setActiveTab('homework')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'homework' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Ödev: Basamak Toplamı
          </button>
          <button
            onClick={() => setActiveTab('armstrong')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'armstrong' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Armstrong Sayıları
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'simulator' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Simülatör
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'catalog' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Katalog
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'code' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Java Kodları
          </button>
        </div>
      </div>

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'homework' && (
          <HomeworkSection
            onOpenSimulator={(num) => handleOpenSimulatorWithNumber(num, 'digitSum')}
            onOpenSignature={() => setIsSignatureModalOpen(true)}
          />
        )}

        {activeTab === 'armstrong' && (
          <ArmstrongSection
            onOpenSimulator={(num) => handleOpenSimulatorWithNumber(num, 'armstrong')}
          />
        )}

        {activeTab === 'simulator' && (
          <AlgorithmSimulator
            initialNumber={simulatorNumber}
            initialMode={simulatorMode}
          />
        )}

        {activeTab === 'catalog' && (
          <ArmstrongCatalog
            onSelectNumber={handleSelectCatalogNumber}
          />
        )}

        {activeTab === 'code' && (
          <CodePlayground />
        )}
      </main>

      {/* Academic Footer */}
      <Footer
        onOpenSignature={() => setIsSignatureModalOpen(true)}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Signature & Homework Submission Modal */}
      <SignatureModal
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
      />
    </div>
  );
}
