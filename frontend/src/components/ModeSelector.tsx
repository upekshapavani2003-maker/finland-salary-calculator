'use client';

import { useState } from 'react';

export default function ModeSelector() {
  const [selectedMode, setSelectedMode] = useState<'simple' | 'advanced'>('simple');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-auto">
          {/* Simple Mode Box */}
          <div
            onClick={() => setSelectedMode('simple')}
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
              selectedMode === 'simple'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-center">
              <div className="mb-3">
                <svg
                  className={`w-12 h-12 mx-auto ${
                    selectedMode === 'simple' ? 'text-blue-500' : 'text-gray-400'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                selectedMode === 'simple' ? 'text-blue-700' : 'text-gray-700'
              }`}>
                Simple mode
              </h3>
              <p className={`text-sm ${
                selectedMode === 'simple' ? 'text-blue-600' : 'text-gray-500'
              }`}>
                Quick calculation
              </p>
            </div>
          </div>

          {/* Advanced Mode Box */}
          <div
            onClick={() => setSelectedMode('advanced')}
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
              selectedMode === 'advanced'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-center">
              <div className="mb-3">
                <svg
                  className={`w-12 h-12 mx-auto ${
                    selectedMode === 'advanced' ? 'text-blue-500' : 'text-gray-400'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                selectedMode === 'advanced' ? 'text-blue-700' : 'text-gray-700'
              }`}>
                Advanced mode
              </h3>
              <p className={`text-sm ${
                selectedMode === 'advanced' ? 'text-blue-600' : 'text-gray-500'
              }`}>
                Breakdown your income
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
