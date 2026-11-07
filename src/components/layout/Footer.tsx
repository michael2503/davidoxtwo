import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ArrowRight, ShieldCheck, Linkedin, Twitter, Github, Facebook } from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData.ts';

const LOGO_SRC = '/assets/aistudio/Davidox_Limited__Innovative_Technology_00a44031.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#071B3A] text-slate-300 relative overflow-hidden border-t border-slate-800">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block bg-white p-2.5 rounded-xl shadow-xs">
              <img
                src={LOGO_SRC}
                alt="Davidox Limited Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Davidox Limited is a premier Information Technology powerhouse delivering custom software,
              cloud engineering, IT consulting, and digital transformation solutions to modernize enterprises worldwide.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-[#0D6EFD] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-[#0D6EFD] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-[#0D6EFD] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-[#0D6EFD] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider font-heading">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-400 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Admin Access</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* IT Services Links */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider font-heading">
              Our Services
            </h3>
            <ul className="space-y-2 text-sm">
              {SERVICES_DATA.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services#${service.id}`}
                    className="hover:text-blue-400 transition-colors line-clamp-1"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 text-xs font-semibold mt-1">
                  <span>View All 10 Services</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider font-heading">
              Corporate Office
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Plot 14B Tech Horizon Boulevard, Victoria Island, Lagos / London Tech Gateway
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="mailto:info@davidoxlimited.com" className="hover:text-blue-400 transition-colors">
                  info@davidoxlimited.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="tel:+2348003284369" className="hover:text-blue-400 transition-colors">
                  +234 (0) 800 328 4369
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Mon - Fri: 8:00 AM - 6:00 PM (WAT/GMT)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Davidox Limited. All rights reserved.</p>
          <p className="italic text-slate-300">
            Transforming Businesses Through Innovative Technology.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-blue-400 transition-colors">
              Support
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/about" className="hover:text-blue-400 transition-colors">
              Privacy & Ethics
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/admin" className="hover:text-blue-400 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
