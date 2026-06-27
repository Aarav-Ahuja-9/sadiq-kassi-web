"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { signUp } from '@/lib/auth-client';

export default function SignUpPage() {
  const [name, setName] = useState('');
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
      await signUp.email({ email, password, name });
      setSuccess('Registration successful! Directing to login...');
      setTimeout(() => {
        window.location.href = '/signin';
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Try again.');
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
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', marginBottom: '8px' }}>Create Account</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Join Sadiq Kassi to order your forged implements</p>
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
              Full Name
            </label>
            <input
              type="text"
              placeholder="Gurpreet Singh"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <label style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
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
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '32px', borderTop: '1px solid var(--border)', paddingTop: '20px', fontSize: '14px', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link href="/signin" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
