"use client";

import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react'; // Added ArrowLeft

interface FAQsScreenProps {
  onNavigate: (tab: string) => void;
}

const ALL_FAQS = [
  {
    question: "How accurate is this calculator?",
    answer: "This calculator uses the official 2024 Finnish tax brackets, municipal tax rates, and social security contribution rates. It provides a close estimate but actual figures may vary slightly based on your personal deductions, employer agreements, and decisions by the Finnish Tax Administration.",
    category: "Calculator",
  },
  {
    question: "What is the average effective tax rate in Finland?",
    answer: "The average effective tax rate in Finland for a median earner (around €3,400/month gross) is approximately 29–32%, including state income tax, municipal tax, pension contributions, and unemployment insurance. The exact rate depends on your city and income level.",
    category: "Tax system",
  },
  {
    question: "Is church tax mandatory in Finland?",
    answer: "No. Church tax (1–2% of income) is only paid by registered members of the Evangelical Lutheran or Orthodox Church. You can resign your church membership at any time via the Digital and Population Data Services Agency (DVV) online service, after which you will no longer pay church tax.",
    category: "Church tax",
  },
  {
    question: "What is a Finnish tax card and how do I get one?",
    answer: "A tax card (verokortti) is a document issued by the Finnish Tax Administration (Vero) that tells your employer what withholding percentage to apply to your salary. You can request or update your tax card online at vero.fi via the MyTax service. New employees should request one as soon as possible to avoid the default 60% withholding rate.",
    category: "Tax system",
  },
  {
    question: "Are bonuses taxed differently from regular salary?",
    answer: "Bonuses are taxed as regular earned income in Finland. However, because a bonus may push you into a higher tax bracket for that month, the withholding on a bonus payment can appear higher. The final tax is reconciled at year-end based on your total annual income.",
    category: "Tax system",
  },
  {
    question: "I am moving to Finland. When do I become a tax resident?",
    answer: "You become a Finnish tax resident when you have a permanent home in Finland or stay in Finland for more than 6 consecutive months. Tax residents pay Finnish income tax on worldwide income. You should register with the Digital and Population Data Services Agency (DVV) upon arrival.",
    category: "Expats",
  },
  {
    question: "Is there a special tax regime for highly skilled foreign workers?",
    answer: "Yes. Finland has a special 'expat tax' regime where qualifying foreign workers pay a flat 32% tax rate on their Finnish-source income for the first 48 months. To qualify, your monthly salary must be at least €5,800 and you must not have been a Finnish tax resident in the 5 years before starting work in Finland.",
    category: "Expats",
  },
  {
    question: "Why does my actual payslip differ from the calculator result?",
    answer: "The calculator uses general tax rules and average rates. Your actual payslip may differ due to personal deductions (e.g. commuting costs, trade union fees), your specific tax card rate, employer-specific agreements, or benefits in kind. Always refer to your personal tax card for the most accurate withholding rate.",
    category: "Calculator",
  },
  {
    question: "What is the pension contribution rate for employees?",
    answer: "In 2024, the employee pension contribution (TyEL) is 7.15% of gross salary for employees under 53 and over 62, and 8.65% for employees aged 53–62. This is deducted directly from your gross salary before income tax is calculated.",
    category: "Deductions",
  },
  {
    question: "What is the church tax rate in different cities?",
    answer: "Church tax rates vary by parish, typically ranging from 1.00% to 2.00%. For example, Helsinki is 1.35%, Tampere is 1.60%, Turku is 1.50%, and Oulu is 1.45%. You can find the exact rate for your parish on the Finnish Tax Administration website.",
    category: "Church tax",
  },
];

const CATEGORIES = ["All", "Calculator", "Tax system", "Deductions", "Expats", "Church tax"];

export default function FAQsScreen({ onNavigate }: FAQsScreenProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = ALL_FAQS.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
              Help
            </span>
            <h2 className="text-3xl font-bold mt-4 mb-2">Frequently asked questions</h2>
            <p className="text-blue-100 text-sm md:text-base">
              Answers to the most common questions about Finnish taxes, salaries,
              and how this calculator works.
            </p>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-5 mb-6">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeCategory === cat
                  ? "bg-blue-700 text-white border-blue-700"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-gray-400">
            No questions found matching your search.
          </div>
        ) : (
          filtered.map((faq, index) => (
            <div key={faq.question} className="border-b border-gray-100 last:border-b-0">
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-800 pr-4">
                  {faq.question}
                </span>
                {openIndex === index
                  ? <ChevronUp className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                }
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}