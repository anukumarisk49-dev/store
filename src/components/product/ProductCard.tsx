'use client';

import { getAffiliateUrl } from '@/data/affiliateLinks';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  merchant?: string;
  trackingId?: string;
}

export default function ProductCard({
  id,
  name,
  image,
  price,
  originalPrice,
  discount,
  rating,
  reviewCount,
  merchant,
  trackingId,
}: ProductCardProps) {
  const dealUrl = trackingId ? `/api/go/${trackingId}` : getAffiliateUrl(id);

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group">
      {/* Image Container */}
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">No Image</div>
        )}
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-danger text-white px-3 py-1 rounded-full text-sm font-bold">
            -{discount}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-sm line-clamp-2 mb-2 group-hover:text-primary transition">
          {name}
        </h3>

        {/* Ratings */}
        <div className="flex items-center gap-2 mb-3 text-xs">
          <span className="text-yellow-500">★ {rating}</span>
          <span className="text-gray-500">({reviewCount})</span>
        </div>

        {/* Pricing */}
        <div className="mb-3">
          <div className="flex gap-2 items-center">
            <span className="text-2xl font-bold text-primary">₹{price}</span>
            <span className="text-sm text-gray-500 line-through">₹{originalPrice}</span>
          </div>
        </div>

        {merchant && (
          <p className="text-xs text-gray-600 mb-3">{merchant}</p>
        )}

        {/* CTA Button */}
        <a
            href={dealUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-primary text-white text-center py-2 rounded-lg font-bold hover:bg-opacity-90 transition"
          >
            Buy Now
          </a>
      </div>
    </div>
  );
}
