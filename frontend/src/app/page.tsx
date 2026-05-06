"use client";
import { useState } from 'react';
import TopNav from '@/components/TopNav';
import SalaryCalculator from '@/components/SalaryCalculator';
import InfoCards from '@/components/InfoCards';
import HowItWorks from '../components/HowItWorks';

export default function Home() {
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* TopNav placed here will render only once */}
      <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow">
        {activeTab === 'calculator' && (
          <>
            <SalaryCalculator />
            <InfoCards />
          </>
        )}

        {activeTab === 'how-it-works' && (
          <HowItWorks />
        )}
      </main>
    </div>
  );
}