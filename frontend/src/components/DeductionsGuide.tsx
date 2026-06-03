"use client";

import { ArrowLeft, ExternalLink, Receipt, Home, Car, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const KEY_LIMITS: Record<string, { label: string; value: string; note: string }[]> = {
  '2024': [
    { label: "Automatic income production deduction", value: "€750", note: "Applied to all employees automatically" },
    { label: "Commuting minimum threshold", value: "€750", note: "Only costs above this are deductible" },
    { label: "Maximum commuting deduction", value: "€7,000/yr", note: "Per taxpayer" },
    { label: "Home office fixed deduction", value: "€920/yr", note: "Full-time remote; lower for part-time" },
    { label: "Trade union fee deduction", value: "100%", note: "Fully deductible with no cap" },
  ],
  '2025': [
    { label: "Automatic income production deduction", value: "€770", note: "Applied to all employees automatically" },
    { label: "Commuting minimum threshold", value: "€770", note: "Only costs above this are deductible" },
    { label: "Maximum commuting deduction", value: "€7,000/yr", note: "Per taxpayer" },
    { label: "Home office fixed deduction", value: "€960/yr", note: "Full-time remote; lower for part-time" },
    { label: "Trade union fee deduction", value: "100%", note: "Fully deductible with no cap" },
  ],
  '2026': [
    { label: "Automatic income production deduction", value: "€800", note: "Applied to all employees automatically" },
    { label: "Commuting minimum threshold", value: "€800", note: "Only costs above this are deductible" },
    { label: "Maximum commuting deduction", value: "€7,000/yr", note: "Per taxpayer" },
    { label: "Home office fixed deduction", value: "€1,000/yr", note: "Full-time remote; lower for part-time" },
    { label: "Trade union fee deduction", value: "100%", note: "Fully deductible with no cap" },
  ],
};

export default function DeductionsGuide({ onBack }: { onBack: () => void }) {
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [limitsYear, setLimitsYear] = useState<string>('2024');

  const keyLimits = KEY_LIMITS[limitsYear];

  const deductions = [
    { icon: <Car size={16} className="text-blue-600" />, label: "Commuting costs", amount: "Up to €7,000/yr", detail: "Deduct travel costs between home and work if they exceed €750/year. Use the cheapest route (public transport first).", bg: "bg-blue-50" },
    { icon: <Home size={16} className="text-emerald-600" />, label: "Home office", amount: "€920 or actual costs", detail: "If you work from home regularly, deduct a fixed amount or actual extra costs (electricity, internet, etc.).", bg: "bg-emerald-50" },
    { icon: <GraduationCap size={16} className="text-purple-600" />, label: "Professional development", amount: "Actual costs", detail: "Courses, books, and training directly related to your current profession are deductible as income production expenses.", bg: "bg-purple-50" },
    { icon: <Receipt size={16} className="text-orange-600" />, label: "Trade union fees", amount: "100% deductible", detail: "Membership fees paid to a Finnish trade union are fully deductible from your taxable income.", bg: "bg-orange-50" },
  ];

  const sections = [
    { title: "What is the earned income deduction?", content: "Finland automatically applies an earned income deduction (palkkatulovähennys) to reduce your municipal taxable income. This benefits lower and middle earners and is calculated automatically — you don't need to claim it manually." },
    { title: "How do I claim commuting deductions?", content: "If your commuting costs exceed €750 per year, you can deduct the excess up to €7,000. Use the cheapest realistic route (usually public transport). If driving is necessary, use the per-km rate set by Vero. Claim via MyTax or your pre-filled return." },
    { title: "Can I deduct loan interest?", content: "Interest on a home loan for your primary residence is only partially deductible in Finland, and the deductible share has been reduced over the years. For 2024, check vero.fi for the current allowable percentage as it changes annually." },
    { title: "What counts as an income production expense?", content: "Expenses necessary to earn your income that exceed the €750 automatic deduction. Examples include tools, work clothing required for your job, professional literature, and a second phone or computer used solely for work." },
    { title: "Are donations deductible?", content: "Donations of €850–€500,000 to approved Finnish scientific or cultural organisations are deductible. The donation must go to an organisation approved by Vero. Check the approved list on vero.fi before claiming." },
  ];

  const links = [
    { label: "Vero — Deductions for employees", url: "https://www.vero.fi/en/individuals/tax-card-and-tax-return/deductions/", desc: "Full official list of deductible expenses for wage earners." },
    { label: "Vero — Commuting deductions", url: "https://www.vero.fi/en/individuals/tax-card-and-tax-return/deductions/commuting-expenses/", desc: "Rules and limits for deducting travel between home and work." },
    { label: "MyTax — Claim deductions online", url: "https://www.vero.fi/en/e-file/mytax/", desc: "Submit or amend deductions via the MyTax portal." },
    { label: "Vero — Home office deduction", url: "https://www.vero.fi/en/individuals/tax-card-and-tax-return/deductions/expenses-for-the-production-of-income/", desc: "Guidance on deducting home office and work-from-home costs." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10 w-full">

      {/* Hero Header */}
      <div className="bg-blue-700 rounded-lg shadow-sm p-8 text-white mb-8">
        <div className="max-w-3xl">
          {/* Functional Back Button */}
          <button 
            onClick={onBack} 
            className="inline-flex items-center text-sm text-blue-100 hover:text-white mb-6 font-medium transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" /> 
            Back to Guides
          </button>

          <div className="block">
            <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider bg-blue-600 px-2.5 py-1 rounded">Deductions</span>
            <h2 className="text-3xl font-bold mt-4 mb-2">Tax deductions you might be missing</h2>
            <p className="text-blue-100 text-sm md:text-base">Home-office expenses, commute deductions, union fees, and more — legitimate ways to reduce your taxable income.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">

          {/* Deduction cards */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2"><Receipt size={15} className="text-slate-600" /> Top deductions for employees</h3>
            <div className="space-y-3">
              {deductions.map((d, i) => (
                <div key={i} className={`flex items-start gap-4 p-4 rounded-xl ${d.bg}`}>
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                    {d.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-sm font-bold text-gray-800">{d.label}</span>
                      <span className="text-xs font-bold text-gray-600 bg-white px-2.5 py-1 rounded-full shadow-sm">{d.amount}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{d.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key limits with year dropdown */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-800">
                Key limits at a glance ({limitsYear})
              </h3>
              <select
                value={limitsYear}
                onChange={(e) => setLimitsYear(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
            <div className="space-y-2">
              {keyLimits.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-b-0">
                  <div>
                    <div className="text-sm text-gray-700 font-medium">{item.label}</div>
                    <div className="text-[11px] text-gray-400">{item.note}</div>
                  </div>
                  <span className="text-sm font-bold text-blue-700 flex-shrink-0 ml-4">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ accordion */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-800">Deduction questions answered</h3>
            </div>
            {sections.map((s, i) => (
              <div key={i} className="border-b border-gray-50 last:border-b-0">
                <button
                  onClick={() => setOpenSection(openSection === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-semibold text-gray-800 pr-4">{s.title}</span>
                  {openSection === i
                    ? <ChevronUp size={15} className="text-blue-500 flex-shrink-0" />
                    : <ChevronDown size={15} className="text-gray-400 flex-shrink-0" />}
                </button>
                {openSection === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-gray-500 leading-relaxed">{s.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2"><ExternalLink size={14} className="text-blue-600" /> Useful links</h3>
            <div className="space-y-3">
              {links.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="block p-3 bg-emerald-50 rounded-lg hover:bg-slate-100 transition-colors group">
                  <div className="text-sm font-semibold text-emerald-700 group-hover:text-emerald-900 flex items-center gap-1.5">
                    {link.label} <ExternalLink size={11} className="flex-shrink-0" />
                  </div>
                  <div className="text-[11px] text-emerald-600 mt-0.5 leading-relaxed">{link.desc}</div>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-amber-800 mb-1">Quick tip</p>
            <p className="text-xs text-amber-700 leading-relaxed">Check your pre-filled tax return every spring. Vero may not know about all your deductions — especially commuting costs and home office use — so always review and add them manually via MyTax.</p>
          </div>
        </div>
      </div>
    </div>
  );
}