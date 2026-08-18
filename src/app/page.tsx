import Hero from '@/components/home/Hero';
import CategoryGrid from '@/components/category/CategoryGrid';
import DealGrid from '@/components/deals/DealGrid';
import BestRated from '@/components/home/BestRated';
import DiscountBanner from '@/components/home/DiscountBanner';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Categories */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
        <CategoryGrid />
      </section>

      {/* Trending Deals */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">🔥 Trending Deals</h2>
          <DealGrid />
        </div>
      </section>

      {/* Under 99 Banner */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <DiscountBanner price={99} title="💰 Under ₹99" />
      </section>

      {/* Best Rated */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">⭐ Best Rated</h2>
          <BestRated />
        </div>
      </section>

      {/* Biggest Discounts */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">🏷️ Today's Biggest Discounts</h2>
        <DealGrid sortBy="discount" />
      </section>
    </>
  );
}
