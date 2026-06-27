"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { products } from '@/lib/productsData';
import { useSession, signOut } from '@/lib/auth-client';

const CartContext = createContext<any>(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [theme, setTheme] = useState('dark');

  const { data: sessionData } = useSession();
  const user = sessionData?.user;

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  // Lock scrolling when cart is open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : 'unset';
  }, [isCartOpen]);

  const showToast = (message: string, type: string) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);
  };

  const addToCart = (product: any, selectedWeight: string, qty: number, engraving: string) => {
    setCart([...cart, { ...product, selectedWeight, qty, engraving, cartId: Date.now() }]);
    showToast(`${product.name} added to cart!`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: number) => setCart(cart.filter(item => item.cartId !== cartId));
  const getCartTotal = () => cart.reduce((total, item) => total + (item.price * item.qty), 0);
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartTotal, clearCart, setIsCartOpen }}>
      {/* 🌟 GLOBAL NAVBAR */}
      <nav className="navbar">
        <Link href="/" className="nav-logo" style={{textDecoration: 'none'}}>
          <h1>SADIQ KASSI</h1><span>Premium Manufacturers</span>
        </Link>
        <div className="nav-links">
          <Link href="/products">Shop</Link>
          <Link href="/#faqs">FAQs</Link>
          {user ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600 }}>Hello, {user.name}</span>
              <button 
                onClick={async () => {
                  await signOut();
                  window.location.reload();
                }} 
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 500,
                  padding: 0
                }}
              >
                Sign Out
              </button>
            </span>
          ) : (
            <Link href="/signin">Sign In</Link>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Sun / Moon Theme Toggle */}
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle Theme" style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '10px',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            width: '40px',
            height: '40px'
          }}>
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          
          <button onClick={() => setIsCartOpen(true)} className="cart-btn">
            Cart {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </button>
        </div>
      </nav>

      {/* 🌟 DYNAMIC PAGE CONTENT GOES HERE */}
      {children}

      {/* 🌟 GLOBAL FOOTER */}
      <footer>
        <h4>Sadiq Kassi Manufacturers</h4>
        <p style={{marginBottom: '5px'}}>Punjab, India | +91 98000 00000</p>
        <p>© 2026 Premium Forging & Agriculture Implements. All Rights Reserved.</p>
      </footer>

      {/* 🌟 GLOBAL FLOATING CART DRAWER */}
      {isCartOpen && (
        <>
          <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>
          <div className="cart-drawer">
            <div className="cart-header">
              <h2>Your Order</h2>
              <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>×</button>
            </div>
            <div className="cart-body">
              {cart.length === 0 ? <p style={{color: 'var(--text-muted)', textAlign: 'center', marginTop: '40px'}}>Your cart is empty.</p> : (
                <div>
                  {cart.map((item) => (
                    <div key={item.cartId} className="cart-item">
                      <div className="cart-item-header">
                        <div className="cart-item-info">
                          <h4>{item.name}</h4>
                          <p>Weight: {item.selectedWeight}kg | Qty: {item.qty}</p>
                          {item.engraving && <p style={{color: 'var(--accent)', marginTop:'4px', fontSize:'12px', fontWeight:600}}>Engraving: "{item.engraving}"</p>}
                        </div>
                        <span className="cart-item-price">INR {item.price * item.qty}</span>
                      </div>
                      <button onClick={() => removeFromCart(item.cartId)} className="remove-btn">Remove Item</button>
                    </div>
                  ))}
                  <div className="drawer-checkout" style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                    <div className="summary-total" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '18px', fontWeight: 600 }}>
                      <span>Total</span>
                      <span style={{ color: 'var(--accent)' }}>INR {getCartTotal()}</span>
                    </div>
                    <Link 
                      href="/checkout" 
                      onClick={() => setIsCartOpen(false)} 
                      className="add-cart-btn" 
                      style={{ 
                        display: 'block', 
                        textAlign: 'center', 
                        textDecoration: 'none',
                        padding: '16px 20px',
                        textTransform: 'uppercase',
                        fontSize: '13px',
                        fontWeight: 700,
                        letterSpacing: '1px'
                      }}
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* 🌟 FLOATING WHATSAPP & TOAST */}
      <a href="https://wa.me/919800000000" target="_blank" rel="noopener noreferrer" className="whatsapp-float">
        <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor"><path d="M16.002 0c-8.835 0-16 7.165-16 16 0 2.812.733 5.541 2.124 8.012l-2.126 7.988 8.169-2.091c2.41.127 4.887.213 7.833.213 8.835 0 16-7.165 16-16s-7.165-16-16-16zm8.17 22.846c-.347.973-1.996 1.83-2.775 1.93-.728.093-1.677.262-5.467-1.309-4.524-1.875-7.469-6.467-7.693-6.764-.223-.298-1.84-2.451-1.84-4.675 0-2.224 1.157-3.323 1.564-3.754.407-.432.883-.538 1.176-.538.294 0 .587.006.848.018.271.012.637-.105.998.766.371.897 1.272 3.102 1.385 3.328.113.226.188.489.038.788-.15.299-.226.486-.451.748-.225.263-.473.578-.679.77-.225.212-.464.444-.207.886.258.441 1.144 1.887 2.453 3.056 1.688 1.506 3.109 1.968 3.56 2.193.451.226.716.188.979-.113.264-.301 1.128-1.317 1.431-1.769.303-.452.605-.376 1.018-.226.413.151 2.616 1.233 3.068 1.458.452.226.753.339.866.528.113.189.113 1.091-.234 2.064z"/></svg>
      </a>
      {toast.show && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              {toast.type === 'success' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              )}
            </span>{" "}
            {toast.message}
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}