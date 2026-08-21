'use client';

import Link from 'next/link';

export default function Header() {
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
        <div className="hidden min-w-0 flex-1 md:flex">
          <input type="search" placeholder="Search for products, brands and best deals..." className="w-full rounded-l-md border border-r-0 border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:bg-white" />
          <button type="button" className="rounded-r-md bg-primary px-5 text-sm font-bold text-white transition hover:bg-[#4ea875]">Search</button>
        </div>
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
