"use client";

import { useState } from 'react';

interface CookieOption {
  id: string;
  title: string;
  description: string;
  required: boolean;
  defaultEnabled: boolean;
}

const COOKIE_OPTIONS: CookieOption[] = [
  {
    id: "necessary",
    title: "Strictly necessary",
    description:
      "These cookies are essential for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services.",
    required: true,
    defaultEnabled: true,
  },
  {
    id: "analytics",
    title: "Analytics",
    description:
      "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular.",
    required: false,
    defaultEnabled: false,
  },
  {
    id: "preferences",
    title: "Preferences",
    description:
      "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.",
    required: false,
    defaultEnabled: true,
  },
  {
    id: "marketing",
    title: "Marketing",
    description:
      "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.",
    required: false,
    defaultEnabled: false,
  },
];

export default function CookieSettings() {
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(COOKIE_OPTIONS.map((opt) => [opt.id, opt.defaultEnabled]))
  );
  const [saved, setSaved] = useState(false);

  const handleToggle = (id: string) => {
    if (id === "necessary") return;
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
    setSaved(false);
  };

  const handleRejectAll = () => {
    setToggles(
      Object.fromEntries(
        COOKIE_OPTIONS.map((opt) => [opt.id, opt.required ? true : false])
      )
    );
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10 w-full">

      {/* Hero Header */}
      <div className="bg-blue-700 rounded-lg shadow-sm p-8 text-white mb-8">
        <div className="max-w-3xl">
          <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider bg-blue-600 px-2.5 py-1 rounded">
            Preferences
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-2">Cookie Settings</h2>
          <p className="text-blue-100 text-sm md:text-base">
            Choose which cookies you allow us to use. You can change these settings at
            any time. For more information, please read our Privacy Policy.
          </p>
        </div>
      </div>

      {/* Cookie Options */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        {COOKIE_OPTIONS.map((option, index) => (
          <div
            key={option.id}
            className={`flex items-start justify-between px-6 py-5 gap-6 ${
              index !== COOKIE_OPTIONS.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            {/* Text */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">
                {option.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {option.description}
              </p>
            </div>

            {/* Toggle */}
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0 pt-0.5">
              {option.required && (
                <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">
                  Required
                </span>
              )}
              <button
                onClick={() => handleToggle(option.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  toggles[option.id] ? "bg-blue-600" : "bg-gray-200"
                } ${option.required ? "opacity-90 cursor-not-allowed" : "cursor-pointer"}`}
                aria-pressed={toggles[option.id]}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    toggles[option.id] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
          {saved && (
            <span className="text-xs text-green-600 font-medium mr-2">
              ✓ Preferences saved
            </span>
          )}
          <button
            onClick={handleRejectAll}
            className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reject all optional
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Save preferences
          </button>
        </div>
      </div>

    </div>
  );
}