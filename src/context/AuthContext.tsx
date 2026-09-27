import React, { createContext, useContext, useEffect, useState } from 'react';
import { AUTHORIZED_ADMIN_EMAIL, isAuthorizedAdmin, isSupabaseConfigured, supabase } from '../lib/supabase';

interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'reader';
}

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  authorizedEmail: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_SESSION_KEY = 'resinart_admin_session_auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial check
    async function initAuth() {
      try {
        if (isSupabaseConfigured) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user?.email && isAuthorizedAdmin(session.user.email)) {
            setUser({
              id: session.user.id,
              email: session.user.email,
              role: 'admin'
            });
          } else {
            setUser(null);
          }

          // Listen for changes
          const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user?.email && isAuthorizedAdmin(session.user.email)) {
              setUser({
                id: session.user.id,
                email: session.user.email,
                role: 'admin'
              });
            } else {
              setUser(null);
            }
          });

          return () => {
            listener.subscription.unsubscribe();
          };
        } else {
          // Check local secure session token
          const savedSession = sessionStorage.getItem(ADMIN_SESSION_KEY);
          if (savedSession) {
            try {
              const parsed = JSON.parse(savedSession);
              if (parsed?.email && isAuthorizedAdmin(parsed.email)) {
                setUser({
                  id: parsed.id || 'admin-local',
                  email: parsed.email,
                  role: 'admin'
                });
              }
            } catch {
              sessionStorage.removeItem(ADMIN_SESSION_KEY);
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
    const normalizedEmail = email.trim().toLowerCase();

    // Critical Security Rule Check
    if (normalizedEmail !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      setLoading(false);
      return {
        success: false,
        error: `Unauthorized account. Access to the ResinArt CMS is strictly restricted to ${AUTHORIZED_ADMIN_EMAIL}.`
      };
    }

    if (!password || password.length < 6) {
      setLoading(false);
      return {
        success: false,
        error: 'Password must be at least 6 characters long.'
      };
    }

    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password: password
        });

        if (error) {
          setLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user?.email && isAuthorizedAdmin(data.user.email)) {
          setUser({
            id: data.user.id,
            email: data.user.email,
            role: 'admin'
          });
          setLoading(false);
          return { success: true };
        } else {
          await supabase.auth.signOut();
          setLoading(false);
          return { success: false, error: 'Unauthorized role permissions.' };
        }
      } else {
        // Authenticate the configured authorized administrator
        const adminUser: AuthUser = {
          id: 'usr-admin-n924460',
          email: AUTHORIZED_ADMIN_EMAIL,
          role: 'admin'
        };
        sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminUser));
        setUser(adminUser);
        setLoading(false);
        return { success: true };
      }
    } catch (err: unknown) {
      setLoading(false);
      const msg = err instanceof Error ? err.message : 'Authentication failed';
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Signout error:', e);
      }
    }
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
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
        logout,
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
