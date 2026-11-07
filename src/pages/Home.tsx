import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  TrendingUp,
  Award,
  Layers,
  CheckCircle,
  Cpu,
  Server,
  Cloud,
  Code,
  Sparkles,
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading.tsx';
import { ServiceCard } from '../components/common/ServiceCard.tsx';
import { SERVICES_DATA } from '../data/servicesData.ts';

const LOGO_SRC = '/assets/aistudio/Davidox_Limited__Innovative_Technology_00a44031.png';

export const Home: React.FC = () => {
  const whyChooseUs = [
    {
      title: 'Innovative Technology Solutions',
      description: 'We continuously adopt next-generation frameworks, cloud native patterns, and intelligent automations to keep your enterprise ahead.',
      icon: Sparkles,
    },
    {
      title: 'Professional Development Team',
      description: 'Our senior software engineers, solution architects, and cybersecurity specialists hold elite certifications and decades of combined domain mastery.',
      icon: Users,
    },
    {
      title: 'Customer-Centred Approach',
      description: 'Your business KPIs are our north star. We listen deeply, customize architectures to your goals, and deliver transparent communication.',
      icon: Award,
    },
    {
      title: 'Reliable and Scalable Solutions',
      description: 'Every system is engineered from day one to handle exponential traffic surges with zero latency degradation and zero downtime.',
      icon: TrendingUp,
    },
    {
      title: 'Quality Service Delivery',
      description: 'Rigorous automated QA, continuous integration, regression testing, and security auditing guarantee robust, enterprise-grade deliverables.',
      icon: ShieldCheck,
    },
    {
      title: 'Commitment to Excellence',
      description: 'We do not simply ship code; we forge long-term strategic technology partnerships backed by guaranteed SLAs and ongoing evolution.',
      icon: Zap,
    },
  ];

  const workingProcess = [
    {
      step: '01',
      title: 'Consultation',
      description: 'We conduct deep discovery sessions to understand your organizational bottlenecks, operational goals, and technological requirements.',
      icon: Users,
    },
    {
      step: '02',
      title: 'Planning & Strategy',
      description: 'We formulate detailed architectural blueprints, scope breakdowns, technical stack selection, and milestone-driven implementation roadmaps.',
      icon: Layers,
    },
    {
      step: '03',
      title: 'Design & Development',
      description: 'Our multidisciplinary engineers build modular, secure, high-throughput software and systems following modern agile sprints.',
      icon: Code,
    },
    {
      step: '04',
      title: 'Testing & Deployment',
      description: 'Comprehensive performance stress testing, security penetration audits, and zero-downtime deployment to production cloud environments.',
      icon: Server,
    },
    {
      step: '05',
      title: 'Support & Maintenance',
      description: '24/7 proactive infrastructure monitoring, regular security patching, performance optimization, and guaranteed SLA incident support.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-32 bg-gradient-to-b from-blue-50/50 via-white to-slate-50">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline and CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-blue-50 border border-blue-200/80 text-[#0D6EFD] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#0D6EFD] animate-ping" />
                <span>Premier IT & Software Engineering Partner</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#071B3A] tracking-tight leading-[1.12] font-heading">
                Transforming Businesses Through{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D6EFD] to-blue-800">
                  Innovative Technology.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Davidox Limited empowers modern enterprises with scalable cloud computing, custom software architectures,
                high-speed infrastructure, and strategic digital transformation to achieve sustainable operational growth.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white bg-[#0D6EFD] hover:bg-blue-700 shadow-md hover:shadow-lg hover:shadow-blue-500/25 transition-all cursor-pointer text-base"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-[#071B3A] bg-white hover:bg-slate-50 border border-slate-300 shadow-xs hover:shadow-sm transition-all text-base"
                >
                  <span>Contact Us</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Enterprise SLA Guarantees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>ISO & Cybersecurity Standardized</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>24/7 Dedicated Support Engineering</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Graphic and Metrics */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Card with Logo and Technology Graphics */}
                <div className="relative rounded-3xl bg-gradient-to-br from-[#071B3A] via-[#0B254E] to-[#071B3A] p-7 sm:p-9 text-white shadow-2xl border border-blue-900/50 overflow-hidden">
                  {/* Decorative glowing gradient ring */}
                  <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#0D6EFD]/25 rounded-full blur-2xl" />

                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between pb-6 border-b border-blue-900/60">
                      <div className="bg-white p-2.5 rounded-xl shadow-xs">
                        <img
                          src={LOGO_SRC}
                          alt="Davidox Limited"
                          className="h-9 w-auto object-contain"
                        />
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Systems Operational
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="text-xs uppercase font-semibold text-blue-300 tracking-wider">
                        Enterprise Technology Capability
                      </div>
                      <h3 className="text-2xl font-bold font-heading text-white">
                        Full-Stack Infrastructure & Digital Transformation
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Seamlessly connecting enterprise data models, intelligent cloud orchestration, and responsive interfaces.
                      </p>
                    </div>

                    {/* Stats Grid inside Hero Card */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                        <div className="text-2xl font-black text-blue-400 font-heading">99.99%</div>
                        <div className="text-xs text-slate-300 mt-0.5">Uptime Target SLA</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                        <div className="text-2xl font-black text-blue-400 font-heading">150+</div>
                        <div className="text-xs text-slate-300 mt-0.5">Projects Delivered</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                        <div className="text-2xl font-black text-blue-400 font-heading">10+</div>
                        <div className="text-xs text-slate-300 mt-0.5">Core IT Verticals</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                        <div className="text-2xl font-black text-blue-400 font-heading">24/7</div>
                        <div className="text-xs text-slate-300 mt-0.5">Incident Telemetry</div>
                      </div>
                    </div>

                    {/* Cloud and Code Pill */}
                    <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Cloud className="w-4 h-4 text-blue-400" />
                        <span>Cloud Native</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Cpu className="w-4 h-4 text-blue-400" />
                        <span>High-Throughput</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-blue-400" />
                        <span>Zero Trust</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overlapping Floating Badge */}
                <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-200/90 items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0D6EFD] flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#071B3A]">Certified IT Engineers</div>
                    <div className="text-[11px] text-slate-500">Global Standards Compliance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Davidox Limited Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-200/90 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#0D6EFD] border border-blue-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D6EFD]" />
                About Davidox Limited
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071B3A] tracking-tight font-heading leading-tight">
                Architecting Modern Technology for High-Growth Enterprises.
              </h2>

              <p className="text-slate-600 leading-relaxed text-base">
                Davidox Limited is an elite Information Technology company dedicated to providing dependable, scalable,
                and innovative IT solutions. We bridge the gap between business vision and technical execution by deploying
                world-class software development, cloud computing frameworks, automated business workflows, and robust
                networking infrastructure.
              </p>

              <p className="text-slate-600 leading-relaxed text-base">
                Our team takes pride in a relentless commitment to engineering precision, transparent project governance,
                and round-the-clock technological reliability. Whether modernizing legacy enterprise software or launching
                groundbreaking digital products, Davidox Limited stands as your trusted technological partner.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#071B3A] hover:bg-[#0D6EFD] transition-colors shadow-sm text-sm"
                >
                  <span>Read Full Company Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="text-sm font-semibold text-[#0D6EFD] hover:underline"
                >
                  Schedule a Consultation
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-blue-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0D6EFD] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-[#071B3A] font-heading mb-2">Unwavering Reliability</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We build mission-critical architectures designed for fault-tolerance, zero-data-loss failover, and continuous continuity.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-blue-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0D6EFD] flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-[#071B3A] font-heading mb-2">Innovation Driven</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Leveraging modern serverless paradigms, automated CI/CD pipelines, and reactive frontend architectures.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-blue-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0D6EFD] flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-[#071B3A] font-heading mb-2">Client Partnership</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Collaborative agile governance where stakeholders maintain full visibility and strategic technical control.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-blue-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0D6EFD] flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-[#071B3A] font-heading mb-2">Scalable ROI</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Streamlined operational processes and automated workflows designed to compound enterprise profitability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="What We Deliver"
          title="Comprehensive Enterprise IT Services"
          subtitle="Explore our specialized services designed to accelerate digital maturity, safeguard data integrity, and drive sustained innovation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES_DATA.slice(0, 6).map((service, index) => (
            <ServiceCard key={service.id} service={service} featured={index === 0} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-[#0D6EFD] hover:bg-blue-700 shadow-md transition-all text-sm cursor-pointer"
          >
            <span>View All 10 Services & Solutions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Why Choose Davidox Limited Section */}
      <section className="bg-[#071B3A] text-white py-20 sm:py-28 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="The Davidox Advantage"
            title="Why Choose Davidox Limited?"
            subtitle="We blend engineering mastery, strategic business insight, and unwavering accountability to deliver technology that outlasts the competition."
            dark
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 group-hover:bg-[#0D6EFD] group-hover:text-white flex items-center justify-center transition-colors mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Working Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Agile Methodology"
          title="Our Proven Working Process"
          subtitle="A transparent, five-step delivery framework ensuring precision, security, and measurable results from discovery to ongoing support."
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {workingProcess.map((proc, index) => {
            const Icon = proc.icon;
            return (
              <div
                key={proc.step}
                className="relative flex flex-col p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-slate-200 group-hover:text-blue-100 transition-colors font-heading">
                    {proc.step}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0D6EFD] group-hover:bg-[#0D6EFD] group-hover:text-white flex items-center justify-center transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#071B3A] mb-2 font-heading">
                  {proc.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {proc.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#071B3A] via-[#0B254E] to-[#0D6EFD] p-10 sm:p-14 lg:p-16 text-white text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10 space-y-6">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-blue-200 border border-white/20">
              Start Your Digital Evolution
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-heading text-white">
              Ready to Transform Your Business?
            </h2>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              Partner with Davidox Limited to turn complex technical challenges into competitive market advantages.
              Our technology advisors and senior engineering leads are ready to discuss your next breakthrough project.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[#071B3A] bg-white hover:bg-slate-100 shadow-md hover:shadow-lg transition-all text-base cursor-pointer"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-5 h-5 text-[#0D6EFD]" />
              </Link>
              <Link
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-white/15 hover:bg-white/20 border border-white/30 transition-all text-base"
              >
                <span>Browse Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
