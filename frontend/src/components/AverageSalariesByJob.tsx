"use client";

import { useState } from 'react';
import { Briefcase, TrendingUp, Info } from 'lucide-react';

const ALL_JOBS = [
  { title: "Software developer", sector: "Technology", avgGross: 5200, netHelsinki: 3540, rangeMin: 3800, rangeMax: 8500, demand: "High demand" },
  { title: "Registered nurse", sector: "Healthcare", avgGross: 3100, netHelsinki: 2240, rangeMin: 2600, rangeMax: 4200, demand: "High demand" },
  { title: "Financial analyst", sector: "Finance", avgGross: 4800, netHelsinki: 3300, rangeMin: 3500, rangeMax: 7000, demand: "Moderate" },
  { title: "Primary school teacher", sector: "Education", avgGross: 3400, netHelsinki: 2440, rangeMin: 2900, rangeMax: 4500, demand: "Moderate" },
  { title: "Mechanical engineer", sector: "Engineering", avgGross: 4200, netHelsinki: 2940, rangeMin: 3200, rangeMax: 6000, demand: "High demand" },
  { title: "Physician (GP)", sector: "Healthcare", avgGross: 7500, netHelsinki: 4800, rangeMin: 5500, rangeMax: 12000, demand: "High demand" },
  { title: "Electrician", sector: "Trades", avgGross: 3600, netHelsinki: 2560, rangeMin: 2800, rangeMax: 5200, demand: "High demand" },
  { title: "Marketing manager", sector: "Business", avgGross: 4500, netHelsinki: 3140, rangeMin: 3200, rangeMax: 6500, demand: "Moderate" },
  { title: "Warehouse worker", sector: "Logistics", avgGross: 2400, netHelsinki: 1840, rangeMin: 2000, rangeMax: 3200, demand: "Lower" },
];

const SECTORS = ["All sectors", "Technology", "Healthcare", "Finance", "Education", "Engineering", "Trades"];

const demandStyle: Record<string, string> = {
  "High demand": "bg-green-50 text-green-700 border border-green-200",
  "Moderate":    "bg-orange-50 text-orange-600 border border-orange-200",
  "Lower":       "bg-red-50 text-red-500 border border-red-200",
};

export default function AverageSalariesByJob() {
  const [activeSector, setActiveSector] = useState("All sectors");

  const filtered = activeSector === "All sectors"
    ? ALL_JOBS
    : ALL_JOBS.filter(j => j.sector === activeSector);

  const medianGross = 3900;
  const medianNet   = 2780;
  const avgTakeHome = 71.3;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">

      {/* Hero Header */}
      <div className="bg-blue-700 rounded-lg shadow-sm p-8 text-white mb-8">
        <div className="max-w-3xl">
          <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider bg-blue-600 px-2.5 py-1 rounded">
            Professions
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-2">Average salaries by job</h2>
          <p className="text-blue-100 text-sm md:text-base">
            Check gross and net take-home pay by profession in Finland. All figures are
            based on 2024 market data and Helsinki municipal tax.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
          <div className="text-2xl font-bold text-gray-900">€ {medianGross.toLocaleString()}</div>
          <div className="text-xs text-gray-400 mt-1">Median gross salary (Finland)</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
          <div className="text-2xl font-bold text-gray-900">€ {medianNet.toLocaleString()}</div>
          <div className="text-xs text-gray-400 mt-1">Median net take-home</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
          <div className="text-2xl font-bold text-gray-900">{avgTakeHome}%</div>
          <div className="text-xs text-gray-400 mt-1">Average take-home rate</div>
        </div>
      </div>

      {/* Sector Filter */}
      <div className="mb-4">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-3">
          Filter by sector
        </p>
        <div className="flex flex-wrap gap-2">
          {SECTORS.map((sector) => (
            <button
              key={sector}
              onClick={() => setActiveSector(sector)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeSector === sector
                  ? "bg-blue-700 text-white border-blue-700"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {sector}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-400">Job title</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-400">Avg gross</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-400">Net Helsinki</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-400">Salary range</th>
                <th className="text-right px-6 py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-400">Job demand</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr
                  key={row.title}
                  className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-gray-800">{row.title}</div>
                        <div className="text-[11px] text-gray-400">{row.sector}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-700">
                      € {row.avgGross.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-blue-600">
                      € {row.netHelsinki.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-500">
                      € {row.rangeMin.toLocaleString()} – € {row.rangeMax.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${demandStyle[row.demand]}`}>
                      {row.demand}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer note */}
        <div className="px-6 py-3 border-t border-gray-100">
          <p className="text-[11px] text-gray-400">
            Net salary shown based on Helsinki municipal tax (17%). Figures are estimates based on 2024 market averages. Actual salaries vary by employer and experience.
          </p>
        </div>
      </div>

      {/* Tip Box */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 leading-relaxed">
          <span className="font-semibold">Try it yourself.</span> Click any job row to pre-fill the
          calculator with that salary and see your personal tax breakdown instantly.
        </p>
      </div>

    </div>
  );
}