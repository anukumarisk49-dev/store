'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const banners = [
  {
    eyebrow: 'Curated for you',
    title: 'Best Deals',
    highlight: 'of the Day',
    description: 'Compare prices across stores and save more every day.',
    discount: '70%',
    image: '/images/products/electronics-luxurium-decor-counter-for-chanting-mantra-tally-count.jpg',
    href: '/deals',
  },
  {
    eyebrow: 'Value picks',
    title: 'Smart Finds',
    highlight: 'Under ₹99',
    description: 'Useful everyday products at prices worth a second look.',
    discount: '90%',
    image: '/images/products/electronics-beeptech-electronics-buzzer-12vdc-2wires-for-universal.jpg',
    href: '/under-99',
  },
  {
    eyebrow: 'Fresh price drops',
    title: 'Save Big',
    highlight: 'on Electronics',
    description: 'Compare trusted sellers before you make your next upgrade.',
    discount: '60%',
    image: '/images/products/electronics-uzox-50-w-black-hand-blender.jpg',
    href: '/categories/electronics',
  },
  {
    eyebrow: 'Style edit',
    title: 'New Looks',
    highlight: 'Better Prices',
    description: 'Find fashion favorites and everyday essentials in one place.',
    discount: '50%',
    image: '/images/products/fashion.svg',
    href: '/categories/fashion',
  },
  {
    eyebrow: 'Home upgrades',
    title: 'Make Home',
    highlight: 'Feel Better',
    description: 'Small improvements, thoughtful products, and better value.',
    discount: '55%',
    image: '/images/products/home-kitchen.svg',
    href: '/categories/home-kitchen',
  },
  {
    eyebrow: 'Shop smarter',
    title: 'More Choice',
    highlight: 'More Savings',
    description: 'Browse curated deals across every category and merchant.',
    discount: '75%',
    image: '/images/products/grocery.svg',
    href: '/categories',
  },
];

export default function Hero() {
  const [activeBanner, setActiveBanner] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const banner = banners[activeBanner];

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveBanner((current) => (current + 1) % banners.length);
    }, 2500);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="mx-auto max-w-[1400px] px-4 pt-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)_220px]">
        <aside className="hidden rounded-xl border border-gray-100 bg-white p-3 shadow-sm lg:block">
          <p className="mb-2 px-3 text-xs font-black uppercase tracking-wider text-gray-500">Shop by category</p>
          {[
            ['📱', 'Mobiles & Accessories', 'electronics'],
            ['💻', 'Electronics', 'electronics'],
            ['👕', 'Fashion', 'fashion'],
            ['💄', 'Beauty & Personal Care', 'beauty'],
            ['🏠', 'Home & Kitchen', 'home-kitchen'],
            ['🎮', 'Gaming', 'gaming'],
            ['⚽', 'Sports & Outdoors', 'sports'],
            ['📚', 'Books & Stationery', 'books'],
          ].map(([icon, name, slug]) => (
            <Link key={name} href={`/categories/${slug}`} className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-secondary hover:text-primary">
              <span><span className="mr-2">{icon}</span>{name}</span><span>›</span>
            </Link>
          ))}
          <Link href="/categories" className="mt-2 block border-t border-gray-100 pt-3 text-center text-xs font-bold text-gray-600 hover:text-primary">View All Categories →</Link>
        </aside>

        <div
          className="relative min-h-[300px] overflow-hidden rounded-xl bg-[#075a39] px-7 py-10 text-white shadow-sm sm:px-12 lg:min-h-[350px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_45%,rgba(114,220,142,.45),transparent_35%)]" />
          <div key={activeBanner} className="relative z-10 max-w-sm animate-fade-in">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#b5f0c4]">{banner.eyebrow}</p>
            <h1 className="text-4xl font-black leading-[0.98] sm:text-5xl">{banner.title}<br /><span className="text-[#ffd23f]">{banner.highlight}</span></h1>
            <p className="mt-5 max-w-xs text-sm leading-6 text-green-50">{banner.description}</p>
            <Link href={banner.href} className="mt-6 inline-block rounded-md bg-white px-5 py-2.5 text-xs font-black text-primary transition hover:bg-[#fff3d1]">Shop Deals</Link>
          </div>
          <img key={banner.image} src={banner.image} alt="Featured deal" className="absolute bottom-3 right-4 h-44 w-44 object-contain mix-blend-multiply transition-opacity duration-300 sm:right-12 sm:h-60 sm:w-60" />
          <div className="absolute right-5 top-8 rounded-full bg-[#ffd23f] px-4 py-3 text-center text-xs font-black text-[#123f2d] shadow-lg sm:right-12"><span className="block text-lg">UP TO</span>{banner.discount} OFF</div>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5" role="tablist" aria-label="Featured banners">
            {banners.map((item, index) => <button key={item.title} type="button" role="tab" aria-label={`Show ${item.title}`} aria-selected={index === activeBanner} onClick={() => setActiveBanner(index)} className={`h-1.5 rounded-full transition-all ${index === activeBanner ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`} />)}
          </div>
        </div>

        <div className="hidden rounded-xl border border-gray-100 bg-white p-4 shadow-sm lg:block">
          {[['🚚', 'Free Delivery', 'On all orders over ₹499'], ['🛡', 'Top Brands', '100% Original Products'], ['↻', 'Easy Returns', '7 Days Return Policy'], ['▣', 'Secure Payment', '100% Secure Checkout']].map(([icon, title, text]) => (
            <div key={title} className="flex gap-3 border-b border-gray-100 py-4 last:border-0">
              <span className="text-lg text-primary">{icon}</span><div><p className="text-xs font-bold">{title}</p><p className="mt-1 text-[10px] text-gray-500">{text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
