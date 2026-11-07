import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { IconResolver } from './IconResolver.tsx';
import type { ServiceItem } from '../../types/index.ts';

interface ServiceCardProps {
  service: ServiceItem;
  featured?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, featured = false }) => {
  return (
    <div
      id={service.id}
      className={`group relative flex flex-col justify-between bg-white rounded-2xl p-6 sm:p-8 transition-all duration-300 border ${
        featured
          ? 'border-blue-400/80 shadow-lg shadow-blue-500/10 ring-1 ring-blue-400/30'
          : 'border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1'
      }`}
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="w-13 h-13 rounded-xl bg-blue-50 text-[#0D6EFD] group-hover:bg-[#0D6EFD] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
            <IconResolver name={service.iconName} className="w-6 h-6" />
          </div>
          {service.badge && (
            <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/70 group-hover:bg-blue-50 group-hover:text-[#0D6EFD] group-hover:border-blue-200 transition-colors">
              {service.badge}
            </span>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-[#071B3A] group-hover:text-[#0D6EFD] transition-colors font-heading mb-3">
          {service.title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {service.shortDescription}
        </p>

        {/* Key Benefits Preview */}
        <div className="space-y-2 mb-6">
          {service.keyBenefits.slice(0, 3).map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#0D6EFD] shrink-0 mt-0.5" />
              <span className="leading-tight">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Technologies Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {service.technologies.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
            >
              {tech}
            </span>
          ))}
          {service.technologies.length > 4 && (
            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-400">
              +{service.technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <Link
          to={`/contact?service=${encodeURIComponent(service.title)}`}
          className="text-xs font-bold text-[#0D6EFD] hover:text-blue-800 flex items-center gap-1 group/btn"
        >
          <span>Request Consultation</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
        </Link>
        <Link
          to="/services"
          className="text-xs font-medium text-slate-400 hover:text-slate-600"
        >
          Details
        </Link>
      </div>
    </div>
  );
};
