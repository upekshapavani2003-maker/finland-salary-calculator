"use client";

import { useState, useEffect } from 'react';
import { X, TrendingUp, Building2, Coins, ShieldCheck, Church, Banknote } from 'lucide-react';

const BRACKETS = [
  { min: 0,     max: 19900,    rate: 0,     label: "€0 – €19,900" },
  { min: 19900, max: 29700,    rate: 12.64, label: "€19,900 – €29,700" },
  { min: 29700, max: 49000,    rate: 19.00, label: "€29,700 – €49,000" },
  { min: 49000, max: 85800,    rate: 25.00, label: "€49,000 – €85,800" },
  { min: 85800, max: Infinity, rate: 31.25, label: "€85,800 +" },
];

interface Props {
  grossMonthly: number;
  municipalityRate: number;
  churchMember: boolean;
  taxYear: string;
  onClose: () => void;
}

export default function TaxBracketsModal({
  grossMonthly,
  municipalityRate,
  churchMember,
  taxYear,
  onClose,
}: Props) {
  const fmt = (n: number) => Math.round(n).toLocaleString();
  const fmtD = (n: number) => n.toFixed(2);

  const annual = grossMonthly * 12;

  const bracketData = BRACKETS.map(b => {
    if (annual <= b.min) return { ...b, taxable: 0, tax: 0, active: false };
    const taxable = Math.min(annual, b.max) - b.min;
    const tax = taxable * b.rate / 100;
    return { ...b, taxable, tax, active: true };
  });

  const stateTaxAnnual = bracketData.reduce((acc, b) => acc + b.tax, 0);
  const stateTax   = stateTaxAnnual / 12;
  const muniTax    = grossMonthly * municipalityRate / 100;
  const pension    = grossMonthly * 0.0715;
  const unemp      = grossMonthly * 0.015;
  const church     = churchMember ? grossMonthly * 0.01 : 0;
  const totalTax   = stateTax + muniTax + pension + unemp + church;
  const net        = grossMonthly - totalTax;
  const effRate    = grossMonthly > 0 ? (totalTax / grossMonthly) * 100 : 0;

  const maxBracketTax = Math.max(...bracketData.map(b => b.tax), 1);
  const activeBrackets = bracketData.filter(b => b.tax > 0).length;
  const topBracket = [...bracketData].reverse().find(b => b.tax > 0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const deductions = [
    { label: "State income tax", amount: stateTax, pct: grossMonthly > 0 ? (stateTax / grossMonthly) * 100 : 0, color: "bg-indigo-400" },
    { label: `Municipal tax (${fmtD(municipalityRate)}%)`, amount: muniTax, pct: municipalityRate, color: "bg-amber-400" },
    { label: "Pension contribution (7.15%)", amount: pension, pct: 7.15, color: "bg-emerald-400" },
    { label: "Unemployment insurance (1.50%)", amount: unemp, pct: 1.50, color: "bg-blue-400" },
    ...(churchMember ? [{ label: "Church tax (1.00%)", amount: church, pct: 1.00, color: "bg-purple-400" }] : []),
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

        {/* Modal Header */}
        <div className="bg-blue-700 rounded-t-2xl p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-blue-200 text-[10px] font-semibold uppercase tracking-wider bg-blue-600 px-2.5 py-1 rounded inline-block mb-3">
                Tax breakdown — {taxYear}
              </span>
              <h2 className="text-2xl font-bold mb-1">Tax brackets used for your salary</h2>
              <p className="text-blue-100 text-sm">
                Based on €{fmt(grossMonthly)}/month gross · Municipal tax {fmtD(municipalityRate)}% · {churchMember ? 'Church tax included' : 'No church tax'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/15 hover:bg-white/25 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">

          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Gross / month", value: `€ ${fmt(grossMonthly)}`, sub: `€ ${fmt(annual)} / yr` },
              { label: "Total tax", value: `€ ${fmt(totalTax)}`, sub: `${fmtD(effRate)}% effective` },
              { label: "Net take-home", value: `€ ${fmt(net)}`, sub: `€ ${fmt(net * 12)} / yr`, highlight: true },
              { label: "Brackets reached", value: `${activeBrackets}`, sub: `Top: ${topBracket ? topBracket.rate + '%' : '0%'}` },
            ].map((s, i) => (
              <div key={i} className={`rounded-xl p-4 ${s.highlight ? 'bg-emerald-50 border border-emerald-100' : 'bg-gray-50'}`}>
                <div className={`text-xl font-bold ${s.highlight ? 'text-emerald-600' : 'text-gray-800'}`}>{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Brackets table */}
          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-3">
              State income tax brackets (annual income: €{fmt(annual)})
            </p>
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="grid grid-cols-5 gap-2 px-4 py-2 bg-gray-50 text-[10px] font-semibold tracking-widest uppercase text-gray-400">
                <span className="col-span-2">Income bracket</span>
                <span>Rate</span>
                <span>Taxable amount</span>
                <span>Tax charged</span>
              </div>
              {bracketData.map((b, i) => {
                const barW = b.tax > 0 ? Math.max((b.tax / maxBracketTax) * 100, 4) : 0;
                const applies = b.active && b.rate > 0;
                return (
                  <div
                    key={i}
                    className={`grid grid-cols-5 gap-2 items-center px-4 py-3 border-t border-gray-100 ${applies ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className="col-span-2 flex items-center gap-2">
                      <span className={`text-sm font-medium ${applies ? 'text-gray-800' : 'text-gray-400'}`}>{b.label}</span>
                      {applies && (
                        <span className="text-[9px] font-semibold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">applies</span>
                      )}
                    </div>
                    <span className={`text-sm font-semibold ${applies ? 'text-blue-700' : 'text-gray-300'}`}>
                      {b.rate === 0 ? '0%' : `${b.rate}%`}
                    </span>
                    <span className={`text-sm ${applies ? 'text-gray-600' : 'text-gray-300'}`}>
                      {b.taxable > 0 ? `€ ${fmt(b.taxable)}` : '—'}
                    </span>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-medium ${b.tax > 0 ? 'text-red-500' : 'text-gray-300'}`}>
                          {b.tax > 0 ? `− € ${fmt(b.tax)}` : '—'}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-1.5 bg-blue-600 rounded-full" style={{ width: `${barW}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-between items-center px-4 py-3 bg-indigo-50 border-t border-indigo-100">
                <span className="text-sm font-semibold text-indigo-700">Total state tax (annual)</span>
                <span className="text-sm font-semibold text-red-500">− € {fmt(stateTaxAnnual)}</span>
              </div>
            </div>
          </div>

          {/* Deductions breakdown */}
          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-3">
              Monthly deduction breakdown
            </p>
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              {deductions.map((d, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-gray-50 last:border-b-0">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${d.color}`} />
                    <span className="text-sm text-gray-600">{d.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${d.color}`}
                        style={{ width: `${Math.min((d.amount / grossMonthly) * 100 * 3, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-10 text-right">{fmtD(d.pct)}%</span>
                    <span className="text-sm font-semibold text-red-500 w-20 text-right">− € {fmt(d.amount)}</span>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center px-4 py-4 bg-emerald-50 border-t border-emerald-100">
                <div className="flex items-center gap-2">
                  <Banknote size={15} className="text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700">Net take-home</span>
                </div>
                <span className="text-base font-bold text-emerald-600">€ {fmt(net)} / month</span>
              </div>
            </div>
          </div>

          {/* Info note */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <p className="text-xs text-amber-800 leading-relaxed">
              <span className="font-semibold">How this works:</span> Your annual income of €{fmt(annual)} is spread across {activeBrackets} state tax bracket{activeBrackets !== 1 ? 's' : ''}. Only the income within each bracket is taxed at that bracket's rate — not your full salary. The highest bracket you reach is {topBracket ? topBracket.rate + '%' : '0%'}, but your effective rate is only {fmtD(effRate)}%.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}