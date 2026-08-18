'use client';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

// Mock categories data
const categoryData: Record<string, { name: string; icon: string; description: string; products: number }> = {
  'electronics': { name: 'Electronics', icon: '📱', description: 'Latest gadgets and electronics', products: 1250 },
  'fashion': { name: 'Fashion', icon: '👕', description: 'Trending fashion and apparel', products: 3420 },
  'home-kitchen': { name: 'Home & Kitchen', icon: '🏠', description: 'Home and kitchen essentials', products: 2100 },
  'beauty': { name: 'Beauty', icon: '💄', description: 'Beauty and personal care products', products: 890 },
  'mobile-accessories': { name: 'Mobile Accessories', icon: '📞', description: 'Phone and mobile accessories', products: 1560 },
  'grocery': { name: 'Grocery', icon: '🛒', description: 'Fresh groceries and food items', products: 4200 },
  'gaming': { name: 'Gaming', icon: '🎮', description: 'Gaming consoles and accessories', products: 650 },
  'sports': { name: 'Sports', icon: '⚽', description: 'Sports equipment and gear', products: 780 },
};

// Mock products for demonstration
const mockProducts = [
  {
    id: '1',
    name: 'boAt Rockerz 450 Wireless Earbuds',
    image: '🎧',
    price: 1299,
    originalPrice: 2599,
    discount: 50,
    rating: 4.5,
    reviewCount: 1250,
  },
  {
    id: '2',
    name: 'Samsung Galaxy M53 128GB',
    image: '📱',
    price: 12999,
    originalPrice: 19999,
    discount: 35,
    rating: 4.3,
    reviewCount: 890,
  },
  {
    id: '3',
    name: 'Realme 11 Pro 128GB',
    image: '📱',
    price: 9999,
    originalPrice: 12999,
    discount: 23,
    rating: 4.4,
    reviewCount: 2100,
  },
  {
    id: '4',
    name: 'OnePlus 12 256GB',
    image: '📱',
    price: 39999,
    originalPrice: 49999,
    discount: 20,
    rating: 4.6,
    reviewCount: 1560,
  },
  {
    id: '5',
    name: 'Apple AirPods Pro 2nd Gen',
    image: '🎧',
    price: 24999,
    originalPrice: 29999,
    discount: 17,
    rating: 4.8,
    reviewCount: 3200,
  },
  {
    id: '6',
    name: 'Sony WH-CH720 Headphones',
    image: '🎧',
    price: 4999,
    originalPrice: 7990,
    discount: 37,
    rating: 4.2,
    reviewCount: 650,
  },
];

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categoryData[params.slug];

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find that category.</p>
          <a
            href="/categories"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
          >
            Back to Categories
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Category Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-6xl">{category.icon}</div>
          <div>
            <h1 className="text-4xl font-bold">{category.name}</h1>
            <p className="text-gray-600">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Filters & Sorting */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Filters Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow sticky top-20">
            <h3 className="font-bold text-lg mb-4">Filters</h3>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">Price Range</label>
              <input type="range" min="0" max="100000" className="w-full" />
            </div>

            {/* Rating */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">Minimum Rating</label>
              <select className="w-full px-3 py-2 border rounded text-sm">
                <option>All</option>
                <option>4★ & above</option>
                <option>3★ & above</option>
              </select>
            </div>

            {/* Brand */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">Brand</label>
              <select className="w-full px-3 py-2 border rounded text-sm">
                <option>All Brands</option>
                <option>Samsung</option>
                <option>Apple</option>
                <option>boAt</option>
                <option>Sony</option>
              </select>
            </div>

            <button className="w-full bg-primary text-white py-2 rounded-lg font-bold text-sm hover:bg-opacity-90 transition">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing 1-{mockProducts.length} of {category.products} products in {category.name}
            </p>
            <select className="px-3 py-2 border rounded text-sm">
              <option>Sort by: Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Discount</option>
              <option>Best Rating</option>
              <option>Newest First</option>
            </select>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group">
                <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center text-6xl">
                  {product.image}
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-danger text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-sm line-clamp-2 mb-2 group-hover:text-primary transition">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-3 text-xs">
                    <span className="text-yellow-500">★ {product.rating}</span>
                    <span className="text-gray-500">({product.reviewCount})</span>
                  </div>

                  <div className="mb-3">
                    <div className="flex gap-2 items-center">
                      <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                      <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                    </div>
                  </div>

                  <button className="w-full bg-primary text-white py-2 rounded-lg font-bold text-sm hover:bg-opacity-90 transition">
                    View Deal
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-12">
            <button className="px-4 py-2 border rounded hover:bg-gray-50">Previous</button>
            <button className="px-4 py-2 bg-primary text-white rounded">1</button>
            <button className="px-4 py-2 border rounded hover:bg-gray-50">2</button>
            <button className="px-4 py-2 border rounded hover:bg-gray-50">3</button>
            <button className="px-4 py-2 border rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
