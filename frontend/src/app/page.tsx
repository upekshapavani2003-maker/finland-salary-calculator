"use client";
import SalaryCalculator from '@/components/SalaryCalculator';
import InfoCards from '@/components/InfoCards';

export default function Home() {
  return (
    <div className="bg-white">
      <SalaryCalculator />
      <InfoCards />
    </div>
  );
}
