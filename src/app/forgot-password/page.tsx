"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { forgetPassword } from '@/lib/auth-client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Sandbox testing helpers
  const [receivedCode, setReceivedCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetFinished, setResetFinished] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const result = await forgetPassword({ email });
      setSuccess('Recovery request processed! Security code generated.');
      if (result.code) {
        setReceivedCode(result.code);
      }
    } catch (err: any) {
      setError(err.message || 'Verification request failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordSimulated = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    
    // Simulate updating password in database/JSON file
    setTimeout(() => {
      setLoading(false);
      setResetFinished(true);
    }, 1500);
  };

  if (resetFinished) {
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
          textAlign: 'center'
        }}>
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'rgba(50, 215, 75, 0.1)',
            border: '2px solid var(--success)',
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            margin: '0 auto 20px'
          }}>
            ✓
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', marginBottom: '10px' }}>Password Reset</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '30px' }}>
            Your account password has been updated successfully. You can now log in using your new credentials.
          </p>
          <Link href="/signin" className="add-cart-btn" style={{
            textDecoration: 'none',
            display: 'inline-block',
            padding: '14px 30px',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

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
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', marginBottom: '8px' }}>Reset Password</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Recover your account credentials</p>
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

        {receivedCode ? (
          /* Password Update Sandbox Screen */
          <form onSubmit={handleResetPasswordSimulated} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              background: 'var(--bg-main)',
              border: '1px dashed var(--accent)',
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
              color: 'var(--text-primary)',
              textAlign: 'center',
              lineHeight: '1.5'
            }}>
              Sandbox Verification Code: <strong style={{ color: 'var(--accent)', fontSize: '16px' }}>{receivedCode}</strong>
              <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Simulating SMS/Email dispatch logic
              </span>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                New Password
              </label>
              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Updating Password...' : 'Save New Password'}
            </button>
          </form>
        ) : (
          /* Email Request Screen */
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
              {loading ? 'Requesting reset...' : 'Send Recovery Code'}
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '32px', borderTop: '1px solid var(--border)', paddingTop: '20px', fontSize: '14px', color: 'var(--text-muted)' }}>
          Back to{' '}
          <Link href="/signin" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
