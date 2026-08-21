import Hero from '@/components/home/Hero';
import CategoryGrid from '@/components/category/CategoryGrid';
import DealGrid from '@/components/deals/DealGrid';
import BestRated from '@/components/home/BestRated';
import DiscountBanner from '@/components/home/DiscountBanner';

export default function Home() {
  return (
    <div className="pb-12">
      <Hero />

      <section className="mx-auto max-w-[1400px] px-4 pt-7 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-end justify-between">
          <div><p className="text-[11px] font-black uppercase tracking-widest text-primary">Explore the store</p><h2 className="mt-1 text-xl font-black text-[#173a2a]">Shop by Category</h2></div>
          <a href="/categories" className="text-xs font-bold text-primary hover:underline">View All Categories →</a>
        </div>
        <CategoryGrid />
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pt-7 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-end justify-between"><div><p className="text-[11px] font-black uppercase tracking-widest text-primary">Popular right now</p><h2 className="mt-1 text-xl font-black">🔥 Trending Deals</h2></div><a href="/deals" className="text-xs font-bold text-primary hover:underline">View All →</a></div>
        <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-5">
          <DealGrid />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pt-7 sm:px-6 lg:px-8">
        <DiscountBanner price={99} title="💰 Under ₹99" />
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pt-7 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-end justify-between"><div><p className="text-[11px] font-black uppercase tracking-widest text-primary">Trusted by shoppers</p><h2 className="mt-1 text-xl font-black">⭐ Best Rated</h2></div><a href="/categories" className="text-xs font-bold text-primary hover:underline">View All →</a></div>
        <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-5">
          <BestRated />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pt-7 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-[#f5dfdf] bg-[#fff7f7] p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between"><div><p className="text-[11px] font-black uppercase tracking-widest text-danger">Limited-time prices</p><h2 className="mt-1 text-xl font-black">🏷️ Biggest Discounts</h2></div><a href="/deals" className="text-xs font-bold text-danger hover:underline">View All Deals →</a></div>
          <DealGrid sortBy="discount" />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-2 gap-3 px-4 pt-7 sm:grid-cols-4 sm:px-6 lg:px-8">
        {[['⌁', 'Compare Prices', 'Find best deals from top stores'], ['♧', 'Save More', 'Exclusive offers & discounts'], ['♧', 'Smart Alerts', 'Price drops and deal notifications'], ['✓', 'Trusted Platform', '100% secure & reliable']].map(([icon, title, text]) => <div key={title} className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm"><span className="text-xl text-primary">{icon}</span><h3 className="mt-2 text-xs font-black">{title}</h3><p className="mt-1 text-[10px] leading-4 text-gray-500">{text}</p></div>)}
      </section>
    </div>
  );
}
