import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, PhoneCall } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading.tsx';
import { IconResolver } from '../components/common/IconResolver.tsx';
import { SERVICES_DATA } from '../data/servicesData.ts';

export const Services: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All 10 Services' },
    { id: 'dev', label: 'Software & Mobile', matchIds: ['web-application-development', 'mobile-application-development', 'software-development', 'ui-ux-design'] },
    { id: 'cloud', label: 'Cloud & Infrastructure', matchIds: ['cloud-computing-solutions', 'computer-networking-infrastructure'] },
    { id: 'enterprise', label: 'Transformation & Consulting', matchIds: ['it-consulting', 'business-process-automation', 'digital-transformation', 'it-support-and-maintenance'] },
  ];

  const filteredServices = SERVICES_DATA.filter((service) => {
    if (selectedCategory === 'all') return true;
    const cat = categories.find((c) => c.id === selectedCategory);
    return cat?.matchIds?.includes(service.id);
  });

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* Page Hero */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 bg-gradient-to-b from-blue-50/60 via-white to-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-[#0D6EFD] border border-blue-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0D6EFD]" />
              Enterprise Solutions Portfolio
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#071B3A] tracking-tight font-heading leading-tight">
              Our IT & Technology Services
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
              Explore our comprehensive suite of Information Technology capabilities engineered to elevate operational performance, optimize costs, and future-proof digital operations.
            </p>

            {/* Quick Filter Tabs */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#0D6EFD] text-white shadow-md shadow-blue-500/20'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services List Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="bg-white rounded-3xl p-8 sm:p-10 lg:p-12 border border-slate-200/90 shadow-sm hover:border-blue-300 hover:shadow-lg transition-all duration-300 scroll-mt-28"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Overview */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0D6EFD] flex items-center justify-center shadow-xs">
                      <IconResolver name={service.iconName} className="w-7 h-7" />
                    </div>
                    {service.badge && (
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071B3A] font-heading leading-tight">
                    {service.title}
                  </h2>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {service.detailedDescription}
                  </p>

                  {/* Consultation Button */}
                  <div className="pt-2">
                    <Link
                      to={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#0D6EFD] hover:bg-blue-700 shadow-sm hover:shadow-md transition-all text-sm cursor-pointer"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Request a Consultation</span>
                    </Link>
                  </div>
                </div>

                {/* Right Details: Benefits & Tech Stack */}
                <div className="lg:col-span-7 bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200/80 space-y-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#071B3A] font-heading mb-4">
                      Key Business Benefits
                    </h3>
                    <div className="space-y-3">
                      {service.keyBenefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#0D6EFD] shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700 leading-relaxed">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies Involved */}
                  <div className="pt-4 border-t border-slate-200/80">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 font-heading">
                      Technologies & Solutions Involved
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-2xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#071B3A] to-[#0D6EFD] p-10 sm:p-14 text-white text-center shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading">
              Have a Unique Project or Custom IT Requirement?
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              We specialize in custom enterprise solutions tailored to your unique compliance, architecture, and performance goals.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-[#071B3A] bg-white hover:bg-slate-100 shadow-md transition-all text-sm cursor-pointer"
              >
                <span>Speak to a Solutions Architect</span>
                <ArrowRight className="w-4 h-4 text-[#0D6EFD]" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
