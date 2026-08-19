'use client';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-3xl font-bold text-primary">
            99STORE
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-8">
            <input
              type="text"
              placeholder="Search deals..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button className="text-gray-600 hover:text-primary transition">
              ♡ Wishlist
            </button>
            <button className="text-gray-600 hover:text-primary transition">
              👤 Login
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex gap-8 mt-4 text-sm font-medium">
          <a href="/" className="text-gray-700 hover:text-primary">Home</a>
          <a href="/deals" className="text-gray-700 hover:text-primary">Deals</a>
          <a href="/trending" className="text-gray-700 hover:text-primary">Trending</a>
          <a href="/categories" className="text-gray-700 hover:text-primary">Categories</a>
          <a href="/compare" className="text-gray-700 hover:text-primary">Compare</a>
        </nav>
      </div>
    </header>
  );
}
