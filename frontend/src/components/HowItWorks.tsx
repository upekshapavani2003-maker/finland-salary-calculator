import React from 'react';
import { 
  UserCircle2, 
  Percent,
  Landmark,
  ShieldCheck,
  Building,
  LucideIcon
} from 'lucide-react';

interface CalculationFeature {
  title: string;
  desc: string;
  icon: LucideIcon;
}

interface StepItem {
  step: number;
  title: string;
  desc: string;
}

export default function HowItWorks() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10 w-full" id="how-it-works">
      {/* Header Section */}
      <div className="bg-blue-700 rounded-lg shadow-sm p-8 text-white mb-8">
        <div className="max-w-3xl">
          <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider bg-blue-600 px-2.5 py-1 rounded">
            Transparency
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-2">How the calculator works</h2>
          <p className="text-blue-100 text-sm md:text-base">
            Understand exactly how your net salary is calculated — from gross income to every deduction applied under Finnish tax law.
          </p>
        </div>
      </div>

      {/* Section: WHAT WE CALCULATE */}
      <div className="mb-12">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center mb-6">What we calculate</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { 
              title: "State income tax", 
              desc: "Progressive tax collected by the state based on annual income brackets.", 
              icon: Landmark 
            },
            { 
              title: "Municipal tax", 
              desc: "A flat rate tax that varies depending on your municipality of residence.", 
              icon: Building 
            },
            { 
              title: "Pension (TyEL)", 
              desc: "Mandatory contribution for employees between 17 and 67 years old.", 
              icon: UserCircle2 
            },
            { 
              title: "Unemployment", 
              desc: "Insurance contribution to secure income during periods of unemployment.", 
              icon: ShieldCheck 
            },
            { 
              title: "Church tax", 
              desc: "Calculated for members of the Evangelical Lutheran or Orthodox churches.", 
              icon: Percent 
            }
          ].map((item: CalculationFeature, idx: number) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center text-center">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-md mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section: STEP-BY-STEP PROCESS */}
      <div className="mb-12">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center mb-6">Step-by-step process</h3>
        <div className="space-y-4">
          {[
            {
              step: 1,
              title: "Gross Income Assessment",
              desc: "The process begins by taking your monthly or annual gross salary as the primary data point for all subsequent calculations."
            },
            {
              step: 2,
              title: "Mandatory Insurance Deductions",
              desc: "Pension insurance (7.15%) and unemployment insurance (1.50%) are deducted directly from the gross amount."
            },
            {
              step: 3,
              title: "Progressive State Tax",
              desc: "The remaining balance is applied against the progressive tax brackets to determine the state's share."
            },
            {
              step: 4,
              title: "Municipal Tax Calculation",
              desc: "Based on your selected municipality, a flat percentage is applied to the taxable income."
            },
            {
              step: 5,
              title: "Church Tax (Optional)",
              desc: "If selected, an additional 1.00% to 2.25% is deducted based on the local parish rates."
            },
            {
              step: 6,
              title: "Net Salary Result",
              desc: "All deductions are subtracted from the gross amount to reveal your final take-home pay."
            }
          ].map((item: StepItem, idx: number) => (
            <div key={idx} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white font-bold rounded-md flex items-center justify-center mr-4 text-sm">
                {item.step}
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section: TAX BRACKETS */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center mb-6">Tax brackets (2024)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">
                  Income Range (Annual)
                </th>
                <th scope="col" className="px-6 py-3 text-right font-bold text-gray-500 uppercase tracking-wider">
                  Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { range: "€0 – €20,500", rate: "12.64%" },
                { range: "€20,501 – €30,500", rate: "19.00%" },
                { range: "€30,501 – €50,400", rate: "30.25%" },
                { range: "€50,401 – €88,200", rate: "34.00%" },
                { range: "€88,201 – €150,000", rate: "42.00%" },
                { range: "Over €150,000", rate: "44.00%" }
              ].map((row, idx: number) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{row.range}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-gray-600 font-medium">{row.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}