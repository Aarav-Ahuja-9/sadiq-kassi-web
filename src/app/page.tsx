"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [stressForce, setStressForce] = useState(150);
  const [activeStep, setActiveStep] = useState(0);
  const [soilType, setSoilType] = useState('soft');
  const [userBuild, setUserBuild] = useState('medium');

  const embers = [
    { left: 12, size: 3, delay: 0.5, duration: 6 },
    { left: 28, size: 5, delay: 2.1, duration: 4.5 },
    { left: 45, size: 2, delay: 0.1, duration: 7 },
    { left: 63, size: 6, delay: 3.5, duration: 5.2 },
    { left: 79, size: 4, delay: 1.2, duration: 6.8 },
    { left: 91, size: 3, delay: 4.0, duration: 5.5 },
    { left: 18, size: 5, delay: 1.8, duration: 4.8 },
    { left: 35, size: 2, delay: 0.9, duration: 7.2 },
    { left: 52, size: 6, delay: 2.8, duration: 5.9 },
    { left: 70, size: 4, delay: 0.3, duration: 6.3 },
    { left: 84, size: 3, delay: 3.1, duration: 5.0 },
    { left: 95, size: 5, delay: 2.4, duration: 4.2 }
  ];

  const timelineSteps = [
    {
      shortTitle: "Steel Selection",
      title: "1. High-Carbon Billet Selection",
      desc: "We select premium 1060 high-carbon industrial billets. Unlike common mild market steel that bends under stress, high-carbon railway-grade billets ensure the tools carry a robust metal core capable of retaining sharpness.",
      img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800"
    },
    {
      shortTitle: "Molten Heat",
      title: "2. Coal Forge Heating to 1200°C",
      desc: "The carbon steel is heated inside a specialized coal-fired blacksmith furnace. When the iron reaches a bright orange-yellow glow at 1200°C, the crystal lattice of the steel opens, rendering it ready for molecular shaping.",
      img: "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&q=80&w=800"
    },
    {
      shortTitle: "Smith Hammer",
      title: "3. Heavy-Duty Anvil Shaping",
      desc: "Generational blacksmiths shape the molten iron billet. Striking the glowing metal with rhythmic force, they forge the precise eye-socket, tapers, and slope angles of the spade blade, sealing grain structure density.",
      img: "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?auto=format&fit=crop&q=80&w=800"
    },
    {
      shortTitle: "Oil Quenching",
      title: "4. Rapid Oil Quench & Hardening",
      desc: "To lock in structural rigidity, the blade undergoes rapid cooling (quenching) inside a custom oil bath. This tempering locks in high hardness (58 HRC) ensuring Sadiq Kassi blades never chip or bend on rocky impact.",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
    },
    {
      shortTitle: "Rosewood Fit",
      title: "5. Kiln-Dried Handle Fitment",
      desc: "The forged iron head is fitted with premium Shisham (Rosewood) or Kikar wood. Kiln-dried to absorb shocks, the handle is secured with a reinforced double-locking iron wedge pin for zero handle slip.",
      img: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800"
    }
  ];

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
      <header className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* 🪵 SPARK EMBERS CONTAINER */}
        <div style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 1
        }}>
          {embers.map((ember, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                bottom: '-10px',
                left: `${ember.left}%`,
                width: `${ember.size}px`,
                height: `${ember.size}px`,
                background: 'var(--accent)',
                borderRadius: '50%',
                opacity: 0.5,
                filter: 'blur(1px) drop-shadow(0 0 5px var(--accent))',
                animation: `floatUpEmber ${ember.duration}s linear infinite`,
                animationDelay: `${ember.delay}s`
              }}
            />
          ))}
        </div>
        <div className="hero-tag" style={{ zIndex: 2 }}>Generational Craftsmanship</div>
        <h1 style={{ zIndex: 2 }}>Forged From Iron.<br />Built For Legacy.</h1>
        {/* 🔥 Next.js Link routing to /products */}
        <Link href="/products" className="hero-btn" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '20px', zIndex: 2 }}>
          Explore The Master Forge
        </Link>
      </header>

      {/* 2. THE HERITAGE */}
      <section className="heritage-section reveal">
        <p>"A great tool is not just manufactured; it is born from the fire, shaped by experience, and tested by the earth itself. Proudly forged in Punjab."</p>
        <h3>- Muhammad Sadiq</h3>
      </section>

      {/* 3. SHOP BY TERRAIN */}
      <section className="section-container" style={{ marginTop: 0 }}>
        <div className="section-title reveal">
          <h2>Shop by Terrain</h2>
          <div className="title-line"></div>
        </div>
        <div className="terrain-grid">
          {terrainData.map((item, i) => (
            <Link href={`/products/${item.linkId}`} key={i} className={`terrain-card reveal delay-${(i + 1) * 100}`} style={{ textDecoration: 'none' }}>
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
        <div className="anatomy-container reveal hide-on-mobile" style={{ position: 'relative' }}>
          <div
            className="pointer p-1"
            onMouseEnter={() => setHoveredPoint(1)}
            onMouseLeave={() => setHoveredPoint(null)}
            style={{ cursor: 'pointer', transition: 'all 0.3s ease', transform: hoveredPoint === 1 ? 'scale(1.05)' : 'scale(1)' }}
          >
            High-Carbon Heat-Treated Blade
            {hoveredPoint === 1 && (
              <div className="anatomy-tooltip-card" style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                background: 'var(--bg-card)',
                border: '1px solid var(--accent)',
                padding: '16px',
                width: '280px',
                borderRadius: 'var(--radius-md)',
                fontSize: '13px',
                color: 'var(--text-primary)',
                boxShadow: '0 15px 30px rgba(0,0,0,0.6)',
                zIndex: 10,
                lineHeight: '1.6',
                pointerEvents: 'none',
                textAlign: 'left'
              }}>
                <strong>Heat-Treated Steel:</strong> Oil-quenched for resilience, achieving 58 HRC. Never chips or loses its shape on rocky ground.
              </div>
            )}
          </div>

          <div
            className="pointer p-2"
            onMouseEnter={() => setHoveredPoint(2)}
            onMouseLeave={() => setHoveredPoint(null)}
            style={{ cursor: 'pointer', transition: 'all 0.3s ease', transform: hoveredPoint === 2 ? 'scale(1.05)' : 'scale(1)' }}
          >
            Shock-Absorbing Shisham Wood
            {hoveredPoint === 2 && (
              <div className="anatomy-tooltip-card" style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                background: 'var(--bg-card)',
                border: '1px solid var(--accent)',
                padding: '16px',
                width: '280px',
                borderRadius: 'var(--radius-md)',
                fontSize: '13px',
                color: 'var(--text-primary)',
                boxShadow: '0 15px 30px rgba(0,0,0,0.6)',
                zIndex: 10,
                lineHeight: '1.6',
                pointerEvents: 'none',
                textAlign: 'left'
              }}>
                <strong>Premium Shisham wood:</strong> Known for extreme shock resistance. Kiln-dried to maintain perfect grip without splintering.
              </div>
            )}
          </div>

          <div
            className="pointer p-3"
            onMouseEnter={() => setHoveredPoint(3)}
            onMouseLeave={() => setHoveredPoint(null)}
            style={{ cursor: 'pointer', transition: 'all 0.3s ease', transform: hoveredPoint === 3 ? 'scale(1.05)' : 'scale(1)' }}
          >
            Reinforced Iron Wedge
            {hoveredPoint === 3 && (
              <div className="anatomy-tooltip-card" style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                background: 'var(--bg-card)',
                border: '1px solid var(--accent)',
                padding: '16px',
                width: '280px',
                borderRadius: 'var(--radius-md)',
                fontSize: '13px',
                color: 'var(--text-primary)',
                boxShadow: '0 15px 30px rgba(0,0,0,0.6)',
                zIndex: 10,
                lineHeight: '1.6',
                pointerEvents: 'none',
                textAlign: 'left'
              }}>
                <strong>Secure Wedge Lock:</strong> Double-locking iron pin prevents the spade head from slipping or loosening under continuous heavy load.
              </div>
            )}
          </div>
        </div>

        {/* Mobile View Card List */}
        <div className="anatomy-mobile-list reveal hide-on-desktop">
          <div className="anatomy-mobile-card">
            <h3>High-Carbon Heat-Treated Blade</h3>
            <p><strong>Heat-Treated Steel:</strong> Oil-quenched for resilience, achieving 58 HRC. Never chips or loses its shape on rocky ground.</p>
          </div>
          <div className="anatomy-mobile-card">
            <h3>Shock-Absorbing Shisham Wood</h3>
            <p><strong>Premium Shisham wood:</strong> Known for extreme shock resistance. Kiln-dried to maintain perfect grip without splintering.</p>
          </div>
          <div className="anatomy-mobile-card">
            <h3>Reinforced Iron Wedge</h3>
            <p><strong>Secure Wedge Lock:</strong> Double-locking iron pin prevents the spade head from slipping or loosening under continuous heavy load.</p>
          </div>
        </div>
      </section>

      {/* 4.2. THE BLACKSMITH'S JOURNEY TIMELINE */}
      <section className="section-container">
        <div className="section-title reveal">
          <h2>The Blacksmith's Journey</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
            Every single tool is born of coal, hand-forged in fire, and tempered to survive generations. Click each stage to witness the forge.
          </p>
          <div className="title-line" style={{ marginTop: '20px' }}></div>
        </div>

        {/* Timeline Nodes */}
        <div className="reveal" style={{ maxWidth: '1000px', margin: '0 auto', overflowX: 'auto', paddingBottom: '10px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
            marginBottom: '50px',
            padding: '0 20px',
            minWidth: '600px'
          }}>
            {/* Timeline Line */}
            <div style={{
              position: 'absolute',
              top: '25px',
              left: '45px',
              right: '45px',
              height: '2px',
              background: 'var(--border)',
              zIndex: 0
            }} />
            {/* Active Progress Line */}
            <div style={{
              position: 'absolute',
              top: '25px',
              left: '45px',
              width: `${activeStep * 22}%`,
              height: '2px',
              background: 'var(--accent)',
              zIndex: 0,
              transition: 'width 0.5s ease'
            }} />

            {/* Timeline Steps */}
            {timelineSteps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '80px',
                    outline: 'none',
                    flexShrink: 0
                  }}
                >
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: isActive ? 'var(--bg-main)' : 'var(--bg-card)',
                    border: isActive ? '2px solid var(--accent)' : '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                    fontWeight: 700,
                    fontSize: '16px',
                    boxShadow: isActive ? '0 0 20px var(--accent-glow)' : 'none',
                    transition: 'all 0.3s ease',
                    transform: isActive ? 'scale(1.15)' : 'scale(1)'
                  }}>
                    {index + 1}
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                    marginTop: '12px',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.3s'
                  }}>
                    {step.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed View Card */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            alignItems: 'center',
            boxShadow: activeStep === 1 || activeStep === 2 ? '0 0 40px rgba(255, 69, 0, 0.15)' : 'none',
            transition: 'all 0.5s ease'
          }}>
            <div>
              {/* Glowing Molten Indicator for forge/quenched state */}
              {(activeStep === 1 || activeStep === 2) && (
                <div style={{
                  display: 'inline-block',
                  background: 'linear-gradient(90deg, #ff4500, #ff8c00)',
                  color: '#fff',
                  fontSize: '10px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  marginBottom: '15px',
                  boxShadow: '0 0 10px #ff4500'
                }}>
                  🔥 Superheated State
                </div>
              )}
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '32px',
                color: 'var(--text-primary)',
                marginBottom: '16px',
                textShadow: activeStep === 1 ? '0 0 10px rgba(255,69,0,0.5)' : 'none',
                transition: 'all 0.5s ease'
              }}>
                {timelineSteps[activeStep].title}
              </h3>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '16px',
                lineHeight: '1.8',
                marginBottom: '20px'
              }}>
                {timelineSteps[activeStep].desc}
              </p>
            </div>
            <div style={{ position: 'relative', height: '240px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <img
                src={timelineSteps[activeStep].img}
                alt={timelineSteps[activeStep].title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: activeStep === 1 ? 'saturate(1.5) contrast(1.1) brightness(1.1)' : 'none',
                  transition: 'all 0.5s ease'
                }}
              />
              {/* Heat Glow Overlay on forge stage */}
              {activeStep === 1 && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle, rgba(255,69,0,0.4) 0%, transparent 80%)',
                  pointerEvents: 'none'
                }} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. STEEL STRESS SIMULATOR */}
      <section className="section-container">
        <div className="section-title reveal">
          <h2>Steel Integrity Simulator</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
            Simulate impact stress force (kg) to see how Sadiq Hand-Forged High-Carbon Steel compares to standard mild market steel.
          </p>
          <div className="title-line" style={{ marginTop: '20px' }}></div>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '40px 5%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
          alignItems: 'center'
        }} className="reveal">

          {/* Left: Controls & Stats */}
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Apply Impact Pressure
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7', marginBottom: '30px' }}>
              Drag the slider to increase stress force. High-carbon steel maintains its yield profile, whereas standard market steel quickly undergoes plastic deformation (permanent bending).
            </p>

            {/* Slider Control */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Impact Force</span>
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent)' }}>{stressForce} kg</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                value={stressForce}
                onChange={(e) => setStressForce(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--accent)',
                  cursor: 'pointer',
                  height: '6px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  outline: 'none'
                }}
              />
            </div>

            {/* Performance Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Sadiq Steel Integrity</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--success)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: 'inline-block' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  100% (Pass)
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Market Steel Integrity</span>
                {stressForce <= 150 ? (
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--success)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: 'inline-block' }}><polyline points="20 6 9 17 4 12" /></svg>
                    100% (Elastic)
                  </span>
                ) : stressForce <= 300 ? (
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: 'inline-block' }}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                    60% (Bent Edge)
                  </span>
                ) : (
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--error)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: 'inline-block' }}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    15% (Structural Failure)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Visual Demonstration SVG */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            background: 'var(--bg-main)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '30px',
            height: '320px',
            position: 'relative'
          }}>
            {/* Visual 1: Sadiq Steel Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, letterSpacing: '1px', marginBottom: '15px' }}>
                Sadiq Steel
              </span>
              <svg width="60" height="200" style={{ overflow: 'visible' }}>
                {/* Fixed Stand */}
                <rect x="0" y="0" width="60" height="15" fill="#333" rx="3" />
                {/* Unbending Carbon Steel Bar */}
                <rect x="22" y="15" width="16" height="170" fill="url(#sadiqSteelGrad)" rx="2" style={{
                  filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.15))'
                }} />
                {/* Deflection point marker */}
                <circle cx="30" cy="185" r="4" fill="var(--success)" />
                {/* Gradients */}
                <defs>
                  <linearGradient id="sadiqSteelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d4af37" />
                    <stop offset="50%" stopColor="#f5f5f7" />
                    <stop offset="100%" stopColor="#aa840a" />
                  </linearGradient>
                </defs>
              </svg>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--success)', marginTop: '10px' }}>Unyielding</span>
            </div>

            {/* Visual 2: Local Steel Bar (Bends!) */}
            {(() => {
              // Calculate bending deflection in pixels
              const maxDeflection = 45;
              const deflection = stressForce <= 100
                ? 0
                : ((stressForce - 100) / 400) * maxDeflection;

              const bendXControl = 30 + deflection;
              const bendXEnd = 30 + deflection * 1.6;

              return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '1px', marginBottom: '15px' }}>
                    Local Market
                  </span>
                  <svg width="120" height="200" style={{ overflow: 'visible' }}>
                    {/* Fixed Stand */}
                    <rect x="0" y="0" width="60" height="15" fill="#333" rx="3" />
                    {/* Bending Mild Steel Bar path */}
                    <path
                      d={`M22,15 Q${22 + deflection},100 ${22 + deflection * 1.6},185 L${38 + deflection * 1.6},185 Q${38 + deflection},100 38,15 Z`}
                      fill="url(#localSteelGrad)"
                    />
                    {/* Failure crack illustration if force is maximum */}
                    {stressForce >= 400 && (
                      <path d={`M${22 + deflection * 0.8},85 L${38 + deflection * 0.8},92`} stroke="red" strokeWidth="2" strokeLinecap="round" />
                    )}
                    {/* Deflection point marker */}
                    <circle cx={bendXEnd} cy="185" r="4" fill={stressForce <= 150 ? "var(--success)" : stressForce <= 300 ? "var(--accent)" : "var(--error)"} />

                    <defs>
                      <linearGradient id="localSteelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#444" />
                        <stop offset="50%" stopColor="#777" />
                        <stop offset="100%" stopColor="#333" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: stressForce <= 150 ? 'var(--text-muted)' : stressForce <= 300 ? 'var(--accent)' : 'var(--error)',
                    marginTop: '10px'
                  }}>
                    {stressForce <= 150 ? 'Stable' : stressForce <= 300 ? 'Bending' : 'Broken'}
                  </span>
                </div>
              );
            })()}

          </div>

        </div>
      </section>

      {/* 4.8. PERFECT KASSI FINDER CALCULATOR */}
      <section className="section-container">
        <div className="section-title reveal">
          <h2>Perfect Tool Finder</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
            Answer a couple of simple questions about your soil conditions and weight preference to find the exact hand-forged implement suited for you.
          </p>
          <div className="title-line" style={{ marginTop: '20px' }}></div>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '40px 5%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '50px',
          alignItems: 'center'
        }} className="reveal">

          {/* Questions Panel */}
          <div>
            {/* Question 1: Soil Type */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
                1. What type of soil will you work on?
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { id: 'soft', label: '🌱 Soft Soil, Weeding & Aeration' },
                  { id: 'clay', label: '🧱 Standard Clay, Roots & Mixed Ground' },
                  { id: 'rocky', label: '🪨 Rocky, Hard & Stony Ground' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSoilType(opt.id)}
                    style={{
                      padding: '16px 20px',
                      borderRadius: 'var(--radius-md)',
                      background: soilType === opt.id ? 'var(--text-primary)' : 'var(--bg-main)',
                      color: soilType === opt.id ? 'var(--bg-main)' : 'var(--text-primary)',
                      border: '1px solid var(--border)',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: User Strength */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
                2. What weight class do you prefer?
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { id: 'light', label: 'Light' },
                  { id: 'medium', label: 'Standard' },
                  { id: 'heavy', label: 'Heavy Duty' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setUserBuild(opt.id)}
                    style={{
                      flex: 1,
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      background: userBuild === opt.id ? 'var(--text-primary)' : 'var(--bg-main)',
                      color: userBuild === opt.id ? 'var(--bg-main)' : 'var(--text-primary)',
                      border: '1px solid var(--border)',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      textAlign: 'center'
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendation Result Panel */}
          {(() => {
            let recommendedProduct;
            if (soilType === 'rocky' || (soilType === 'clay' && userBuild === 'heavy')) {
              recommendedProduct = {
                id: "heavy-mattock",
                name: "Heavy Duty Mattock",
                price: 1850,
                image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
                badge: "Maximum Striking Force",
                desc: "Engineered with a dual-forged heavy iron head and Kikar wood handle. Best suited for breaking heavy rocks and severing thick subterranean roots."
              };
            } else if (soilType === 'soft' || (soilType === 'clay' && userBuild === 'light')) {
              recommendedProduct = {
                id: "farming-hoe",
                name: "Precision Farming Hoe",
                price: 1200,
                image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&q=80&w=800",
                badge: "Ultra-light Endurance",
                desc: "Designed using light alloy steel. Built specifically for long hours of cropping, soil aeration, weeding, and creating clean furrows without fatigue."
              };
            } else {
              recommendedProduct = {
                id: "traditional-lahori",
                name: "Traditional Lahori Kassi",
                price: 1500,
                image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb18865?auto=format&fit=crop&q=80&w=800",
                badge: "All-Rounder Heritage",
                desc: "Our flagship implement forged with premium carbon steel and a shock-absorbing Rosewood handle. Perfect general-purpose tool for farming and digging."
              };
            }

            return (
              <div style={{
                background: 'var(--bg-main)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}>
                <div>
                  <span style={{
                    background: 'var(--accent-glow)',
                    color: 'var(--accent)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    padding: '6px 12px',
                    borderRadius: '50px',
                    display: 'inline-block',
                    marginBottom: '15px'
                  }}>
                    {recommendedProduct.badge}
                  </span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: 'var(--text-primary)' }}>
                    {recommendedProduct.name}
                  </h3>
                  <p style={{ fontSize: '18px', fontWeight: 600, color: 'var(--accent)', marginTop: '4px' }}>
                    INR {recommendedProduct.price}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <img
                    src={recommendedProduct.image}
                    alt={recommendedProduct.name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border)'
                    }}
                  />
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6' }}>
                    {recommendedProduct.desc}
                  </p>
                </div>

                <Link href={`/products/${recommendedProduct.id}`} className="add-cart-btn" style={{
                  textAlign: 'center',
                  textDecoration: 'none',
                  padding: '16px 20px',
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  display: 'block'
                }}>
                  View Details & Buy →
                </Link>
              </div>
            );
          })()}

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
            <Link href={`/products/${product.id}`} key={product.id} className={`product-card reveal delay-${(i + 1) * 100}`} style={{ textDecoration: 'none' }}>
              <div className="product-img-container">
                <img src={product.image} alt={product.name} />
                <div className="img-overlay"><span className="overlay-btn">View Details</span></div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">INR {product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* 🔥 Next.js Link routing to /products for the rest of the catalog */}
        <div className="reveal delay-300" style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link href="/products" className="add-cart-btn" style={{ padding: '16px 40px', textDecoration: 'none', display: 'inline-block', width: 'auto' }}>
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
        <div style={{ overflowX: 'auto' }} className="reveal">
          <table className="comparison-table">
            <thead>
              <tr><th>Feature</th><th>Sadiq Kassi Brand</th><th>Local Market Kassi</th></tr>
            </thead>
            <tbody>
              <tr><td>Steel Quality</td><td>High-Carbon (Heat-Treated)</td><td>Mild Steel (Bends easily)</td></tr>
              <tr><td>Handle Material</td><td>Premium Shisham</td><td>Softwood (Breaks on impact)</td></tr>
              <tr><td>Blade Edge</td><td>Hand-Forged & Sharpened</td><td>Machine Cut (Blunts quickly)</td></tr>
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
          <div className="trust-card reveal delay-100">
            <div className="trust-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '20px', display: 'inline-block' }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>Lifetime Guarantee</h3>
            <p>Guaranteed against chipping or bending.</p>
          </div>

          <div className="trust-card reveal delay-200">
            <div className="trust-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '20px', display: 'inline-block' }}>
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <h3>Secure Delivery</h3>
            <p>Direct from our Punjab forge to your location.</p>
          </div>

          <div className="trust-card reveal delay-300">
            <div className="trust-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '20px', display: 'inline-block' }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3>Wholesale Available</h3>
            <p>Special pricing for bulk agricultural dealers.</p>
          </div>
        </div>
      </section>

      {/* 9. REVIEWS */}
      <section className="section-container">
        <div className="section-title reveal">
          <h2>Farmers' Feedback</h2>
          <div className="title-line"></div>
        </div>
        <div className="reviews-grid">
          <div className="review-card reveal delay-100"><div className="stars">★★★★★</div><p className="review-text">"The quality of the iron is exceptional. The edge doesn't blunt even after weeks of hard field work."</p><p className="review-author">- Harpreet Singh, Punjab</p></div>
          <div className="review-card reveal delay-200"><div className="stars">★★★★★</div><p className="review-text">"We ordered 50 pieces for our hardware store. The finish and the handle quality is unmatched in the market."</p><p className="review-author">- Agri-Tools Store, Haryana</p></div>
          <div className="review-card reveal delay-300"><div className="stars">★★★★★</div><p className="review-text">"Solid weight and perfect balance. Best heavy duty mattock I have purchased in 10 years."</p><p className="review-author">- Gurnam Singh, Rajasthan</p></div>
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