import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ShieldCheck, Sparkles, User, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../layout/Logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
  onNavigate?: (path: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
  onNavigate
}) => {
  const { login, signUp, quickAdminLogin, authorizedEmail } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        setLoading(false);
        return;
      }

      const res = await signUp(email, password, fullName);
      setLoading(false);
      if (res.success) {
        setSuccessMsg('Account created successfully! Welcome to ResinArt.');
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setError(res.error || 'Failed to create account.');
      }
    } else {
      const res = await login(email, password);
      setLoading(false);
      if (res.success) {
        setSuccessMsg('Signed in successfully!');
        setTimeout(() => {
          onClose();
          if (email.toLowerCase().includes('n49224460') && onNavigate) {
            onNavigate('/admin/dashboard/');
          }
        }, 800);
      } else {
        setError(res.error || 'Authentication failed. Please verify credentials.');
      }
    }
  };

  const handleInstantAdmin = async () => {
    setLoading(true);
    setError(null);
    try {
      await quickAdminLogin();
      setSuccessMsg('Signed in as Administrator (Manan Irfan)!');
      setTimeout(() => {
        onClose();
        if (onNavigate) {
          onNavigate('/admin/dashboard/');
        }
      }, 800);
    } catch {
      setError('Instant admin login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="relative bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 p-6 text-white text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
            aria-label="Close authentication modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex justify-center mb-3">
            <Logo variant="light" size="md" />
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-medium tracking-tight">
            {mode === 'signin' ? 'Welcome Back' : 'Join the Community'}
          </h2>
          <p className="text-xs text-stone-300 mt-1 max-w-xs mx-auto">
            {mode === 'signin'
              ? 'Access bookmarking, saved recipes, and editorial tutorials.'
              : 'Create your free account to unlock masterclasses and guides.'}
          </p>

          {/* Mode Switch Tabs */}
          <div className="flex bg-slate-800/80 p-1 rounded-xl max-w-xs mx-auto mt-4 border border-white/10">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setError(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === 'signin'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {/* Quick Admin Access Bar */}
          <div className="mb-5 p-3.5 bg-teal-50/80 border border-teal-200/90 rounded-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
              <div className="text-left">
                <span className="text-xs font-semibold text-teal-950 block">
                  Admin (Manan Irfan)
                </span>
                <span className="text-[11px] text-teal-700 block">
                  {authorizedEmail}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleInstantAdmin}
              disabled={loading}
              className="py-1.5 px-3 bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium rounded-lg transition cursor-pointer shrink-0 shadow-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Access</span>
            </button>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg mb-4">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg mb-4">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-teal-700 focus:bg-white transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-teal-700 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-teal-700 focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-teal-700 focus:bg-white transition"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition cursor-pointer shadow-xs mt-2"
            >
              {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In to ResinArt' : 'Create Free Account'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-xs text-stone-500">
              {mode === 'signin' ? "Don't have an account yet? " : "Already have an account? "}
            </span>
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin');
                setError(null);
                setSuccessMsg(null);
              }}
              className="text-xs text-teal-700 hover:text-teal-900 font-semibold underline cursor-pointer"
            >
              {mode === 'signin' ? 'Sign up here' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
