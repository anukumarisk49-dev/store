import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Careers', description: 'Join the team building a better way to discover online deals.' };

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-xl bg-[#eaf7ee] px-6 py-10 sm:px-12"><p className="text-xs font-black uppercase tracking-widest text-primary">Work with us</p><h1 className="mt-3 text-4xl font-black text-[#173a2a]">Help people make better buys.</h1><p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">We are building a thoughtful product discovery platform for shoppers who care about value. We look for curious people who enjoy turning messy information into simple experiences.</p></section>
      <section className="py-10"><h2 className="text-2xl font-black">What we value</h2><div className="mt-5 grid gap-4 sm:grid-cols-3">{['Customer-first thinking', 'Clear, useful work', 'Ownership with empathy'].map((value) => <div key={value} className="rounded-xl border border-gray-100 bg-white p-5 text-sm font-bold shadow-sm">{value}</div>)}</div></section>
      <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"><h2 className="text-xl font-black">No open roles right now</h2><p className="mt-3 text-sm leading-6 text-gray-600">We are growing carefully. Send us a note about your work and we will keep it for future opportunities.</p><Link href="/contact" className="mt-5 inline-block rounded-md bg-primary px-5 py-3 text-sm font-bold text-white">Get in touch →</Link></section>
    </div>
  );
}
