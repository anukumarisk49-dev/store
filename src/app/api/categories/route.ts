import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // TODO: Fetch from database
  const categories = [
    { id: '1', name: 'Electronics', slug: 'electronics', icon: '📱', productCount: 1250 },
    { id: '2', name: 'Fashion', slug: 'fashion', icon: '👕', productCount: 3420 },
    { id: '3', name: 'Home & Kitchen', slug: 'home-kitchen', icon: '🏠', productCount: 2100 },
  ];

  return NextResponse.json({
    success: true,
    data: categories,
  });
}
