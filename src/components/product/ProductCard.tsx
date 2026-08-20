'use client';

import { useEffect, useState } from 'react';
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
  showTimer?: boolean;
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
  showTimer = false,
}: ProductCardProps) {
  const dealUrl = trackingId ? `/api/go/${trackingId}` : getAffiliateUrl(id);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!showTimer) return;

    const duration = 60 * 60 + (id.split('').reduce((total, character) => total + character.charCodeAt(0), 0) % (3 * 60 * 60));
    const storageKey = `deal-expiry-${id}`;
    const storedExpiry = window.localStorage.getItem(storageKey);
    const expiry = storedExpiry ? Number(storedExpiry) : Date.now() + duration * 1000;

    if (!storedExpiry) window.localStorage.setItem(storageKey, String(expiry));

    const updateTimer = () => setSecondsLeft(Math.max(0, Math.floor((expiry - Date.now()) / 1000)));
    updateTimer();
    const timer = window.setInterval(updateTimer, 1000);
    return () => window.clearInterval(timer);
  }, [id, showTimer]);

  const timerText = secondsLeft === null
    ? ''
    : `${String(Math.floor(secondsLeft / 3600)).padStart(2, '0')}:${String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`;

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
        {showTimer && secondsLeft !== null && secondsLeft > 0 && (
          <div className="absolute bottom-2 left-2 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
            Ends in {timerText}
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
