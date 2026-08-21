import type { Metadata } from 'next';
import catalog from '../../../public/data/products.json';
import CategoryProductGrid from '@/components/category/CategoryProductGrid';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim() || 'Products';
  return {
    title: `Search results for ${query}`,
    description: `Search results for ${query} on 99StorePe.`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() || '';
  const normalizedQuery = query.toLowerCase();
  const results = Object.entries(catalog.categories).flatMap(([slug, category]) =>
    category.products
      .filter((product) => {
        if (!normalizedQuery) return true;
        return `${product.name} ${category.name} ${slug} ${product.merchant || ''}`
          .toLowerCase()
          .includes(normalizedQuery);
      })
      .map((product) => ({ ...product, category: category.name || slug }))
  );

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-xl bg-[#eaf7ee] px-6 py-7 sm:px-10">
        <p className="text-xs font-black uppercase tracking-widest text-primary">Product search</p>
        <h1 className="mt-2 text-3xl font-black text-[#173a2a]">
          {query ? `Results for “${query}”` : 'Search all products'}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {results.length} {results.length === 1 ? 'product' : 'products'} found across every category.
        </p>
      </div>

      {results.length ? (
        <CategoryProductGrid products={results} />
      ) : (
        <div className="rounded-xl border border-gray-100 bg-white p-12 text-center shadow-sm">
          <h2 className="text-xl font-black text-[#173a2a]">No products found</h2>
          <p className="mt-2 text-sm text-gray-600">Try a different product name, category, or merchant.</p>
        </div>
      )}
    </div>
  );
}
