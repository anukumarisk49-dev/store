import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Frequently Asked Questions', description: 'Answers to common questions about 99StorePe and affiliate shopping.' };

const questions = [['What is 99StorePe?', '99StorePe is a product discovery and deal comparison platform. We help you find offers from online merchants, then send you to the merchant site to complete your purchase.'], ['Do I buy products directly from 99StorePe?', 'No. Purchases, delivery, payments, returns, and refunds are handled by the merchant shown on the product listing.'], ['Does using 99StorePe cost anything?', 'No. Browsing and comparing products is free. We may earn a commission when you visit a merchant through one of our affiliate links.'], ['Are prices and availability guaranteed?', 'Prices and availability can change on merchant websites. Always confirm the final price, delivery details, and return policy before placing an order.'], ['How can I report an incorrect listing?', 'Please send the product name and issue through our contact page so we can review it.']];

export default function FAQPage() {
  return <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6 lg:px-8"><div className="mb-8"><p className="text-xs font-black uppercase tracking-widest text-primary">Need a hand?</p><h1 className="mt-2 text-4xl font-black text-[#173a2a]">Frequently Asked Questions</h1></div><div className="space-y-3">{questions.map(([question, answer]) => <details key={question} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"><summary className="cursor-pointer text-base font-black">{question}</summary><p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">{answer}</p></details>)}</div><p className="mt-8 text-sm text-gray-600">Still need help? <Link href="/contact" className="font-bold text-primary">Contact us →</Link></p></div>;
}
