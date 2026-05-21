"use client";

import { useState } from 'react';
import {
  Info,
  TrendingUp,
  Banknote,
  Landmark,
  Building2,
  Coins,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function HowTaxesWork() {
  const [openNote, setOpenNote] = useState(false);

  const brackets = [
    { range: "€0 – €19,900", rate: "0%", pct: 0 },
    { range: "€19,900 – €29,700", rate: "12.5%", pct: 40 },
    { range: "€29,700 – €49,000", rate: "19.0%", pct: 65 },
    { range: "€49,000 – €85,800", rate: "25.0%", pct: 80 },
    { range: "€85,800+", rate: "31.25%", pct: 100 },
  ];

  const twoTierItems = [
    {
      icon: <TrendingUp className="w-4 h-4 text-blue-600" />,
      title: "National (state) income tax",
      text: "Finland uses a progressive national tax — the more you earn, the higher the rate on the portion above each threshold. Lower earners pay little to nothing; higher earners pay up to 31.25% on their top income band. This is collected by the state and funds national services like healthcare and education.",
    },
    {
      icon: <Landmark className="w-4 h-4 text-blue-600" />,
      title: "Municipal (local) tax",
      text: "On top of state tax, every municipality charges a flat local tax — the same percentage regardless of how much you earn. Rates vary by city; Helsinki charges 21% while some northern municipalities charge up to 23%. This funds local schools, roads, and social services.",
    },
  ];

  const deductionItems = [
    {
      icon: <Coins className="w-4 h-4 text-blue-600" />,
      title: "Pension contribution (TyEL)",
      text: "7.15% of your gross salary goes toward your statutory pension. This is not a tax — it builds your personal retirement pot — but it does reduce your take-home pay.",
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-blue-600" />,
      title: "Unemployment insurance",
      text: "1.50% of your salary goes to unemployment insurance. This entitles you to earnings-related unemployment benefit if you lose your job.",
    },
    {
      icon: <Building2 className="w-4 h-4 text-blue-600" />,
      title: "Church tax (optional)",
      text: "Members of the Evangelical Lutheran or Orthodox Church pay an additional 1–2% church tax, varying by parish. Non-members don't pay this. You can resign church membership at any time via the Digital and Population Data Services Agency.",
    },
  ];

  const exampleRows = [
    { label: "Gross salary", value: "€ 4,000", type: "normal" },
    { label: "State income tax", value: "− €400", type: "deduction" },
    { label: "Municipal tax (Helsinki 21%)", value: "− €556", type: "deduction" },
    { label: "Pension + unemployment", value: "− €348", type: "deduction" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10 w-full">

      {/* Hero Header */}
      <div className="bg-blue-700 rounded-lg shadow-sm p-8 text-white mb-8">
        <div className="max-w-3xl">
          <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider bg-blue-600 px-2.5 py-1 rounded">
            Tax basics
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-2">How taxes work in Finland</h2>
          <p className="text-blue-100 text-sm md:text-base">
            A plain-language guide to the Finnish tax system — from income brackets to municipal rates, explained simply.
          </p>
        </div>
      </div>

      {/* Two-tier tax system */}
      <p className="text-sm font-semibold tracking-widest uppercase text-gray-400 mb-4">
        The two-tier tax system
      </p>

      <div className="space-y-4 mb-6">
        {twoTierItems.map((item) => (
          <div key={item.title} className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              {item.icon}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-6 border-gray-100" />

      {/* Other deductions */}
      <p className="text-sm font-semibold tracking-widest uppercase text-gray-400 mb-4">
        Other deductions
      </p>

      <div className="space-y-4 mb-6">
        {deductionItems.map((item) => (
          <div key={item.title} className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              {item.icon}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-6 border-gray-100" />

      {/* Tax Brackets */}
      <p className="text-sm font-semibold tracking-widest uppercase text-gray-400 mb-4">
        State income tax brackets (2026)
      </p>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-4">
        <div className="grid grid-cols-[1fr_2fr_52px] gap-2 px-4 py-2 bg-gray-50 text-[10px] font-semibold tracking-widest uppercase text-gray-400">
          <span>Income band</span>
          <span>Rate bar</span>
          <span className="text-right">Rate</span>
        </div>
        {brackets.map((b) => (
          <div
            key={b.range}
            className="grid grid-cols-[1fr_2fr_52px] gap-2 items-center px-4 py-2.5 border-t border-gray-100"
          >
            <span className="text-xs font-medium text-gray-800">{b.range}</span>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-1.5 bg-blue-700 rounded-full transition-all duration-500"
                style={{ width: `${b.pct}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-blue-700 text-right">{b.rate}</span>
          </div>
        ))}
      </div>

      {/* Good to know toggle */}
      <div className="bg-amber-50 border border-amber-100 rounded-lg overflow-hidden mb-8">
        <button
          onClick={() => setOpenNote(!openNote)}
          className="w-full flex items-center justify-between px-4 py-3 text-left"
        >
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-semibold text-amber-800">Good to know</span>
          </div>
          {openNote
            ? <ChevronUp className="w-4 h-4 text-amber-600" />
            : <ChevronDown className="w-4 h-4 text-amber-600" />
          }
        </button>
        {openNote && (
          <div className="px-4 pb-3">
            <p className="text-xs text-amber-800 leading-relaxed">
              Only the income within each bracket is taxed at that rate — not your entire salary.
              Earning €38,000 does not mean all of it is taxed at 19%. Each band is taxed
              independently.
            </p>
          </div>
        )}
      </div>

      <hr className="my-6 border-gray-100" />

      {/* Quick Example */}
      <p className="text-sm font-semibold tracking-widest uppercase text-gray-400 mb-4">
        Quick example: €4,000 / month gross in Helsinki
      </p>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {exampleRows.map((row) => (
          <div
            key={row.label}
            className="flex justify-between items-center px-4 py-3 border-b border-gray-100"
          >
            <div className="flex items-center gap-2">
              <Banknote className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">{row.label}</span>
            </div>
            <span
              className={`text-sm font-medium ${
                row.type === "deduction" ? "text-red-500" : "text-gray-800"
              }`}
            >
              {row.value}
            </span>
          </div>
        ))}
        <div className="flex justify-between items-center px-4 py-4 bg-blue-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span className="text-sm font-semibold text-gray-800">Net take-home</span>
          </div>
          <span className="text-base font-bold text-blue-700">€ 2,850 / month</span>
        </div>
      </div>

    </div>
  );
}