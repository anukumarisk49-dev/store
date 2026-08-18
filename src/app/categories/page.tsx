export default function CategoriesPage() {
  const categories = [
    { name: 'Electronics', icon: '📱', products: 1250, slug: 'electronics' },
    { name: 'Fashion', icon: '👕', products: 3420, slug: 'fashion' },
    { name: 'Home & Kitchen', icon: '🏠', products: 2100, slug: 'home-kitchen' },
    { name: 'Beauty', icon: '💄', products: 890, slug: 'beauty' },
    { name: 'Mobile Accessories', icon: '📞', products: 1560, slug: 'mobile-accessories' },
    { name: 'Grocery', icon: '🛒', products: 4200, slug: 'grocery' },
    { name: 'Gaming', icon: '🎮', products: 650, slug: 'gaming' },
    { name: 'Sports', icon: '⚽', products: 780, slug: 'sports' },
    { name: 'Books', icon: '📚', products: 920, slug: 'books' },
    { name: 'Toys', icon: '🧸', products: 450, slug: 'toys' },
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
            <p className="text-sm text-gray-600 text-center">{category.products} products</p>
          </a>
        ))}
      </div>
    </div>
  );
}
