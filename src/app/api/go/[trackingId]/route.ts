import { NextRequest, NextResponse } from 'next/server';
import catalog from '../../../../../public/data/products.json';

export const dynamic = 'force-dynamic';

type CatalogProduct = {
  trackingId?: string;
  affiliateUrl?: string;
};

// This is the tracking endpoint for affiliate links
// Route: /api/go/:trackingId
// Purpose: Log the click and redirect to the merchant's affiliate URL

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ trackingId: string }> }
) {
  const { trackingId } = await params;

  try {
    const product = (Object.values(catalog.categories) as { products: CatalogProduct[] }[])
      .flatMap((category) => category.products)
      .find((item) => item.trackingId === trackingId);

    if (!product?.affiliateUrl) {
      return NextResponse.json({ error: 'Affiliate link not found' }, { status: 404 });
    }

    return NextResponse.redirect(product.affiliateUrl, { status: 302 });
  } catch (error) {
    console.error('Affiliate redirect error:', error);
    return NextResponse.json(
      { error: 'Failed to process affiliate link' },
      { status: 500 }
    );
  }
}
