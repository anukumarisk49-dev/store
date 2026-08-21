import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn how 99StorePe helps shoppers discover better deals.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-xl bg-[#eaf7ee] px-6 py-10 sm:px-12">
        <p className="text-xs font-black uppercase tracking-widest text-primary">Our story</p>
        <h1 className="mt-3 text-4xl font-black text-[#173a2a]">Shopping smarter starts here.</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">99StorePe brings useful products, honest pricing, and worthwhile offers together so you can spend less time searching and more time choosing well.</p>
      </section>
      <div className="grid gap-6 py-10 md:grid-cols-3">
        {[['Discover', 'Find products across categories and merchants in one simple place.'], ['Compare', 'See prices, discounts, ratings, and merchant details before you buy.'], ['Save', 'Follow real value instead of noisy offers with our curated deal collections.']].map(([title, text]) => <article key={title} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"><h2 className="text-lg font-black text-[#173a2a]">{title}</h2><p className="mt-3 text-sm leading-6 text-gray-600">{text}</p></article>)}
      </div>
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"><h2 className="text-2xl font-black">Built for everyday decisions</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600">From products under ₹99 to carefully selected category deals, our goal is to make value easy to spot. We earn through affiliate partnerships when you choose to visit a merchant, at no extra cost to you.</p><Link href="/categories" className="mt-6 inline-block rounded-md bg-primary px-5 py-3 text-sm font-bold text-white">Browse Categories →</Link></div>
    </div>
  );
}
