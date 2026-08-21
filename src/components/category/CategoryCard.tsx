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
      <div className="group flex min-w-[88px] flex-col items-center rounded-xl border border-transparent bg-white px-2 py-3 text-center transition hover:border-[#ccebd6] hover:shadow-sm">
        <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-[#eef8f1] text-3xl transition group-hover:bg-[#d9f1df]">{icon}</div>
        <h3 className="line-clamp-2 text-[11px] font-bold leading-4 text-gray-700">{name}</h3>
        {count ? <p className="mt-1 text-[10px] text-gray-400">{count} items</p> : null}
      </div>
    </Link>
  );
}
