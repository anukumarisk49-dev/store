'use client';

import ProductCard from '@/components/product/ProductCard';

const mockDeals = [
  {
    id: '1',
    name: 'boAt Rockerz 450 Wireless Earbuds',
    image: '🎧',
    price: 1299,
    originalPrice: 2599,
    discount: 50,
    rating: 4.5,
    reviewCount: 1250,
    merchant: 'Amazon',
  },
  {
    id: '2',
    name: 'Samsung Galaxy M53 128GB',
    image: '📱',
    price: 12999,
    originalPrice: 19999,
    discount: 35,
    rating: 4.3,
    reviewCount: 890,
    merchant: 'Flipkart',
  },
  {
    id: '3',
    name: 'Realme 11 Pro 128GB',
    image: '📱',
    price: 9999,
    originalPrice: 12999,
    discount: 23,
    rating: 4.4,
    reviewCount: 2100,
    merchant: 'Amazon',
  },
  {
    id: '4',
    name: 'OnePlus 12 256GB',
    image: '📱',
    price: 39999,
    originalPrice: 49999,
    discount: 20,
    rating: 4.6,
    reviewCount: 1560,
    merchant: 'OnePlus Store',
  },
  {
    id: '5',
    name: 'Apple AirPods Pro 2nd Gen',
    image: '🎧',
    price: 24999,
    originalPrice: 29999,
    discount: 17,
    rating: 4.8,
    reviewCount: 3200,
    merchant: 'Amazon',
  },
  {
    id: '6',
    name: 'Sony WH-CH720 Headphones',
    image: '🎧',
    price: 4999,
    originalPrice: 7990,
    discount: 37,
    rating: 4.2,
    reviewCount: 650,
    merchant: 'Flipkart',
  },
  {
    id: '7',
    name: 'MacBook Air M2 2024',
    image: '💻',
    price: 119999,
    originalPrice: 139900,
    discount: 14,
    rating: 4.9,
    reviewCount: 1100,
    merchant: 'Amazon',
  },
  {
    id: '8',
    name: 'Dell XPS 13 Laptop',
    image: '💻',
    price: 99999,
    originalPrice: 129999,
    discount: 23,
    rating: 4.7,
    reviewCount: 920,
    merchant: 'Dell Store',
  },
];

interface DealGridProps {
  sortBy?: 'trending' | 'discount';
}

export default function DealGrid({ sortBy = 'trending' }: DealGridProps) {
  let deals = [...mockDeals];

  if (sortBy === 'discount') {
    deals = deals.sort((a, b) => b.discount - a.discount);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {deals.map((deal) => (
        <ProductCard
          key={deal.id}
          id={deal.id}
          name={deal.name}
          image={deal.image}
          price={deal.price}
          originalPrice={deal.originalPrice}
          discount={deal.discount}
          rating={deal.rating}
          reviewCount={deal.reviewCount}
          merchant={deal.merchant}
        />
      ))}
    </div>
  );
}
