"use client";

import { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react'; // Added ArrowLeft

interface SalaryByCityProps {
  onNavigate: (tab: string) => void;
}

const TAX_RATES: Record<string, number> = {
  Helsinki: 17.0,
  Espoo: 17.0,
  Tampere: 17.5,
  Turku: 18.5,
  Oulu: 19.5,
  Jyväskylä: 19.0,
  Kuopio: 20.0,
  Lahti: 20.5,
  Rovaniemi: 22.0,
  Vaasa: 19.0,
  Joensuu: 21.0,
  Pori: 20.0,
};

const BASE_CITIES = [
  { city: "Helsinki", region: "Uusimaa", regionKey: "South Finland" },
  { city: "Espoo", region: "Uusimaa", regionKey: "South Finland" },
  { city: "Tampere", region: "Pirkanmaa", regionKey: "West Finland" },
  { city: "Turku", region: "Southwest Finland", regionKey: "South Finland" },
  { city: "Oulu", region: "North Ostrobothnia", regionKey: "North Finland" },
  { city: "Jyväskylä", region: "Central Finland", regionKey: "West Finland" },
  { city: "Kuopio", region: "North Savo", regionKey: "East Finland" },
  { city: "Lahti", region: "Päijät-Häme", regionKey: "South Finland" },
  { city: "Rovaniemi", region: "Lapland", regionKey: "North Finland" },
  { city: "Vaasa", region: "Ostrobothnia", regionKey: "West Finland" },
  { city: "Joensuu", region: "North Karelia", regionKey: "East Finland" },
  { city: "Pori", region: "Satakunta", regionKey: "West Finland" },
];

const REGIONS = ["All cities", "South Finland", "West Finland", "North Finland", "East Finland"];

function calculateNet(gross: number, municipalTax: number): number {
  if (gross <= 0) return 0;
  const pension = gross * 0.0715;
  const unemployment = gross * 0.015;
  const stateTax = gross * 0.10;
  const municipal = gross * (municipalTax / 100);
  return gross - pension - unemployment - stateTax - municipal;
}

export default function SalaryByCity({ onNavigate }: SalaryByCityProps) {
  const [activeRegion, setActiveRegion] = useState("All cities");
  const [searchQuery, setSearchQuery] = useState("");
  const [grossInput, setGrossInput] = useState("");
  const [calculatedGross, setCalculatedGross] = useState(0);
  const [hasCompared, setHasCompared] = useState(false);

  const handleCompare = () => {
    const parsed = parseFloat(grossInput.replace(/,/g, ''));
    if (!isNaN(parsed) && parsed > 0) {
      setCalculatedGross(parsed);
      setHasCompared(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleCompare();
  };

  const filtered = BASE_CITIES.filter((c) => {
    const matchesRegion = activeRegion === "All cities" || c.regionKey === activeRegion;
    const matchesSearch = searchQuery === "" || c.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const taxColor = (tax: number) => {
    if (tax <= 17.5) return "text-green-600";
    if (tax <= 19.5) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10 w-full">

      {/* Hero Header */}
      <div className="bg-blue-700 rounded-lg shadow-sm p-8 text-white mb-8">
        <div className="max-w-3xl">
          {/* Functional Back Button */}
          <button 
            onClick={() => onNavigate('calculator')} 
            className="inline-flex items-center text-sm text-blue-100 hover:text-white mb-6 font-medium transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" /> 
            Back to Calculator
          </button>

          <div className="block">
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
              onKeyDown={handleKeyDown}
              className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0 / monthly"
            />
          </div>
          <button
            onClick={handleCompare}
            className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-3 py-2.5 rounded-lg transition-colors whitespace-nowrap"
          >
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
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
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
                <th className="text-left px-4 py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-400">
                  Net salary
                </th>
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
                  const municipalTax = TAX_RATES[row.city] ?? 20.0;
                  const netSalary = hasCompared ? calculateNet(calculatedGross, municipalTax) : 0;
                  const takeHomePct = hasCompared && calculatedGross > 0
                    ? (netSalary / calculatedGross) * 100
                    : 0;

                  return (
                    <tr
                      key={row.city}
                      className="border-b border-gray-50 last:border-b-0 hover:bg-blue-50/30 transition-colors"
                    >
                      {/* City */}
                      <td className="px-6 py-3.5">
                        <div>
                          <div className="text-sm font-semibold text-gray-800">{row.city}</div>
                          <div className="text-[11px] text-gray-400">{row.region}</div>
                        </div>
                      </td>

                      {/* Municipal tax */}
                      <td className="px-4 py-3.5">
                        <span className={`text-sm font-semibold ${taxColor(municipalTax)}`}>
                          {municipalTax.toFixed(2)}%
                        </span>
                      </td>

                      {/* Net salary */}
                      <td className="px-4 py-3.5">
                        {hasCompared && netSalary > 0 ? (
                          <span className="text-sm font-semibold text-gray-800">
                            € {Math.round(netSalary).toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-sm font-semibold text-gray-300">€ 0</span>
                        )}
                      </td>

                      {/* Take-home % */}
                      <td className="px-4 py-3.5">
                        {hasCompared && takeHomePct > 0 ? (
                          <span className="text-sm font-semibold text-gray-700">
                            {takeHomePct.toFixed(1)}%
                          </span>
                        ) : (
                          <span className="text-sm font-semibold text-gray-300">0%</span>
                        )}
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
            {hasCompared
              ? `Net salary shown for €${calculatedGross.toLocaleString()} gross/month based on 2024 tax rates.`
              : 'Enter a salary above and click Compare cities to see results.'
            }
          </p>
        </div>
      </div>

    </div>
  );
}