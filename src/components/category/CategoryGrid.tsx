'use client';

import CategoryCard from './CategoryCard';

const categories = [
  { name: 'Electronics', icon: '📱', count: 1250 },
  { name: 'Fashion', icon: '👕', count: 3420 },
  { name: 'Home & Kitchen', icon: '🏠', count: 2100 },
  { name: 'Beauty', icon: '💄', count: 890 },
  { name: 'Mobile Accessories', icon: '📞', count: 1560 },
  { name: 'Grocery', icon: '🛒', count: 4200 },
  { name: 'Gaming', icon: '🎮', count: 650 },
  { name: 'Sports', icon: '⚽', count: 780 },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.name}
          name={category.name}
          icon={category.icon}
          count={category.count}
          slug={category.name.toLowerCase().replace(/ /g, '-')}
        />
      ))}
    </div>
  );
}
