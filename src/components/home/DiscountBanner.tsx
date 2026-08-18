'use client';

interface DiscountBannerProps {
  price: number;
  title: string;
}

export default function DiscountBanner({ price, title }: DiscountBannerProps) {
  return (
    <div className="bg-gradient-to-r from-accent to-primary text-white rounded-lg p-8 text-center">
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      <p className="text-2xl mb-6">Explore products under ₹{price}</p>
      <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
        Shop Now
      </button>
    </div>
  );
}
