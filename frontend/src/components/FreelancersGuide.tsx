"use client";

import { ArrowLeft, ExternalLink, Briefcase, Calculator, FileText, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function FreelancersGuide({ onBack }: { onBack: () => void }) {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const sections = [
    { title: "What is YEL pension insurance?", content: "YEL (Yrittäjän eläkevakuutus) is mandatory pension insurance for self-employed people in Finland. The contribution is 18.87% of your confirmed YEL income for under-53s. Your YEL income also determines your sickness allowance, parental leave pay, and eventual pension." },
    { title: "Do I need to register for VAT?", content: "If your annual turnover exceeds €15,000, you must register for VAT (ALV in Finnish) and charge 25.5% VAT on most services. Below this threshold, registration is optional. You can register voluntarily even below the threshold to reclaim VAT on business purchases." },
    { title: "How is my income tax calculated?", content: "As a sole trader (toiminimi), your business profit is added to your personal income and taxed as earned income using the same progressive brackets as employees. You can deduct legitimate business expenses before calculating taxable profit." },
    { title: "What expenses can I deduct?", content: "Deductible business expenses include office rent, equipment, software subscriptions, professional development, travel for work, accounting fees, and a portion of your home if you work from home. Keep all receipts and maintain clear records." },
    { title: "Should I use toiminimi or Oy?", content: "A sole trader (toiminimi) is simpler and cheaper to set up but offers no liability protection. A limited company (osakeyhtiö/Oy) separates personal and business assets, allows you to pay yourself a tax-efficient salary + dividends, but requires more administration." },
  ];

  const taxTypes = [
    { label: "Income tax", rate: "Progressive", detail: "Same brackets as employees", color: "bg-blue-50 border-blue-100" },
    { label: "YEL pension", rate: "18.87%", detail: "Of confirmed YEL income (under 53)", color: "bg-emerald-50 border-emerald-100" },
    { label: "VAT (ALV)", rate: "25.5%", detail: "Standard rate, if registered", color: "bg-orange-50 border-orange-100" },
    { label: "Advance tax", rate: "Custom", detail: "Paid in instalments to Vero", color: "bg-purple-50 border-purple-100" },
  ];

  const links = [
    { label: "Vero — Self-employed guide", url: "https://www.vero.fi/en/businesses-and-corporations/", desc: "Official tax guidance for Finnish businesses and sole traders." },
    { label: "YEL calculator — ETK", url: "https://www.etk.fi/en/", desc: "Estimate your YEL contributions and pension entitlement." },
    { label: "Business Finland — Starting up", url: "https://www.businessfinland.fi/en/", desc: "Resources and support for new entrepreneurs in Finland." },
    { label: "Suomi.fi — Business registration", url: "https://www.suomi.fi/company/", desc: "Register your business with the Finnish Trade Register." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10 w-full">
      <button 
        onClick={() => { onBack(); window.scrollTo(0, 0); }}
        className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-6 hover:text-blue-800 transition-colors">
        <ArrowLeft size={16} /> Back to guides
      </button>

      <div className="bg-blue-700 rounded-lg shadow-sm p-8 text-white mb-8">
        <div className="max-w-3xl">
          <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider bg-blue-600 px-2.5 py-1 rounded">Freelancers</span>
          <h2 className="text-3xl font-bold mt-4 mb-2">Self-employment taxes in Finland explained</h2>
          <p className="text-blue-100 text-sm md:text-base">How YEL pension, VAT, and income tax work if you run your own business or work as a sole trader.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">

          {/* Tax types */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2"><Calculator size={15} className="text-emerald-600" /> Taxes that apply to you</h3>
            <div className="grid grid-cols-2 gap-3">
              {taxTypes.map((t, i) => (
                <div key={i} className={`border rounded-xl p-4 ${t.color}`}>
                  <div className="text-lg font-black text-gray-800">{t.rate}</div>
                  <div className="text-sm font-semibold text-gray-700">{t.label}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{t.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2"><TrendingUp size={15} className="text-emerald-600" /> Annual tax calendar for freelancers</h3>
            <div className="space-y-3">
              {[
                { month: "Jan–Mar", task: "Pay advance tax instalments to Vero" },
                { month: "Apr–May", task: "File your annual tax return via MyTax" },
                { month: "Jun–Nov", task: "Pay remaining advance tax instalments" },
                { month: "Nov–Dec", task: "Review YEL income and update if earnings changed" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-20 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg text-center flex-shrink-0">{item.month}</div>
                  <div className="text-sm text-gray-600">{item.task}</div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ accordion */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-800">Common questions for freelancers</h3>
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
                  className="block p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors group">
                  <div className="text-sm font-semibold text-emerald-700 group-hover:text-emerald-900 flex items-center gap-1.5">
                    {link.label} <ExternalLink size={11} className="flex-shrink-0" />
                  </div>
                  <div className="text-[11px] text-emerald-600 mt-0.5 leading-relaxed">{link.desc}</div>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-amber-800 mb-1">VAT threshold 2024</p>
            <p className="text-xs text-amber-700 leading-relaxed">The VAT registration threshold is €15,000 annual turnover. Below this you are exempt, but you can also voluntarily register to reclaim input VAT on purchases.</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={14} className="text-blue-500" />
              <span className="text-sm font-bold text-gray-800">Advance tax tip</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">Estimate your annual income early and set up advance tax payments with Vero to avoid a large lump-sum payment at year-end.</p>
          </div>
        </div>
      </div>
    </div>
  );
}