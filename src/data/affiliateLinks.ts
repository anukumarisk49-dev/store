export const affiliateLinks: Record<string, string> = {
  // Add or replace one URL per product ID here.
  
  'electronics-1': 'https://fktr.in/s6HfPmQ',
  'electronics-2': 'https://www.flipkart.com/search?q=Samsung+Galaxy+M53+128GB',
  'electronics-3': 'https://www.oneplus.in/oneplus-12',
  'fashion-1': 'https://www.myntra.com/search?rawQuery=oversized+t-shirt',
  'fashion-2': 'https://www.myntra.com/search?rawQuery=linen+dress',
  'fashion-3': 'https://www.ajio.com/search/?text=leather+sneakers',
  'home-1': 'https://www.amazon.in/s?k=ceramic+dinner+set',
  'home-2': 'https://www.flipkart.com/search?q=air+fryer',
  'home-3': 'https://www.amazon.in/s?k=minimal+table+lamp',
  'beauty-1': 'https://www.nykaa.com/search/result/?q=skincare',
  'beauty-2': 'https://www.nykaa.com/search/result/?q=makeup',
  'beauty-3': 'https://www.amazon.in/s?k=floral+perfume',
  'mobile-1': 'https://www.amazon.in/s?k=power+bank',
  'mobile-2': 'https://www.flipkart.com/search?q=wireless+phone+charger',
  'mobile-3': 'https://www.amazon.in/s?k=phone+case',
  'grocery-1': 'https://www.bigbasket.com/ps/?q=organic+pantry',
  'grocery-2': 'https://www.bigbasket.com/ps/?q=fruit+basket',
  'grocery-3': 'https://www.amazon.in/s?k=coffee+beans',
  'gaming-1': 'https://www.amazon.in/s?k=gaming+controller',
  'gaming-2': 'https://www.flipkart.com/search?q=mechanical+keyboard',
  'gaming-3': 'https://www.amazon.in/s?k=gaming+headset',
  'sports-1': 'https://www.amazon.in/s?k=yoga+mat',
  'sports-2': 'https://www.flipkart.com/search?q=dumbbell+set',
  'sports-3': 'https://www.myntra.com/search?rawQuery=running+shoes',
  'books-1': 'https://www.amazon.in/s?k=book+collection',
  'books-2': 'https://www.amazon.in/s?k=hardcover+novel',
  'books-3': 'https://www.flipkart.com/search?q=journal+planner',
  'toys-1': 'https://www.amazon.in/s?k=wooden+building+blocks',
  'toys-2': 'https://www.flipkart.com/search?q=teddy+bear',
  'toys-3': 'https://www.amazon.in/s?k=kids+art+kit',
};

export function getAffiliateUrl(productId: string) {
  return affiliateLinks[productId] || 'https://www.amazon.in/';
}
