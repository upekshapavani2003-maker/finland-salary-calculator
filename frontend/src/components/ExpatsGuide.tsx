"use client";

import { ArrowLeft, ExternalLink, Plane, Globe, FileText, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function ExpatsGuide({ onBack }: { onBack: () => void }) {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const steps = [
    { step: "1", title: "Register with DVV", desc: "Register your move with the Digital and Population Data Services Agency (DVV) within 3 months of arriving." },
    { step: "2", title: "Get a Finnish personal ID", desc: "You'll receive a Finnish personal identity code (henkilötunnus) needed for almost all official processes." },
    { step: "3", title: "Apply for a tax card", desc: "Request your tax card (verokortti) through MyTax at vero.fi. Without it, your employer will withhold 60%." },
    { step: "4", title: "File your first tax return", desc: "In spring, you'll receive a pre-filled return from Vero. Review and add any deductions before the deadline." },
  ];

  const sections = [
    { title: "When do I become a Finnish tax resident?", content: "You become a Finnish tax resident if you have a permanent home in Finland or stay for more than 6 consecutive months. Tax residents pay Finnish income tax on worldwide income." },
    { title: "What is the expat tax regime (key employee ruling)?", content: "Qualifying foreign key employees can apply for a flat 32% source tax rate for up to 48 months. To qualify, your monthly salary must be at least €5,800 and you must not have been a Finnish tax resident in the 5 years prior." },
    { title: "Can I claim moving expenses?", content: "Moving costs are generally not tax-deductible in Finland unless your employer reimburses them tax-free (up to certain limits). Consult Vero or a tax advisor for your specific situation." },
    { title: "How does the tax treaty work?", content: "Finland has tax treaties with over 70 countries to prevent double taxation. If you pay taxes in both Finland and your home country on the same income, the treaty determines which country gets taxing rights." },
  ];

  const links = [
    { label: "DVV — Register your move", url: "https://dvv.fi/en/individuals", desc: "Register with the Digital and Population Data Services Agency." },
    { label: "Vero — Moving to Finland", url: "https://www.vero.fi/en/individuals/living-abroad/moving-to-finland/", desc: "Official Finnish Tax Administration guide for newcomers." },
    { label: "Key employee source tax", url: "https://www.vero.fi/en/businesses-and-corporations/taxes-and-charges/withholding-tax/key-employee-source-tax/", desc: "Information on the 32% flat rate for qualifying expats." },
    { label: "InfoFinland — Taxes", url: "https://www.infofinland.fi/en/work-in-finland/taxation", desc: "Plain-language guide to Finnish taxes for new residents." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10 w-full">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-6 hover:text-blue-800 transition-colors">
        <ArrowLeft size={16} /> Back to guides
      </button>

      <div className="bg-blue-700 rounded-lg shadow-sm p-8 text-white mb-8">
        <div className="max-w-3xl">
          <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider bg-blue-600 px-2.5 py-1 rounded">Expats</span>
          <h2 className="text-3xl font-bold mt-4 mb-2">Moving to Finland? Your tax guide for newcomers</h2>
          <p className="text-blue-100 text-sm md:text-base">Understand tax residency rules, the progressive tax card, and how to register with the Finnish Tax Administration.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">

          {/* Steps */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2"><Plane size={15} className="text-orange-500" /> Getting started — 4 steps</h3>
            <div className="space-y-3">
              {steps.map((s, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{s.step}</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{s.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key info cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Globe size={15} className="text-blue-500" />, label: "Tax residency", value: "After 6 months in Finland" },
              { icon: <Clock size={15} className="text-orange-500" />, label: "Expat flat rate", value: "32% for up to 48 months" },
              { icon: <FileText size={15} className="text-emerald-500" />, label: "Tax card deadline", value: "Request before first payday" },
              { icon: <Plane size={15} className="text-purple-500" />, label: "Tax treaties", value: "70+ countries covered" },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">{item.icon}</div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">{item.label}</div>
                  <div className="text-sm font-bold text-gray-800">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ accordion */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-800">Common questions for expats</h3>
            </div>
            {sections.map((s, i) => (
              <div key={i} className="border-b border-gray-50 last:border-b-0">
                <button
                  onClick={() => setOpenSection(openSection === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-semibold text-gray-800 pr-4">{s.title}</span>
                  {openSection === i ? <ChevronUp size={15} className="text-blue-500 flex-shrink-0" /> : <ChevronDown size={15} className="text-gray-400 flex-shrink-0" />}
                </button>
                {openSection === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-gray-500 leading-relaxed">{s.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2"><ExternalLink size={14} className="text-blue-600" /> Useful links</h3>
            <div className="space-y-3">
              {links.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="block p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group">
                  <div className="text-sm font-semibold text-orange-700 group-hover:text-orange-900 flex items-center gap-1.5">
                    {link.label} <ExternalLink size={11} className="flex-shrink-0" />
                  </div>
                  <div className="text-[11px] text-orange-500 mt-0.5 leading-relaxed">{link.desc}</div>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-blue-800 mb-1">Important</p>
            <p className="text-xs text-blue-700 leading-relaxed">If you work in Finland without registering, your employer is legally required to withhold 35% tax at source. Always register promptly to avoid overpaying.</p>
          </div>
        </div>
      </div>
    </div>
  );
}