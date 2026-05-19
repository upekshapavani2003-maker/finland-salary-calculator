"use client";

import { Info, AlertTriangle, BookOpen, ShieldAlert, Calculator, ExternalLink } from 'lucide-react';

export default function DisclaimerScreen() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10 w-full">

      {/* Hero Header */}
      <div className="bg-blue-700 rounded-lg shadow-sm p-8 text-white mb-8">
        <div className="max-w-3xl">
          <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider bg-blue-600 px-2.5 py-1 rounded">Legal</span>
          <h2 className="text-3xl font-bold mt-4 mb-2">Disclaimer</h2>
          <p className="text-blue-100 text-sm md:text-base">Last updated: January 1, 2024</p>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-8 flex gap-3 items-start">
        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-800 mb-0.5">Estimates only — not financial advice</p>
          <p className="text-xs text-amber-700 leading-relaxed">
            For authoritative tax information, visit <a href="https://www.vero.fi" className="underline font-medium hover:text-amber-900">vero.fi</a> — the official Finnish Tax Administration website.
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Accuracy */}
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <h3 className="text-base font-bold text-gray-900">Accuracy of information</h3>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            The Finland Salary Calculator is provided for general informational and estimation purposes only. While we strive to keep the tax rates, brackets, and contribution figures up to date, we cannot guarantee that all information is accurate, complete, or current at all times. Tax laws and rates may change without notice. For authoritative tax information, visit <a href="https://www.vero.fi" className="text-blue-600 underline font-medium hover:text-blue-800">vero.fi</a> — the official Finnish Tax Administration website.
          </p>
        </div>

        {/* Not a substitute */}
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <h3 className="text-base font-bold text-gray-900">Not a substitute for professional advice</h3>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            The results produced by this calculator do not constitute tax, legal, or financial advice. Every individual's tax situation is unique and may be affected by personal circumstances, deductions, employer agreements, and other factors not accounted for in this tool. We strongly recommend consulting a qualified tax professional or the Finnish Tax Administration for advice specific to your situation. For authoritative tax information, visit <a href="https://www.vero.fi" className="text-blue-600 underline font-medium hover:text-blue-800">vero.fi</a> — the official Finnish Tax Administration website.
          </p>
        </div>

        {/* Limitations */}
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <h3 className="text-base font-bold text-gray-900">Limitations of the calculator</h3>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">This calculator uses simplified assumptions and may not reflect your exact tax liability. Specifically, it:</p>
          <ul className="space-y-2">
            {[
              "Does not account for personal tax deductions or allowances",
              "Does not factor in capital gains or dividend income",
              "Does not cover company car or benefit-in-kind taxation",
              "Results may differ from your actual payslip",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-1.5" />
                <span className="text-sm text-gray-500">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Official resources */}
        <div className="px-6 py-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <h3 className="text-base font-bold text-gray-900">Official resources</h3>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            For the most accurate and up-to-date tax information, please refer to the official Finnish Tax Administration. For authoritative tax information, visit <a href="https://www.vero.fi" className="text-blue-600 underline font-medium hover:text-blue-800 inline-flex items-center gap-1">vero.fi <ExternalLink className="w-3 h-3" /></a> — the official Finnish Tax Administration website.
          </p>
        </div>

      </div>

    </div>
  );
}