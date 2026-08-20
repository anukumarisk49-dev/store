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
  'books': { name: 'Books', icon: '📚', description: 'Books for every reader', products: 920 },
  'toys': { name: 'Toys', icon: '🧸', description: 'Fun toys for every age', products: 450 },
};

// Mock products for demonstration
const electronicsProducts = [
  {
    id: '1',
    name: 'boAt Rockerz 450 Wireless Earbuds',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    price: 1299,
    originalPrice: 2599,
    discount: 50,
    rating: 4.5,
    reviewCount: 1250,
  },
  {
    id: '2',
    name: 'Samsung Galaxy M53 128GB',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    price: 12999,
    originalPrice: 19999,
    discount: 35,
    rating: 4.3,
    reviewCount: 890,
  },
  {
    id: '3',
    name: 'Realme 11 Pro 128GB',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80',
    price: 9999,
    originalPrice: 12999,
    discount: 23,
    rating: 4.4,
    reviewCount: 2100,
  },
  {
    id: '4',
    name: 'OnePlus 12 256GB',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    price: 39999,
    originalPrice: 49999,
    discount: 20,
    rating: 4.6,
    reviewCount: 1560,
  },
  {
    id: '5',
    name: 'Apple AirPods Pro 2nd Gen',
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=80',
    price: 24999,
    originalPrice: 29999,
    discount: 17,
    rating: 4.8,
    reviewCount: 3200,
  },
  {
    id: '6',
    name: 'Sony WH-CH720 Headphones',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
    price: 4999,
    originalPrice: 7990,
    discount: 37,
    rating: 4.2,
    reviewCount: 650,
  },
];

const fashionProducts = [
  {
    id: 'fashion-1',
    name: 'Classic Cotton Oversized T-Shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    price: 799,
    originalPrice: 1499,
    discount: 47,
    rating: 4.5,
    reviewCount: 1840,
  },
  {
    id: 'fashion-2',
    name: 'Women\'s Casual Linen Dress',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
    price: 1599,
    originalPrice: 2999,
    discount: 47,
    rating: 4.6,
    reviewCount: 920,
  },
  {
    id: 'fashion-3',
    name: 'Premium Leather Sneakers',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    price: 2299,
    originalPrice: 3999,
    discount: 43,
    rating: 4.4,
    reviewCount: 1260,
  },
  {
    id: 'fashion-4',
    name: 'Minimalist Leather Handbag',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    price: 1899,
    originalPrice: 3499,
    discount: 46,
    rating: 4.7,
    reviewCount: 740,
  },
  {
    id: 'fashion-5',
    name: 'Classic Denim Jacket',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    price: 1799,
    originalPrice: 3299,
    discount: 45,
    rating: 4.3,
    reviewCount: 680,
  },
  {
    id: 'fashion-6',
    name: 'Aviator UV Protection Sunglasses',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    price: 599,
    originalPrice: 1199,
    discount: 50,
    rating: 4.2,
    reviewCount: 510,
  },
];

const categoryProducts = {
  'home-kitchen': [
    { id: 'home-1', name: 'Modern Ceramic Dinner Set', image: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=800&q=80', price: 1299, originalPrice: 2499, discount: 48, rating: 4.5, reviewCount: 860 },
    { id: 'home-2', name: 'Compact Air Fryer', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80', price: 2999, originalPrice: 4999, discount: 40, rating: 4.6, reviewCount: 1240 },
    { id: 'home-3', name: 'Minimal Table Lamp', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80', price: 899, originalPrice: 1599, discount: 44, rating: 4.3, reviewCount: 520 },
  ],
  beauty: [
    { id: 'beauty-1', name: 'Natural Skincare Essentials', image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=80', price: 999, originalPrice: 1799, discount: 44, rating: 4.5, reviewCount: 920 },
    { id: 'beauty-2', name: 'Everyday Makeup Collection', image: 'https://images.unsplash.com/photo-1522335789203-a773f8f8c0c4?auto=format&fit=crop&w=800&q=80', price: 1499, originalPrice: 2499, discount: 40, rating: 4.4, reviewCount: 680 },
    { id: 'beauty-3', name: 'Floral Eau de Parfum', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80', price: 1199, originalPrice: 1999, discount: 40, rating: 4.6, reviewCount: 430 },
  ],
  'mobile-accessories': [
    { id: 'mobile-1', name: 'Fast Charging Power Bank', image: 'https://images.unsplash.com/photo-1609592424423-7f2f42e8fba3?auto=format&fit=crop&w=800&q=80', price: 1099, originalPrice: 1999, discount: 45, rating: 4.4, reviewCount: 1100 },
    { id: 'mobile-2', name: 'Wireless Phone Charger', image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80', price: 699, originalPrice: 1299, discount: 46, rating: 4.3, reviewCount: 760 },
    { id: 'mobile-3', name: 'Protective Phone Case', image: 'https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=800&q=80', price: 399, originalPrice: 799, discount: 50, rating: 4.2, reviewCount: 510 },
  ],
  grocery: [
    { id: 'grocery-1', name: 'Organic Pantry Starter Box', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80', price: 799, originalPrice: 1099, discount: 27, rating: 4.5, reviewCount: 340 },
    { id: 'grocery-2', name: 'Fresh Seasonal Fruit Basket', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80', price: 599, originalPrice: 799, discount: 25, rating: 4.4, reviewCount: 280 },
    { id: 'grocery-3', name: 'Premium Coffee Beans', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80', price: 449, originalPrice: 699, discount: 36, rating: 4.7, reviewCount: 620 },
  ],
  gaming: [
    { id: 'gaming-1', name: 'Wireless Gaming Controller', image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=800&q=80', price: 2499, originalPrice: 3999, discount: 38, rating: 4.6, reviewCount: 980 },
    { id: 'gaming-2', name: 'RGB Mechanical Keyboard', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80', price: 2199, originalPrice: 3499, discount: 37, rating: 4.5, reviewCount: 740 },
    { id: 'gaming-3', name: 'Gaming Headset with Microphone', image: 'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=800&q=80', price: 1599, originalPrice: 2499, discount: 36, rating: 4.4, reviewCount: 530 },
  ],
  sports: [
    { id: 'sports-1', name: 'Lightweight Yoga Mat', image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=800&q=80', price: 699, originalPrice: 1199, discount: 42, rating: 4.5, reviewCount: 810 },
    { id: 'sports-2', name: 'Adjustable Dumbbell Set', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80', price: 2499, originalPrice: 3999, discount: 38, rating: 4.6, reviewCount: 470 },
    { id: 'sports-3', name: 'Running Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', price: 1899, originalPrice: 2999, discount: 37, rating: 4.4, reviewCount: 920 },
  ],
  books: [
    { id: 'books-1', name: 'The Modern Reading Collection', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80', price: 699, originalPrice: 999, discount: 30, rating: 4.7, reviewCount: 340 },
    { id: 'books-2', name: 'Classic Hardcover Novel', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80', price: 449, originalPrice: 699, discount: 36, rating: 4.6, reviewCount: 280 },
    { id: 'books-3', name: 'Daily Journal and Planner', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&q=80', price: 299, originalPrice: 499, discount: 40, rating: 4.5, reviewCount: 190 },
  ],
  toys: [
    { id: 'toys-1', name: 'Wooden Building Blocks', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=800&q=80', price: 799, originalPrice: 1299, discount: 38, rating: 4.6, reviewCount: 420 },
    { id: 'toys-2', name: 'Plush Teddy Bear', image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&q=80', price: 599, originalPrice: 999, discount: 40, rating: 4.5, reviewCount: 360 },
    { id: 'toys-3', name: 'Creative Art Kit for Kids', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80', price: 499, originalPrice: 899, discount: 44, rating: 4.4, reviewCount: 240 },
  ],
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categoryData[params.slug];
  const mockProducts = params.slug === 'fashion'
    ? fashionProducts
    : categoryProducts[params.slug as keyof typeof categoryProducts] || electronicsProducts;

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
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
