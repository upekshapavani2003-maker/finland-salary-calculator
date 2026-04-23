export default function InfoCards() {
  const cards = [
    {
      title: "How taxes work in Finland",
      description: "Understand the Finnish tax system in simple words.",
      linkText: "Read guide →",
      linkHref: "#",
      icon: "/assets/Tax-icon.jpg"
    },
    {
      title: "Salary by City",
      description: "Compare take-home pay in different cities.",
      linkText: "View cities →",
      linkHref: "#",
      icon: "/assets/city-icon.jpg"  
    },
    {
      title: "Average Salaries by Job",
      description: "Check average salaries and take-home pay by profession.",
      linkText: "Explore now →",
      linkHref: "#",
      icon: "/assets/job-icon.jpg"   
    },
    {
      title: "FAQs",
      description: "Find answers to common questions.",
      linkText: "View FAQs →",
      linkHref: "#",
      icon: "/assets/FAQs-icon.jpg"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Grid layout for equal sizing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 p-6 flex flex-col h-full"
          >
            {/* Icon centered at top */}
            <div className="flex justify-center mb-4">
              <img
                src={card.icon}
                alt={card.title}
                className="w-30 h-30 object-contain"
              />
            </div>

            {/* Text content evenly spaced */}
            <div className="flex-grow flex flex-col justify-between text-center">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {card.description}
                </p>
              </div>
              <a
                href={card.linkHref}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                {card.linkText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
