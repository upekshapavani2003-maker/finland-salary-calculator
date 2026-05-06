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
  // State to check if the user has calculated the results
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  // Input states (blank by default as requested)
  const [grossSalary, setGrossSalary] = useState<number | ''>('');
  const [salaryPeriod, setSalaryPeriod] = useState<'Monthly' | 'Yearly'>('Monthly');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('Helsinki (17.00%)');
  const [churchMember, setChurchMember] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<'simple' | 'advanced'>('simple');
  
  // Advanced Mode Sub-states (blank by default)
  const [baseSalary, setBaseSalary] = useState<number | ''>('');
  const [overtimePay, setOvertimePay] = useState<number | ''>('');
  const [bonuses, setBonuses] = useState<number | ''>('');
  const [allowances, setAllowances] = useState<number | ''>('');
  const [taxYear, setTaxYear] = useState<string>('2024');

  const [isTaxOpen, setIsTaxOpen] = useState<boolean>(true);
  const [isCalcOpen, setIsCalcOpen] = useState<boolean>(false);

  // States to hold the calculated results only after submission
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

  // Helper values to safely use in calculations
  const parsedGrossSalary = typeof grossSalary === 'number' ? grossSalary : 0;
  const parsedBaseSalary = typeof baseSalary === 'number' ? baseSalary : 0;
  const parsedOvertime = typeof overtimePay === 'number' ? overtimePay : 0;
  const parsedBonuses = typeof bonuses === 'number' ? bonuses : 0;
  const parsedAllowances = typeof allowances === 'number' ? allowances : 0;

  // Logic for UI display
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

  // Clear function to reset inputs
  const handleClear = () => {
    setGrossSalary('');
    setBaseSalary('');
    setOvertimePay('');
    setBonuses('');
    setAllowances('');
    setCalculatedValues(null);
    setHasCalculated(false);
  };

  // Determine values to display (show calculated state or 0)
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleCalculate} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: INPUTS */}
          <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col justify-start">
            <div>
              <div className="flex gap-3 mb-10">
                <button 
                  type="button"
                  onClick={() => setSelectedMode('simple')}
                  className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${selectedMode === 'simple' ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <Calculator size={22} className={selectedMode === 'simple' ? 'text-blue-600' : 'text-gray-400'} />
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Simple Mode</div>
                    <div className="text-[10px] text-gray-500 leading-tight">Quick calculation</div>
                  </div>
                </button>

                <button 
                  type="button"
                  onClick={() => setSelectedMode('advanced')}
                  className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${selectedMode === 'advanced' ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <ListTodo size={22} className={selectedMode === 'advanced' ? 'text-blue-600' : 'text-gray-400'} />
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Advanced Mode</div>
                    <div className="text-[10px] text-gray-500 leading-tight">Breakdown your income</div>
                  </div>
                </button>
              </div>

              {/* MODE SELECTION RENDER LOGIC */}
              {selectedMode === 'simple' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Gross Salary</label>
                    <div className="flex gap-2 items-center">
                      <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">€{"\u00A0"}</span>
                        <input 
                          type="number" 
                          placeholder="0"
                          value={grossSalary}
                          onChange={(e) => {
                            setGrossSalary(e.target.value === '' ? '' : Number(e.target.value));
                            // Optional: immediately unset calculated state on edit if desired, or let it remain until recalculated
                          }}
                          className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleClear}
                        className="p-4 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-lg transition-colors flex items-center justify-center"
                        title="Clear amount"
                      >
                        <Trash2 size={20} />
                      </button>

                      <select 
                        value={salaryPeriod}
                        onChange={(e) => setSalaryPeriod(e.target.value as any)}
                        className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-4 font-medium outline-none text-gray-700 text-sm"
                      >
                        <option>Monthly</option>
                        <option>Yearly</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Municipality</label>
                      <select 
                        value={selectedMunicipality}
                        onChange={(e) => setSelectedMunicipality(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-4 outline-none text-sm text-gray-700"
                      >
                        {municipalities.map(m => <option key={m}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Church Tax</label>
                      <div className="flex flex-col gap-1 justify-center h-[60px]">
                        <div className="flex items-center gap-6">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" checked={churchMember} onChange={() => setChurchMember(true)} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                            <span className="text-xs font-medium text-gray-600">Yes (1.00%)</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" checked={!churchMember} onChange={() => setChurchMember(false)} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                            <span className="text-xs font-medium text-gray-600">No</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-4 mt-2">
                    <Calculator size={18} />
                    Calculate Net Salary
                  </button>
                  
                  <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 mt-6">
                    <ShieldCheckIcon size={14} className="text-green-600 flex-shrink-0" />
                    <span>Your data is not stored. Calculations are done in your browser.</span>
                  </div>
                </div>
              ) : (
                /* Advanced Inputs UI */
                <div className="space-y-6">
                  <div>
                    <div className="flex flex-col gap-1 mb-4">
                      <span className="text-sm font-bold text-gray-900">1. Income Breakdown</span>
                      <span className="text-[10px] text-gray-400 font-medium">Enter your income components before tax.</span>
                    </div>

                    {[
                      { label: 'Base Salary', val: baseSalary, setter: setBaseSalary },
                      { label: 'Overtime Pay', val: overtimePay, setter: setOvertimePay },
                      { label: 'Bonuses', val: bonuses, setter: setBonuses },
                      { label: 'Allowances', val: allowances, setter: setAllowances }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between gap-4 mb-3">
                        <label className="text-sm font-bold text-gray-700 w-1/3">{item.label}</label>
                        <div className="flex gap-2 flex-1">
                          <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
                            <input 
                              type="number"
                              placeholder="0"
                              value={item.val}
                              onChange={(e) => item.setter(e.target.value === '' ? '' : Number(e.target.value))}
                              className="w-full pl-7 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                            />
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => item.setter('')}
                            className="p-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-lg transition-colors flex items-center justify-center"
                            title={`Clear ${item.label}`}
                          >
                            <Trash2 size={18} />
                          </button>

                          <select className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-[10px] font-medium outline-none text-gray-500">
                            <option>Monthly</option>
                            <option>Yearly</option>
                          </select>
                        </div>
                      </div>
                    ))}

                    <div className="p-4 bg-blue-50/30 rounded-lg mt-5 border border-blue-100/30 space-y-3">
                      <div className="text-sm font-bold text-blue-900">Total Gross Income</div>
                      <div className="flex justify-between items-center">
                        <div className="text-blue-700 font-black text-sm">€ {actualGrossMonthly.toLocaleString()} / month</div>
                        <div className="text-blue-600 font-black text-sm">€ {(actualGrossMonthly * 12).toLocaleString()} / year</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm font-bold text-gray-900">2. Tax Settings</span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-900 font-bold block mb-2">Municipality (Affects municipal tax rate)</label>
                        <div className="relative">
                          <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600" />
                          <select 
                            value={selectedMunicipality}
                            onChange={(e) => setSelectedMunicipality(e.target.value)}
                            className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium outline-none appearance-none"
                          >
                            {municipalities.map(m => <option key={m}>{m}</option>)}
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>

                      {/* Church Tax Section */}
                      <div className="border-t border-gray-100 pt-4">
                        <label className="text-sm text-gray-900 font-bold block mb-2">Church Tax</label>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" checked={churchMember} onChange={() => setChurchMember(true)} className="w-4 h-4 text-blue-600" />
                              <span className="text-xs font-medium text-gray-600">Yes (1.00%)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" checked={!churchMember} onChange={() => setChurchMember(false)} className="w-4 h-4 text-blue-600" />
                              <span className="text-xs font-medium text-gray-600">No</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Tax Year Section */}
                      <div className="border-t border-gray-100 pt-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm text-gray-900 font-bold">Tax Year</label>
                          <select 
                            value={taxYear} 
                            onChange={(e) => setTaxYear(e.target.value)}
                            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 outline-none"
                          >
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-4 mt-4">
                    <Calculator size={18} />
                    Calculate Net Salary
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 mt-6">
                    <ShieldCheckIcon size={14} className="text-green-600 flex-shrink-0" />
                    <span>Your data is not stored. Calculations are done in your browser.</span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100 mt-8">
              <p className="text-blue-900 font-bold text-sm mb-4">What should I include in my salary?</p>
              <div className="flex flex-row justify-start items-center gap-6 mb-2 overflow-x-auto no-scrollbar">
                {['Base salary', 'Overtime pay', 'Bonuses', 'Allowances'].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-[10px] text-black font-medium whitespace-nowrap">
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

          {/* RIGHT COLUMN: RESULTS */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-gray-900 font-bold text-lg mb-6">Your Result</h3>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-1.5 text-gray-900 font-bold">
                  Your Net Salary 
                  <Info size={14} className="text-blue-400" />
                </div>
                <div className="text-4xl font-black text-[#10B981] my-2">
                  €{"\u00A0"}{displayNetSalary.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  <span className="text-lg font-medium text-gray-400 ml-2">/ month</span>
                </div>
                <div className="text-gray-500 font-medium">€{"\u00A0"}{(displayNetSalary * 12).toLocaleString()} / year</div>
              </div>
              
              <div className="flex-shrink-0 ml-10">
                <div className="w-20 h-20 rounded-full border-[16px] border-blue-600 border-t-green-500 rotate-45"></div>
              </div>

              <div className="flex-1 flex justify-end">
                <div className="space-y-4 text-sm font-medium w-full max-w-[180px]">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="text-gray-500">Net Salary</span>
                      </div>
                      <span className="font-bold">{hasCalculated ? "71.3%" : "0%"}</span>
                    </div>
                    <div className="text-right text-xs text-gray-400">
                      €{"\u00A0"}{displayNetSalary.toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </div>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                        <span className="text-gray-500">Total Tax</span>
                      </div>
                      <span className="font-bold">{hasCalculated ? "28.7%" : "0%"}</span>
                    </div>
                    <div className="text-right text-xs text-gray-400">
                      €{"\u00A0"}{displayTotalTax.toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={16} className="text-green-500" />
                  <h4 className="font-bold text-gray-900 text-sm">Breakdown</h4>
                </div>
                <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                  <div className="flex justify-between p-3 bg-white border-b border-gray-50">
                    <span className="text-gray-600 font-medium flex items-center gap-2 text-xs">
                      <Wallet size={14} className="text-blue-500" /> Gross Salary
                    </span>
                    <span className="font-bold text-gray-900 text-xs">€{"\u00A0"}{displayGrossMonthly.toLocaleString()}</span>
                  </div>
                  
                  <div 
                    onClick={() => setIsTaxOpen(!isTaxOpen)}
                    className="flex justify-between p-3 bg-gray-50/50 border-b border-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-red-500 font-bold flex items-center gap-2 text-xs">
                      <Calculator size={14} className="text-red-400" /> Total Tax
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-red-500 text-xs">- €{"\u00A0"}{displayTotalTax.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                      <ChevronUp size={12} className={`text-gray-400 transition-transform duration-200 ${isTaxOpen ? 'rotate-0' : 'rotate-180'}`} />
                    </div>
                  </div>

                  {isTaxOpen && (
                    <div className="bg-white px-3 py-2 space-y-3">
                      {[
                        { label: 'State Income Tax', value: displayStateTax, icon: <Landmark size={12} className="text-indigo-400" /> },
                        { label: `Municipal Tax (${displayMunicipalityRate.toFixed(2)}%)`, value: displayMunicipalTax, icon: <Building2 size={12} className="text-orange-400" /> },
                        { label: 'Pension Contribution (7.15%)', value: displayPension, icon: <Coins size={12} className="text-yellow-500" /> },
                        { label: 'Unemployment Insurance (1.50%)', value: displayUnemployment, icon: <ShieldCheck size={12} className="text-emerald-400" /> },
                        ...(displayChurchMember ? [{ label: 'Church Tax (1.0%)', value: displayChurchTax, icon: <Church size={12} className="text-purple-400" /> }] : []),
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[11px] pl-4">
                          <span className="text-gray-500 flex items-center gap-2">
                            {item.icon}
                            {item.label}
                          </span>
                          <span className="text-gray-700 font-semibold">- €{"\u00A0"}{item.value.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between p-3 bg-white border-t border-gray-100">
                    <span className="text-[#10B981] font-bold flex items-center gap-2 text-xs">
                      <Banknote size={14} className="text-green-500" /> Net Salary
                    </span>
                    <span className="font-bold text-[#10B981] text-xs">€{"\u00A0"}{displayNetSalary.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Info size={16} className="text-blue-500" />
                  <h4 className="font-bold text-gray-900 text-sm">Calculation Info</h4>
                </div>
                <div className="bg-[#F1F5F9] border border-slate-200 rounded-xl p-4 space-y-3">
                  {[
                    { label: 'Tax Year', value: displayTaxYear, icon: <Calendar size={12} className="text-blue-500" /> },
                    { label: 'Municipality Tax Rate', value: `${displayMunicipalityRate.toFixed(2)}%`, icon: <Building2 size={12} className="text-orange-500" /> },
                    { label: 'State Tax Method', value: 'Progressive', icon: <Scale size={12} className="text-indigo-500" /> },
                    { label: 'Pension Contribution', value: '7.15%', icon: <Coins size={12} className="text-yellow-600" /> },
                    { label: 'Unemployment Insurance', value: '1.50%', icon: <ShieldCheck size={12} className="text-emerald-500" /> },
                    { label: 'Church Tax', value: displayChurchMember ? '1.00%' : '0.00%', icon: <Church size={12} className="text-purple-500" /> },
                  ].map((info, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[11px]">
                      <span className="text-gray-500 font-medium flex items-center gap-2">
                        {info.icon} {info.label}
                      </span>
                      <span className="font-bold text-gray-800">{info.value}</span>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-gray-200 text-[10px] text-gray-400 leading-tight">
                    This is an estimate based on {displayTaxYear} tax rates and average deductions.
                  </div>
                </div>
              </div>
            </div>

            {/* How this is calculated  */}
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm mt-6">
              <div 
                onClick={() => setIsCalcOpen(!isCalcOpen)}
                className="flex justify-between items-center p-4 bg-gray-50/30 cursor-pointer hover:bg-gray-50/80 transition-colors"
              >
                <span className="text-blue-700 font-bold text-sm flex items-center gap-2">
                  <ChevronUp size={14} className={`text-blue-500 transition-transform duration-200 ${isCalcOpen ? 'rotate-0' : 'rotate-180'}`} /> 
                  How this is calculated
                </span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>

              {isCalcOpen && (
                <div className="bg-white p-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <ol className="list-decimal pl-4 space-y-2 text-xs text-gray-600 font-medium">
                      <li>Your gross income is calculated from all income components (annual).</li>
                      <li>Social security contributions (pension + unemployment) are deducted.</li>
                      <li>Remaining income is taxed using progressive state tax rates.</li>
                      <li>Municipal and church taxes are calculated on the taxable income.</li>
                    </ol>
                  </div>
                  <div>
                    <button type="button" className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-blue-700 rounded-lg shadow-sm transition-all whitespace-nowrap">
                      Show tax brackets used
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}