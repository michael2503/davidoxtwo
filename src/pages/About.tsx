import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Target,
  Eye,
  Sparkles,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Cpu,
  Layers,
  HeartHandshake,
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading.tsx';

const LOGO_SRC = '/assets/aistudio/Davidox_Limited__Innovative_Technology_00a44031.png';

export const About: React.FC = () => {
  const coreValues = [
    {
      title: 'Innovation',
      description: 'We embrace emerging paradigms, continuous learning, and creative problem solving to keep clients at the forefront of digital excellence.',
      icon: Sparkles,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      title: 'Integrity',
      description: 'Uncompromising transparency, honest technical advice, and strict ethical standards govern every client relationship and line of code.',
      icon: ShieldCheck,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      title: 'Excellence',
      description: 'We set rigorous standards for architecture, code maintainability, speed, and design polish, refusing to settle for mediocre solutions.',
      icon: Award,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      title: 'Professionalism',
      description: 'Reliable execution, meticulous documentation, structured sprint cadences, and disciplined communication define our workplace culture.',
      icon: Users,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      title: 'Customer Satisfaction',
      description: 'We measure our ultimate success by the long-term operational velocity and compounded profitability our clients achieve.',
      icon: HeartHandshake,
      color: 'text-rose-600 bg-rose-50',
    },
    {
      title: 'Reliability',
      description: 'From zero-downtime deployments to mission-critical infrastructure, our systems and our teams are always there when you need them.',
      icon: Target,
      color: 'text-sky-600 bg-sky-50',
    },
  ];

  const trustPillars = [
    {
      title: 'Zero Vendor Lock-In',
      description: 'You own 100% of your source code, deployment scripts, infrastructure definitions, and intellectual property from day one.',
    },
    {
      title: 'Enterprise Security by Default',
      description: 'Strict adherence to ISO 27001, OWASP Top 10, and modern Zero-Trust network protocols to safeguard corporate data.',
    },
    {
      title: 'Transparent Agile Communication',
      description: 'Direct access to senior engineering leads, regular sprint demos, and real-time project management dashboards.',
    },
    {
      title: 'Long-Term Partnership Mindset',
      description: 'Over 85% of our clients continue with Davidox Limited for ongoing feature evolution, cloud governance, and SLA maintenance.',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      {/* 1. Page Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 bg-gradient-to-b from-blue-50/60 via-white to-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-[#0D6EFD] border border-blue-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0D6EFD]" />
              Corporate Profile & Heritage
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#071B3A] tracking-tight font-heading leading-tight">
              About Davidox Limited
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
              We are an innovative Information Technology company pioneering scalable software engineering,
              enterprise cloud modernization, and strategic digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* 2 & 3. Company Overview & Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#0D6EFD]">
              Company Overview
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071B3A] font-heading leading-tight">
              Bridging Visionary Strategy with Flawless Technical Execution.
            </h2>

            <p className="text-slate-600 leading-relaxed text-base">
              Davidox Limited was founded on a singular conviction: that modern businesses need more than just reactive IT support—they require a strategic technological co-pilot capable of navigating fast-moving disruptions.
            </p>

            <p className="text-slate-600 leading-relaxed text-base">
              Headquartered with global development standards, we assemble top-tier software architects, cloud engineers, UI/UX strategists, and enterprise consultants. From mid-market enterprises looking to dismantle legacy silos to high-growth ventures building proprietary SaaS platforms, we architect resilient solutions that scale effortlessly under heavy real-world demands.
            </p>

            <div className="pt-2">
              <h3 className="text-lg font-bold text-[#071B3A] font-heading mb-3">Our Story</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Started by visionary technology specialists frustrated with bloated, low-transparency IT delivery, Davidox Limited was built to offer clarity, uncompromising code quality, and true accountability. Over the years, we have evolved into a trusted corporate technology brand, managing mission-critical infrastructures, delivering high-throughput digital services, and transforming traditional workflows into automated digital assets.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl bg-[#071B3A] p-8 sm:p-10 text-white relative shadow-xl overflow-hidden border border-blue-900/60">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="bg-white p-3 rounded-2xl inline-block shadow-sm">
                  <img
                    src={LOGO_SRC}
                    alt="Davidox Limited"
                    className="h-10 w-auto object-contain"
                  />
                </div>

                <h3 className="text-2xl font-bold font-heading text-white">
                  Transforming Businesses Through Innovative Technology.
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Our motto reflects our daily mission. We do not just build systems; we transform how organizations operate, serve their customers, and scale into new markets.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700/60 text-center">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-3xl font-extrabold text-blue-400 font-heading">100%</div>
                    <div className="text-xs text-slate-300 mt-1">Client IP Ownership</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-3xl font-extrabold text-blue-400 font-heading">10+</div>
                    <div className="text-xs text-slate-300 mt-1">Specialized Verticals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 & 5. Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden group hover:border-blue-400 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0D6EFD] flex items-center justify-center mb-6">
              <Target className="w-7 h-7" />
            </div>
            <div className="text-xs uppercase font-bold tracking-wider text-[#0D6EFD] mb-2">
              Our Mission
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071B3A] font-heading mb-4">
              To Deliver Innovative, Dependable, and Scalable IT Solutions.
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Our mission is to empower organizations by engineering robust digital infrastructures, intuitive software platforms, and transformative technologies that streamline operations, maximize security, and unlock new avenues of enterprise value.
            </p>
          </div>

          {/* Vision Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#071B3A] to-[#0B254E] text-white shadow-xl relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6 border border-blue-400/30">
              <Eye className="w-7 h-7" />
            </div>
            <div className="text-xs uppercase font-bold tracking-wider text-blue-400 mb-2">
              Our Vision
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-4">
              To Be the Leading Benchmark for Enterprise Technology Excellence.
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Our vision is to become the premier IT partner recognized globally for technological innovation, uncompromising engineering integrity, and the definitive catalyst behind successful business transformations.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Core Values */}
      <section className="bg-slate-100/70 py-20 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Guiding Principles"
            title="Our Core Values"
            subtitle="The foundational tenets that drive our engineering decisions, client collaborations, and operational culture."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${value.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#071B3A] font-heading mb-2">
                    {value.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Our Approach to Technology */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#0D6EFD]">
              Engineering Discipline
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071B3A] font-heading leading-tight">
              Our Architectural Approach to Technology
            </h2>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Technology shouldn’t be an unpredictable black box. We approach every digital challenge with architectural rigor, modular principles, and defensive programming.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0D6EFD] flex items-center justify-center shrink-0 mt-0.5">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#071B3A]">Modular Decoupled Design</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Microservices and componentized APIs that allow isolated scaling and easy future enhancements.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0D6EFD] flex items-center justify-center shrink-0 mt-0.5">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#071B3A]">Automated CI/CD Quality Gates</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Automated test runners, security vulnerability linters, and branch preview deployments before production release.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0D6EFD] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#071B3A]">Zero-Trust Security & Encryption</h4>
                  <p className="text-xs text-slate-600 mt-0.5">End-to-end TLS encryption, secure authentication policies, and strict role-based authorization.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {trustPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-[#0D6EFD]" />
                  <h4 className="text-base font-bold text-[#071B3A] font-heading">{pillar.title}</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#071B3A] p-10 sm:p-14 text-white text-center shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading">
              Ready to Work With a Dedicated IT Partner?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Discover how Davidox Limited can accelerate your technological capabilities. Connect with our senior consultants today for an exploratory discovery conversation.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-[#0D6EFD] hover:bg-blue-700 shadow-md transition-all text-sm cursor-pointer"
              >
                <span>Get in Touch With Our Team</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
