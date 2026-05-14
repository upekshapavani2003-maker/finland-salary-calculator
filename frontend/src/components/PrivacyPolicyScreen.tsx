"use client";

import { Shield, Eye, Database, Share2, Lock, RefreshCw, Mail, FileText, CheckCircle, Clock } from 'lucide-react';

const SECTIONS = [
  {
    icon: Eye,
    title: "Information we collect",
    content: "We do not collect any personally identifiable information when you use the calculator. Salary inputs are processed locally in your browser only. We may collect anonymised usage data to improve the service.",
    bullets: [
      "Salary and tax inputs — processed locally in your browser only",
      "Anonymised page view and interaction analytics",
      "Browser type and device information for compatibility",
      "No account registration or login required",
    ],
    chips: [
      { label: "No personal data", color: "green" },
      { label: "Browser-only processing", color: "green" },
      { label: "Anonymised analytics", color: "blue" },
    ],
  },
  {
    icon: Database,
    title: "How we use your information",
    content: "Any anonymised data we collect is used solely to improve calculator accuracy and usability. We do not use data for advertising, profiling, or any commercial purpose beyond operating this service.",
    bullets: [],
    chips: [],
    grid: [
      { label: "Used for", value: "UX improvement" },
      { label: "Not used for", value: "Advertising" },
      { label: "Retention", value: "Session only" },
      { label: "Profiling", value: "Never" },
    ],
  },
  {
    icon: Share2,
    title: "Sharing of information",
    content: "We do not sell, trade, or rent your personal information to third parties. Anonymised, aggregated data may be shared with analytics providers bound by GDPR requirements.",
    bullets: [
      "We never sell your data to third parties",
      "Anonymised analytics may be shared with service providers",
      "No data is shared with advertisers",
      "All third-party tools comply with GDPR",
    ],
    chips: [],
  },
  {
    icon: Lock,
    title: "Cookies and tracking",
    content: "We use cookies to remember preferences and collect anonymised analytics. Strictly necessary cookies are always active. You can manage preferences via Cookie Settings.",
    bullets: [
      "Strictly necessary — always active, required for core function",
      "Analytics — optional, help us improve the site",
      "Preferences — remember your settings between visits",
      "No advertising or cross-site tracking cookies",
    ],
    chips: [
      { label: "Necessary", color: "green" },
      { label: "Analytics", color: "blue" },
      { label: "Preferences", color: "blue" },
      { label: "No ad tracking", color: "amber" },
    ],
  },
  {
    icon: Shield,
    title: "Your rights under GDPR",
    content: "If you are located in the EEA, you have rights regarding your personal data under GDPR. Since we do not collect identifiable data, most rights apply in a limited capacity — but we are committed to full compliance.",
    bullets: [],
    chips: [],
    grid: [
      { label: "Right to", value: "Access your data" },
      { label: "Right to", value: "Erasure" },
      { label: "Right to", value: "Object to processing" },
      { label: "Right to", value: "Lodge a complaint" },
    ],
  },
  {
    icon: RefreshCw,
    title: "Changes to this policy",
    content: "We may update this Privacy Policy from time to time. When we make significant changes, we will update the date at the top of this page. We encourage you to review this policy periodically.",
    bullets: [],
    chips: [],
    highlight: "Last significant update: January 1, 2024. Next scheduled review: January 1, 2025. You will not be notified automatically — please check this page periodically.",
  },
];

const chipColor: Record<string, string> = {
  green: "bg-green-50 text-green-800 border border-green-200",
  blue: "bg-blue-50 text-blue-800 border border-blue-100",
  amber: "bg-amber-50 text-amber-800 border border-amber-200",
};

export default function PrivacyPolicyScreen() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">

      {/* Hero Header */}
      <div className="bg-blue-700 rounded-lg shadow-sm p-8 text-white mb-8">
        <div className="max-w-3xl">
          <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider bg-blue-600 px-2.5 py-1 rounded">
            Legal
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-2">Privacy Policy</h2>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="text-blue-100 text-sm">Finland Salary Calculator</span>
            <span className="w-1 h-1 rounded-full bg-blue-400" />
            <span className="text-blue-100 text-sm">Last updated: January 1, 2024</span>
            <span className="w-1 h-1 rounded-full bg-blue-400" />
            <span className="text-blue-100 text-sm">GDPR compliant</span>
          </div>
        </div>
      </div>

      {/* Intro Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 mb-6 flex gap-3 items-start">
        <div className="w-8 h-8 bg-blue-100 border border-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
          <Shield className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-blue-800 mb-0.5">Your privacy matters</p>
          <p className="text-xs text-blue-600 leading-relaxed">
            This calculator is privacy-first. Your salary inputs are processed entirely in your browser and never transmitted to our servers.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {SECTIONS.map((section, index) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className={`px-6 py-6 ${index !== SECTIONS.length - 1 ? "border-b border-gray-100" : ""}`}>

              {/* Section Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">{section.title}</h3>
              </div>

              {/* Content */}
              <p className="text-sm text-gray-500 leading-relaxed mb-3">{section.content}</p>

              {/* Bullets */}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="space-y-2 mb-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-1.5" />
                      <span className="text-sm text-gray-500">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Grid */}
              {'grid' in section && section.grid && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                  {section.grid.map((item) => (
                    <div key={item.value} className="bg-gray-50 rounded-lg px-3 py-2.5">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">{item.label}</div>
                      <div className="text-xs font-medium text-gray-800">{item.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Chips */}
              {section.chips && section.chips.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {section.chips.map((chip) => (
                    <span key={chip.label} className={`text-xs font-medium px-2.5 py-1 rounded-full ${chipColor[chip.color]}`}>
                      {chip.label}
                    </span>
                  ))}
                </div>
              )}

              {/* Highlight box */}
              {'highlight' in section && section.highlight && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mt-3">
                  <p className="text-xs text-blue-700 leading-relaxed">{section.highlight}</p>
                </div>
              )}

            </div>
          );
        })}

        {/* Contact section */}
        <div className="px-6 py-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">Contact us</h3>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            Questions about this Privacy Policy? We aim to respond within 5 business days.
          </p>
          <div className="divide-y divide-gray-100">
            {[
              { icon: Mail, label: "Email", value: "hello@finlandsalary.fi" },
              { icon: Clock, label: "Response time", value: "Within 5 business days" },
              { icon: CheckCircle, label: "Confidentiality", value: "All enquiries handled confidentially" },
            ].map((row) => {
              const RowIcon = row.icon;
              return (
                <div key={row.label} className="flex items-center gap-3 py-3">
                  <div className="w-7 h-7 bg-blue-50 rounded-md flex items-center justify-center flex-shrink-0">
                    <RowIcon className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{row.label}</div>
                    <div className="text-xs font-medium text-blue-700">{row.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}