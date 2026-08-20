import { beautyAffiliateLinks } from './affiliate/beauty';
import { booksAffiliateLinks } from './affiliate/books';
import { electronicsAffiliateLinks } from './affiliate/electronics';
import { fashionAffiliateLinks } from './affiliate/fashion';
import { gamingAffiliateLinks } from './affiliate/gaming';
import { groceryAffiliateLinks } from './affiliate/grocery';
import { homeKitchenAffiliateLinks } from './affiliate/homeKitchen';
import { mobileAccessoriesAffiliateLinks } from './affiliate/mobileAccessories';
import { sportsAffiliateLinks } from './affiliate/sports';
import { toysAffiliateLinks } from './affiliate/toys';

export const affiliateLinks: Record<string, string> = {
  ...electronicsAffiliateLinks,
  ...fashionAffiliateLinks,
  ...homeKitchenAffiliateLinks,
  ...beautyAffiliateLinks,
  ...mobileAccessoriesAffiliateLinks,
  ...groceryAffiliateLinks,
  ...gamingAffiliateLinks,
  ...sportsAffiliateLinks,
  ...booksAffiliateLinks,
  ...toysAffiliateLinks,
};

export function getAffiliateUrl(productId: string) {
  return affiliateLinks[productId] || 'https://www.amazon.in/';
}
