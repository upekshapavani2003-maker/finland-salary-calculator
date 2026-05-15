"use client";

interface InfoCardsProps {
  onNavigate: (tab: string) => void;
}

const cards = [
  {
    title: "How taxes work in Finland",
    description: "Understand the Finnish tax system in simple words.",
    linkText: "Read guide",
    tab: "how-taxes-work",
    icon: "ti-receipt-tax",
  },
  {
    title: "Salary by City",
    description: "Compare take-home pay in different cities.",
    linkText: "View cities",
    tab: "salary-by-city-screen",
    icon: "ti-building-skyscraper",
  },
  {
    title: "Average Salaries by Job",
    description: "Check average salaries and take-home pay by profession.",
    linkText: "Explore now",
    tab: "average-salaries",
    icon: "ti-briefcase",
  },
  {
    title: "FAQs",
    description: "Find answers to common questions.",
    linkText: "View FAQs",
    tab: "faqs",
    icon: "ti-message-question",
  },
];

export default function InfoCards({ onNavigate }: InfoCardsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-8">
      <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-3">
        Resources
      </span>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Learn more about taxes in Finland
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => onNavigate(card.tab)}
            className="group bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-3 text-left hover:border-blue-400 transition-colors duration-150 relative overflow-hidden"
          >
            {/* Blue top accent bar on hover */}
            <span className="absolute top-0 left-0 right-0 h-[3px] bg-blue-700 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150" />

            {/* Icon */}
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <i className={`ti ${card.icon} text-blue-700 text-xl`} aria-hidden="true" />
            </div>

            {/* Text */}
            <div className="flex-1 flex flex-col gap-1.5">
              <p className="font-medium text-gray-900 text-[15px]">{card.title}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{card.description}</p>
            </div>

            {/* Link row */}
            <div className="flex items-center gap-1 text-[13px] font-medium text-blue-700 pt-2 border-t border-gray-100">
              {card.linkText}
              <i className="ti ti-arrow-right text-sm group-hover:translate-x-0.5 transition-transform duration-150" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}