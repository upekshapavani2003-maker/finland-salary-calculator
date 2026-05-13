"use client";

import { useState } from 'react';
import { MapPin, Info } from 'lucide-react';

const ALL_CITIES = [
  { city: "Helsinki", region: "Uusimaa", municipalTax: 21.0, netSalary: 2850, takeHomePct: 71.3, annualNet: 34200, regionKey: "South Finland" },
  { city: "Espoo", region: "Uusimaa", municipalTax: 21.0, netSalary: 2850, takeHomePct: 71.3, annualNet: 34200, regionKey: "South Finland" },
  { city: "Tampere", region: "Pirkanmaa", municipalTax: 21.5, netSalary: 2830, takeHomePct: 70.8, annualNet: 33960, regionKey: "West Finland" },
  { city: "Turku", region: "Southwest Finland", municipalTax: 18.5, netSalary: 2730, takeHomePct: 69.8, annualNet: 33480, regionKey: "South Finland" },
  { city: "Jyväskylä", region: "Central Finland", municipalTax: 18.0, netSalary: 2770, takeHomePct: 69.3, annualNet: 33240, regionKey: "West Finland" },
  { city: "Oulu", region: "North Ostrobothnia", municipalTax: 19.5, netSalary: 2750, takeHomePct: 68.8, annualNet: 33000, regionKey: "North Finland" },
  { city: "Kuopio", region: "North Savo", municipalTax: 20.0, netSalary: 2730, takeHomePct: 68.3, annualNet: 32760, regionKey: "East Finland" },
  { city: "Rovaniemi", region: "Lapland", municipalTax: 23.0, netSalary: 2690, takeHomePct: 67.3, annualNet: 32280, regionKey: "Lapland" },
];

const REGIONS = ["All regions", "South Finland", "West Finland", "East Finland", "North Finland", "Lapland"];

export default function SalaryByCityScreen() {
  const [activeRegion, setActiveRegion] = useState("All regions");
  const [grossInput, setGrossInput] = useState("4,000");

  const filtered = activeRegion === "All regions"
    ? ALL_CITIES
    : ALL_CITIES.filter(c => c.regionKey === activeRegion);

  const maxNet = Math.max(...filtered.map(c => c.netSalary));
  const minNet = Math.min(...filtered.map(c => c.netSalary));
  const diff = maxNet - minNet;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">

      {/* Hero Header */}
      <div className="bg-blue-700 rounded-lg shadow-sm p-8 text-white mb-8">
        <div className="max-w-3xl">
          <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider bg-blue-600 px-2.5 py-1 rounded">
            Compare cities
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-2">Salary by City</h2>
          <p className="text-blue-100 text-sm md:text-base">
            Compare take-home pay across Finnish municipalities. Enter a gross salary to see net results side by side.
          </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-3">
          Enter a gross salary to compare
        </p>
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
            <input
              type="text"
              value={grossInput}
              onChange={(e) => setGrossInput(e.target.value)}
              className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="4,000 / month"
            />
          </div>
          <button className="bg-blue-700 hover:bg-gray-800 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap">
            Compare all cities
          </button>
        </div>

        {/* Region Filters */}
        <div className="flex flex-wrap gap-2">
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                activeRegion === region
                  ? "bg-blue-700 text-white border-blue-700"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-4">
        <div className="px-6 py-3 border-b border-gray-100">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-blue-600">
            Results for € {grossInput} gross / month
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-400">City</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-400">Municipal tax</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-400">Net salary</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-400">Take-home %</th>
                <th className="text-right px-6 py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-400">Annual net</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => {
                const barWidth = 40 + ((row.netSalary - minNet) / (maxNet - minNet + 1)) * 60;
                return (
                  <tr key={row.city} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-semibold text-gray-800">{row.city}</div>
                          <div className="text-[11px] text-gray-400">{row.region}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-red-500">{row.municipalTax.toFixed(2)}%</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-gray-800">€ {row.netSalary.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-1.5 bg-blue-700 rounded-full"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{row.takeHomePct}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <span className="text-sm font-semibold text-gray-800">€ {row.annualNet.toLocaleString()}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t border-gray-100">
          <p className="text-[11px] text-gray-400">
            Based on 2024 municipal tax rates. Net salary shown for €4,000 gross/month with no church tax.
          </p>
        </div>
      </div>

      {/* Tip Box */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 leading-relaxed">
          <span className="font-semibold">Tip:</span> Moving from Rovaniemi to Helsinki on the same gross salary gives you approx.{" "}
          <span className="font-semibold">€ {diff} more per month</span> — but the higher cost of living in Helsinki may offset this benefit.
        </p>
      </div>

    </div>
  );
}