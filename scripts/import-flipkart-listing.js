#!/usr/bin/env node

const fs = require('node:fs/promises');
const path = require('node:path');

const rootPath = path.join(__dirname, '..');
const catalogPath = path.join(rootPath, 'public', 'data', 'products.json');
const imageDirectory = path.join(rootPath, 'public', 'images', 'products');

function getArgument(name) {
  const index = process.argv.indexOf(`--${name}`);
  if (index >= 0) return process.argv[index + 1];
  const prefix = `--${name}=`;
  const inline = process.argv.find((argument) => argument.startsWith(prefix));
  return inline ? inline.slice(prefix.length) : undefined;
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
}

function cleanName(value) {
  return decodeHtml(value).replace(/\.\.\.$/, '').trim();
}

function slugify(value) {
  return cleanName(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 90);
}

function numberFrom(value) {
  if (!value) return undefined;
  const number = Number(String(value).replace(/[^0-9.]/g, ''));
  return Number.isFinite(number) ? number : undefined;
}

function absoluteUrl(value) {
  if (!value) return undefined;
  return value.startsWith('http') ? value : `https://www.flipkart.com${value}`;
}

function parseProducts(html) {
  const products = [];
  const cardPattern = /<div[^>]+data-id="([^"]+)"[^>]*>([\s\S]*?)(?=<div[^>]+data-id="|<\/div>\s*<\/div>\s*<\/div>\s*<\/div>)/gi;

  for (const match of html.matchAll(cardPattern)) {
    const card = match[2];
    const imageMatch = card.match(/<img[^>]+alt="([^"]*)"[^>]+src="([^"]+)"/i);
    const titleMatch = card.match(/<a[^>]+class="[^"]*(?:pIpigb|fb4uj3)[^"]*"[^>]*>([\s\S]*?)<\/a>/i);
    const productUrlMatch = card.match(/<a[^>]+href="([^"]+\/p\/[^"]+)"/i);
    const priceMatch = card.match(/<div[^>]+class="hZ3P6w"[^>]*>₹\s*([0-9,]+)/i);
    const mrpMatch = card.match(/<div[^>]+class="kRYCnD"[^>]*>₹\s*([0-9,]+)/i);
    const discountMatch = card.match(/<span>([0-9]+)%\s*off<\/span>/i);
    const ratingMatch = card.match(/class="MKiFS6">\s*([0-5](?:\.[0-9])?)/i);
    const reviewsMatch = card.match(/class="PvbNMB">\s*\(([0-9,]+)\)/i);

    if (!imageMatch || !titleMatch || !priceMatch) continue;

    const name = cleanName(titleMatch[1].replace(/<[^>]+>/g, '')) || cleanName(imageMatch[1]);
    const id = `toys-${slugify(name)}`;
    const price = numberFrom(priceMatch[1]);
    const originalPrice = numberFrom(mrpMatch?.[1]) || price;

    products.push({
      id,
      name,
      alt: cleanName(imageMatch[1]) || name,
      imageSource: imageMatch[2],
      image: `/images/products/${id}.jpg`,
      price,
      originalPrice,
      discount: numberFrom(discountMatch?.[1]) || (originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0),
      rating: numberFrom(ratingMatch?.[1]) || 0,
      reviewCount: numberFrom(reviewsMatch?.[1]) || 0,
      merchant: 'Flipkart',
      sourceUrl: absoluteUrl(productUrlMatch?.[1]),
    });
  }

  return products.filter((product, index, all) => all.findIndex((item) => item.id === product.id) === index);
}

async function downloadImage(url, destination) {
  const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8' } });
  if (!response.ok) throw new Error(`Image HTTP ${response.status}`);
  await fs.writeFile(destination, Buffer.from(await response.arrayBuffer()));
}

async function main() {
  const file = getArgument('file');
  const category = getArgument('category') || 'toys';
  if (!file) {
    console.error('Usage: npm run import:flipkart -- --file=flipkart-listing.html --category=toys');
    process.exitCode = 1;
    return;
  }

  const html = await fs.readFile(path.resolve(file), 'utf8');
  const products = parseProducts(html);
  if (!products.length) throw new Error('No products found. Save the complete Flipkart listing HTML and try again.');

  const catalog = JSON.parse(await fs.readFile(catalogPath, 'utf8'));
  if (!catalog.categories[category]) throw new Error(`Unknown category: ${category}`);
  await fs.mkdir(imageDirectory, { recursive: true });

  for (const product of products) {
    try {
      await downloadImage(product.imageSource, path.join(imageDirectory, `${product.id}.jpg`));
    } catch (error) {
      console.warn(`Image skipped for ${product.id}: ${error.message}`);
      product.image = product.imageSource;
    }
    delete product.imageSource;
    const index = catalog.categories[category].products.findIndex((item) => item.id === product.id);
    if (index >= 0) catalog.categories[category].products[index] = { ...catalog.categories[category].products[index], ...product };
    else catalog.categories[category].products.push(product);
  }

  await fs.writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
  console.log(`Imported ${products.length} products into ${category}.`);
  console.log(`Images saved under public/images/products/ and data saved to public/data/products.json.`);
  console.log('Add EarnKaro links separately in src/data/affiliate/<category>.ts.');
}

main().catch((error) => {
  console.error(`Import failed: ${error.message}`);
  process.exitCode = 1;
});
