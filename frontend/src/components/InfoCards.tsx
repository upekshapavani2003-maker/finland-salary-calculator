"use client";

interface InfoCardsProps {
  onNavigate: (tab: string) => void; // ADD THIS
}

export default function InfoCards({ onNavigate }: InfoCardsProps) { // ADD PROP
  const cards = [
    {
      title: "How taxes work in Finland",
      description: "Understand the Finnish tax system in simple words.",
      linkText: "Read guide →",
      tab: "how-taxes-work",   // ADD tab key instead of href
      icon: "/assets/Tax-icon.jpg"
    },
    {
      title: "Salary by City",
      description: "Compare take-home pay in different cities.",
      linkText: "View cities →",
      tab: "salary-by-city",
      icon: "/assets/city-icon.jpg"
    },
    {
      title: "Average Salaries by Job",
      description: "Check average salaries and take-home pay by profession.",
      linkText: "Explore now →",
      tab: "average-salaries",
      icon: "/assets/job-icon.jpg"
    },
    {
      title: "FAQs",
      description: "Find answers to common questions.",
      linkText: "View FAQs →",
      tab: "faqs",
      icon: "/assets/FAQs-icon.jpg"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-bold text-center text-gray-900 mb-4 mt-12">
        Learn more about taxes in Finland
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 p-6 flex flex-col h-full">
            <div className="flex justify-center mb-4">
              <img src={card.icon} alt={card.title} className="w-30 h-30 object-contain" />
            </div>
            <div className="flex-grow flex flex-col justify-between text-center">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600 mb-4">{card.description}</p>
              </div>
              {/* CHANGE <a> to <button> and call onNavigate */}
              <button
                onClick={() => onNavigate(card.tab)}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                {card.linkText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}