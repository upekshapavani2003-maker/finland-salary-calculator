"use client";

import { useState } from 'react';
import { Info } from 'lucide-react';

const BASE_CITIES = [
  { city: "Helsinki", region: "Uusimaa", municipalTax: 21.0, regionKey: "South Finland" },
  { city: "Espoo", region: "Uusimaa", municipalTax: 21.0, regionKey: "South Finland" },
  { city: "Tampere", region: "Pirkanmaa", municipalTax: 21.5, regionKey: "West Finland" },
  { city: "Turku", region: "Southwest Finland", municipalTax: 18.5, regionKey: "South Finland" },
  { city: "Jyväskylä", region: "Central Finland", municipalTax: 18.0, regionKey: "West Finland" },
  { city: "Oulu", region: "North Ostrobothnia", municipalTax: 19.5, regionKey: "North Finland" },
  { city: "Kuopio", region: "North Savo", municipalTax: 20.0, regionKey: "East Finland" },
  { city: "Rovaniemi", region: "Lapland", municipalTax: 23.0, regionKey: "Lapland" },
];

const REGIONS = ["All regions", "South Finland", "West Finland", "East Finland", "North Finland", "Lapland"];

function calculateNet(gross: number, municipalTax: number): number {
  if (gross <= 0) return 0;
  const pension = gross * 0.0715;
  const unemployment = gross * 0.015;
  const stateTax = gross * 0.10;
  const municipal = gross * (municipalTax / 100);
  return gross - pension - unemployment - stateTax - municipal;
}

export default function SalaryByCityScreen() {
  const [activeRegion, setActiveRegion] = useState("All regions");
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

  const filtered = activeRegion === "All regions"
    ? BASE_CITIES
    : BASE_CITIES.filter(c => c.regionKey === activeRegion);

  const computedRows = filtered.map(row => {
    const net = hasCompared ? calculateNet(calculatedGross, row.municipalTax) : 0;
    const takeHomePct = hasCompared && calculatedGross > 0
      ? (net / calculatedGross) * 100
      : 0;
    const annualNet = net * 12;
    return { ...row, net, takeHomePct, annualNet };
  });

  const maxNet = hasCompared ? Math.max(...computedRows.map(r => r.net)) : 0;
  const minNet = hasCompared ? Math.min(...computedRows.map(r => r.net)) : 0;
  const diff = Math.round(maxNet - minNet);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10 w-full">

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
              onKeyDown={handleKeyDown}
              className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter gross monthly salary"
            />
          </div>
          <button
            onClick={handleCompare}
            className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
          >
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
            {hasCompared
              ? `Results for € ${calculatedGross.toLocaleString()} gross / month`
              : 'Enter a salary above and click Compare all cities'
            }
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
              {computedRows.map((row) => (
                <tr key={row.city} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">

                  {/* City — no icon */}
                  <td className="px-6 py-3">
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{row.city}</div>
                      <div className="text-[11px] text-gray-400">{row.region}</div>
                    </div>
                  </td>

                  {/* Municipal tax */}
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-red-500">
                      {row.municipalTax.toFixed(2)}%
                    </span>
                  </td>

                  {/* Net salary */}
                  <td className="px-4 py-3">
                    {hasCompared && row.net > 0 ? (
                      <span className="text-sm font-semibold text-gray-800">
                        € {Math.round(row.net).toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-gray-300">€ 0</span>
                    )}
                  </td>

                  {/* Take-home % — percentage only, no bar */}
                  <td className="px-4 py-3">
                    {hasCompared && row.takeHomePct > 0 ? (
                      <span className="text-sm font-semibold text-gray-700">
                        {row.takeHomePct.toFixed(1)}%
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-gray-300">0%</span>
                    )}
                  </td>

                  {/* Annual net */}
                  <td className="px-6 py-3 text-right">
                    {hasCompared && row.annualNet > 0 ? (
                      <span className="text-sm font-semibold text-gray-800">
                        € {Math.round(row.annualNet).toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-gray-300">€ 0</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t border-gray-100">
          <p className="text-[11px] text-gray-400">
            {hasCompared
              ? `Net salary shown for €${calculatedGross.toLocaleString()} gross/month based on 2024 tax rates with no church tax.`
              : 'Enter a salary above to see net results for each city.'
            }
          </p>
        </div>
      </div>

      {/* Tip Box */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-4 flex gap-3">
        <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 leading-relaxed">
          {hasCompared && diff > 0 ? (
            <>
              <span className="font-semibold">Tip:</span> Moving from Rovaniemi to Helsinki on the same gross salary gives you approx.{" "}
              <span className="font-semibold">€ {diff} more per month</span> — but the higher cost of living in Helsinki may offset this benefit.
            </>
          ) : (
            <>
              <span className="font-semibold">Tip:</span> Enter a gross salary and click Compare to see how much your take-home pay differs across Finnish cities.
            </>
          )}
        </p>
      </div>

    </div>
  );
}