'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/product/ProductCard';

const mockDeals = [
  {
    id: '1',
    name: 'boAt Rockerz 450 Wireless Earbuds',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=80',
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
  const [catalogDeals, setCatalogDeals] = useState(mockDeals);

  useEffect(() => {
    fetch('/data/products.json')
      .then((response) => response.json())
      .then((catalog) => {
        const products = Object.values(catalog.categories)
          .flatMap((category: any) => category.products)
          .slice(0, 8);
        setCatalogDeals(products);
      })
      .catch(() => undefined);
  }, []);

  let deals = [...catalogDeals];

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
