import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-block p-4 rounded-3xl bg-blue-50 text-[#0D6EFD] border border-blue-200">
          <span className="text-5xl font-black font-heading">404</span>
        </div>

        <h1 className="text-3xl font-extrabold text-[#071B3A] font-heading">
          Page Not Found
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed">
          The requested page could not be located on the Davidox Limited corporate network. It may have been moved, renamed, or temporarily archived.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#0D6EFD] hover:bg-blue-700 transition-colors shadow-sm text-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
