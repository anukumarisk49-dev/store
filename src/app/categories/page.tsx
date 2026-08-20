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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Browse by Category</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <a
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="p-6 bg-white rounded-lg shadow hover:shadow-lg hover:scale-105 transition transform cursor-pointer"
          >
            <div className="text-6xl text-center mb-4">{category.icon}</div>
            <h3 className="font-bold text-lg text-center mb-2">{category.name}</h3>
            <p className="text-sm text-gray-600 text-center">{catalog.categories[category.slug as keyof typeof catalog.categories]?.products.length || 0} products</p>
          </a>
        ))}
      </div>
    </div>
  );
}
