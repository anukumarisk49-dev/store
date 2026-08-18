export default function DealsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">All Deals</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <aside className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-4">Filters</h3>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">Price Range</label>
              <input type="range" min="0" max="100000" className="w-full" />
            </div>

            {/* Rating */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">Minimum Rating</label>
              <select className="w-full px-3 py-2 border rounded">
                <option>All</option>
                <option>4★ & above</option>
                <option>3★ & above</option>
              </select>
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">Category</label>
              <select className="w-full px-3 py-2 border rounded">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home</option>
              </select>
            </div>

            <button className="w-full bg-primary text-white py-2 rounded-lg font-bold">
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">Showing 1-20 of 342 deals</p>
            <select className="px-3 py-2 border rounded">
              <option>Sort by</option>
              <option>Latest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Discount</option>
              <option>Best Rating</option>
            </select>
          </div>

          {/* This would be filled with DealGrid component */}
          <div className="text-center text-gray-500 py-12">
            Load deals here...
          </div>
        </div>
      </div>
    </div>
  );
}
