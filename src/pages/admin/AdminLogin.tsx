import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/layout/Logo';

export const AdminLogin: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { login, quickAdminLogin, isAdmin, authorizedEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuickAdminLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await quickAdminLogin();
      onNavigate('/admin/dashboard/');
    } catch {
      setError('Quick admin login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail(authorizedEmail);
    setPassword('admin123');
  };

  // If already authenticated as admin, offer jump to dashboard
  if (isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-stone-200 p-8 shadow-md text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-xl font-semibold text-stone-900">
            Admin Session Active
          </h2>
          <p className="text-xs text-stone-600">
            You are authenticated as <strong>{authorizedEmail}</strong>.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/admin/dashboard/')}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Go to CMS Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      onNavigate('/admin/dashboard/');
    } else {
      setError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo size="md" />
            </div>
            <h1 className="font-serif text-2xl font-medium text-stone-900 tracking-tight">
              Admin Portal
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Authorized Content Management System
            </p>
          </div>

          <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl mb-4 text-xs text-amber-900 flex items-start gap-2">
            <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Designated Administrator:</strong> <span className="font-mono text-[11px] font-semibold">{authorizedEmail}</span>.
            </div>
          </div>

          {/* Instant 1-Click Login for Admin */}
          <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-xl text-center space-y-2.5">
            <div className="text-xs font-semibold text-teal-950 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>Direct Creator / Admin Access</span>
            </div>
            <p className="text-[11px] text-teal-800 leading-snug">
              Instant login for Manan Irfan without needing database credentials setup.
            </p>
            <button
              type="button"
              onClick={handleQuickAdminLogin}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold transition cursor-pointer shadow-sm flex items-center justify-center gap-2"
            >
              <span>⚡ Instant Sign In as Admin (Manan Irfan)</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-stone-200 w-full" />
            <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-stone-400 shrink-0">
              Or Manual Credentials
            </span>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl mb-6 text-xs text-rose-800 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-stone-700">
                  Admin Email Address
                </label>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-[11px] text-teal-700 hover:text-teal-900 font-medium underline cursor-pointer"
                >
                  Autofill Admin
                </button>
              </div>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder={authorizedEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-teal-700 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-teal-700 focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to ResinArt CMS'}</span>
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-stone-100 text-center">
            <button
              onClick={() => onNavigate('/')}
              className="text-xs text-stone-500 hover:text-stone-800 transition"
            >
              ← Back to Public Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
