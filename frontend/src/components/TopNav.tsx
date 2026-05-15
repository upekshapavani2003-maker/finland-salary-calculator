"use client";
import React, { useState } from 'react';

interface TopNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navLinks = [
  { label: 'Calculator', tab: 'calculator' },
  { label: 'How it works', tab: 'how-it-works' },
  { label: 'Salary by City', tab: 'salary-by-city' },
  { label: 'Guides', tab: 'guides' },
  { label: 'About', tab: 'about' },
];

export default function TopNav({ activeTab, setActiveTab }: TopNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  const getButtonClass = (tabName: string) => {
    return `px-3 py-2 text-sm font-medium border-b-2 transition-colors duration-150 ${
      activeTab === tabName
        ? 'border-blue-600 text-blue-600 font-semibold'
        : 'border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300'
    }`;
  };

  const getMobileButtonClass = (tabName: string) => {
    return `block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors duration-150 ${
      activeTab === tabName
        ? 'bg-blue-50 text-blue-700 font-semibold'
        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
    }`;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center min-w-0">
            <img src="/assets/logo-icon.jpg" alt="logo" className="w-8 h-8 rounded-[4px] flex-shrink-0" />
            <div className="ml-3 min-w-0">
              <h1 className="text-base font-semibold text-gray-900 leading-tight truncate">
                Finland Salary Calculator
              </h1>
              <p className="text-xs text-gray-500 leading-tight">Know your take-home pay</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.tab}
                onClick={() => handleNavigate(link.tab)}
                className={getButtonClass(link.tab)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side: Language + Hamburger */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Language Selector */}
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="en">EN</option>
                <option value="fi">FI</option>
                <option value="sv">SV</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-150"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu — no md:hidden here, JS controls visibility */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.tab}
                onClick={() => handleNavigate(link.tab)}
                className={getMobileButtonClass(link.tab)}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}