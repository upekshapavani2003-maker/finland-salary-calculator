"use client";

import { ArrowLeft, ExternalLink, BookOpen, TrendingUp, Building2, Coins, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const BRACKETS_BY_YEAR: Record<string, { range: string; rate: string; color: string }[]> = {
  '2024': [
    { range: "€0 – €19,900", rate: "0%", color: "bg-gray-100 text-gray-500" },
    { range: "€19,900 – €29,700", rate: "12.64%", color: "bg-blue-50 text-blue-700" },
    { range: "€29,700 – €49,000", rate: "19.00%", color: "bg-blue-100 text-blue-700" },
    { range: "€49,000 – €85,800", rate: "25.00%", color: "bg-blue-200 text-blue-800" },
    { range: "€85,800+", rate: "31.25%", color: "bg-blue-300 text-blue-900" },
  ],
  '2025': [
    { range: "€0 – €20,500", rate: "0%", color: "bg-gray-100 text-gray-500" },
    { range: "€20,500 – €30,400", rate: "12.64%", color: "bg-blue-50 text-blue-700" },
    { range: "€30,400 – €50,400", rate: "19.00%", color: "bg-blue-100 text-blue-700" },
    { range: "€50,400 – €88,200", rate: "25.00%", color: "bg-blue-200 text-blue-800" },
    { range: "€88,200+", rate: "31.25%", color: "bg-blue-300 text-blue-900" },
  ],
  '2026': [
    { range: "€0 – €21,200", rate: "0%", color: "bg-gray-100 text-gray-500" },
    { range: "€21,200 – €31,300", rate: "12.64%", color: "bg-blue-50 text-blue-700" },
    { range: "€31,300 – €52,100", rate: "19.00%", color: "bg-blue-100 text-blue-700" },
    { range: "€52,100 – €91,300", rate: "25.00%", color: "bg-blue-200 text-blue-800" },
    { range: "€91,300+", rate: "31.25%", color: "bg-blue-300 text-blue-900" },
  ],
};

export default function TaxBasicsGuide({ onBack }: { onBack: () => void }) {
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [bracketYear, setBracketYear] = useState<string>('2024');

  const brackets = BRACKETS_BY_YEAR[bracketYear];

  const sections = [
    {
      title: "What is the Finnish two-tier tax system?",
      content: "Finland uses two layers of income tax. The first is national (state) income tax — a progressive tax where higher earners pay a higher percentage on the income above each bracket. The second is municipal tax — a flat percentage set by your city or municipality, typically between 17% and 23%. Both are applied on top of each other.",
    },
    {
      title: "How are tax brackets calculated?",
      content: "Finland's state income tax is progressive, meaning only the portion of income within each bracket is taxed at that rate. For example, if the 19% bracket starts at €29,700, only the income above that threshold (not your entire salary) is taxed at 19%. Lower portions are taxed at lower rates.",
    },
    {
      title: "What is a tax card (verokortti)?",
      content: "A tax card is issued by the Finnish Tax Administration (Vero) and tells your employer what withholding percentage to deduct from your salary. Without one, employers default to a 60% withholding rate. You can request or update your tax card through MyTax (OmaVero) at vero.fi.",
    },
    {
      title: "What other deductions come out of my salary?",
      content: "On top of income tax, employees pay pension contributions (TyEL — 7.15%), unemployment insurance (1.50%), and health insurance contributions. Church tax (1–2%) is optional and only applies to members of the Evangelical Lutheran or Orthodox Church.",
    },
    {
      title: "When do I file my tax return?",
      content: "The Finnish Tax Administration sends a pre-filled tax return each spring. If everything is correct, no action is needed. If you have additional deductions or corrections, you can submit changes via MyTax before the deadline, typically in May.",
    },
  ];

  const links = [
    { label: "MyTax — Finnish Tax Administration", url: "https://www.vero.fi/en/individuals/tax-card-and-tax-return/", desc: "Request your tax card, file returns, check your tax status." },
    { label: "Tax rates 2024 — vero.fi", url: "https://www.vero.fi/en/individuals/tax-card-and-tax-return/how-much-tax-do-i-pay/", desc: "Official 2024 income tax brackets and rates." },
    { label: "Finnish Tax Administration (Vero)", url: "https://www.vero.fi/en/", desc: "The official portal for all Finnish tax matters." },
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
          <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider bg-blue-600 px-2.5 py-1 rounded">Tax basics</span>
          <h2 className="text-3xl font-bold mt-4 mb-2">How taxes work in Finland — a simple overview</h2>
          <p className="text-blue-100 text-sm md:text-base">A clear, jargon-free explanation of Finland's two-tier tax system: national income tax and municipal tax.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">

          {/* Key facts */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2"><BookOpen size={15} className="text-blue-600" /> Key facts at a glance</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <TrendingUp size={14} className="text-blue-500" />, label: "Tax system", value: "Progressive (state)" },
                { icon: <Building2 size={14} className="text-orange-500" />, label: "Municipal tax", value: "17% – 23% flat" },
                { icon: <Coins size={14} className="text-yellow-600" />, label: "Pension (TyEL)", value: "7.15%" },
                { icon: <ShieldCheck size={14} className="text-emerald-500" />, label: "Unemployment", value: "1.50%" },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3 flex items-center gap-2">
                  {item.icon}
                  <div>
                    <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{item.label}</div>
                    <div className="text-sm font-bold text-gray-800">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tax brackets */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            {/* Header row with title + dropdown */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-800">
                {bracketYear} State income tax brackets
              </h3>
              <select
                value={bracketYear}
                onChange={(e) => setBracketYear(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>

            <div className="space-y-2">
              {brackets.map((b, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-gray-50">
                  <span className="text-sm text-gray-600 font-medium">{b.range}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${b.color}`}>{b.rate}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gray-400 mt-3 leading-relaxed">
              Only the income within each bracket is taxed at that rate — not your total salary.
            </p>
          </div>

          {/* FAQ accordion */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-800">Common questions</h3>
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
            <p className="text-xs font-semibold text-amber-800 mb-1">Good to know</p>
            <p className="text-xs text-amber-700 leading-relaxed">Finland has one of the most transparent tax systems in the world. You can view anyone's taxable income in public tax records published each November.</p>
          </div>
        </div>
      </div>
    </div>
  );
}