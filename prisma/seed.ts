// prisma/seed.ts
// Run with: npx prisma db seed

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.category.deleteMany({});

  // Create categories
  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      slug: 'electronics',
      icon: '📱',
      productCount: 0,
    },
  });

  const fashion = await prisma.category.create({
    data: {
      name: 'Fashion',
      slug: 'fashion',
      icon: '👕',
      productCount: 0,
    },
  });

  const homeKitchen = await prisma.category.create({
    data: {
      name: 'Home & Kitchen',
      slug: 'home-kitchen',
      icon: '🏠',
      productCount: 0,
    },
  });

  const beauty = await prisma.category.create({
    data: {
      name: 'Beauty',
      slug: 'beauty',
      icon: '💄',
      productCount: 0,
    },
  });

  const gaming = await prisma.category.create({
    data: {
      name: 'Gaming',
      slug: 'gaming',
      icon: '🎮',
      productCount: 0,
    },
  });

  console.log('✅ Categories created:', {
    electronics: electronics.id,
    fashion: fashion.id,
    homeKitchen: homeKitchen.id,
    beauty: beauty.id,
    gaming: gaming.id,
  });

  // Create sample products
  const product1 = await prisma.product.create({
    data: {
      name: 'boAt Rockerz 450 Wireless Earbuds',
      slug: 'boat-rockerz-450',
      description:
        'High-quality wireless earbuds with active noise cancellation and 30 hours battery life',
      brand: 'boAt',
      categoryId: electronics.id,
      originalPrice: 2599,
      currentPrice: 1299,
      discountPercentage: 50,
      rating: 4.5,
      reviewCount: 1250,
      thumbnail: '🎧',
      status: 'active',
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Samsung Galaxy M53 128GB',
      slug: 'samsung-galaxy-m53',
      description: 'Affordable smartphone with AMOLED display and 50MP camera',
      brand: 'Samsung',
      categoryId: electronics.id,
      originalPrice: 19999,
      currentPrice: 12999,
      discountPercentage: 35,
      rating: 4.3,
      reviewCount: 890,
      thumbnail: '📱',
      status: 'active',
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: 'Nike Running Shoes',
      slug: 'nike-running-shoes',
      description: 'Comfortable and durable running shoes',
      brand: 'Nike',
      categoryId: fashion.id,
      originalPrice: 6999,
      currentPrice: 4999,
      discountPercentage: 28,
      rating: 4.4,
      reviewCount: 456,
      thumbnail: '👟',
      status: 'active',
    },
  });

  console.log('✅ Products created:', {
    product1: product1.id,
    product2: product2.id,
    product3: product3.id,
  });

  // Create merchants
  const amazon = await prisma.merchant.create({
    data: {
      name: 'Amazon',
      slug: 'amazon',
      logo: '🛒',
      website: 'amazon.in',
    },
  });

  const flipkart = await prisma.merchant.create({
    data: {
      name: 'Flipkart',
      slug: 'flipkart',
      logo: '🛍️',
      website: 'flipkart.com',
    },
  });

  console.log('✅ Merchants created:', {
    amazon: amazon.id,
    flipkart: flipkart.id,
  });

  // Create affiliate networks
  const amazonAffiliate = await prisma.affiliateNetwork.create({
    data: {
      name: 'Amazon Associates',
      merchantId: amazon.id,
      networkKey: 'amazon_associates',
      commissionRate: 3.5,
    },
  });

  const flipkartAffiliate = await prisma.affiliateNetwork.create({
    data: {
      name: 'Flipkart Affiliate',
      merchantId: flipkart.id,
      networkKey: 'flipkart_affiliate',
      commissionRate: 4.0,
    },
  });

  console.log('✅ Affiliate networks created');

  // Create affiliate links
  const link1 = await prisma.affiliateLink.create({
    data: {
      productId: product1.id,
      merchantId: amazon.id,
      affiliateNetworkId: amazonAffiliate.id,
      trackingId: 'abc123',
      affiliateUrl: 'https://amazon.in/dp/B123456789?tag=99store-21',
    },
  });

  const link2 = await prisma.affiliateLink.create({
    data: {
      productId: product1.id,
      merchantId: flipkart.id,
      affiliateNetworkId: flipkartAffiliate.id,
      trackingId: 'def456',
      affiliateUrl: 'https://flipkart.com/p/affid-123456',
    },
  });

  console.log('✅ Affiliate links created:', {
    amazon: link1.trackingId,
    flipkart: link2.trackingId,
  });

  // Create deals
  await prisma.deal.create({
    data: {
      title: 'boAt Rockerz 450 - 50% OFF',
      description: 'Limited time offer on wireless earbuds',
      productId: product1.id,
      categoryId: electronics.id,
      discount: 50,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      featured: true,
    },
  });

  console.log('✅ Deals created');

  console.log('\n✨ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
