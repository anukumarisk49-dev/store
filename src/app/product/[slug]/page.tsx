'use client';

import { useState } from 'react';

// This would be populated from the database
const mockProduct = {
  id: '1',
  name: 'boAt Rockerz 450 Wireless Earbuds',
  description: 'High-quality wireless earbuds with noise cancellation...',
  price: 1299,
  originalPrice: 2599,
  discount: 50,
  rating: 4.5,
  reviewCount: 1250,
  stock: 15,
  images: ['🎧'],
  features: [
    'Active Noise Cancellation',
    'Upto 30 hours battery life',
    'IPX5 water resistant',
    'Premium sound quality',
  ],
  merchants: [
    { name: 'Amazon', price: 1299, inStock: true, link: 'go/abc123' },
    { name: 'Flipkart', price: 1299, inStock: true, link: 'go/def456' },
    { name: 'boAt Direct', price: 1599, inStock: true, link: 'go/ghi789' },
  ],
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [selectedMerchant, setSelectedMerchant] = useState(mockProduct.merchants[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center text-8xl">
          {mockProduct.images[0]}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{mockProduct.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl">★ {mockProduct.rating}</span>
            <span className="text-gray-600">({mockProduct.reviewCount} reviews)</span>
          </div>

          {/* Pricing */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl font-bold text-primary">₹{mockProduct.price}</span>
              <span className="text-2xl text-gray-500 line-through">₹{mockProduct.originalPrice}</span>
              <span className="bg-danger text-white px-4 py-2 rounded-lg font-bold">
                -{mockProduct.discount}%
              </span>
            </div>
            {mockProduct.stock > 0 ? (
              <p className="text-green-600 font-bold">In Stock ({mockProduct.stock} available)</p>
            ) : (
              <p className="text-danger font-bold">Out of Stock</p>
            )}
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">Key Features</h3>
            <ul className="space-y-2">
              {mockProduct.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Merchant Selection */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">Available at</h3>
            <div className="space-y-3">
              {mockProduct.merchants.map((merchant) => (
                <div
                  key={merchant.name}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                    selectedMerchant.name === merchant.name
                      ? 'border-primary bg-blue-50'
                      : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedMerchant(merchant)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{merchant.name}</span>
                    <span className="text-xl font-bold text-primary">₹{merchant.price}</span>
                  </div>
                  {merchant.inStock && (
                    <p className="text-sm text-green-600">In Stock</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
              View on {selectedMerchant.name}
            </button>
            <button className="flex-1 border-2 border-primary text-primary py-3 rounded-lg font-bold hover:bg-gray-50 transition">
              ♡ Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 border-t pt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <p className="text-gray-600">Reviews coming soon...</p>
      </div>
    </div>
  );
}
