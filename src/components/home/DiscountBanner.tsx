'use client';

import Link from 'next/link';

interface DiscountBannerProps {
  price: number;
  title: string;
}

export default function DiscountBanner({ price, title }: DiscountBannerProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-xl bg-gradient-to-r from-[#e9f8ed] to-[#c9efd3] px-6 py-5 text-[#173a2a] sm:flex-row sm:items-center sm:px-8">
      <div><p className="text-xs font-black uppercase tracking-widest text-primary">Daily value picks</p><h2 className="mt-1 text-2xl font-black">{title}</h2><p className="mt-1 text-sm text-gray-600">Explore products under ₹{price}</p></div>
      <Link
        href="/under-99"
        className="inline-block rounded-md bg-primary px-6 py-3 text-sm font-black text-white transition hover:bg-[#4ea875]"
      >
        Shop Under ₹99 →
      </Link>
    </div>
  );
}
