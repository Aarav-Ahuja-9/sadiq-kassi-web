"use client";

import { useState } from 'react';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface ProductsCatalogProps {
  initialProducts: Product[];
}

export default function ProductsCatalog({ initialProducts }: ProductsCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Categories list
  const categories = ['All', 'Heavy Duty', 'General Purpose', 'Agriculture'];

  // Filter & Sort logic
  const filteredProducts = initialProducts
    .filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = 
        selectedCategory === 'All' || 
        product.category.toLowerCase() === selectedCategory.toLowerCase();
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      return 0; // Default/Featured database order
    });

  return (
    <section className="section-container">
      <div className="section-title active">
        <h2>The Master Forge Collection</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
          Premium agricultural and construction tools built to last generations.
        </p>
        <div className="title-line" style={{ marginTop: '20px', marginBottom: '40px' }}></div>
      </div>

      {/* 🪵 CATALOG FILTERS & SEARCH UI */}
      <div className="filter-controls-container">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input-premium"
            placeholder="Search the forge collection..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-pills-group">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <select
          className="sort-select-premium"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="featured">Featured Order</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Alphabetical (A-Z)</option>
        </select>
      </div>

      {/* 🪵 PRODUCTS GRID */}
      {filteredProducts.length === 0 ? (
        <div className="no-results-box">
          <h3>No Forge Tools Found</h3>
          <p style={{ marginTop: '10px' }}>
            We couldn't find any tools matching your search criteria. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product, i) => (
            <Link
              href={`/products/${product._id}`}
              key={product._id}
              className={`product-card active reveal delay-${((i % 3) + 1) * 100}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="product-img-container">
                {product.image && (
                  <img src={product.image} alt={product.name} />
                )}
                <div className="img-overlay">
                  <span className="overlay-btn">View Details</span>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">INR {product.price}</p>
                <p
                  className="product-description"
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-muted)',
                    marginTop: '12px',
                    marginBottom: '12px',
                    lineHeight: '1.6',
                  }}
                >
                  {product.description}
                </p>
                <span className="category-tag" style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>
                  {product.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
