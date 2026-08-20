'use client';

import { useState } from 'react';
import { getAffiliateUrl } from '@/data/affiliateLinks';
import { logAffiliateClick } from '@/lib/logAffiliateClick';

interface CategoryProduct {
  id: string;
  name: string;
  image: string;
  alt?: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  affiliateUrl?: string;
  brand?: string;
  merchant?: string;
}

interface CategoryProductGridProps {
  products: CategoryProduct[];
}

const productsPerPage = 6;

export default function CategoryProductGrid({ products }: CategoryProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceLimit, setPriceLimit] = useState(100000);
  const [minimumRating, setMinimumRating] = useState(0);
  const [brand, setBrand] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  const brands = Array.from(new Set(products.map((product) => product.brand || product.merchant).filter(Boolean))) as string[];
  const filteredProducts = products
    .filter((product) => product.price <= priceLimit)
    .filter((product) => product.rating >= minimumRating)
    .filter((product) => brand === 'all' || (product.brand || product.merchant) === brand)
    .sort((firstProduct, secondProduct) => {
      if (sortBy === 'price-low') return firstProduct.price - secondProduct.price;
      if (sortBy === 'price-high') return secondProduct.price - firstProduct.price;
      if (sortBy === 'discount') return secondProduct.discount - firstProduct.discount;
      if (sortBy === 'rating') return secondProduct.rating - firstProduct.rating;
      return 0;
    });
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const visibleProducts = filteredProducts.slice(
    (safePage - 1) * productsPerPage,
    safePage * productsPerPage
  );

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="bg-white p-6 rounded-lg shadow h-fit">
          <h3 className="font-bold text-lg mb-5">Filters</h3>
          <label htmlFor="price-limit" className="block text-sm font-bold mb-2">Maximum Price</label>
          <input
            id="price-limit"
            type="range"
            min="0"
            max="100000"
            step="500"
            value={priceLimit}
            onChange={(event) => { setPriceLimit(Number(event.target.value)); setCurrentPage(1); }}
            className="w-full mb-1"
          />
          <p className="text-sm text-gray-600 mb-6">Up to ₹{priceLimit.toLocaleString('en-IN')}</p>

          <label htmlFor="minimum-rating" className="block text-sm font-bold mb-2">Minimum Rating</label>
          <select
            id="minimum-rating"
            value={minimumRating}
            onChange={(event) => { setMinimumRating(Number(event.target.value)); setCurrentPage(1); }}
            className="w-full px-3 py-2 border rounded text-sm mb-6"
          >
            <option value="0">All ratings</option>
            <option value="4">4★ and above</option>
            <option value="4.5">4.5★ and above</option>
          </select>

          <label htmlFor="brand" className="block text-sm font-bold mb-2">Brand</label>
          <select
            id="brand"
            value={brand}
            onChange={(event) => { setBrand(event.target.value); setCurrentPage(1); }}
            className="w-full px-3 py-2 border rounded text-sm"
          >
            <option value="all">All brands</option>
            {brands.map((brandName) => <option key={brandName} value={brandName}>{brandName}</option>)}
          </select>
        </aside>

        <div className="md:col-span-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <p className="text-gray-600">Showing {filteredProducts.length ? (safePage - 1) * productsPerPage + 1 : 0}-{Math.min(safePage * productsPerPage, filteredProducts.length)} of {filteredProducts.length} products</p>
            <select value={sortBy} onChange={(event) => { setSortBy(event.target.value); setCurrentPage(1); }} className="px-3 py-2 border rounded text-sm">
              <option value="relevance">Sort by: Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
              <option value="rating">Best Rating</option>
            </select>
          </div>

          {visibleProducts.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group">
            <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
              <img
                src={product.image}
                alt={product.alt || product.name}
                className="w-full h-full object-contain p-2 transition-transform duration-300"
              />
              {product.discount > 0 && (
                <div className="absolute top-2 right-2 bg-danger text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{product.discount}%
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-bold text-sm line-clamp-2 mb-2 group-hover:text-primary transition">
                {product.name}
              </h3>

              <div className="flex items-center gap-2 mb-3 text-xs">
                <span className="text-yellow-500">★ {product.rating}</span>
                <span className="text-gray-500">({product.reviewCount})</span>
              </div>

              <div className="mb-3">
                <div className="flex gap-2 items-center">
                  <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                  <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                </div>
              </div>

                <a
                  href={product.affiliateUrl || getAffiliateUrl(product.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => logAffiliateClick(product.id, product.affiliateUrl || getAffiliateUrl(product.id))}
                  className="block w-full bg-primary text-white text-center py-2 rounded-lg font-bold text-sm hover:bg-opacity-90 transition"
                >
                  Buy Now
                </a>
            </div>
          </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-10 text-center text-gray-600">No products match these filters.</div>
          )}

      <div className="flex justify-center items-center gap-2 mt-12" aria-label="Product pagination">
        <button
          type="button"
          onClick={() => goToPage(safePage - 1)}
          disabled={safePage === 1}
          className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => goToPage(page)}
            aria-current={safePage === page ? 'page' : undefined}
            className={`px-4 py-2 rounded ${
              safePage === page
                ? 'bg-primary text-white'
                : 'border hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() => goToPage(safePage + 1)}
          disabled={safePage === totalPages}
          className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
        </div>
      </div>
    </>
  );
}
