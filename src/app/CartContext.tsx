"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import Link from 'next/link';

// 🪵 SHARED DATABASE (Global Products)
export const products = [
  { id: "traditional-lahori", name: "Traditional Lahori Kassi", description: "Forged with premium high-carbon steel, heat-treated for maximum durability in both soft and hard soils.", specs: "Material: Carbon Steel | Handle: Shisham Wood | Edge: Heat-Treated | Finish: Matte Oil", price: 1500, weights: ["1.5", "2.0", "2.5"], image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb18865?auto=format&fit=crop&q=80&w=800" },
  { id: "heavy-mattock", name: "Heavy Duty Mattock", description: "Industrial-grade forged head engineered specifically to break through rocky terrain and sever thick roots.", specs: "Material: Industrial Steel | Handle: Kikar Wood | Edge: Dual Forged | Impact: High", price: 1850, weights: ["2.5", "3.0"], image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800" },
  { id: "farming-hoe", name: "Precision Farming Hoe", description: "Lightweight and perfectly balanced for detailed crop weeding, soil aeration, and prolonged tasks.", specs: "Material: Light Alloy Steel | Handle: Shisham Wood | Weight Class: Ultra-Light", price: 1200, weights: ["1.2", "1.5"], image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&q=80&w=800" }
];

const CartContext = createContext<any>(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [formData, setFormData] = useState({ customerName: '', phoneNumber: '', address: '' });
  const [loading, setLoading] = useState(false);

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

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return showToast('Cart is empty!', 'error');
    setLoading(true);
    setTimeout(() => {
      showToast('🎉 Order Placed Successfully!', 'success');
      setCart([]); setIsCartOpen(false); setLoading(false);
    }, 1500);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, setIsCartOpen }}>
      {/* 🌟 GLOBAL NAVBAR */}
      <nav className="navbar">
        <Link href="/" className="nav-logo" style={{textDecoration: 'none'}}>
          <h1>SADIQ KASSI</h1><span>Premium Manufacturers</span>
        </Link>
        <div className="nav-links">
          <Link href="/products">Shop</Link>
          <Link href="/#faqs">FAQs</Link>
        </div>
        <button onClick={() => setIsCartOpen(true)} className="cart-btn">
          Cart {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </button>
      </nav>

      {/* 🌟 DYNAMIC PAGE CONTENT GOES HERE */}
      {children}

      {/* 🌟 GLOBAL FOOTER */}
      <footer>
        <h4>Sadiq Kassi Manufacturers</h4>
        <p style={{marginBottom: '5px'}}>Punjab, Pakistan | +92 300 0000000</p>
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
                        <span className="cart-item-price">PKR {item.price * item.qty}</span>
                      </div>
                      <button onClick={() => removeFromCart(item.cartId)} className="remove-btn">Remove Item</button>
                    </div>
                  ))}
                  <div className="drawer-checkout">
                    <h3>Checkout Details</h3>
                    <div className="summary-total"><span>Total</span><span>PKR {getCartTotal()}</span></div>
                    <form onSubmit={handleCheckout}>
                      <div className="form-group"><input type="text" placeholder="Full Name" value={formData.customerName} onChange={(e) => setFormData({...formData, customerName: e.target.value})} required /></div>
                      <div className="form-group"><input type="text" placeholder="Phone Number" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} required /></div>
                      <div className="form-group"><textarea placeholder="Delivery Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} required rows={2} /></div>
                      <button type="submit" disabled={loading} className="checkout-btn">{loading ? 'Processing...' : 'Confirm Order'}</button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* 🌟 FLOATING WHATSAPP & TOAST */}
      <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer" className="whatsapp-float">
        <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor"><path d="M16.002 0c-8.835 0-16 7.165-16 16 0 2.812.733 5.541 2.124 8.012l-2.126 7.988 8.169-2.091c2.41.127 4.887.213 7.833.213 8.835 0 16-7.165 16-16s-7.165-16-16-16zm8.17 22.846c-.347.973-1.996 1.83-2.775 1.93-.728.093-1.677.262-5.467-1.309-4.524-1.875-7.469-6.467-7.693-6.764-.223-.298-1.84-2.451-1.84-4.675 0-2.224 1.157-3.323 1.564-3.754.407-.432.883-.538 1.176-.538.294 0 .587.006.848.018.271.012.637-.105.998.766.371.897 1.272 3.102 1.385 3.328.113.226.188.489.038.788-.15.299-.226.486-.451.748-.225.263-.473.578-.679.77-.225.212-.464.444-.207.886.258.441 1.144 1.887 2.453 3.056 1.688 1.506 3.109 1.968 3.56 2.193.451.226.716.188.979-.113.264-.301 1.128-1.317 1.431-1.769.303-.452.605-.376 1.018-.226.413.151 2.616 1.233 3.068 1.458.452.226.753.339.866.528.113.189.113 1.091-.234 2.064z"/></svg>
      </a>
      {toast.show && <div className="toast-container"><div className={`toast ${toast.type}`}><span>{toast.type === 'success' ? '✔' : '✖'}</span> {toast.message}</div></div>}
    </CartContext.Provider>
  );
}