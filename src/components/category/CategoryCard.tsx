'use client';

import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  icon: string;
  count?: number;
  slug?: string;
}

export default function CategoryCard({ name, icon, count, slug }: CategoryCardProps) {
  return (
    <Link href={`/categories/${slug}`}>
      <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg hover:scale-105 transition cursor-pointer text-center transform">
        <div className="text-5xl mb-3">{icon}</div>
        <h3 className="font-bold text-lg mb-2">{name}</h3>
        {count && <p className="text-sm text-gray-500">{count} products</p>}
      </div>
    </Link>
  );
}
