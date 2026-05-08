"use client";
import { useState } from 'react';
import TopNav from '@/components/TopNav';
import SalaryCalculator from '@/components/SalaryCalculator';
import InfoCards from '@/components/InfoCards';
import HowItWorks from '../components/HowItWorks';
import SalaryByCity from '@/components/SalaryByCity';
import GuidesContent from '@/components/GuidesContent'; 
import AboutContent from '@/components/AboutContent';

export default function Home() {
  // activeTab now supports 'guides'
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <div className="bg-[#F8FAFC] min-h-screen flex flex-col">
      {/* Ensure your TopNav component has a button that sets 'guides' */}
      <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow">
        {/* Tab 1: Calculator & Info Cards */}
        {activeTab === 'calculator' && (
          <>
            <SalaryCalculator />
            <InfoCards />
          </>
        )}

        {/* Tab 2: How It Works Screen */}
        {activeTab === 'how-it-works' && (
          <HowItWorks />
        )}

        {/* Tab 3: Salary By City Screen */}
        {activeTab === 'salary-by-city' && (
          <SalaryByCity />
        )}

        {/* Tab 4: Guides & Resources */}
        {activeTab === 'guides' && (
          <GuidesContent />
        )}

        {/* Tab 5: About Screen */}
        {activeTab === 'about' && (
          <AboutContent />
        )}


      </main>

      <footer className="bg-white border-t border-gray-100 py-8 text-center text-xs text-gray-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-2">© 2026 Finland Salary Calculator. All rights reserved.</div>
          <p className="max-w-2xl mx-auto leading-relaxed">
            Disclaimer: This calculator is for estimation purposes only. Actual tax rates may vary 
            based on individual circumstances and official decisions by the Finnish Tax Administration.
          </p>
        </div>
      </footer>
    </div>
  );
}