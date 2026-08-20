import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// This is the tracking endpoint for affiliate links
// Route: /api/go/:trackingId
// Purpose: Log the click and redirect to the merchant's affiliate URL

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trackingId: string }> }
) {
  const { trackingId } = await params;

  try {
    const affiliateLink = await prisma.affiliateLink.findUnique({
      where: { trackingId },
    });

    if (!affiliateLink || affiliateLink.status !== 'active') {
      return NextResponse.json({ error: 'Affiliate link not found' }, { status: 404 });
    }

    await prisma.affiliateClick.create({
      data: {
        productId: affiliateLink.productId,
        merchantId: affiliateLink.merchantId,
        affiliateLinkId: affiliateLink.id,
        device: request.headers.get('user-agent'),
        referrer: request.headers.get('referer'),
      },
    });

    return NextResponse.redirect(affiliateLink.affiliateUrl, { status: 302 });
  } catch (error) {
    console.error('Affiliate redirect error:', error);
    return NextResponse.json(
      { error: 'Failed to process affiliate link' },
      { status: 500 }
    );
  }
}
