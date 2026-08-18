'use client';

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
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group">
      {/* Image Container */}
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
          {image || 'No Image'}
        </div>
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
        <button className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-opacity-90 transition">
          View Deal
        </button>
      </div>
    </div>
  );
}
