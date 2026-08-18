import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '20';

  // TODO: Fetch from database
  const deals = [
    {
      id: '1',
      productId: '1',
      title: 'boAt Rockerz 450 50% OFF',
      discount: 50,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      featured: true,
    },
    // Add more deals from database
  ];

  return NextResponse.json({
    success: true,
    data: deals,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: 50,
    },
  });
}
