'use client';

import { useEffect, useState } from 'react';
import { getAffiliateUrl } from '@/data/affiliateLinks';
import { logAffiliateClick } from '@/lib/logAffiliateClick';

interface ProductCardProps {
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
  merchant?: string;
  trackingId?: string;
  showTimer?: boolean;
}

export default function ProductCard({
  id,
  name,
  image,
  alt,
  price,
  originalPrice,
  discount,
  rating,
  reviewCount,
  affiliateUrl,
  merchant,
  trackingId,
  showTimer = false,
}: ProductCardProps) {
  const buyUrl = trackingId ? `/api/go/${trackingId}` : affiliateUrl || getAffiliateUrl(id);
  const loggedUrl = affiliateUrl || getAffiliateUrl(id);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setTilt({ x: Number((y * -8).toFixed(2)), y: Number((x * 8).toFixed(2)) });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <div className="group [perspective:1000px]" onPointerMove={handlePointerMove} onPointerLeave={resetTilt}>
      <div
        className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-[transform,box-shadow] duration-200 ease-out motion-reduce:transform-none"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
          transformStyle: 'preserve-3d',
          boxShadow: tilt.x || tilt.y ? '0 20px 36px rgba(23, 58, 42, 0.2)' : undefined,
          willChange: 'transform',
        }}
      >
        <div className="relative h-40 w-full overflow-hidden bg-gray-50 [transform-style:preserve-3d] sm:h-44">
        {image ? (
          <img
            src={image}
            alt={alt || name}
            className="h-full w-full object-contain p-3 transition-transform duration-300 motion-reduce:transform-none"
            style={{ transform: 'translateZ(24px) scale(1.03)' }}
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">No Image</div>
        )}
        {discount > 0 && (
          <div className="absolute right-2 top-2 rounded bg-danger px-2 py-1 text-[10px] font-black text-white">
            -{discount}%
          </div>
        )}
        {showTimer && secondsLeft !== null && secondsLeft > 0 && (
          <div className="absolute bottom-2 left-2 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
            Ends in {timerText}
          </div>
        )}
        </div>

        <div className="p-3.5">
        <h3 className="mb-2 line-clamp-2 text-xs font-bold leading-5 transition group-hover:text-primary">
          {name}
        </h3>

        {/* Ratings */}
        <div className="mb-2 flex items-center gap-2 text-[10px]">
          <span className="text-yellow-500">★ {rating}</span>
          <span className="text-gray-500">({reviewCount})</span>
        </div>

        {/* Pricing */}
        <div className="mb-2">
          <div className="flex gap-2 items-center">
            <span className="text-lg font-black text-primary">₹{price.toLocaleString('en-IN')}</span>
            <span className="text-[10px] text-gray-500 line-through">₹{originalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {merchant && (
          <p className="mb-2 text-[10px] text-gray-500">{merchant}</p>
        )}

        {/* CTA Button */}
        <a
          href={buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => logAffiliateClick(id, loggedUrl)}
          className="block w-full rounded-md bg-primary py-2 text-center text-[11px] font-black text-white transition hover:bg-[#4ea875]"
        >
          Buy Now
        </a>
        </div>
      </div>
    </div>
  );
}
