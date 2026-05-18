'use client';

import { useState } from 'react';
import { 
  ChevronUp, 
  Info, 
  Check, 
  TrendingUp, 
  Banknote, 
  Landmark, 
  Building2, 
  Coins, 
  ShieldCheck, 
  Church, 
  Calculator,
  Calendar,
  Wallet,
  Scale,
  ListTodo,
  ChevronDown,
  ShieldCheck as ShieldCheckIcon,
  Trash2
} from 'lucide-react';

export default function SalaryCalculator() {
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [grossSalary, setGrossSalary] = useState<number | ''>('');
  const [salaryPeriod, setSalaryPeriod] = useState<'Monthly' | 'Yearly'>('Monthly');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('Helsinki (17.00%)');
  const [churchMember, setChurchMember] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<'simple' | 'advanced'>('simple');
  const [baseSalary, setBaseSalary] = useState<number | ''>('');
  const [overtimePay, setOvertimePay] = useState<number | ''>('');
  const [bonuses, setBonuses] = useState<number | ''>('');
  const [allowances, setAllowances] = useState<number | ''>('');
  const [taxYear, setTaxYear] = useState<string>('2024');
  const [isTaxOpen, setIsTaxOpen] = useState<boolean>(false);
  const [isCalcOpen, setIsCalcOpen] = useState<boolean>(false);
  const [calculatedValues, setCalculatedValues] = useState<{
    grossMonthly: number;
    netSalary: number;
    totalTax: number;
    stateTax: number;
    municipalTax: number;
    pension: number;
    unemployment: number;
    churchTax: number;
    municipalityRate: number;
    taxYear: string;
    churchMember: boolean;
  } | null>(null);

  const parsedGrossSalary = typeof grossSalary === 'number' ? grossSalary : 0;
  const parsedBaseSalary = typeof baseSalary === 'number' ? baseSalary : 0;
  const parsedOvertime = typeof overtimePay === 'number' ? overtimePay : 0;
  const parsedBonuses = typeof bonuses === 'number' ? bonuses : 0;
  const parsedAllowances = typeof allowances === 'number' ? allowances : 0;

  const municipalityRate = parseFloat(selectedMunicipality.match(/\(([\d.]+)%\)/)?.[1] || '17.00');
  const pensionRate = 7.15;
  const unemploymentRate = 1.50;
  const churchRate = churchMember ? 1.00 : 0.00;

  const actualGrossMonthly = selectedMode === 'advanced'
    ? (parsedBaseSalary + parsedOvertime + parsedBonuses + parsedAllowances)
    : (salaryPeriod === 'Yearly' ? parsedGrossSalary / 12 : parsedGrossSalary);

  const pension = actualGrossMonthly * (pensionRate / 100);
  const unemployment = actualGrossMonthly * (unemploymentRate / 100);
  const municipalTax = actualGrossMonthly * (municipalityRate / 100);
  const stateTax = actualGrossMonthly * 0.10;
  const churchTax = actualGrossMonthly * (churchRate / 100);
  const totalTax = stateTax + municipalTax + pension + unemployment + churchTax;
  const netSalary = actualGrossMonthly - totalTax;

  const municipalities = [
    'Helsinki (17.00%)', 'Espoo (16.50%)', 'Tampere (18.00%)', 'Vantaa (17.50%)', 'Oulu (18.50%)'
  ];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setCalculatedValues({
      grossMonthly: actualGrossMonthly,
      netSalary,
      totalTax,
      stateTax,
      municipalTax,
      pension,
      unemployment,
      churchTax,
      municipalityRate,
      taxYear,
      churchMember,
    });
    setHasCalculated(true);
  };

  const handleClear = () => {
    setGrossSalary('');
    setBaseSalary('');
    setOvertimePay('');
    setBonuses('');
    setAllowances('');
    setCalculatedValues(null);
    setHasCalculated(false);
  };

  const displayNetSalary = hasCalculated && calculatedValues ? calculatedValues.netSalary : 0;
  const displayTotalTax = hasCalculated && calculatedValues ? calculatedValues.totalTax : 0;
  const displayGrossMonthly = hasCalculated && calculatedValues ? calculatedValues.grossMonthly : 0;
  const displayStateTax = hasCalculated && calculatedValues ? calculatedValues.stateTax : 0;
  const displayMunicipalTax = hasCalculated && calculatedValues ? calculatedValues.municipalTax : 0;
  const displayPension = hasCalculated && calculatedValues ? calculatedValues.pension : 0;
  const displayUnemployment = hasCalculated && calculatedValues ? calculatedValues.unemployment : 0;
  const displayChurchTax = hasCalculated && calculatedValues ? calculatedValues.churchTax : 0;
  const displayMunicipalityRate = hasCalculated && calculatedValues ? calculatedValues.municipalityRate : municipalityRate;
  const displayTaxYear = hasCalculated && calculatedValues ? calculatedValues.taxYear : taxYear;
  const displayChurchMember = hasCalculated && calculatedValues ? calculatedValues.churchMember : churchMember;

  const taxPercentage = displayGrossMonthly > 0 ? (displayTotalTax / displayGrossMonthly) * 100 : 0;
  const netPercentage = displayGrossMonthly > 0 ? (displayNetSalary / displayGrossMonthly) * 100 : 0;

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const netDash = hasCalculated ? (netPercentage / 100) * circumference : 0;
  const taxDash = hasCalculated ? (taxPercentage / 100) * circumference : 0;

  return (
    <div className="bg-[#F8FAFC] pt-2 pb-12 px-2 sm:px-4 lg:px-6 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleCalculate} className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-5 flex flex-col gap-4">

            {/* Mode Toggle */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMode('simple')}
                className={`flex items-center gap-2 p-3 sm:p-4 rounded-xl border-2 text-left transition-all ${
                  selectedMode === 'simple'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <Calculator size={18} className={selectedMode === 'simple' ? 'text-blue-600' : 'text-gray-400'} />
                <div>
                  <div className={`text-xs sm:text-sm font-bold ${selectedMode === 'simple' ? 'text-blue-700' : 'text-gray-700'}`}>
                    Simple Mode
                  </div>
                  <div className="text-[10px] text-gray-400 leading-tight mt-0.5">Quick calculation</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMode('advanced')}
                className={`flex items-center gap-2 p-3 sm:p-4 rounded-xl border-2 text-left transition-all ${
                  selectedMode === 'advanced'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <ListTodo size={18} className={selectedMode === 'advanced' ? 'text-blue-600' : 'text-gray-400'} />
                <div>
                  <div className={`text-xs sm:text-sm font-bold ${selectedMode === 'advanced' ? 'text-blue-700' : 'text-gray-700'}`}>
                    Advanced Mode
                  </div>
                  <div className="text-[10px] text-gray-400 leading-tight mt-0.5">Breakdown your income</div>
                </div>
              </button>
            </div>

            {/* ── SIMPLE MODE ── */}
            {selectedMode === 'simple' && (
              <div className="flex flex-col gap-3">

                {/* Tax Year */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-700">Tax Year</label>
                  <select
                    value={taxYear}
                    onChange={(e) => setTaxYear(e.target.value)}
                    className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                </div>

                {/* Gross Salary */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Gross Salary</label>
                  <div className="flex gap-2 items-center">
                    <div className="relative flex-1 min-w-0">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">€</span>
                      <input
                        type="number"
                        placeholder="0"
                        value={grossSalary}
                        onChange={(e) => setGrossSalary(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full pl-8 pr-2 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-gray-900 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleClear}
                      className="p-3 bg-red-50 hover:bg-red-100 border border-red-200 text-red-500 rounded-xl transition-colors flex-shrink-0"
                      title="Clear"
                    >
                      <Trash2 size={16} />
                    </button>
                    <select
                      value={salaryPeriod}
                      onChange={(e) => setSalaryPeriod(e.target.value as 'Monthly' | 'Yearly')}
                      className="bg-gray-50 border border-gray-200 rounded-xl px-2 py-3 text-sm text-gray-600 outline-none flex-shrink-0 focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Monthly</option>
                      <option>Yearly</option>
                    </select>
                  </div>
                </div>

                {/* Municipality + Church Tax */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Municipality</label>
                    <select
                      value={selectedMunicipality}
                      onChange={(e) => setSelectedMunicipality(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2 py-3 text-xs text-gray-600 font-bold outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {municipalities.map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Church Tax</label>
                    <div className="flex flex-col gap-2 pt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={churchMember} onChange={() => setChurchMember(true)} className="w-4 h-4 accent-blue-600" />
                        <span className="text-xs font-medium text-gray-600">Yes (1.0%)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={!churchMember} onChange={() => setChurchMember(false)} className="w-4 h-4 accent-blue-600" />
                        <span className="text-xs font-medium text-gray-600">No</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Calculate Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 active:scale-[0.99] text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-200"
                >
                  <Calculator size={17} />
                  Calculate Net Salary
                </button>

                {/* Privacy note */}
                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
                  <ShieldCheckIcon size={13} className="text-green-500 flex-shrink-0" />
                  <span>Your data is not stored. Calculations are done in your browser.</span>
                </div>
              </div>
            )}

            {/* ── ADVANCED MODE ── */}
            {selectedMode === 'advanced' && (
              <div className="flex flex-col gap-3">

                {/* Tax Year */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-700">Tax Year</label>
                  <select
                    value={taxYear}
                    onChange={(e) => setTaxYear(e.target.value)}
                    className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                </div>

                {/* Section 1 */}
                <div>
                  <div className="mb-2">
                    <div className="text-sm font-bold text-gray-900">1. Income Breakdown</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">Enter your income components before tax.</div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {[
                      { label: 'Base Salary', val: baseSalary, setter: setBaseSalary },
                      { label: 'Overtime Pay', val: overtimePay, setter: setOvertimePay },
                      { label: 'Bonuses', val: bonuses, setter: setBonuses },
                      { label: 'Allowances', val: allowances, setter: setAllowances },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <label className="text-xs font-bold text-gray-600 w-24 flex-shrink-0">{item.label}</label>
                        <div className="relative flex-1 min-w-0">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
                          <input
                            type="number"
                            placeholder="0"
                            value={item.val}
                            onChange={(e) => item.setter(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full pl-6 pr-2 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => item.setter('')}
                          className="p-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-500 rounded-lg transition-colors flex-shrink-0"
                        >
                          <Trash2 size={14} />
                        </button>
                        <select className="bg-gray-50 border border-gray-200 rounded-lg px-1.5 py-2 text-[10px] text-gray-500 outline-none flex-shrink-0">
                          <option>Monthly</option>
                          <option>Yearly</option>
                        </select>
                      </div>
                    ))}
                  </div>

                  {/* Total Gross */}
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                    <div className="text-xs font-bold text-blue-800 mb-1">Total Gross Income</div>
                    <div className="flex justify-between">
                      <span className="text-sm font-bold text-blue-700">€ {actualGrossMonthly.toLocaleString()} / mo</span>
                      <span className="text-sm font-bold text-blue-600">€ {(actualGrossMonthly * 12).toLocaleString()} / yr</span>
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="border-t border-gray-100 pt-3">
                  <div className="text-sm font-bold text-gray-900 mb-3">2. Tax Settings</div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">Municipality</label>
                      <div className="relative">
                        <Building2 size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                        <select
                          value={selectedMunicipality}
                          onChange={(e) => setSelectedMunicipality(e.target.value)}
                          className="w-full pl-8 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 outline-none appearance-none focus:ring-2 focus:ring-blue-500"
                        >
                          {municipalities.map(m => <option key={m}>{m}</option>)}
                        </select>
                        <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">Church Tax</label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" checked={churchMember} onChange={() => setChurchMember(true)} className="w-4 h-4 accent-blue-600" />
                          <span className="text-xs text-gray-600">Yes (1.00%)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" checked={!churchMember} onChange={() => setChurchMember(false)} className="w-4 h-4 accent-blue-600" />
                          <span className="text-xs text-gray-600">No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calculate Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 active:scale-[0.99] text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-200"
                >
                  <Calculator size={17} />
                  Calculate Net Salary
                </button>

                {/* Privacy note */}
                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
                  <ShieldCheckIcon size={13} className="text-green-500 flex-shrink-0" />
                  <span>Your data is not stored. Calculations are done in your browser.</span>
                </div>
              </div>
            )}

            {/* What to include */}
            <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 mt-auto">
              <p className="text-blue-900 font-bold text-sm mb-3">What should I include in my salary?</p>
              <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 mb-3">
                {['Base salary', 'Overtime pay', 'Bonuses', 'Allowances'].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-[11px] text-gray-700 font-medium">
                    <div className="w-3.5 h-3.5 rounded-full bg-blue-700 flex items-center justify-center text-white flex-shrink-0">
                      <Check size={9} strokeWidth={4} />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-500 font-medium pt-3 border-t border-blue-100/50">
                Include all taxable income before tax deductions.
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN: RESULTS ── */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h3 className="text-gray-900 font-bold text-lg mb-4">Your Result</h3>

            {/* Net Salary Hero */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5 mb-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">

                {/* Net salary text */}
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700 mb-1">
                    Your Net Salary <Info size={13} className="text-blue-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-500 mb-1">
                    € {displayNetSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    <span className="text-base font-medium text-gray-400 ml-2">/ month</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    € {(displayNetSalary * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })} / year
                  </div>
                </div>

                {/* SVG Donut */}
                <div className="flex-shrink-0">
                  <svg width="100" height="100" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="16" />
                    {hasCalculated && (
                      <>
                        <circle cx="60" cy="60" r={radius} fill="none" stroke="#2563eb" strokeWidth="16"
                          strokeDasharray={`${taxDash} ${circumference}`}
                          strokeDashoffset={0}
                          strokeLinecap="butt"
                          transform="rotate(-90 60 60)"
                        />
                        <circle cx="60" cy="60" r={radius} fill="none" stroke="#10b981" strokeWidth="16"
                          strokeDasharray={`${netDash} ${circumference}`}
                          strokeDashoffset={-taxDash}
                          strokeLinecap="butt"
                          transform="rotate(-90 60 60)"
                        />
                      </>
                    )}
                  </svg>
                </div>

                {/* Legend */}
                <div className="flex sm:flex-col flex-row gap-4 sm:gap-3 w-full sm:w-auto sm:min-w-[140px]">
                  <div className="flex-1 sm:flex-none">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span className="text-xs text-gray-500">Net Salary</span>
                      </div>
                      <span className="text-xs font-bold text-gray-800">{netPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="text-right text-[11px] text-gray-400 mt-0.5">
                      € {displayNetSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 flex-shrink-0" />
                        <span className="text-xs text-gray-500">Total Tax</span>
                      </div>
                      <span className="text-xs font-bold text-gray-800">{taxPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="text-right text-[11px] text-gray-400 mt-0.5">
                      € {displayTotalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Breakdown + Calc Info */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">

              {/* Breakdown */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={15} className="text-emerald-500" />
                  <h4 className="font-bold text-gray-900 text-sm">Breakdown</h4>
                </div>
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <div className="flex justify-between px-3 py-2.5 bg-white border-b border-gray-50">
                    <span className="text-xs text-gray-600 flex items-center gap-1.5">
                      <Wallet size={12} className="text-blue-500" /> Gross Salary
                    </span>
                    <span className="text-xs font-bold text-gray-800">
                      € {displayGrossMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div
                    onClick={() => setIsTaxOpen(!isTaxOpen)}
                    className="flex justify-between px-3 py-2.5 bg-red-50/40 border-b border-gray-50 cursor-pointer hover:bg-red-50/60 transition-colors"
                  >
                    <span className="text-xs font-bold text-red-500 flex items-center gap-1.5">
                      <Calculator size={12} className="text-red-400" /> Total Tax
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-red-500">
                        - € {displayTotalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                      <ChevronDown size={11} className={`text-gray-400 transition-transform ${isTaxOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {isTaxOpen && (
                    <div className="bg-white px-3 py-2 space-y-2 border-b border-gray-50">
                      {[
                        { label: 'State Income Tax', value: displayStateTax, icon: <Landmark size={11} className="text-indigo-400" /> },
                        { label: `Municipal Tax (${displayMunicipalityRate.toFixed(2)}%)`, value: displayMunicipalTax, icon: <Building2 size={11} className="text-orange-400" /> },
                        { label: 'Pension (7.15%)', value: displayPension, icon: <Coins size={11} className="text-yellow-500" /> },
                        { label: 'Unemployment (1.50%)', value: displayUnemployment, icon: <ShieldCheck size={11} className="text-emerald-400" /> },
                        ...(displayChurchMember ? [{ label: 'Church Tax (1.0%)', value: displayChurchTax, icon: <Church size={11} className="text-purple-400" /> }] : []),
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[11px] pl-3">
                          <span className="text-gray-500 flex items-center gap-1.5">{item.icon}{item.label}</span>
                          <span className="text-gray-600 font-medium">- € {item.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between px-3 py-2.5 bg-emerald-50/40">
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                      <Banknote size={12} className="text-emerald-500" /> Net Salary
                    </span>
                    <span className="text-xs font-bold text-emerald-600">
                      € {displayNetSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Calculation Info */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Info size={15} className="text-blue-500" />
                  <h4 className="font-bold text-gray-900 text-sm">Calculation Info</h4>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                  {[
                    { label: 'Tax Year', value: displayTaxYear, icon: <Calendar size={11} className="text-blue-500" /> },
                    { label: 'Municipality Rate', value: `${displayMunicipalityRate.toFixed(2)}%`, icon: <Building2 size={11} className="text-orange-500" /> },
                    { label: 'State Tax Method', value: 'Progressive', icon: <Scale size={11} className="text-indigo-500" /> },
                    { label: 'Pension', value: '7.15%', icon: <Coins size={11} className="text-yellow-600" /> },
                    { label: 'Unemployment', value: '1.50%', icon: <ShieldCheck size={11} className="text-emerald-500" /> },
                    { label: 'Church Tax', value: displayChurchMember ? '1.00%' : '0.00%', icon: <Church size={11} className="text-purple-500" /> },
                  ].map((info, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[11px]">
                      <span className="text-gray-500 flex items-center gap-1.5">{info.icon}{info.label}</span>
                      <span className="font-bold text-gray-800">{info.value}</span>
                    </div>
                  ))}
                  <p className="text-[10px] text-gray-400 pt-2 border-t border-slate-200 leading-relaxed">
                    Estimate based on {displayTaxYear} tax rates and average deductions.
                  </p>
                </div>
              </div>
            </div>

            {/* How this is calculated */}
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <div
                onClick={() => setIsCalcOpen(!isCalcOpen)}
                className="flex justify-between items-center px-4 py-3 bg-gray-50/50 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-bold text-blue-700 flex items-center gap-2">
                  <ChevronUp size={14} className={`text-blue-500 transition-transform ${isCalcOpen ? '' : 'rotate-180'}`} />
                  How this is calculated
                </span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              {isCalcOpen && (
                <div className="bg-white px-4 py-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start gap-4">
                  <ol className="list-decimal pl-4 space-y-1.5 text-xs text-gray-600 flex-1">
                    <li>Your gross income is calculated from all income components (annual).</li>
                    <li>Social security contributions (pension + unemployment) are deducted.</li>
                    <li>Remaining income is taxed using progressive state tax rates.</li>
                    <li>Municipal and church taxes are calculated on the taxable income.</li>
                  </ol>
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-blue-700 hover:bg-gray-50 transition-colors whitespace-nowrap flex-shrink-0"
                  >
                    Show tax brackets used
                  </button>
                </div>
              )}
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}