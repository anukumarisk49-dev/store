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
    // Add more products from database
  ];

  return NextResponse.json({
    success: true,
    data: products,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: 100,
    },
  });
}

export async function POST(request: NextRequest) {
  // TODO: Add product (admin only)
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 });
}
