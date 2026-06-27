"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  specs: string;
  price: number;
  weights: string[];
  image: string;
}

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [quantity, setQuantity] = useState(1);
  const [engraving, setEngraving] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity, engraving);
  };

  const incrementQty = () => setQuantity(prev => prev + 1);
  const decrementQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="animate-fade-in" style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* 1. PDP MAIN SECTION */}
      <div className="pdp-container">
        
        {/* Left Column: Image with modern shadow and zoom */}
        <div style={{ position: 'relative' }}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="pdp-image" 
          />
          {/* Subtle premium label */}
          <div style={{
            position: 'absolute',
            top: '30px',
            left: '30px',
            background: 'var(--accent)',
            color: '#000',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            padding: '6px 16px',
            borderRadius: '50px',
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
          }}>
            100% Hand-Forged
          </div>
        </div>

        {/* Right Column: Details & Custom Options */}
        <div className="pdp-details">
          <Link href="/products" className="back-btn" style={{ textDecoration: 'none' }}>
            ← Return to Collection
          </Link>
          
          <h2>{product.name}</h2>
          <p className="pdp-price">INR {product.price}</p>

          {/* Interactive Tabs */}
          <div className="pdp-tabs">
            <button 
              type="button" 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              type="button" 
              className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Forging Specs
            </button>
          </div>

          {/* Tab Content */}
          <div className="pdp-desc">
            {activeTab === 'overview' && (
              <p style={{ animation: 'fadeUp 0.4s ease' }}>{product.description}</p>
            )}
            {activeTab === 'specs' && (
              <div style={{ animation: 'fadeUp 0.4s ease' }}>
                <p style={{ fontWeight: '500', color: 'var(--text-primary)', marginBottom: '8px' }}>Forging Details:</p>
                <p style={{ fontStyle: 'italic', marginBottom: '16px' }}>{product.specs}</p>
                <ul style={{ listStyle: 'square', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>Steel Class: 1060 Carbon Steel, oil-quenched for resilience.</li>
                  <li>Handle Fitment: Split eye socket with heavy-duty iron wedge.</li>
                  <li>Balance Ratio: Hand-weighted for comfortable swing arcs.</li>
                </ul>
              </div>
            )}
          </div>



          {/* Custom Engraving */}
          <div className="form-group" style={{ marginTop: '20px' }}>
            <label htmlFor="engraving-input">
              Custom Handle Engraving <span style={{ color: 'var(--accent)' }}>(Optional)</span>
            </label>
            <input
              id="engraving-input"
              type="text"
              placeholder="e.g., Ch. Rahman"
              maxLength={20}
              value={engraving}
              onChange={(e) => setEngraving(e.target.value)}
              style={{ marginTop: '8px' }}
            />
            
            {/* Live Engraving Wooden Handle Preview */}
            <div style={{ marginTop: '12px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Live Handle Preview:</span>
              <div className="engraving-preview-handle" style={{
                position: 'relative',
                height: '70px',
                borderRadius: 'var(--radius-md)',
                backgroundImage: "url('https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&q=80&w=800')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: 'inset 0 0 25px rgba(0,0,0,0.6), 0 4px 15px rgba(0,0,0,0.3)',
                overflow: 'hidden',
                marginTop: '8px'
              }}>
                {/* Wood texture multiply overlay to blend text */}
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '20px',
                  fontStyle: 'italic',
                  fontWeight: '900',
                  color: '#211204',
                  opacity: engraving ? 0.9 : 0.2,
                  letterSpacing: '2px',
                  textShadow: '0px 1px 1px rgba(255,255,255,0.1), 0px -1px 1px rgba(0,0,0,0.9)',
                  transform: 'rotate(-0.5deg)',
                  userSelect: 'none',
                  transition: 'opacity 0.3s ease'
                }}>
                  {engraving ? engraving : "SADIQ KASSI"}
                </div>
              </div>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="form-group" style={{ marginTop: '20px' }}>
            <label>Quantity</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '8px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '50px',
                padding: '6px 12px'
              }}>
                <button
                  type="button"
                  onClick={decrementQty}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '20px',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  -
                </button>
                <span style={{ fontSize: '16px', fontWeight: 600, minWidth: '40px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={incrementQty}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '20px',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <button 
            type="button" 
            className="add-cart-btn" 
            onClick={handleAddToCart}
            style={{ marginTop: '30px' }}
          >
            Add to Cart — INR {product.price * quantity}
          </button>
        </div>
      </div>

      {/* 2. RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="section-container" style={{ marginTop: '120px' }}>
          <div className="section-title">
            <h2>Explore Other Master Forge Implements</h2>
            <div className="title-line"></div>
          </div>
          <div className="products-grid">
            {relatedProducts.map((p) => (
              <Link href={`/products/${p.id}`} key={p.id} className="product-card active" style={{ textDecoration: 'none' }}>
                <div className="product-img-container">
                  <img src={p.image} alt={p.name} />
                  <div className="img-overlay">
                    <span className="overlay-btn">View Details</span>
                  </div>
                </div>
                <div className="product-info">
                  <h3>{p.name}</h3>
                  <p className="product-price">INR {p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
