"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  
  // Checkout Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  
  // UI states
  const [submitting, setSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<any | null>(null);
  const [error, setError] = useState('');
  
  // Mock Razorpay Modal states
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Redirect if cart is empty and order hasn't been placed yet
  useEffect(() => {
    if (cart.length === 0 && !orderResult) {
      // Allow user to see success state, otherwise empty cart goes to shop
    }
  }, [cart, orderResult]);

  // Handle submit order
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (cart.length === 0) {
      setError('Your shopping cart is empty.');
      return;
    }

    if (paymentMethod === 'online') {
      // Trigger the mock Razorpay overlay popup
      setShowRazorpayModal(true);
    } else {
      // COD Order direct submit
      await submitOrderToApi();
    }
  };

  // Submit order details to checkout endpoint
  const submitOrderToApi = async () => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((item: any) => ({
            id: item.id,
            name: item.name,
            weight: item.selectedWeight || '2.0',
            qty: item.qty,
            engraving: item.engraving || '',
            price: item.price
          })),
          total: getCartTotal(),
          customerName: name,
          phoneNumber: phone,
          address: address,
          paymentMethod: paymentMethod
        })
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setOrderResult(result);
        clearCart();
      } else {
        setError(result.error || 'Failed to place order.');
      }
    } catch (err) {
      console.error(err);
      setError('Network connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Mock Payment Success
  const handleMockPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentProcessing(true);
    
    // Simulate transaction delay
    setTimeout(async () => {
      setPaymentProcessing(false);
      setShowRazorpayModal(false);
      await submitOrderToApi();
    }, 2000);
  };

  // Render Order Success screen
  if (orderResult) {
    return (
      <div className="animate-fade-in" style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '120px 24px 80px' }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '40px',
          maxWidth: '550px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5)'
        }}>
          {/* Green check icon */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(50, 215, 75, 0.1)',
            border: '2px solid var(--success)',
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            margin: '0 auto 24px'
          }}>
            ✓
          </div>
          
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', marginBottom: '12px' }}>Order Placed!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>
            Thank you for ordering from Sadiq Kassi Manufacturers. We have received your order details and are forging your implements.
          </p>

          <div style={{
            background: 'var(--bg-main)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            textAlign: 'left',
            marginBottom: '32px'
          }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Order ID: <strong style={{ color: 'var(--text-primary)' }}>{orderResult.orderId}</strong>
            </p>
            {orderResult.paymentId && (
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Razorpay Payment ID: <strong style={{ color: 'var(--text-primary)' }}>{orderResult.paymentId}</strong>
              </p>
            )}
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Status: <strong style={{ color: 'var(--accent)' }}>Paid & Confirmed</strong>
            </p>
          </div>

          <Link href="/products" className="add-cart-btn" style={{
            textDecoration: 'none',
            display: 'inline-block',
            padding: '16px 40px',
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '100px', maxWidth: '1100px', margin: '0 auto', padding: '120px 24px 80px' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '40px', marginBottom: '10px' }}>Secure Checkout</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Complete details below to submit your order directly to our Punjab forge.</p>
      
      {error && (
        <div style={{
          background: 'rgba(255, 69, 58, 0.1)',
          border: '1px solid var(--error)',
          color: 'var(--error)',
          padding: '16px 20px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '30px',
          fontSize: '14px'
        }}>
          ⚠️ {error}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        alignItems: 'start'
      }}>
        {/* Left Column: Form */}
        <form onSubmit={handlePlaceOrder} style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '32px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', marginBottom: '24px', color: 'var(--accent)' }}>Shipping & Contact Details</h3>
          
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Gurpreet Singh"
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

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="e.g. +91 98000 00000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

          <div className="form-group" style={{ marginBottom: '32px' }}>
            <label style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              Delivery Address (Punjab, India)
            </label>
            <textarea
              placeholder="House Number, Street Name, Village/City, District, Punjab"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={3}
              style={{
                width: '100%',
                padding: '16px 20px',
                background: 'var(--bg-main)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-md)',
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: '14px',
                resize: 'none',
                lineHeight: '1.6'
              }}
            />
          </div>

          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', marginBottom: '20px', color: 'var(--accent)' }}>Payment Method</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            <button
              type="button"
              onClick={() => setPaymentMethod('cod')}
              style={{
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                background: paymentMethod === 'cod' ? 'var(--text-primary)' : 'var(--bg-main)',
                color: paymentMethod === 'cod' ? 'var(--bg-main)' : 'var(--text-primary)',
                border: '1px solid var(--border)',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>🚚 Cash on Delivery (COD)</span>
              {paymentMethod === 'cod' && <span>✓</span>}
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('online')}
              style={{
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                background: paymentMethod === 'online' ? 'var(--text-primary)' : 'var(--bg-main)',
                color: paymentMethod === 'online' ? 'var(--bg-main)' : 'var(--text-primary)',
                border: '1px solid var(--border)',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>💳 Pay Online (Razorpay Sandbox)</span>
              {paymentMethod === 'online' && <span>✓</span>}
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="add-cart-btn"
            style={{
              padding: '18px 24px',
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.7 : 1
            }}
          >
            {submitting ? 'Processing Order...' : paymentMethod === 'online' ? 'Proceed to Razorpay Payment' : 'Confirm Order (COD)'}
          </button>
        </form>

        {/* Right Column: Order Summary */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '32px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', marginBottom: '24px', color: 'var(--accent)' }}>Order Summary</h3>
          
          {cart.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Your cart is empty. Please add items to buy.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cart.map((item: any) => (
                <div key={item.cartId} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '20px',
                  borderBottom: '1px solid var(--border)'
                }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)'
                      }}
                    />
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {item.name}
                      </h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        Qty: {item.qty} {item.engraving && `| Engraving: "${item.engraving}"`}
                      </p>
                    </div>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    INR {item.price * item.qty}
                  </span>
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Subtotal</span>
                <span style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: 500 }}>INR {getCartTotal()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Delivery Shipping</span>
                <span style={{ color: 'var(--success)', fontSize: '14px', fontWeight: 600 }}>FREE</span>
              </div>
              
              <div style={{
                marginTop: '15px',
                paddingTop: '20px',
                borderTop: '2px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Total</span>
                <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent)' }}>INR {getCartTotal()}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 💳 MOCK RAZORPAY DIALOG MODAL */}
      {showRazorpayModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px'
        }}>
          <div className="animate-fade-in" style={{
            background: 'rgba(20, 20, 20, 0.98)',
            border: '1px solid var(--accent)',
            borderRadius: 'var(--radius-lg)',
            padding: '40px',
            maxWidth: '460px',
            width: '100%',
            boxShadow: '0 40px 100px rgba(0,0,0,0.8)'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h4 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)', fontWeight: 800 }}>Razorpay Secure</h4>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: 'var(--text-primary)', marginTop: '4px' }}>Payment Checkout</h3>
              </div>
              <button 
                onClick={() => setShowRazorpayModal(false)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                ✕
              </button>
            </div>

            {/* Price Box */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Amount to Pay</span>
              <strong style={{ fontSize: '20px', color: 'var(--text-primary)' }}>INR {getCartTotal()}</strong>
            </div>

            {/* Card details form */}
            <form onSubmit={handleMockPaymentSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Card Number</label>
                <input 
                  type="text" 
                  placeholder="4111 2222 3333 4444" 
                  maxLength={19}
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'var(--bg-main)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    borderRadius: '8px',
                    outline: 'none',
                    fontSize: '14px',
                    fontFamily: 'monospace'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Expiry</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    maxLength={5}
                    required
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      borderRadius: '8px',
                      outline: 'none',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>CVV</label>
                  <input 
                    type="password" 
                    placeholder="***" 
                    maxLength={3}
                    required
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      borderRadius: '8px',
                      outline: 'none',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={paymentProcessing}
                className="checkout-btn"
                style={{
                  background: 'var(--accent)',
                  color: '#000',
                  opacity: paymentProcessing ? 0.7 : 1,
                  cursor: paymentProcessing ? 'not-allowed' : 'pointer'
                }}
              >
                {paymentProcessing ? 'Authorizing Payment...' : `Pay INR ${getCartTotal()}`}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
