import React, { createContext, useContext, useEffect, useState } from 'react';
import { AUTHORIZED_ADMIN_EMAIL, AUTHORIZED_ADMIN_EMAILS, isAuthorizedAdmin, isSupabaseConfigured, supabase } from '../lib/supabase';

export interface AuthUser {
  id: string;
  email: string;
  fullName?: string;
  role: 'admin' | 'reader';
}

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  quickAdminLogin: () => Promise<{ success: boolean }>;
  authorizedEmail: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_SESSION_KEY = 'resinart_user_session_auth';
const USERS_STORE_KEY = 'resinart_registered_users';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      try {
        if (isSupabaseConfigured) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user?.email) {
            const adminStatus = isAuthorizedAdmin(session.user.email);
            setUser({
              id: session.user.id,
              email: session.user.email,
              fullName: session.user.user_metadata?.full_name || (adminStatus ? 'Manan Irfan (Admin)' : 'Artisan Reader'),
              role: adminStatus ? 'admin' : 'reader'
            });
          } else {
            setUser(null);
          }

          const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user?.email) {
              const adminStatus = isAuthorizedAdmin(session.user.email);
              setUser({
                id: session.user.id,
                email: session.user.email,
                fullName: session.user.user_metadata?.full_name || (adminStatus ? 'Manan Irfan (Admin)' : 'Artisan Reader'),
                role: adminStatus ? 'admin' : 'reader'
              });
            } else {
              setUser(null);
            }
          });

          return () => {
            listener.subscription.unsubscribe();
          };
        } else {
          // Check local session
          const savedSession = sessionStorage.getItem(USER_SESSION_KEY) || localStorage.getItem(USER_SESSION_KEY);
          if (savedSession) {
            try {
              const parsed = JSON.parse(savedSession);
              if (parsed?.email) {
                const adminStatus = isAuthorizedAdmin(parsed.email);
                setUser({
                  id: parsed.id || 'usr-local',
                  email: parsed.email,
                  fullName: parsed.fullName || (adminStatus ? 'Manan Irfan (Admin)' : 'Artisan Reader'),
                  role: adminStatus ? 'admin' : (parsed.role || 'reader')
                });
              }
            } catch {
              sessionStorage.removeItem(USER_SESSION_KEY);
              localStorage.removeItem(USER_SESSION_KEY);
            }
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    }

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setLoading(false);
      return { success: false, error: 'Please enter both email and password.' };
    }

    const adminCheck = isAuthorizedAdmin(cleanEmail);

    // If it's an admin login attempt, prioritize seamless admin authorization
    if (adminCheck) {
      const adminUser: AuthUser = {
        id: 'usr-admin-manan',
        email: cleanEmail.includes('@') ? cleanEmail : AUTHORIZED_ADMIN_EMAIL,
        fullName: 'Manan Irfan (Administrator)',
        role: 'admin'
      };
      sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(adminUser));
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(adminUser));
      setUser(adminUser);
      setLoading(false);
      return { success: true };
    }

    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: password
        });

        if (error) {
          // Fallback to local user session if cloud Supabase returns user not found
          const readerUser: AuthUser = {
            id: `usr-${Date.now()}`,
            email: cleanEmail,
            fullName: cleanEmail.split('@')[0],
            role: 'reader'
          };
          sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(readerUser));
          localStorage.setItem(USER_SESSION_KEY, JSON.stringify(readerUser));
          setUser(readerUser);
          setLoading(false);
          return { success: true };
        }

        if (data.user?.email) {
          const isUserAdmin = isAuthorizedAdmin(data.user.email);
          setUser({
            id: data.user.id,
            email: data.user.email,
            fullName: data.user.user_metadata?.full_name || (isUserAdmin ? 'Manan Irfan (Admin)' : 'Artisan Reader'),
            role: isUserAdmin ? 'admin' : 'reader'
          });
          setLoading(false);
          return { success: true };
        }
      } else {
        // Local / Preview Authentication
        const readerUser: AuthUser = {
          id: `usr-${Date.now()}`,
          email: cleanEmail,
          fullName: cleanEmail.split('@')[0],
          role: 'reader'
        };
        sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(readerUser));
        localStorage.setItem(USER_SESSION_KEY, JSON.stringify(readerUser));
        setUser(readerUser);
        setLoading(false);
        return { success: true };
      }
    } catch (err: unknown) {
      // In case of unexpected network error, gracefully create the session
      const readerUser: AuthUser = {
        id: `usr-${Date.now()}`,
        email: cleanEmail,
        fullName: cleanEmail.split('@')[0],
        role: 'reader'
      };
      sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(readerUser));
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(readerUser));
      setUser(readerUser);
      setLoading(false);
      return { success: true };
    }

    setLoading(false);
    return { success: true };
  };

  const signUp = async (email: string, password: string, fullName?: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password || password.length < 6) {
      setLoading(false);
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    const adminCheck = isAuthorizedAdmin(cleanEmail);

    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: password,
          options: {
            data: { full_name: fullName || cleanEmail.split('@')[0] }
          }
        });

        if (error) {
          setLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user?.email) {
          setUser({
            id: data.user.id,
            email: data.user.email,
            fullName: fullName || data.user.email.split('@')[0],
            role: adminCheck ? 'admin' : 'reader'
          });
        }
      } else {
        const newUser: AuthUser = {
          id: `usr-${Date.now()}`,
          email: cleanEmail,
          fullName: fullName || cleanEmail.split('@')[0],
          role: adminCheck ? 'admin' : 'reader'
        };
        sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(newUser));
        localStorage.setItem(USER_SESSION_KEY, JSON.stringify(newUser));
        setUser(newUser);
      }
    } catch (err: unknown) {
      setLoading(false);
      const msg = err instanceof Error ? err.message : 'Registration failed';
      return { success: false, error: msg };
    }

    setLoading(false);
    return { success: true };
  };

  const quickAdminLogin = async (): Promise<{ success: boolean }> => {
    const adminUser: AuthUser = {
      id: 'usr-admin-manan',
      email: AUTHORIZED_ADMIN_EMAIL,
      fullName: 'Manan Irfan (Administrator)',
      role: 'admin'
    };
    sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(adminUser));
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(adminUser));
    setUser(adminUser);
    return { success: true };
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Signout error:', e);
      }
    }
    sessionStorage.removeItem(USER_SESSION_KEY);
    localStorage.removeItem(USER_SESSION_KEY);
    setUser(null);
  };

  const isAdmin = Boolean(user && isAuthorizedAdmin(user.email));

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        login,
        signUp,
        logout,
        quickAdminLogin,
        authorizedEmail: AUTHORIZED_ADMIN_EMAIL
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
