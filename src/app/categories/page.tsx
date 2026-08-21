import catalog from '../../../public/data/products.json';

export default function CategoriesPage() {
  const categories = [
    { name: 'Electronics', icon: '📱', slug: 'electronics' },
    { name: 'Fashion', icon: '👕', slug: 'fashion' },
    { name: 'Home & Kitchen', icon: '🏠', slug: 'home-kitchen' },
    { name: 'Beauty', icon: '💄', slug: 'beauty' },
    { name: 'Mobile Accessories', icon: '📞', slug: 'mobile-accessories' },
    { name: 'Grocery', icon: '🛒', slug: 'grocery' },
    { name: 'Gaming', icon: '🎮', slug: 'gaming' },
    { name: 'Sports', icon: '⚽', slug: 'sports' },
    { name: 'Books', icon: '📚', slug: 'books' },
    { name: 'Toys', icon: '🧸', slug: 'toys' },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-xl bg-[#eaf7ee] px-6 py-7 sm:px-10">
        <p className="text-xs font-black uppercase tracking-widest text-primary">Find your next favorite</p>
        <h1 className="mt-2 text-3xl font-black text-[#173a2a]">Browse by Category</h1>
        <p className="mt-2 text-sm text-gray-600">Explore curated products and daily deals across every department.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {categories.map((category) => (
          <a
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#ccebd6] hover:shadow-md"
          >
            <div className="mb-4 flex h-16 items-center justify-center rounded-full bg-[#eef8f1] text-5xl transition group-hover:bg-[#d9f1df]">{category.icon}</div>
            <h3 className="text-center text-sm font-black">{category.name}</h3>
            <p className="mt-1 text-center text-xs text-gray-500">{catalog.categories[category.slug as keyof typeof catalog.categories]?.products.length || 0} products</p>
          </a>
        ))}
      </div>
    </div>
  );
}
