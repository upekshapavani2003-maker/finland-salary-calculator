"use client";
import { useState } from 'react';
import TopNav from '@/components/TopNav';
import SalaryCalculator from '@/components/SalaryCalculator';
import InfoCards from '@/components/InfoCards';
import HowItWorks from '../components/HowItWorks';
import SalaryByCity from '@/components/SalaryByCity';

export default function Home() {
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* TopNav handles the state switching for all three tabs */}
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
      </main>

      <footer className="bg-white border-t border-gray-100 py-6 text-center text-xs text-gray-400">
        <div>&copy; 2026 Finland Salary Calculator. All rights reserved.</div>
      </footer>
    </div>
  );
}