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
  ListTodo
} from 'lucide-react';

export default function SalaryCalculator() {
  const [grossSalary, setGrossSalary] = useState<number>(4000);
  const [salaryPeriod, setSalaryPeriod] = useState<'Monthly' | 'Yearly'>('Monthly');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('Helsinki (17.00%)');
  const [churchMember, setChurchMember] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<'simple' | 'advanced'>('simple');
  
  const [isTaxOpen, setIsTaxOpen] = useState<boolean>(true);

  // Logic for UI display
  const municipalityRate = parseFloat(selectedMunicipality.match(/\(([\d.]+)%\)/)?.[1] || '17.00');
  const pensionRate = 7.15;
  const unemploymentRate = 1.50;
  const churchRate = churchMember ? 1.00 : 0.00;
  
  const actualGrossMonthly = salaryPeriod === 'Yearly' ? grossSalary / 12 : grossSalary;
  
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: INPUTS - Added h-full and flex column to match heights */}
          <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col justify-start">
            <div>
              <div className="flex gap-3 mb-10">
                <button 
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

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Gross Salary</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">€{"\u00A0"}</span>
                      <input 
                        type="number" 
                        value={grossSalary}
                        onChange={(e) => setGrossSalary(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-gray-900" 
                      />
                    </div>
                    <select 
                      value={salaryPeriod}
                      onChange={(e) => setSalaryPeriod(e.target.value as any)}
                      className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-4 font-medium outline-none text-gray-700"
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
                    <div className="flex items-center gap-8 h-[60px]">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={churchMember} onChange={() => setChurchMember(true)} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                        <span className="text-sm text-gray-600">Yes (1.0%)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={!churchMember} onChange={() => setChurchMember(false)} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                        <span className="text-sm text-gray-600">No</span>
                      </label>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-4 mt-2">
                  <Calculator size={18} />
                  Calculate Net Salary
                </button>
              </div>
            </div>

            {/* Helper box now pushes to bottom with extra padding */}
            <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100 mt-8">
              <p className="text-blue-900 font-bold text-sm mb-4">What should I include in my salary?</p>
              <div className="flex flex-row justify-start items-center gap-6 mb-2 overflow-x-auto no-scrollbar">
                {['Base salary', 'Overtime pay', 'Bonuses', 'Allowances'].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-[10px] text-black-900 font-medium whitespace-nowrap">
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
                  €{"\u00A0"}{netSalary.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  <span className="text-lg font-medium text-gray-400 ml-2">/ month</span>
                </div>
                <div className="text-gray-500 font-medium">€{"\u00A0"}{(netSalary * 12).toLocaleString()} / year</div>
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
                      <span className="font-bold">71.3%</span>
                    </div>
                    <div className="text-right text-xs text-gray-400">
                      €{"\u00A0"}{netSalary.toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </div>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                        <span className="text-gray-500">Total Tax</span>
                      </div>
                      <span className="font-bold">28.7%</span>
                    </div>
                    <div className="text-right text-xs text-gray-400">
                      €{"\u00A0"}{totalTax.toLocaleString(undefined, {maximumFractionDigits: 0})}
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
                    <span className="font-bold text-gray-900 text-xs">€{"\u00A0"}{actualGrossMonthly.toLocaleString()}</span>
                  </div>
                  
                  <div 
                    onClick={() => setIsTaxOpen(!isTaxOpen)}
                    className="flex justify-between p-3 bg-gray-50/50 border-b border-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-red-500 font-bold flex items-center gap-2 text-xs">
                      <Calculator size={14} className="text-red-400" /> Total Tax
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-red-500 text-xs">- €{"\u00A0"}{totalTax.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                      <ChevronUp size={12} className={`text-gray-400 transition-transform duration-200 ${isTaxOpen ? 'rotate-0' : 'rotate-180'}`} />
                    </div>
                  </div>

                  {isTaxOpen && (
                    <div className="bg-white px-3 py-2 space-y-3">
                      {[
                        { label: 'State Tax', value: stateTax, icon: <Landmark size={12} className="text-indigo-400" /> },
                        { label: 'Municipality', value: municipalTax, icon: <Building2 size={12} className="text-orange-400" /> },
                        { label: 'Pension', value: pension, icon: <Coins size={12} className="text-yellow-500" /> },
                        { label: 'Unemployment', value: unemployment, icon: <ShieldCheck size={12} className="text-emerald-400" /> },
                        ...(churchMember ? [{ label: 'Church Tax', value: churchTax, icon: <Church size={12} className="text-purple-400" /> }] : []),
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
                    <span className="font-bold text-[#10B981] text-xs">€{"\u00A0"}{netSalary.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
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
                    { label: 'Tax Year', value: '2024', icon: <Calendar size={12} className="text-blue-500" /> },
                    { label: 'Municipality Tax Rate', value: `${municipalityRate.toFixed(2)}%`, icon: <Building2 size={12} className="text-orange-500" /> },
                    { label: 'State Tax Method', value: 'Progressive', icon: <Scale size={12} className="text-indigo-500" /> },
                    { label: 'Pension Contribution', value: '7.15%', icon: <Coins size={12} className="text-yellow-600" /> },
                    { label: 'Unemployment Insurance', value: '1.50%', icon: <ShieldCheck size={12} className="text-emerald-500" /> },
                    { label: 'Church Tax', value: churchMember ? '1.00%' : '0.00%', icon: <Church size={12} className="text-purple-500" /> },
                  ].map((info, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[11px]">
                      <span className="text-gray-500 font-medium flex items-center gap-2">
                        {info.icon} {info.label}
                      </span>
                      <span className="font-bold text-gray-800">{info.value}</span>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-gray-200 text-[10px] text-gray-400 leading-tight">
                    This is an estimate based on 2024 tax rates and average deductions.
                  </div>
                </div>
              </div>
            </div>

            <button className="flex items-center justify-between w-full p-2 text-blue-700 font-bold text-sm hover:bg-blue-50 rounded-lg transition-colors group">
              <span className="flex items-center gap-2">
                <ChevronUp size={14} className="rotate-90 text-blue-500" /> 
                How this is calculated
              </span>
              <ChevronUp size={14} className="rotate-180 text-blue-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}