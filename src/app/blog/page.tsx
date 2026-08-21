import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Blog', description: 'Shopping guides, deal tips, and product discovery from 99StorePe.' };

const posts = [
  ['How to spot a genuinely good deal', 'A practical checklist for comparing discounts, prices, and seller details.', 'Deal guides'],
  ['The smartest products under ₹99', 'Small upgrades and useful everyday finds that deliver real value.', 'Value picks'],
  ['A simple guide to comparing online prices', 'What to check beyond the headline price before you click buy.', 'Shopping tips'],
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8"><p className="text-xs font-black uppercase tracking-widest text-primary">From the 99StorePe team</p><h1 className="mt-2 text-4xl font-black text-[#173a2a]">Shopping, made clearer.</h1><p className="mt-3 text-gray-600">Guides that help you compare with confidence.</p></div>
      <div className="grid gap-5 md:grid-cols-3">{posts.map(([title, text, category]) => <article key={title} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"><span className="text-xs font-bold uppercase tracking-wider text-primary">{category}</span><h2 className="mt-4 text-xl font-black leading-7">{title}</h2><p className="mt-3 text-sm leading-6 text-gray-600">{text}</p><Link href="/deals" className="mt-6 inline-block text-sm font-bold text-primary">Explore deals →</Link></article>)}</div>
    </div>
  );
}
