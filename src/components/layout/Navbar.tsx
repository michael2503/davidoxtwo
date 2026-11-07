import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

const LOGO_SRC = '/assets/aistudio/Davidox_Limited__Innovative_Technology_00a44031.png';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <img
              src={LOGO_SRC}
              alt="Davidox Limited"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${
                    active
                      ? 'text-[#0D6EFD] bg-blue-50/80 font-bold'
                      : 'text-slate-700 hover:text-[#0D6EFD] hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#0D6EFD] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/admin"
              className="p-2 text-slate-500 hover:text-[#0D6EFD] hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4 text-slate-400 group-hover:text-[#0D6EFD]" />
              <span className="hidden lg:inline">Admin Portal</span>
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#0D6EFD] hover:bg-blue-700 transition-all shadow-sm hover:shadow-md hover:shadow-blue-500/20 active:scale-[0.98] cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              to="/admin"
              className="p-2 text-slate-500 hover:text-[#0D6EFD] rounded-lg"
              title="Admin Portal"
            >
              <ShieldCheck className="w-5 h-5 text-slate-400" />
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0D6EFD] hover:bg-slate-100 rounded-lg transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    active
                      ? 'bg-blue-50 text-[#0D6EFD] font-bold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#0D6EFD]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
            <Link
              to="/contact"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-[#0D6EFD] hover:bg-blue-700 transition-colors shadow-sm"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/admin"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              <span>Admin Management Dashboard</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
