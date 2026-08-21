import type { Metadata } from 'next';
import catalog from '../../../public/data/products.json';
import CategoryProductGrid from '@/components/category/CategoryProductGrid';

export const metadata: Metadata = {
  title: 'Products Under ₹99',
  description: 'Browse all available products priced at ₹99 or less across every category.',
  alternates: { canonical: '/under-99' },
};

const under99Products = Object.values(catalog.categories)
  .flatMap((category) => category.products.map((product) => ({ ...product, category: category.name })))
  .filter((product) => product.price <= 99);

export default function Under99Page() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-xl bg-gradient-to-r from-[#eaf7ee] to-[#d9f1df] px-6 py-7 sm:px-10">
        <p className="text-xs font-black uppercase tracking-widest text-primary">Daily value picks</p>
        <h1 className="mt-2 text-3xl font-black text-[#173a2a]">Products Under ₹99</h1>
        <p className="mt-2 text-sm text-gray-600">
          Discover {under99Products.length} products priced at ₹99 or less across all categories.
        </p>
      </div>

      <CategoryProductGrid products={under99Products} />
    </div>
  );
}
