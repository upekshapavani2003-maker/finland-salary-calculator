"use client";
import { useState } from 'react';
import TopNav from '@/components/TopNav';
import SalaryCalculator from '@/components/SalaryCalculator';
import InfoCards from '@/components/InfoCards';
import HowItWorks from '../components/HowItWorks';
import HowTaxesWork from '@/components/HowTaxesWork';  // ADD IMPORT
import SalaryByCity from '@/components/SalaryByCity';
import GuidesContent from '@/components/GuidesContent';
import AboutContent from '@/components/AboutContent';

export default function Home() {
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <div className="bg-[#F8FAFC] min-h-screen flex flex-col">
      <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow">
        {activeTab === 'calculator' && (
          <>
            <SalaryCalculator />
            {/* PASS onNavigate prop */}
            <InfoCards onNavigate={setActiveTab} />
          </>
        )}

        {activeTab === 'how-it-works' && <HowItWorks />}

        {/* ADD THIS NEW TAB */}
        {activeTab === 'how-taxes-work' && <HowTaxesWork />}

        {activeTab === 'salary-by-city' && <SalaryByCity />}
        {activeTab === 'guides' && <GuidesContent />}
        {activeTab === 'about' && <AboutContent />}
      </main>

      <footer className="bg-white border-t border-gray-100 py-8 text-center text-xs text-gray-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-2">© 2026 Finland Salary Calculator. All rights reserved.</div>
          <p className="max-w-2xl mx-auto leading-relaxed">
            Disclaimer: This calculator is for estimation purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}