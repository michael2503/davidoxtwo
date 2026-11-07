import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar.tsx';
import { Footer } from '../components/layout/Footer.tsx';

export const PublicLayout: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-[#071B3A]">
      <Navbar />
      <main className="flex-1 pt-18 sm:pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
