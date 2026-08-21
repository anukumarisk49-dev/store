import DealGrid from '@/components/deals/DealGrid';

export default function DealsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-xl bg-[#eaf7ee] px-6 py-7 sm:px-10">
        <p className="text-xs font-black uppercase tracking-widest text-primary">Compare before you buy</p>
        <h1 className="mt-2 text-3xl font-black text-[#173a2a]">All Deals</h1>
        <p className="mt-2 text-sm text-gray-600">Fresh price drops and worthwhile offers from the catalog.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Filters Sidebar */}
        <aside className="md:col-span-1">
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-black">Filters</h3>

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

            <button type="button" className="w-full rounded-md bg-primary py-2 text-sm font-bold text-white">
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="md:col-span-3">
          <div className="mb-4 flex items-center justify-between">
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

          <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-5"><DealGrid /></div>
        </div>
      </div>
    </div>
  );
}
