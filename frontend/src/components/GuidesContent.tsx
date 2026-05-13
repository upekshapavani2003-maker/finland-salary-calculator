import React, { useState } from 'react';
import { Search, BookOpen, Plane, Briefcase, Receipt, ChevronDown, ChevronUp } from 'lucide-react';

const GuidesPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = ['All', 'Tax basics', 'Deductions', 'Expats', 'Freelancers', 'Benefits'];

  const guides = [
    {
      title: 'How taxes work in Finland — a simple overview',
      description: "A clear, jargon-free explanation of Finland's two-tier tax system: national income tax and municipal tax.",
      category: 'Tax basics',
      icon: <BookOpen className="text-blue-600" size={20} />,
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Moving to Finland? Your tax guide for newcomers',
      description: 'Understand tax residency rules, the progressive tax card, and how to register with the Finnish Tax Administration.',
      category: 'Expats',
      icon: <Plane className="text-orange-600" size={20} />,
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Self-employment taxes in Finland explained',
      description: 'How YEL pension, VAT, and income tax work if you run your own business or work as a sole trader.',
      category: 'Freelancers',
      icon: <Briefcase className="text-emerald-600" size={20} />,
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Tax deductions you might be missing',
      description: 'Home-office expenses, commute deductions, union fees, and more — legitimate ways to reduce your taxable income.',
      category: 'Deductions',
      icon: <Receipt className="text-slate-600" size={20} />,
      bgColor: 'bg-slate-50'
    }
  ];

  const faqs = [
    {
      question: "What is the average tax rate in Finland?",
      answer: "The average effective tax rate in Finland is around 25–30% for middle incomes, depending on your municipality and gross salary level."
    },
    {
      question: "Is church tax mandatory?",
      answer: "No, church tax is only paid by members of the Evangelical Lutheran or Orthodox churches of Finland. You can opt-out by resigning from church membership."
    },
    {
      question: "How do I get my tax card in Finland?",
      answer: "You can request a tax card through the MyTax (OmaVero) online service provided by the Finnish Tax Administration (Vero)."
    },
    {
      question: "Are bonuses taxed differently?",
      answer: "Bonuses are added to your total annual gross income and taxed according to your progressive marginal tax rate."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Header Section */}
      <div className="bg-blue-700 rounded-lg shadow-sm p-8 text-white mb-8">
        <div className="max-w-3xl">
          <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider bg-blue-600 px-2.5 py-1 rounded">
            Learn
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-2">Tax guides & resources</h2>
          <p className="text-blue-100 text-sm md:text-base">
            In-depth articles to help you understand Finnish taxation, maximize your deductions, and plan your finances.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-10">
        <div className="relative max-w-4xl mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search guides..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Guides Section */}
      <div className="mb-16">
        <h3 className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-6">Featured Guides</h3>
        <div className="space-y-4">
          {guides.map((guide, index) => (
            <div key={index} className="group bg-white border border-gray-100 rounded-xl p-5 flex items-start gap-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className={`p-3 rounded-lg ${guide.bgColor} flex-shrink-0`}>
                {guide.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-600 text-xs font-bold uppercase tracking-tight">{guide.category}</span>
                  <span className="text-gray-300 text-[10px]">•</span>
                </div>
                <h4 className="text-gray-900 font-bold text-base group-hover:text-blue-600 transition-colors">{guide.title}</h4>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">{guide.description}</p>
                <button className="text-blue-600 text-[12px] font-bold mt-3 flex items-center gap-2">
                  Read guide <span className="text-xs">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl">
        <h3 className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-6">Frequently Asked Questions</h3>
        <div className="divide-y divide-gray-100">
          {faqs.map((faq, index) => (
            <div key={index} className="py-4">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-sm font-bold text-gray-800">{faq.question}</span>
                {openFaq === index ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
              </button>
              {openFaq === index && (
                <div className="mt-3 text-xs text-gray-500 leading-relaxed animate-in fade-in slide-in-from-top-1">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuidesPage;