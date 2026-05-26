"use client";

import { useState } from 'react';
import TopNav from '@/components/TopNav';
import SalaryCalculator from '@/components/SalaryCalculator';
import InfoCards from '@/components/InfoCards';
import HowItWorks from '@/components/HowItWorks';
import HowTaxesWork from '@/components/HowTaxesWork';
import SalaryByCityScreen from '@/components/SalaryByCityScreen';
import SalaryByCity from '@/components/SalaryByCity';
import AverageSalariesByJob from '@/components/AverageSalariesByJob';
import FAQsScreen from '@/components/FAQsScreen';
import GuidesContent from '@/components/GuidesContent';
import AboutContent from '@/components/AboutContent';
import CookieSettings from '@/components/CookieSettings';
import DisclaimerScreen from '@/components/DisclaimerScreen';
import ContactScreen from '@/components/ContactScreen';
import PrivacyPolicyScreen from '@/components/PrivacyPolicyScreen';
import TaxBasicsGuide from '@/components/TaxBasicsGuide';
import ExpatsGuide from '@/components/ExpatsGuide';
import FreelancersGuide from '@/components/FreelancersGuide';
import DeductionsGuide from '@/components/DeductionsGuide';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  const [activeTab, setActiveTab] = useState('calculator');

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen flex flex-col w-full overflow-x-hidden">
      <TopNav activeTab={activeTab} setActiveTab={handleNavigate} />

      <main className="flex-grow w-full">

        {activeTab === 'calculator' && (
          <>
            <SalaryCalculator />
            <InfoCards onNavigate={handleNavigate} />
          </>
        )}

        {activeTab === 'how-it-works' && <HowItWorks />}
        {activeTab === 'how-taxes-work' && <HowTaxesWork />}
        {activeTab === 'salary-by-city-screen' && <SalaryByCityScreen />}
        {activeTab === 'salary-by-city' && <SalaryByCity />}
        {activeTab === 'average-salaries' && <AverageSalariesByJob />}
        {activeTab === 'faqs' && <FAQsScreen />}
        {activeTab === 'guides' && <GuidesContent />}
        {activeTab === 'about' && <AboutContent />}
        {activeTab === 'cookie-settings' && <CookieSettings />}
        {activeTab === 'disclaimer' && <DisclaimerScreen />}
        {activeTab === 'contact' && <ContactScreen />}
        {activeTab === 'privacy-policy' && <PrivacyPolicyScreen />}

      </main>

      <footer className="bg-white border-t border-gray-100 py-2 text-center text-xs text-gray-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-2">© 2026 Finland Salary Calculator. All rights reserved.</div>
          <p className="max-w-2xl mx-auto leading-relaxed">
            Disclaimer: This calculator is for estimation purposes only. Actual tax rates may vary
            based on individual circumstances and official decisions by the Finnish Tax Administration.
          </p>
        </div>
      </footer>

      <BottomNav setActiveTab={handleNavigate} />
    </div>
  );
}