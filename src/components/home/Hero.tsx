'use client';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">🔥 Best Deals of the Day</h1>
        <p className="text-xl mb-8 opacity-90">Discover • Compare • Save</p>
        <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
          Explore Deals
        </button>
      </div>
    </section>
  );
}
