"use client";

import React from 'react';
import { Users, Calendar, ShieldCheck, ExternalLink } from 'lucide-react';

const AboutContent = () => {
  const stats = [
    { label: 'Monthly active users', value: '310+', icon: <Users size={20} /> },
    { label: 'Tax year data', value: '2024', icon: <Calendar size={20} /> },
    { label: 'Free to use', value: '100%', icon: <ShieldCheck size={20} /> },
  ];

  const team = [
    { name: 'Mikael Heinonen', role: 'Founder & Tax Analyst', initials: 'MH', color: 'bg-blue-100 text-blue-700' },
    { name: 'Anna Leinonen', role: 'Product & Design', initials: 'AL', color: 'bg-emerald-100 text-emerald-700' },
    { name: 'Juhani Peltonen', role: 'Data & Engineering', initials: 'JP', color: 'bg-orange-100 text-orange-700' },
  ];

  const sources = [
    {
      name: 'Finnish Tax Administration (Vero.fi)',
      desc: 'Official source for all state and municipal tax rates, rules, and guidelines.',
    },
    {
      name: 'Association of Finnish Local Authorities',
      desc: 'Kuntaliitto provides tax rates for all 309 municipalities in Finland.',
    },
    {
      name: 'Finnish Center for Pensions (ETK)',
      desc: 'TyEL pension contribution rates and unemployment insurance figures.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10 w-full" id="about">
      
      {/* Header Section */}
      <div className="bg-blue-700 rounded-lg shadow-sm p-8 text-white mb-8">
        <div className="max-w-3xl">
          <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider bg-blue-600 px-2.5 py-1 rounded">
            Our Story
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-2">Built for clarity, not complexity</h2>
          <p className="text-blue-100 text-sm md:text-base">
            We built this tool because Finnish tax calculations are genuinely confusing — even for 
            locals. Our goal is to make take-home pay transparent for everyone.
          </p>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm">
            <div className="text-4xl font-black text-blue-700 mb-2">{stat.value}</div>
            <div className="text-gray-500 text-xs font-bold uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Mission Section */}
      <div className="max-w-3xl mb-16">
        <h3 className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-4">OUR MISSION</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          We believe everyone deserves to understand their paystub. This calculator was created to help 
          employees, job seekers, HR professionals, and newcomers to Finland make informed financial 
          decisions — without needing to read through dense government documentation.
        </p>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h3 className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-8">THE TEAM</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${member.color}`}>
                {member.initials}
              </div>
              <div>
                <div className="text-gray-900 font-bold text-sm">{member.name}</div>
                <div className="text-gray-500 text-xs">{member.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Sources Section */}
      <div className="max-w-3xl">
        <h3 className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-6">DATA SOURCES</h3>
        <div className="space-y-6">
          {sources.map((source, i) => (
            <div key={i} className="flex gap-4 group cursor-default">
              <div className="mt-1">
                <div className="w-2 h-2 rounded-full bg-blue-200 group-hover:bg-blue-500 transition-colors" />
              </div>
              <div>
                <div className="text-gray-900 font-bold text-sm flex items-center gap-2">
                  {source.name}
                </div>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">{source.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutContent;