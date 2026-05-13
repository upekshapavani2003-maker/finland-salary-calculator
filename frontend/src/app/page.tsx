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
import BottomNav from '@/components/BottomNav';

export default function Home() {
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <div className="bg-[#F8FAFC] min-h-screen flex flex-col">
      <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow">

        {/* Tab: Calculator & Info Cards */}
        {activeTab === 'calculator' && (
          <>
            <SalaryCalculator />
            <InfoCards onNavigate={setActiveTab} />
          </>
        )}

        {/* Tab: How It Works (top nav) */}
        {activeTab === 'how-it-works' && <HowItWorks />}

        {/* Tab: How Taxes Work (info card 1) */}
        {activeTab === 'how-taxes-work' && <HowTaxesWork />}

        {/* Tab: Salary By City Screen (info card 2) */}
        {activeTab === 'salary-by-city-screen' && <SalaryByCityScreen />}

        {/* Tab: Salary By City (top nav) */}
        {activeTab === 'salary-by-city' && <SalaryByCity />}

        {/* Tab: Average Salaries By Job (info card 3) */}
        {activeTab === 'average-salaries' && <AverageSalariesByJob />}

        {/* Tab: FAQs (info card 4) */}
        {activeTab === 'faqs' && <FAQsScreen />}

        {/* Tab: Guides */}
        {activeTab === 'guides' && <GuidesContent />}

        {/* Tab: About */}
        {activeTab === 'about' && <AboutContent />}

        {/* Tab: Cookie Settings (bottom nav) */}
        {activeTab === 'cookie-settings' && <CookieSettings />}

        {/* Tab: Disclaimer (bottom nav) */}
        {activeTab === 'disclaimer' && <DisclaimerScreen />}

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

      <BottomNav setActiveTab={setActiveTab} />
    </div>
  );
}