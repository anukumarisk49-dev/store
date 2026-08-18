import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '20';

  // TODO: Fetch from database
  const products = [
    {
      id: '1',
      name: 'boAt Rockerz 450',
      price: 1299,
      originalPrice: 2599,
      rating: 4.5,
      category: 'electronics',
    },
    {
      id: '2',
      name: 'Smart Watch Pro',
      price: 1999,
      originalPrice: 3499,
      rating: 4.3,
      category: 'electronics',
    },
    // Add more products from database
  ];

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  return NextResponse.json({
    success: true,
    data: filteredProducts,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: filteredProducts.length,
    },
  });
}

export async function POST(_request: NextRequest) {
  // TODO: Add product (admin only)
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 });
}
