"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState('');

  // Add Product Form states
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodCategory, setProdCategory] = useState('General Purpose');
  const [prodSpecs, setProdSpecs] = useState('');
  const [prodWeights, setProdWeights] = useState('1.5, 2.0, 2.5');

  const [addingProduct, setAddingProduct] = useState(false);
  const [productSuccess, setProductSuccess] = useState('');
  const [productError, setProductError] = useState('');

  // Fetch orders on load
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    setOrdersError('');
    try {
      const response = await fetch('/api/admin/orders');
      const data = await response.json();
      if (response.ok && data.success) {
        setOrders(data.orders);
      } else {
        setOrdersError(data.error || 'Failed to fetch orders.');
      }
    } catch (err) {
      console.error(err);
      setOrdersError('Failed to fetch orders due to a network error.');
    } finally {
      setLoadingOrders(false);
    }
  };

  // Handle Add Product Submit
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setProductSuccess('');
    setProductError('');
    setAddingProduct(true);

    try {
      const weightsArray = prodWeights.split(',').map(w => w.trim()).filter(Boolean);
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: prodName,
          price: Number(prodPrice),
          description: prodDesc,
          image: prodImage || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb18865?auto=format&fit=crop&q=80&w=800',
          category: prodCategory,
          specs: prodSpecs,
          weights: weightsArray
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setProductSuccess(`Product "${data.product.name}" added successfully!`);
        // Reset form
        setProdName('');
        setProdPrice('');
        setProdDesc('');
        setProdImage('');
        setProdSpecs('');
        setProdWeights('1.5, 2.0, 2.5');
      } else {
        setProductError(data.error || 'Failed to add product.');
      }
    } catch (err) {
      console.error(err);
      setProductError('Network error adding product. Check server logs.');
    } finally {
      setAddingProduct(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '100px', maxWidth: '1200px', margin: '0 auto', padding: '120px 24px 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '40px' }}>Admin Dashboard</h2>
          <p style={{ color: 'var(--text-muted)' }}>Monitor customer orders and manage your agricultural catalog.</p>
        </div>
        <button onClick={fetchOrders} className="add-cart-btn" style={{ padding: '10px 20px', fontSize: '12px', width: 'auto' }}>
          🔄 Refresh Orders
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 350px',
        gap: '40px',
        alignItems: 'start'
      }}>
        {/* Left Column: Orders List */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '32px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginBottom: '24px', color: 'var(--accent)' }}>Active Orders</h3>

          {loadingOrders ? (
            <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>Loading orders...</div>
          ) : ordersError ? (
            <div style={{ color: 'var(--error)', textAlign: 'center', padding: '40px 0' }}>⚠️ {ordersError}</div>
          ) : orders.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>No orders placed yet.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {orders.map((order) => (
                <div key={order.orderId} style={{
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-main)',
                  padding: '24px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                    <div>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Order ID:</span>
                      <strong style={{ color: 'var(--text-primary)', marginLeft: '6px' }}>{order.orderId}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', padding: '4px 10px', borderRadius: '50px', background: order.paymentMethod === 'online' ? 'rgba(50, 215, 75, 0.1)' : 'rgba(212, 175, 55, 0.1)', color: order.paymentMethod === 'online' ? 'var(--success)' : 'var(--accent)', border: '1px solid currentColor' }}>
                        {order.paymentMethod === 'online' ? 'Paid Online' : 'COD'}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <h4 style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Customer</h4>
                      <p style={{ fontSize: '14px', fontWeight: 600 }}>{order.customerName}</p>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{order.phoneNumber}</p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Delivery Address</h4>
                      <p style={{ fontSize: '13px', lineHeight: '1.5', color: 'var(--text-primary)' }}>{order.address}</p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Status</h4>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent)' }}>{order.status || 'Order Placed'}</p>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                    <h4 style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Items ordered</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                          <span>
                            {item.name} ({item.weight} kg) <strong style={{ color: 'var(--accent)' }}>x{item.qty}</strong>
                            {item.engraving && <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginLeft: '8px' }}>[Engraving: "{item.engraving}"]</span>}
                          </span>
                          <span style={{ fontWeight: 600 }}>INR {item.price * item.qty}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '2px solid var(--border)', marginTop: '16px', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '15px' }}>Total Amount Paid</strong>
                    <strong style={{ fontSize: '18px', color: 'var(--accent)' }}>INR {order.total}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Add Product Form */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '32px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginBottom: '24px', color: 'var(--accent)' }}>Add Catalog Item</h3>

          {productSuccess && (
            <div style={{ background: 'rgba(50, 215, 75, 0.1)', border: '1px solid var(--success)', color: 'var(--success)', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
              ✓ {productSuccess}
            </div>
          )}

          {productError && (
            <div style={{ background: 'rgba(255, 69, 58, 0.1)', border: '1px solid var(--error)', color: 'var(--error)', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
              ⚠️ {productError}
            </div>
          )}

          <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Product Name</label>
              <input
                type="text"
                placeholder="e.g. Sadiq Premium Gandal Kassi"
                required
                value={prodName}
                onChange={(e) => setProdName(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-main)', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: '50px', outline: 'none', fontSize: '13px' }}
              />
            </div>

            <div className="form-group">
              <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Price (INR)</label>
              <input
                type="number"
                placeholder="e.g. 1650"
                required
                value={prodPrice}
                onChange={(e) => setProdPrice(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-main)', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: '50px', outline: 'none', fontSize: '13px' }}
              />
            </div>

            <div className="form-group">
              <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Category</label>
              <select
                value={prodCategory}
                onChange={(e) => setProdCategory(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-main)', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: '50px', outline: 'none', fontSize: '13px' }}
              >
                <option value="General Purpose">General Purpose</option>
                <option value="Heavy Duty">Heavy Duty</option>
                <option value="Agriculture">Agriculture</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Image URL</label>
              <input
                type="text"
                placeholder="Unsplash URL or local image path"
                value={prodImage}
                onChange={(e) => setProdImage(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-main)', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: '50px', outline: 'none', fontSize: '13px' }}
              />
            </div>

            <div className="form-group">
              <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Specifications</label>
              <input
                type="text"
                placeholder="e.g. Forged Carbon Steel | Oil Quenched"
                value={prodSpecs}
                onChange={(e) => setProdSpecs(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-main)', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: '50px', outline: 'none', fontSize: '13px' }}
              />
            </div>

            <div className="form-group">
              <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Weights (comma-separated)</label>
              <input
                type="text"
                placeholder="1.5, 2.0, 2.5"
                value={prodWeights}
                onChange={(e) => setProdWeights(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-main)', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: '50px', outline: 'none', fontSize: '13px' }}
              />
            </div>

            <div className="form-group">
              <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Description</label>
              <textarea
                placeholder="Write tool features..."
                rows={3}
                required
                value={prodDesc}
                onChange={(e) => setProdDesc(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-main)', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: 'var(--radius-md)', outline: 'none', fontSize: '13px', resize: 'none' }}
              />
            </div>

            <button
              type="submit"
              disabled={addingProduct}
              className="checkout-btn"
              style={{
                background: 'var(--accent)',
                color: '#000',
                padding: '12px 18px',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginTop: '10px',
                opacity: addingProduct ? 0.7 : 1,
                cursor: addingProduct ? 'not-allowed' : 'pointer'
              }}
            >
              {addingProduct ? 'Adding Product...' : 'Add Catalog Item'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
