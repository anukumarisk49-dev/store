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
        className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-[transform,box-shadow] duration-200 ease-out motion-reduce:transform-none"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
          transformStyle: 'preserve-3d',
          boxShadow: tilt.x || tilt.y ? '0 20px 36px rgba(23, 58, 42, 0.2)' : undefined,
          willChange: 'transform',
        }}
      >
        <div className="relative h-52 w-full overflow-hidden bg-[linear-gradient(145deg,#f8fafb,#eef3f5)] [transform-style:preserve-3d] sm:h-56">
        {image ? (
          <img
            src={image}
            alt={alt || name}
            className="h-full w-full object-contain p-5 transition-transform duration-300 motion-reduce:transform-none"
            style={{ transform: 'translateZ(24px) scale(1.03)' }}
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">No Image</div>
        )}
        {discount > 0 && (
          <div className="absolute left-3 top-3 rounded-md bg-danger px-2.5 py-1.5 text-[10px] font-black text-white shadow-sm">
            -{discount}%
          </div>
        )}
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg text-gray-500 shadow-sm" aria-label="Save product">♡</span>
        {showTimer && secondsLeft !== null && secondsLeft > 0 && (
          <div className="absolute bottom-3 left-3 rounded-md bg-[#173a2a] px-2 py-1 text-[10px] font-bold text-white">
            Ends in {timerText}
          </div>
        )}
        </div>

        <div className="p-4">
        <h3 className="mb-2 line-clamp-2 min-h-10 text-sm font-black leading-5 text-[#173a2a] transition group-hover:text-primary">
          {name}
        </h3>

        {/* Ratings */}
        <div className="mb-3 flex items-center gap-2 text-[11px]">
          <span className="rounded bg-[#168544] px-1.5 py-0.5 font-black text-white">★ {rating.toFixed(1)}</span>
          <span className="text-gray-500">{reviewCount.toLocaleString('en-IN')} reviews</span>
        </div>

        {/* Pricing */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-primary">₹{price.toLocaleString('en-IN')}</span>
            <span className="text-xs text-gray-500 line-through">₹{originalPrice.toLocaleString('en-IN')}</span>
            {discount > 0 && <span className="text-xs font-bold text-danger">{discount}% off</span>}
          </div>
          <p className="mt-1 text-[10px] text-gray-500">Inclusive of all taxes</p>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 border-y border-gray-100 py-3 text-[10px]">
          <div><span className="block font-black text-[#173a2a]">✓ Trusted seller</span><span className="mt-1 block text-gray-500">{merchant || 'Verified merchant'}</span></div>
          <div><span className="block font-black text-[#173a2a]">⚡ Best price</span><span className="mt-1 block text-gray-500">Compare before buying</span></div>
        </div>

        {/* CTA Button */}
        <a
          href={buyUrl}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          onClick={() => logAffiliateClick(id, loggedUrl)}
          className="block w-full rounded-md bg-primary py-3 text-center text-xs font-black text-white transition hover:bg-[#4ea875]"
        >
          Buy Now
        </a>
        </div>
      </div>
    </div>
  );
}
