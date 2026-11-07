import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  UserCheck,
  Mail,
  KeyRound,
  ShieldCheck,
  LogOut,
  Database,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.tsx';
import localConfig from '../../../firebase-applet-config.json';

export const AdminProfile: React.FC = () => {
  const { user, logout, updateUserPassword } = useAuth();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await updateUserPassword(newPassword);
      toast.success('Administrator password updated successfully.');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      console.error('Password change error:', err);
      toast.error(err?.message || 'Failed to update password. You may need to re-authenticate.');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071B3A] font-heading tracking-tight">
          Administrator Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your administrative credentials, active security session, and platform telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Account Details */}
        <div className="md:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#0D6EFD] text-white flex items-center justify-center font-extrabold text-2xl font-heading shadow-md">
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#071B3A] font-heading">
                  {user?.displayName || 'Davidox Administrator'}
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#0D6EFD] border border-blue-200 mt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Authorized Superadmin</span>
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-slate-100 text-sm">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase">Administrator Email</span>
                <p className="font-bold text-[#071B3A] mt-0.5 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#0D6EFD]" />
                  <span>{user?.email}</span>
                </p>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase">User UID</span>
                <p className="font-mono text-xs text-slate-600 mt-0.5 truncate bg-slate-50 p-2 rounded-lg border border-slate-200">
                  {user?.uid}
                </p>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase">Session Status</span>
                <p className="font-semibold text-emerald-600 mt-0.5 flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Active & Verified</span>
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => logout()}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out of Admin Portal</span>
              </button>
            </div>
          </div>

          {/* Infrastructure Specs */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading flex items-center gap-1.5">
              <Database className="w-4 h-4 text-[#0D6EFD]" />
              <span>Connected Firebase Environment</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Project ID:</span>
                <span className="font-mono text-slate-800 font-medium">{localConfig.projectId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Firestore Database:</span>
                <span className="font-mono text-slate-800 font-medium truncate max-w-[200px]">
                  {localConfig.firestoreDatabaseId}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Security Mode:</span>
                <span className="font-bold text-emerald-600">ABAC Hardened Rules</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Change Password */}
        <div className="md:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0D6EFD] flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#071B3A] font-heading">
                Change Password
              </h3>
              <p className="text-xs text-slate-500">Update your email/password credentials.</p>
            </div>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0D6EFD] focus:ring-2 focus:ring-blue-100 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0D6EFD] focus:ring-2 focus:ring-blue-100 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isUpdatingPassword}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#0D6EFD] hover:bg-blue-700 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isUpdatingPassword ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 leading-relaxed">
            <span className="font-bold text-slate-700">Security Recommendation:</span> Always utilize a strong passphrase combining alphanumeric characters and symbols. Never share administrator credentials.
          </div>
        </div>
      </div>
    </div>
  );
};
