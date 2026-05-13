"use client";
import React from 'react';
import { Search } from 'lucide-react';

export default function SalaryByCity() {
  const cities = [
    { name: 'Helsinki', tax: '17.00%', net: '€ 2,850', percentage: 71.3 },
    { name: 'Espoo', tax: '17.00%', net: '€ 2,850', percentage: 71.3 },
    { name: 'Tampere', tax: '17.50%', net: '€ 2,830', percentage: 70.8 },
    { name: 'Turku', tax: '18.50%', net: '€ 2,790', percentage: 69.8 },
    { name: 'Oulu', tax: '19.50%', net: '€ 2,750', percentage: 68.8 },
    { name: 'Jyväskylä', tax: '19.00%', net: '€ 2,770', percentage: 69.3 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="bg-blue-700 rounded-lg shadow-sm p-8 text-white mb-8">
        <div className="max-w-3xl">
          <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider bg-blue-600 px-2.5 py-1 rounded">
            Compare Cities
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-2">Salary by city</h2>
          <p className="text-blue-100 text-sm md:text-base">
            Compare take-home pay across Finnish cities. See how your municipality affects your net salary due to different local tax rates.
          </p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-grow">
            <label className="block text-sm font-bold text-blue-600 uppercase mb-2">Enter a salary to compare</label>
            <input 
              type="text" 
              defaultValue="€ 4,000 / month"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium"
            />
          </div>
          <div className="flex items-end">
            <button className="bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-blue-800 transition-colors">
              Compare cities
            </button>
          </div>
        </div>

        {/* Region Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['All cities', 'South Finland', 'West Finland', 'North Finland', 'East Finland'].map((filter, i) => (
            <button key={filter} className={`px-4 py-2 rounded-full text-xs font-medium border ${i === 0 ? 'bg-blue-700 border-blue-700 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}>
              {filter}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search for a city..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-lg text-sm"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-400 uppercase font-bold border-b border-gray-50">
                <th className="pb-4 font-bold">City</th>
                <th className="pb-4 font-bold">Municipal Tax</th>
                <th className="pb-4 font-bold">Net Salary (€4k Gross)</th>
                <th className="pb-4 font-bold">Take-home %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {cities.map((city) => (
                <tr key={city.name} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 text-sm font-bold text-gray-900">{city.name}</td>
                  <td className="py-5 text-xs font-bold">
                    <span className="text-red-500 bg-red-50 px-2 py-1 rounded">
                      {city.tax}
                    </span>
                  </td>
                  <td className="py-5 text-sm font-bold text-gray-900">{city.net}</td>
                  <td className="py-5 w-48">
                    <div className="flex items-center gap-3">
                      <div className="flex-grow bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-700 h-full" style={{ width: `${city.percentage}%` }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-gray-500">{city.percentage}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-gray-400 mt-8">Based on 2024 tax rates. Net salary shown for €4,000 gross monthly.</p>
      </div>
    </div>
  );
}