'use client';

import { FormEvent, useState } from 'react';

const categories = [
  ['electronics', 'Electronics'], ['fashion', 'Fashion'], ['home-kitchen', 'Home & Kitchen'],
  ['beauty', 'Beauty'], ['mobile-accessories', 'Mobile Accessories'], ['grocery', 'Grocery'],
  ['gaming', 'Gaming'], ['sports', 'Sports'], ['books', 'Books'], ['toys', 'Toys'],
];

export default function AddProductPage() {
  const [mode, setMode] = useState<'manual' | 'fetch'>('manual');
  const [category, setCategory] = useState('electronics');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    const form = new FormData(event.currentTarget);
    const id = String(form.get('id')).trim();
    const affiliateUrl = String(form.get('affiliateUrl')).trim();
    const payload: Record<string, unknown> = { id, category, affiliateUrl };
    const endpoint = mode === 'fetch' ? '/api/products/fetch-flipkart' : '/api/products/manual';

    if (mode === 'fetch') {
      payload.sourceUrl = String(form.get('sourceUrl')).trim();
    } else {
      Object.assign(payload, {
        name: String(form.get('name')).trim(), image: String(form.get('image')).trim(),
        price: Number(form.get('price')), originalPrice: Number(form.get('originalPrice')) || Number(form.get('price')),
        offerPrice: Number(form.get('offerPrice')) || undefined, discount: Number(form.get('discount')) || 0,
        rating: Number(form.get('rating')) || 0, reviewCount: Number(form.get('reviewCount')) || 0,
        merchant: String(form.get('merchant')).trim(), brand: String(form.get('brand')).trim() || undefined,
        description: String(form.get('description')).trim() || undefined,
        highlights: String(form.get('highlights')).split('\n').map((item) => item.trim()).filter(Boolean),
        sourceUrl: String(form.get('sourceUrl')).trim() || undefined,
      });
    }

    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) { setError(data.error || 'Could not save this product.'); return; }
      setMessage(data.message || 'Product added successfully.');
      window.location.assign(`/categories/${category}`);
    } catch { setError('The local server could not be reached. Make sure npm run dev is running.'); }
    finally { setLoading(false); }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8"><p className="text-sm font-bold uppercase tracking-wide text-primary mb-2">Catalog manager</p><h1 className="text-4xl font-bold mb-3">Add a product</h1><p className="text-gray-600">Choose manual entry for complete control, or fetch details from a Flipkart product page.</p></div>
      <div className="flex gap-2 mb-6" role="tablist" aria-label="Product entry mode">
        <button type="button" onClick={() => setMode('manual')} className={`px-5 py-3 rounded-lg font-bold ${mode === 'manual' ? 'bg-primary text-white' : 'bg-white border'}`}>Manual Entry</button>
        <button type="button" onClick={() => setMode('fetch')} className={`px-5 py-3 rounded-lg font-bold ${mode === 'fetch' ? 'bg-primary text-white' : 'bg-white border'}`}>Fetch from Flipkart</button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-5">
        {mode === 'fetch' ? <div><label htmlFor="sourceUrl" className="block text-sm font-bold mb-2">Flipkart product URL</label><input id="sourceUrl" name="sourceUrl" required type="url" placeholder="https://www.flipkart.com/product-page" className="w-full px-3 py-3 border rounded-lg" /></div> : <>
          <div><label htmlFor="name" className="block text-sm font-bold mb-2">Product name</label><input id="name" name="name" required placeholder="Product name" className="w-full px-3 py-3 border rounded-lg" /></div>
          <div><label htmlFor="image" className="block text-sm font-bold mb-2">Image URL or repository path</label><input id="image" name="image" required placeholder="/images/products/product.jpg" className="w-full px-3 py-3 border rounded-lg" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {['price', 'originalPrice', 'offerPrice', 'discount', 'rating', 'reviewCount'].map((field) => <div key={field}><label htmlFor={field} className="block text-sm font-bold mb-2">{field === 'originalPrice' ? 'Original price' : field === 'offerPrice' ? 'Offer price' : field === 'reviewCount' ? 'Reviews' : field[0].toUpperCase() + field.slice(1)}</label><input id={field} name={field} type="number" min="0" max={field === 'rating' ? '5' : undefined} step={field === 'rating' ? '0.1' : '1'} required={field === 'price'} className="w-full px-3 py-3 border rounded-lg" /></div>)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label htmlFor="merchant" className="block text-sm font-bold mb-2">Merchant</label><input id="merchant" name="merchant" required placeholder="Flipkart" className="w-full px-3 py-3 border rounded-lg" /></div><div><label htmlFor="brand" className="block text-sm font-bold mb-2">Brand</label><input id="brand" name="brand" placeholder="Brand" className="w-full px-3 py-3 border rounded-lg" /></div></div>
          <div><label htmlFor="description" className="block text-sm font-bold mb-2">Description</label><textarea id="description" name="description" rows={3} className="w-full px-3 py-3 border rounded-lg" /></div>
          <div><label htmlFor="highlights" className="block text-sm font-bold mb-2">Highlights, one per line</label><textarea id="highlights" name="highlights" rows={4} className="w-full px-3 py-3 border rounded-lg" /></div>
          <div><label htmlFor="sourceUrl" className="block text-sm font-bold mb-2">Source URL (optional)</label><input id="sourceUrl" name="sourceUrl" type="url" className="w-full px-3 py-3 border rounded-lg" /></div>
        </>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label htmlFor="id" className="block text-sm font-bold mb-2">Product ID</label><input id="id" name="id" required pattern="[a-z0-9-]+" placeholder="beauty-6" className="w-full px-3 py-3 border rounded-lg" /></div><div><label htmlFor="category" className="block text-sm font-bold mb-2">Category</label><select id="category" value={category} onChange={(event) => setCategory(event.target.value)} className="w-full px-3 py-3 border rounded-lg">{categories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div></div>
        <div><label htmlFor="affiliateUrl" className="block text-sm font-bold mb-2">EarnKaro Profit Link</label><input id="affiliateUrl" name="affiliateUrl" required type="url" placeholder="https://fktr.in/your-code" className="w-full px-3 py-3 border rounded-lg" /></div>
        <button type="submit" disabled={loading} className="w-full bg-primary text-white py-3 rounded-lg font-bold disabled:opacity-60">{loading ? 'Saving product...' : mode === 'manual' ? 'Add Product Manually' : 'Fetch and Add Product'}</button>
      </form>
      {error && <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>}
      {message && <div className="mt-6 rounded-lg bg-green-50 p-4 text-sm text-green-700">{message}</div>}
    </main>
  );
}
