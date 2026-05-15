"use client";

import { useState } from 'react';
import { MapPin, Search } from 'lucide-react';

const ALL_CITIES = [
  { city: "Helsinki", region: "Uusimaa", municipalTax: 17.0, netSalary: 2850, takeHomePct: 71.3, regionKey: "South Finland" },
  { city: "Espoo", region: "Uusimaa", municipalTax: 17.0, netSalary: 2850, takeHomePct: 71.3, regionKey: "South Finland" },
  { city: "Tampere", region: "Pirkanmaa", municipalTax: 17.5, netSalary: 2830, takeHomePct: 70.8, regionKey: "West Finland" },
  { city: "Turku", region: "Southwest Finland", municipalTax: 18.5, netSalary: 2790, takeHomePct: 69.8, regionKey: "South Finland" },
  { city: "Oulu", region: "North Ostrobothnia", municipalTax: 19.5, netSalary: 2750, takeHomePct: 68.8, regionKey: "North Finland" },
  { city: "Jyväskylä", region: "Central Finland", municipalTax: 19.0, netSalary: 2770, takeHomePct: 69.3, regionKey: "West Finland" },
  { city: "Kuopio", region: "North Savo", municipalTax: 20.0, netSalary: 2730, takeHomePct: 68.3, regionKey: "East Finland" },
  { city: "Lahti", region: "Päijät-Häme", municipalTax: 20.5, netSalary: 2710, takeHomePct: 67.8, regionKey: "South Finland" },
  { city: "Rovaniemi", region: "Lapland", municipalTax: 22.0, netSalary: 2670, takeHomePct: 66.8, regionKey: "North Finland" },
  { city: "Vaasa", region: "Ostrobothnia", municipalTax: 19.0, netSalary: 2770, takeHomePct: 69.3, regionKey: "West Finland" },
  { city: "Joensuu", region: "North Karelia", municipalTax: 21.0, netSalary: 2700, takeHomePct: 67.5, regionKey: "East Finland" },
  { city: "Pori", region: "Satakunta", municipalTax: 20.0, netSalary: 2730, takeHomePct: 68.3, regionKey: "West Finland" },
];

const REGIONS = ["All cities", "South Finland", "West Finland", "North Finland", "East Finland"];

export default function SalaryByCity() {
  const [activeRegion, setActiveRegion] = useState("All cities");
  const [searchQuery, setSearchQuery] = useState("");
  const [grossInput, setGrossInput] = useState("4,000");

  const filtered = ALL_CITIES.filter((c) => {
    const matchesRegion = activeRegion === "All cities" || c.regionKey === activeRegion;
    const matchesSearch = searchQuery === "" || c.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const maxNet = Math.max(...filtered.map(c => c.netSalary));
  const minNet = Math.min(...filtered.map(c => c.netSalary));

  const taxColor = (tax: number) => {
    if (tax <= 17.5) return "text-green-600";
    if (tax <= 19.5) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">

      {/* Hero Header */}
      <div className="bg-blue-700 rounded-lg shadow-sm p-8 text-white mb-8">
        <div className="max-w-3xl">
          <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider bg-blue-600 px-2.5 py-1 rounded">
            Compare cities
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-2">Salary by city</h2>
          <p className="text-blue-100 text-sm md:text-base">
            Compare take-home pay across Finnish cities. See how your municipality affects your net
            salary due to different local tax rates.
          </p>
        </div>
      </div>

      {/* Input + Filter Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-6 mb-6">

        {/* Salary Input */}
        <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-3">
          Enter a salary to compare
        </p>
        <div className="flex gap-3 mb-5">
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
          <button className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors whitespace-nowrap">
            Compare cities
          </button>
        </div>

        {/* Region Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeRegion === region
                  ? "bg-blue-700 text-white border-blue-700"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a city..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
          />
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-400">City</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-400">Municipal tax</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-400">Net salary (€4k gross)</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-400">Take-home %</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-400">
                    No cities found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((row) => {
                  const barWidth = 30 + ((row.netSalary - minNet) / (maxNet - minNet + 1)) * 70;
                  return (
                    <tr
                      key={row.city}
                      className="border-b border-gray-50 last:border-b-0 hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-semibold text-gray-800">{row.city}</div>
                            <div className="text-[11px] text-gray-400">{row.region}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`text-sm font-semibold ${taxColor(row.municipalTax)}`}>
                          {row.municipalTax.toFixed(2)}%
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-sm font-semibold text-gray-800">
                          € {row.netSalary.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-1.5 bg-blue-700 rounded-full"
                              style={{ width: `${barWidth}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-10">{row.takeHomePct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer note */}
        <div className="px-6 py-3 border-t border-gray-100">
          <p className="text-[11px] text-gray-400">
            Based on 2024 tax rates. Net salary shown for €4,000 gross/month.
          </p>
        </div>
      </div>

    </div>
  );
}