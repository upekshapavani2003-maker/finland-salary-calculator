'use client';

import { useState, useEffect } from 'react';
import { calculateTax, TaxBreakdown } from '@/lib/taxCalculator';

export default function SalaryCalculator() {
  const [grossSalary, setGrossSalary] = useState<number>(4000);
  const [salaryPeriod, setSalaryPeriod] = useState<'Monthly' | 'Yearly'>('Monthly');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('Helsinki (17.00%)');
  const [churchMember, setChurchMember] = useState<boolean>(false);
  const [taxBreakdown, setTaxBreakdown] = useState<TaxBreakdown | null>(null);
  const [selectedMode, setSelectedMode] = useState<'simple' | 'advanced'>('simple');

  // Extract municipality rate from selection
  const municipalityRate = parseFloat(selectedMunicipality.match(/\(([\d.]+)%\)/)?.[1] || '17.00');

  // Calculate actual gross monthly based on period
  const actualGrossMonthly = salaryPeriod === 'Yearly' ? grossSalary / 12 : grossSalary;

  // Calculate tax whenever inputs change
  useEffect(() => {
    const result = calculateTax(actualGrossMonthly, municipalityRate, churchMember);
    setTaxBreakdown(result);
  }, [actualGrossMonthly, municipalityRate, churchMember]);

  const municipalities = [
    'Helsinki (17.00%)',
    'Espoo (16.50%)',
    'Tampere (18.00%)',
    'Vantaa (17.50%)',
    'Oulu (18.50%)'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Main Calculator - Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Left Column - Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            {/* Mode Selection Boxes */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div
                onClick={() => setSelectedMode('simple')}
                className={`border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 text-center ${
                  selectedMode === 'simple'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-sm font-semibold">
                  Simple mode
                </div>
                <div className="text-xs text-gray-600">
                  Quick calculation
                </div>
              </div>
              <div
                onClick={() => setSelectedMode('advanced')}
                className={`border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 text-center ${
                  selectedMode === 'advanced'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-sm font-semibold">
                  Advanced mode
                </div>
                <div className="text-xs text-gray-600">
                  Breakdown your income
                </div>
              </div>
            </div>
            
            {/* Gross Salary Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gross Salary
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    €
                  </span>
                  <input
                    type="number"
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>
                <select
                  value={salaryPeriod}
                  onChange={(e) => setSalaryPeriod(e.target.value as 'Monthly' | 'Yearly')}
                  className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
            </div>

            {/* Municipality and Church Tax Side by Side */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Municipality Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Municipality
                </label>
                <select
                  value={selectedMunicipality}
                  onChange={(e) => setSelectedMunicipality(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {municipalities.map((municipality) => (
                    <option key={municipality} value={municipality}>
                      {municipality}
                    </option>
                  ))}
                </select>
              </div>

              {/* Church Tax Radio Buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Church Tax
                </label>
                <div className="flex space-x-6">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="church-yes"
                      name="church-tax"
                      value="yes"
                      checked={churchMember}
                      onChange={(e) => setChurchMember(e.target.value === 'yes')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="church-yes" className="ml-2 text-sm text-gray-700">
                      Yes (1.0%)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="church-no"
                      name="church-tax"
                      value="no"
                      checked={!churchMember}
                      onChange={(e) => setChurchMember(e.target.value === 'yes')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="church-no" className="ml-2 text-sm text-gray-700">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculate Net Salary Button */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors mb-4">
              Calculate net salary
            </button>

            {/* Salary Inclusion Info Box with Radio Buttons */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 text-sm mb-3">
                What should I include in my salary?
              </h3>
              <div className="flex flex-wrap gap-6 mb-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="salary-base"
                    name="salary-items"
                    value="base"
                    className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="salary-base" className="ml-2 text-xs text-blue-800">
                    Base salary
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="salary-overtime"
                    name="salary-items"
                    value="overtime"
                    className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="salary-overtime" className="ml-2 text-xs text-blue-800">
                    Overtime pay
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="salary-bonus"
                    name="salary-items"
                    value="bonus"
                    className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="salary-bonus" className="ml-2 text-xs text-blue-800">
                    Bonuses
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="salary-allowances"
                    name="salary-items"
                    value="allowances"
                    className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="salary-allowances" className="ml-2 text-xs text-blue-800">
                    Allowances
                  </label>
                </div>
              </div>
              <div className="text-xs text-blue-700">
                Include all taxable income before tax deductions.
              </div>
            </div>
          </div>

          {/* Right Column - Results Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            {taxBreakdown && (
              <>
                {/* Net Salary Display */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Net Salary</h2>
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    €{taxBreakdown.netSalary.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    Yearly: €{(taxBreakdown.netSalary * 12).toLocaleString()}
                  </div>
                </div>

                {/* Tax Breakdown Card */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Gross Salary</span>
                      <span className="font-medium">€{taxBreakdown.grossMonthly.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between text-red-600">
                      <span className="font-medium">Total Tax</span>
                      <span className="font-medium">-€{taxBreakdown.totalTax.toLocaleString()}</span>
                    </div>
                    
                    {/* Indented sub-items */}
                    <div className="ml-4 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">State Income Tax</span>
                        <span>-€{taxBreakdown.stateTaxMonthly.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Municipal Tax ({municipalityRate}%)</span>
                        <span>-€{taxBreakdown.municipalTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Pension Contribution (7.15%)</span>
                        <span>-€{taxBreakdown.pension.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Unemployment Insurance (1.50%)</span>
                        <span>-€{taxBreakdown.unemployment.toLocaleString()}</span>
                      </div>
                      {churchMember && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Church Tax (1.0%)</span>
                          <span>-€{taxBreakdown.churchTax.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold text-green-600">
                        <span>Net Salary</span>
                        <span>€{taxBreakdown.netSalary.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* How this is calculated link */}
                <div className="text-left mt-4">
                  <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    How this is calculated →
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
