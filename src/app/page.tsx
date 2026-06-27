"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // 🪵 SCROLL REVEAL ANIMATION OBSERVER
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { 
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);

  // 🪵 LOCAL DATA ARRAYS (For Home Page specifically)
  const featuredProducts = [
    {
      id: "traditional-lahori", name: "Traditional Lahori Kassi",
      price: 1500,
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb18865?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "heavy-mattock", name: "Heavy Duty Mattock",
      price: 1850,
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "farming-hoe", name: "Precision Farming Hoe",
      price: 1200,
      image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const terrainData = [
    { title: "Soft Soil & Farming", desc: "View Precision Hoe", img: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=600&q=80", linkId: "farming-hoe" },
    { title: "Rocky & Hard Ground", desc: "View Heavy Mattock", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80", linkId: "heavy-mattock" },
    { title: "Construction & General", desc: "View Traditional Kassi", img: "https://images.unsplash.com/photo-1592417817098-8f3d6eb18865?auto=format&fit=crop&w=600&q=80", linkId: "traditional-lahori" }
  ];

  const faqs = [
    { q: "Where is your manufacturing unit located?", a: "Our traditional forge and workshop are located in Punjab. Every single tool is hand-forged locally by our expert artisans." },
    { q: "Do you supply wholesale or bulk orders?", a: "Yes, we do. For orders of 50 pieces or more, we offer special wholesale pricing. Please contact us via WhatsApp." },
    { q: "What is the quality of the wooden handles?", a: "We exclusively use premium Shisham (Rosewood) or Kikar wood, known for their high shock absorption and longevity." },
    { q: "Can I get a custom name engraved?", a: "Yes! Use the 'Custom Engraving' text box on the product page to add a name to the wooden handle." }
  ];

  return (
    <div className="animate-fade-in">
      {/* 1. HERO SECTION */}
      <header className="hero">
        <div className="hero-tag">Generational Craftsmanship</div>
        <h1>Forged From Iron.<br/>Built For Legacy.</h1>
        {/* 🔥 Next.js Link routing to /products */}
        <Link href="/products" className="hero-btn" style={{textDecoration: 'none', display: 'inline-block', marginTop: '20px'}}>
          Explore The Master Forge
        </Link>
      </header>

      {/* 2. THE HERITAGE */}
      <section className="heritage-section reveal">
        <p>"A great tool is not just manufactured; it is born from the fire, shaped by experience, and tested by the earth itself. Proudly forged in Punjab."</p>
        <h3>- Muhammad Sadiq</h3>
      </section>

      {/* 3. SHOP BY TERRAIN */}
      <section className="section-container" style={{marginTop: 0}}>
        <div className="section-title reveal">
          <h2>Shop by Terrain</h2>
          <div className="title-line"></div>
        </div>
        <div className="terrain-grid">
          {terrainData.map((item, i) => (
            <Link href={`/products/${item.linkId}`} key={i} className={`terrain-card reveal delay-${(i+1)*100}`} style={{textDecoration: 'none'}}>
              <img src={item.img} alt={item.title} />
              <div className="terrain-content">
                <h3>{item.title}</h3>
                <p>{item.desc} →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. ANATOMY OF A KASSI */}
      <section className="section-container">
        <div className="section-title reveal">
          <h2>Anatomy of a Perfect Kassi</h2>
          <div className="title-line"></div>
        </div>
        <div className="anatomy-container reveal">
          <div className="anatomy-overlay"></div>
          <div className="pointer p-1">High-Carbon Heat-Treated Blade</div>
          <div className="pointer p-2">Shock-Absorbing Shisham Wood</div>
          <div className="pointer p-3">Reinforced Iron Wedge</div>
        </div>
      </section>

      {/* 5. FEATURED TOOLS (TOP 3) */}
      <section id="catalog" className="section-container">
        <div className="section-title reveal">
          <h2>Featured Tools</h2>
          <div className="title-line"></div>
        </div>
        <div className="products-grid">
          {featuredProducts.map((product, i) => (
            <Link href={`/products/${product.id}`} key={product.id} className={`product-card reveal delay-${(i+1)*100}`} style={{textDecoration: 'none'}}>
              <div className="product-img-container">
                <img src={product.image} alt={product.name} />
                <div className="img-overlay"><span className="overlay-btn">View Details</span></div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">PKR {product.price}</p>
              </div>
            </Link>
          ))}
        </div>
        
        {/* 🔥 Next.js Link routing to /products for the rest of the catalog */}
        <div className="reveal delay-300" style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link href="/products" className="add-cart-btn" style={{padding: '16px 40px', textDecoration: 'none', display: 'inline-block', width: 'auto'}}>
            View All Products →
          </Link>
        </div>
      </section>

      {/* 6. COMPARISON MATRIX */}
      <section className="section-container">
        <div className="section-title reveal">
          <h2>Why Sadiq Kassi?</h2>
          <div className="title-line"></div>
        </div>
        <div style={{overflowX: 'auto'}} className="reveal">
          <table className="comparison-table">
            <thead>
              <tr><th>Feature</th><th>Sadiq Kassi Brand</th><th>Local Market Kassi</th></tr>
            </thead>
            <tbody>
              <tr><td>Steel Quality</td><td>High-Carbon (Heat-Treated)</td><td>Mild Steel (Bends easily)</td></tr>
              <tr><td>Handle Material</td><td>Premium Shisham</td><td>Softwood (Breaks on impact)</td></tr>
              <tr><td>Blade Edge</td><td>Hand-Forged & Sharpened</td><td>Machine Cut (Blunts quickly)</td></tr>
              <tr><td>Lifespan</td><td>10+ Years Guarantee</td><td>3-6 Months</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. MAKE IT YOURS */}
      <section className="engraving-banner reveal">
        <h2>Make It Yours</h2>
        <p>A tool of heritage deserves to carry your name. We offer custom hand-carved engraving on all our premium wood handles.</p>
      </section>

      {/* 8. TRUST BADGES */}
      <section className="section-container">
        <div className="trust-grid">
          <div className="trust-card reveal delay-100"><div className="trust-icon">🛡️</div><h3>Lifetime Guarantee</h3><p>Guaranteed against chipping or bending.</p></div>
          <div className="trust-card reveal delay-200"><div className="trust-icon">🚚</div><h3>Secure Delivery</h3><p>Direct from our Punjab forge to your location.</p></div>
          <div className="trust-card reveal delay-300"><div className="trust-icon">🤝</div><h3>Wholesale Available</h3><p>Special pricing for bulk agricultural dealers.</p></div>
        </div>
      </section>

      {/* 9. REVIEWS */}
      <section className="section-container">
        <div className="section-title reveal">
          <h2>Farmers' Feedback</h2>
          <div className="title-line"></div>
        </div>
        <div className="reviews-grid">
          <div className="review-card reveal delay-100"><div className="stars">★★★★★</div><p className="review-text">"The quality of the iron is exceptional. The edge doesn't blunt even after weeks of hard field work."</p><p className="review-author">- Ch. Rahman, Punjab</p></div>
          <div className="review-card reveal delay-200"><div className="stars">★★★★★</div><p className="review-text">"We ordered 50 pieces for our hardware store. The finish and the handle quality is unmatched in the market."</p><p className="review-author">- Agri-Tools Store, Sindh</p></div>
          <div className="review-card reveal delay-300"><div className="stars">★★★★★</div><p className="review-text">"Solid weight and perfect balance. Best heavy duty mattock I have purchased in 10 years."</p><p className="review-author">- Irfan Ali, KPK</p></div>
        </div>
      </section>

      {/* 10. FAQS */}
      <section id="faqs" className="section-container">
        <div className="section-title reveal">
          <h2>Frequently Asked Questions</h2>
          <div className="title-line"></div>
        </div>
        <div className="faq-container reveal">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openFaq === index ? 'active' : ''}`}>
              <button type="button" className="faq-question" onClick={() => toggleFaq(index)}>
                {faq.q}
                <span>+</span>
              </button>
              <div className="faq-answer" style={{ maxHeight: openFaq === index ? '200px' : '0' }}>
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}