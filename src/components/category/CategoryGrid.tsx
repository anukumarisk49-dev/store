'use client';

import CategoryCard from './CategoryCard';
import catalog from '../../../public/data/products.json';

const categories = [
  { name: 'Electronics', icon: '📱', slug: 'electronics' },
  { name: 'Fashion', icon: '👕', slug: 'fashion' },
  { name: 'Home & Kitchen', icon: '🏠', slug: 'home-kitchen' },
  { name: 'Beauty', icon: '💄', slug: 'beauty' },
  { name: 'Mobile Accessories', icon: '📞', slug: 'mobile-accessories' },
  { name: 'Grocery', icon: '🛒', slug: 'grocery' },
  { name: 'Gaming', icon: '🎮', slug: 'gaming' },
  { name: 'Sports', icon: '⚽', slug: 'sports' },
  { name: 'Books', icon: '📚', slug: 'books' },
  { name: 'Toys', icon: '🧸', slug: 'toys' },
];

export default function CategoryGrid() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 md:grid md:grid-cols-5 lg:grid-cols-10">
      {categories.map((category) => (
        <CategoryCard
          key={category.name}
          name={category.name}
          icon={category.icon}
          count={catalog.categories[category.slug as keyof typeof catalog.categories]?.products.length || 0}
          slug={category.slug}
        />
      ))}
    </div>
  );
}
