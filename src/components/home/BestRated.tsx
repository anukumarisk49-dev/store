'use client';

import ProductCard from '@/components/product/ProductCard';

const mockProducts = [
  {
    id: '1',
    name: 'Apple iPhone 15 Pro Max',
    image: '📱',
    price: 139999,
    originalPrice: 169900,
    discount: 18,
    rating: 4.9,
    reviewCount: 5200,
    merchant: 'Amazon',
  },
  {
    id: '2',
    name: 'Samsung Galaxy Z Fold 5',
    image: '📱',
    price: 149999,
    originalPrice: 179999,
    discount: 17,
    rating: 4.8,
    reviewCount: 2100,
    merchant: 'Samsung Store',
  },
  {
    id: '3',
    name: 'iPad Pro 12.9" 2024',
    image: '📱',
    price: 119999,
    originalPrice: 139999,
    discount: 14,
    rating: 4.9,
    reviewCount: 1850,
    merchant: 'Amazon',
  },
  {
    id: '4',
    name: 'Dyson V15 Detect Vacuum',
    image: '🏠',
    price: 74999,
    originalPrice: 99999,
    discount: 25,
    rating: 4.8,
    reviewCount: 950,
    merchant: 'Dyson Store',
  },
];

export default function BestRated() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {mockProducts.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          image={product.image}
          price={product.price}
          originalPrice={product.originalPrice}
          discount={product.discount}
          rating={product.rating}
          reviewCount={product.reviewCount}
          merchant={product.merchant}
        />
      ))}
    </div>
  );
}
