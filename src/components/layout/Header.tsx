'use client';

import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import catalog from '../../../public/data/products.json';

interface SearchProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

const searchProducts: SearchProduct[] = Object.entries(catalog.categories).flatMap(([slug, category]) =>
  category.products.map((product) => ({
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    category: category.name || slug,
  }))
);

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];

    return searchProducts
      .filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(normalizedQuery))
      .slice(0, 5);
  }, [query]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedQuery = query.trim();
    if (normalizedQuery) router.push(`/search?q=${encodeURIComponent(normalizedQuery)}`);
    setIsFocused(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="border-b border-gray-100 bg-[#f5fbf7] text-[11px] text-gray-600">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-1.5 sm:px-6 lg:px-8">
          <span>Deliver to Delhi 110001⌄</span>
          <span className="hidden sm:block">Compare prices. Save more every day.</span>
          <span>Help & Support</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" aria-label="99StorePe home" className="block w-[clamp(118px,18vw,190px)] shrink-0">
          <img
            src="/logo.svg"
            alt="99StorePe - Compare prices, find deals, save more"
            className="block h-auto w-full max-w-full"
            width="1100"
            height="250"
          />
        </Link>
        <form onSubmit={submitSearch} className="relative hidden min-w-0 flex-1 md:flex">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={(event) => { if (event.key === 'Escape') setIsFocused(false); }}
            placeholder="Search for products, brands and best deals..."
            aria-label="Search products"
            autoComplete="off"
            className="w-full rounded-l-md border border-r-0 border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:bg-white"
          />
          <button type="submit" className="rounded-r-md bg-primary px-5 text-sm font-bold text-white transition hover:bg-[#4ea875]">Search</button>
          {isFocused && query.trim() && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-md border border-gray-200 bg-white shadow-xl">
              {suggestions.length ? suggestions.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onMouseDown={() => router.push(`/search?q=${encodeURIComponent(product.name)}`)}
                  className="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left transition last:border-0 hover:bg-secondary"
                >
                  <img src={product.image} alt="" className="h-10 w-10 rounded object-contain" />
                  <span className="min-w-0"><span className="block truncate text-xs font-bold text-gray-800">{product.name}</span><span className="mt-1 block text-[11px] text-gray-500">{product.category} · ₹{product.price.toLocaleString('en-IN')}</span></span>
                </button>
              )) : <p className="px-4 py-4 text-sm text-gray-500">No matching products found.</p>}
              {suggestions.length > 0 && <button type="submit" className="w-full bg-[#f5fbf7] px-4 py-3 text-left text-xs font-bold text-primary hover:bg-secondary">View all results for &quot;{query.trim()}&quot; →</button>}
            </div>
          )}
        </form>
        <div className="ml-auto flex items-center gap-3 text-xs font-semibold text-gray-600 sm:gap-5">
          <button type="button" className="hidden transition hover:text-primary sm:block">♡ Wishlist</button>
          <Link href="/compare" className="hidden transition hover:text-primary sm:block">⇄ Compare</Link>
          <button type="button" className="transition hover:text-primary">♙ Login / Signup</button>
        </div>
      </div>
      <nav className="border-t border-gray-100 bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center gap-5 overflow-x-auto px-4 py-2 text-xs font-bold text-gray-700 sm:px-6 lg:gap-8 lg:px-8">
          <Link href="/categories" className="shrink-0 rounded bg-[#123f2d] px-4 py-2 text-white">☰ All Categories</Link>
          <Link href="/deals" className="shrink-0 hover:text-primary">🔥 Today&apos;s Deals</Link>
          <Link href="/deals" className="shrink-0 hover:text-primary">◈ Trending</Link>
          <Link href="/categories/electronics" className="shrink-0 hover:text-primary">Mobiles</Link>
          <Link href="/categories/electronics" className="shrink-0 hover:text-primary">Electronics</Link>
          <Link href="/categories/fashion" className="shrink-0 hover:text-primary">Fashion</Link>
          <Link href="/categories/beauty" className="shrink-0 hover:text-primary">Beauty</Link>
          <Link href="/categories/home-kitchen" className="shrink-0 hover:text-primary">Home & Kitchen</Link>
          <Link href="/categories/sports" className="shrink-0 hover:text-primary">Sports</Link>
          <Link href="/categories/books" className="shrink-0 hover:text-primary">Books</Link>
          <Link href="/categories" className="shrink-0 hover:text-primary">More⌄</Link>
        </div>
      </nav>
    </header>
  );
}
