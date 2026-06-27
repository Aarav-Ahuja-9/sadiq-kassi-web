"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from '@/lib/auth-client';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await signIn.email({ email, password });
      setSuccess('Logged in successfully! Redirecting...');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{
      paddingTop: '140px',
      minHeight: '100vh',
      paddingBottom: '100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: '24px',
      paddingRight: '24px'
    }}>
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '40px',
        maxWidth: '450px',
        width: '100%',
        boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow effect */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'var(--accent)',
          filter: 'blur(90px)',
          opacity: 0.15,
          pointerEvents: 'none'
        }}></div>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', marginBottom: '8px' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Sign in to your Sadiq Kassi account</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255, 69, 58, 0.1)',
            border: '1px solid var(--error)',
            color: 'var(--error)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '24px',
            fontSize: '13px'
          }}>
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div style={{
            background: 'rgba(50, 215, 75, 0.1)',
            border: '1px solid var(--success)',
            color: 'var(--success)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '24px',
            fontSize: '13px'
          }}>
            ✓ {success}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <label style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px 18px',
                background: 'var(--bg-main)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                borderRadius: '50px',
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: '14px'
              }}
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>
                Password
              </label>
              <Link href="/forgot-password" style={{ fontSize: '12px', color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px 18px',
                background: 'var(--bg-main)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                borderRadius: '50px',
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: '14px'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="add-cart-btn"
            style={{
              padding: '16px 20px',
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginTop: '10px',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '32px', borderTop: '1px solid var(--border)', paddingTop: '20px', fontSize: '14px', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link href="/signup" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
