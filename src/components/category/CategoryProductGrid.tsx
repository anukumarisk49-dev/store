'use client';

import { useState } from 'react';

interface CategoryProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  affiliateUrl?: string;
}

interface CategoryProductGridProps {
  products: CategoryProduct[];
}

const productsPerPage = 6;

export default function CategoryProductGrid({ products }: CategoryProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(products.length / productsPerPage));
  const visibleProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProducts.map((product) => (
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

              {product.affiliateUrl ? (
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-primary text-white text-center py-2 rounded-lg font-bold text-sm hover:bg-opacity-90 transition"
                >
                  View Deal
                </a>
              ) : (
                <button disabled className="w-full bg-gray-300 text-gray-600 py-2 rounded-lg font-bold text-sm cursor-not-allowed">
                  Add affiliate URL
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-12" aria-label="Product pagination">
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => goToPage(page)}
            aria-current={currentPage === page ? 'page' : undefined}
            className={`px-4 py-2 rounded ${
              currentPage === page
                ? 'bg-primary text-white'
                : 'border hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </>
  );
}
