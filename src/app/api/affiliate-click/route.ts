import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      productId?: string;
      affiliateUrl?: string;
    };

    if (!body.productId || !body.affiliateUrl) {
      return NextResponse.json({ error: 'productId and affiliateUrl are required' }, { status: 400 });
    }

    console.log('[affiliate-click]', {
      productId: body.productId,
      affiliateUrl: body.affiliateUrl,
      referrer: request.headers.get('referer'),
      userAgent: request.headers.get('user-agent'),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ logged: true }, { status: 202 });
  } catch (error) {
    console.error('Affiliate click logging error:', error);
    return NextResponse.json({ error: 'Failed to log affiliate click' }, { status: 400 });
  }
}
