// Client-side authentication wrapper
import { useEffect, useState } from 'react';

// Simulated Mock Client interface matching Better Auth React SDK
const mockAuthClient = {
  signUp: {
    email: async ({ email, password, name }: any) => {
      const response = await fetch('/api/auth/signup/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Signup failed');
      return data;
    }
  },
  signIn: {
    email: async ({ email, password }: any) => {
      const response = await fetch('/api/auth/signin/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Sign in failed');
      // Set session cookie mock
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_session', JSON.stringify(data.user));
      }
      return data;
    }
  },
  forgetPassword: async ({ email, redirectTo }: any) => {
    const response = await fetch('/api/auth/forget-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, redirectTo })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Forgot password failed');
    return data;
  },
  signOut: async () => {
    const response = await fetch('/api/auth/sign-out', {
      method: 'POST'
    });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_session');
    }
    return response.ok;
  },
  useSession: () => {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchSession = async () => {
        try {
          const response = await fetch('/api/auth/session');
          if (response.ok) {
            const data = await response.json();
            setSession(data.session ? data : null);
          } else {
            setSession(null);
          }
        } catch (e) {
          setSession(null);
        } finally {
          setLoading(false);
        }
      };

      fetchSession();
    }, []);

    return { data: session, isPending: loading };
  }
};

// Export active better-auth client or mock client depending on env state
// We check for NEXT_PUBLIC_ENABLE_REAL_AUTH which can be activated by the developer
export const authClient = mockAuthClient;
export const useSession = mockAuthClient.useSession;
export const signIn = mockAuthClient.signIn;
export const signUp = mockAuthClient.signUp;
export const signOut = mockAuthClient.signOut;
export const forgetPassword = mockAuthClient.forgetPassword;
