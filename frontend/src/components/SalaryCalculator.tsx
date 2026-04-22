'use client';

import { useState } from 'react';
import { SalaryInput, SalaryBreakdown } from '@/types/salary';
import { salaryApi } from '@/lib/api';

export default function SalaryCalculator() {
  const [formData, setFormData] = useState<SalaryInput>({
    grossSalary: 50000,
    taxRate: 20,
    socialSecurity: 7.5,
    pensionContribution: 5,
    otherDeductions: 0
  });

  const [result, setResult] = useState<SalaryBreakdown | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof SalaryInput, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({
      ...prev,
      [field]: numValue
    }));
    setError(null);
  };

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await salaryApi.calculateSalary(formData);
      
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        setError(response.error || 'Calculation failed');
        setResult(null);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Salary Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Salary Information
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gross Salary ($)
            </label>
            <input
              type="number"
              value={formData.grossSalary}
              onChange={(e) => handleInputChange('grossSalary', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax Rate (%)
            </label>
            <input
              type="number"
              value={formData.taxRate}
              onChange={(e) => handleInputChange('taxRate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="100"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Social Security (%)
            </label>
            <input
              type="number"
              value={formData.socialSecurity}
              onChange={(e) => handleInputChange('socialSecurity', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="100"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pension Contribution (%)
            </label>
            <input
              type="number"
              value={formData.pensionContribution}
              onChange={(e) => handleInputChange('pensionContribution', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="100"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Other Deductions ($)
            </label>
            <input
              type="number"
              value={formData.otherDeductions}
              onChange={(e) => handleInputChange('otherDeductions', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="10"
            />
          </div>

          <button
            onClick={handleCalculate}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Calculating...' : 'Calculate Salary'}
          </button>

          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Calculation Results
          </h2>
          
          {result ? (
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium text-gray-700">Gross Salary:</span>
                <span className="font-bold text-gray-900">{formatCurrency(result.grossSalary)}</span>
              </div>
              
              <div className="flex justify-between p-3 bg-red-50 rounded-md">
                <span className="font-medium text-gray-700">Tax Amount:</span>
                <span className="font-bold text-red-600">{formatCurrency(result.taxAmount)}</span>
              </div>
              
              <div className="flex justify-between p-3 bg-orange-50 rounded-md">
                <span className="font-medium text-gray-700">Social Security:</span>
                <span className="font-bold text-orange-600">{formatCurrency(result.socialSecurityAmount)}</span>
              </div>
              
              <div className="flex justify-between p-3 bg-yellow-50 rounded-md">
                <span className="font-medium text-gray-700">Pension:</span>
                <span className="font-bold text-yellow-600">{formatCurrency(result.pensionAmount)}</span>
              </div>
              
              <div className="flex justify-between p-3 bg-purple-50 rounded-md">
                <span className="font-medium text-gray-700">Other Deductions:</span>
                <span className="font-bold text-purple-600">{formatCurrency(result.otherDeductionsAmount)}</span>
              </div>
              
              <div className="flex justify-between p-3 bg-gray-100 rounded-md border-t-2 border-gray-300">
                <span className="font-medium text-gray-700">Total Deductions:</span>
                <span className="font-bold text-gray-900">{formatCurrency(result.totalDeductions)}</span>
              </div>
              
              <div className="flex justify-between p-4 bg-green-100 rounded-md border-2 border-green-300">
                <span className="font-bold text-lg text-gray-800">Net Salary:</span>
                <span className="font-bold text-xl text-green-700">{formatCurrency(result.netSalary)}</span>
              </div>
              
              <div className="flex justify-between p-3 bg-blue-50 rounded-md">
                <span className="font-medium text-gray-700">Effective Tax Rate:</span>
                <span className="font-bold text-blue-600">{formatPercentage(result.effectiveTaxRate)}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Enter your salary information and click "Calculate Salary" to see results.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
