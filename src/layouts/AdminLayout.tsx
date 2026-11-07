import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  UserCheck,
  LogOut,
  Globe,
  Menu,
  X,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { subscribeToContactMessages } from '../services/contactService.ts';

const LOGO_SRC = '/assets/aistudio/Davidox_Limited__Innovative_Technology_00a44031.png';

export const AdminLayout: React.FC = () => {
  const { user, isAdmin, loading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newCount, setNewCount] = useState<number>(0);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login', { replace: true });
    }
  }, [user, loading, navigate]);

  // Subscribe to unread messages count for sidebar badge
  useEffect(() => {
    if (user && isAdmin) {
      const unsub = subscribeToContactMessages(
        (messages) => {
          const unread = messages.filter((m) => m.status === 'new').length;
          setNewCount(unread);
        },
        (err) => console.warn('Sidebar badge listener error:', err)
      );
      return () => unsub();
    }
  }, [user, isAdmin]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-[#0D6EFD] rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-300 font-heading">
          Authenticating Davidox Admin Portal...
        </p>
      </div>
    );
  }

  if (!user) {
    return null; // Will navigate to /admin/login
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-200 text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#071B3A] font-heading">
            Unauthorized Administrator Account
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The account <span className="font-semibold text-slate-800">{user.email}</span> does not have verified administrative privileges for Davidox Limited.
          </p>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left">
            <span className="font-bold text-slate-800">Primary Administrator Email:</span>
            <br />
            omotoshomichael2503@gmail.com
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => logout()}
              className="w-full py-3 rounded-xl font-bold text-sm text-white bg-[#0D6EFD] hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Sign In With Authorized Account
            </button>
            <Link
              to="/"
              className="w-full py-2.5 rounded-xl font-medium text-xs text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Contact Enquiries', path: '/admin/messages', icon: Inbox, badge: newCount },
    { name: 'Admin Profile', path: '/admin/profile', icon: UserCheck },
  ];

  const isCurrentActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex text-[#071B3A]">
      {/* Desktop & Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#071B3A] text-slate-300 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl">
              <img
                src={LOGO_SRC}
                alt="Davidox Limited"
                className="h-8 w-auto object-contain"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Davidox
              </div>
              <div className="text-[10px] text-blue-400 font-semibold">Davidox Portal</div>
            </div>
          </Link>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-300">
            Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isCurrentActive(item.path, item.exact);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  active
                    ? 'bg-[#0D6EFD] text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      active ? 'bg-white text-[#0D6EFD]' : 'bg-[#0D6EFD] text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-6 px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-300">
            External
          </div>

          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors"
          >
            <Globe className="w-5 h-5" />
            <span>View Live Website</span>
          </Link>
        </div>

        {/* Sidebar Footer / User Info */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs uppercase border border-blue-400/30">
              {user.email?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">{user.email}</div>
              <div className="text-[10px] text-emerald-400 font-semibold">Authorized Admin</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-[#071B3A] rounded-lg cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:block">
              <span className="text-xs font-semibold text-slate-600">Davidox Limited Control Center</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Firestore Connected</span>
            </div>

            <Link
              to="/admin/profile"
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl hover:bg-slate-100 transition-colors text-xs font-bold text-slate-700"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#0D6EFD] flex items-center justify-center font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline truncate max-w-[150px]">{user.email}</span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
