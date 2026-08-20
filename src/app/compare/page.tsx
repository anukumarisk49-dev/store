'use client';

import { useState } from 'react';
import catalog from '../../../public/data/products.json';
import { getAffiliateUrl } from '@/data/affiliateLinks';
import { logAffiliateClick } from '@/lib/logAffiliateClick';

type ComparisonProduct = {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  merchant: string;
  affiliateUrl?: string;
};

const comparisonProducts = (Object.values(catalog.categories) as { products: ComparisonProduct[] }[])
  .flatMap((category) => category.products)
  .slice(0, 6);

type Merchant = 'Amazon' | 'Flipkart' | 'Meesho' | 'Sony';

const merchantStyles: Record<Merchant, { color: string; note: string }> = {
  Amazon: { color: 'bg-orange-500', note: 'Popular choice' },
  Flipkart: { color: 'bg-blue-600', note: 'Great value' },
  Meesho: { color: 'bg-pink-600', note: 'Budget pick' },
  Sony: { color: 'bg-gray-900', note: 'Brand store' },
};

function getPrices(basePrice: number, productIndex: number): Record<Merchant, number> {
  const priceOffsets = [0, 180, -120, 420];
  const variation = productIndex * 35;

  return {
    Amazon: basePrice,
    Flipkart: basePrice + priceOffsets[1] - variation,
    Meesho: Math.max(99, basePrice + priceOffsets[2] - variation),
    Sony: basePrice + priceOffsets[3] + variation,
  };
}

export default function ComparePage() {
  const [selectedId, setSelectedId] = useState(comparisonProducts[0]?.id ?? '');
  const selectedIndex = comparisonProducts.findIndex((product) => product.id === selectedId);
  const selectedProduct = comparisonProducts[selectedIndex >= 0 ? selectedIndex : 0];
  const prices = selectedProduct ? getPrices(selectedProduct.price, selectedIndex) : null;
  const merchants = Object.keys(merchantStyles) as Merchant[];
  const lowestPrice = prices ? Math.min(...Object.values(prices)) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-sm font-bold uppercase tracking-wide text-primary mb-2">Price comparison</p>
        <h1 className="text-4xl font-bold mb-3">Compare prices across stores</h1>
        <p className="text-gray-600 max-w-2xl">
          Choose a product to see the current demo prices from Amazon, Flipkart, Meesho, and Sony in one place.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <label htmlFor="compare-product" className="block font-bold mb-3">
          Select a product
        </label>
        <select
          id="compare-product"
          value={selectedId}
          onChange={(event) => setSelectedId(event.target.value)}
          className="w-full max-w-2xl px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {comparisonProducts.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {selectedProduct && prices && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-64 bg-gray-100 flex items-center justify-center p-6">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-contain" />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-3">{selectedProduct.name}</h2>
              <div className="flex items-center gap-2 text-sm mb-4">
                <span className="text-yellow-500">★ {selectedProduct.rating}</span>
                <span className="text-gray-500">({selectedProduct.reviewCount} reviews)</span>
              </div>
              <span className="text-3xl font-bold text-primary">₹{selectedProduct.price.toLocaleString('en-IN')}</span>
              <span className="ml-2 text-gray-500 line-through">₹{selectedProduct.originalPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Store price comparison</h2>
              <p className="text-sm text-gray-600 mt-1">Lowest price is highlighted automatically.</p>
            </div>
            <div className="divide-y">
              {merchants.map((merchant) => {
                const price = prices[merchant];
                const isLowest = price === lowestPrice;

                return (
                  <div key={merchant} className={`p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between ${isLowest ? 'bg-green-50' : ''}`}>
                    <div className="flex items-center gap-3">
                      <span className={`${merchantStyles[merchant].color} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold`}>
                        {merchant[0]}
                      </span>
                      <div>
                        <h3 className="font-bold">{merchant}</h3>
                        <p className="text-xs text-gray-500">{merchantStyles[merchant].note}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="text-right">
                        <p className="text-xl font-bold">₹{price.toLocaleString('en-IN')}</p>
                        {isLowest && <p className="text-xs text-green-700 font-bold">Lowest price</p>}
                      </div>
                      <a
                        href={selectedProduct.affiliateUrl || getAffiliateUrl(selectedProduct.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => logAffiliateClick(selectedProduct.id, selectedProduct.affiliateUrl || getAffiliateUrl(selectedProduct.id))}
                        className="px-4 py-2 border-2 border-primary text-primary rounded-lg font-bold hover:bg-secondary transition"
                      >
                        Visit store
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-8">
        Prices shown are demo values from the repository catalog. Add real merchant URLs and prices before publishing offers.
      </p>
    </div>
  );
}
