export function logAffiliateClick(productId: string, affiliateUrl: string) {
  void fetch('/api/affiliate-click', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, affiliateUrl }),
    keepalive: true,
  }).catch(() => undefined);
}
