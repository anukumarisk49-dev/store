#!/usr/bin/env node

const fs = require('node:fs/promises');
const path = require('node:path');

const catalogPath = path.join(__dirname, '..', 'public', 'data', 'products.json');

function getArgument(name) {
  const index = process.argv.indexOf(`--${name}`);
  if (index >= 0) return process.argv[index + 1];

  const prefix = `--${name}=`;
  const inlineArgument = process.argv.find((argument) => argument.startsWith(prefix));
  return inlineArgument ? inlineArgument.slice(prefix.length) : undefined;
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstMatch(html, patterns) {
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeHtml(match[1]);
  }
  return undefined;
}

function numberFrom(value) {
  if (!value) return undefined;
  const number = Number(String(value).replace(/[^0-9.]/g, ''));
  return Number.isFinite(number) ? number : undefined;
}

function parseJsonLd(html) {
  const blocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];

  for (const block of blocks) {
    try {
      const parsed = JSON.parse(block[1].trim());
      const items = Array.isArray(parsed) ? parsed : [parsed];
      const product = items.find((item) => item?.['@type'] === 'Product');
      if (product) return product;
    } catch {
      // Flipkart may include JSON-LD fragments that are not valid JSON.
    }
  }

  return {};
}

function parseProduct(html, sourceUrl) {
  const jsonLd = parseJsonLd(html);
  const offer = Array.isArray(jsonLd.offers) ? jsonLd.offers[0] : jsonLd.offers;
  const title = jsonLd.name || firstMatch(html, [
    /<h1[^>]*>([\s\S]*?)<\/h1>/i,
    /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)/i,
  ]);
  const image = (Array.isArray(jsonLd.image) ? jsonLd.image[0] : jsonLd.image) || firstMatch(html, [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)/i,
    /https:\/\/rukminim[^"'\\ ]+\.(?:jpeg|jpg|png)(?:\?[^"'\\ ]*)?/i,
  ]);
  const price = numberFrom(offer?.price) || numberFrom(firstMatch(html, [
    /(?:Hot Deal|Special price|₹)\s*(?:[^₹<]{0,50})₹\s*([0-9,]+)/i,
    /"sellingPrice"\s*:\s*([0-9]+)/i,
  ]));
  const originalPrice = numberFrom(firstMatch(html, [
    /(?:83%|[0-9]+%)\s*([0-9,]+)\s*₹\s*[0-9,]+/i,
    /"mrp"\s*:\s*([0-9]+)/i,
  ]));
  const ratingSummary = html.match(/\[\s*([0-5](?:\.[0-9])?)\s*\|\s*([0-9,]+)\s*\]/i);
  const rating = numberFrom(ratingSummary?.[1])
    || numberFrom(jsonLd.aggregateRating?.ratingValue)
    || numberFrom(firstMatch(html, [/"ratingValue"\s*:\s*"?([0-5](?:\.[0-9])?)/i]));
  const reviewCount = numberFrom(ratingSummary?.[2])
    || numberFrom(jsonLd.aggregateRating?.reviewCount || jsonLd.aggregateRating?.ratingCount)
    || numberFrom(firstMatch(html, [/"ratingCount"\s*:\s*"?([0-9,]+)/i]));
  const discount = price && originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : numberFrom(firstMatch(html, [/([0-9]+)%\s*(?:OFF|off)/i]));
  const brand = typeof jsonLd.brand === 'string' ? jsonLd.brand : jsonLd.brand?.name;

  if (!title || !price || !image) {
    throw new Error(`Could not extract required details. Found title=${Boolean(title)}, price=${Boolean(price)}, image=${Boolean(image)}.`);
  }

  return {
    name: title.replace(/\s*\.\.\.more\s*$/i, '').trim(),
    image,
    price,
    ...(originalPrice ? { originalPrice } : {}),
    ...(discount !== undefined ? { discount } : {}),
    ...(rating !== undefined ? { rating } : {}),
    ...(reviewCount !== undefined ? { reviewCount } : {}),
    merchant: 'Flipkart',
    ...(brand ? { brand } : {}),
    sourceUrl: sourceUrl.split('?')[0],
  };
}

async function main() {
  const url = getArgument('url');
  const id = getArgument('id');
  const category = getArgument('category');
  const affiliateUrl = getArgument('affiliate');

  if (!url || !id || !category) {
    console.error('Usage: npm run fetch:flipkart -- --url="FLIPKART_URL" --id=beauty-5 --category=beauty [--affiliate="EARNKARO_URL"]');
    process.exitCode = 1;
    return;
  }

  if (!/^https:\/\/www\.flipkart\.com\//i.test(url)) {
    throw new Error('The --url must be a normal https://www.flipkart.com product URL.');
  }

  if (affiliateUrl && !/^https:\/\/fktr\.in\/[A-Za-z0-9]+$/i.test(affiliateUrl)) {
    throw new Error('The --affiliate value must look like https://fktr.in/your-code.');
  }

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; 99StorePE catalog updater)',
      Accept: 'text/html,application/xhtml+xml',
    },
  });

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('Flipkart returned HTTP 403 and blocked this request. Wait a few minutes and retry, or use the manual details form.');
    }
    throw new Error(`Flipkart returned HTTP ${response.status}.`);
  }

  const product = parseProduct(await response.text(), url);
  const catalog = JSON.parse(await fs.readFile(catalogPath, 'utf8'));

  if (!catalog.categories[category]) throw new Error(`Unknown category: ${category}`);
  const existingIndex = catalog.categories[category].products.findIndex((item) => item.id === id);
  const existingProduct = existingIndex >= 0 ? catalog.categories[category].products[existingIndex] : {};
  const updatedProduct = { ...existingProduct, id, ...product };

  if (existingIndex >= 0) {
    catalog.categories[category].products[existingIndex] = updatedProduct;
  } else {
    catalog.categories[category].products.push(updatedProduct);
  }

  await fs.writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);

  if (affiliateUrl) {
    const affiliatePath = path.join(__dirname, '..', 'src', 'data', 'affiliate', `${category}.ts`);
    let affiliateFile = await fs.readFile(affiliatePath, 'utf8');
    const entry = `  '${id}': '${affiliateUrl}',`;
    const entryPattern = new RegExp(`^\\s*'${id.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}':`, 'm');

    if (entryPattern.test(affiliateFile)) {
      affiliateFile = affiliateFile.replace(new RegExp(`^\\s*'${id.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}':[^\\n]*`, 'm'), entry);
    } else {
      affiliateFile = affiliateFile.replace(/\n};\s*$/, `\n${entry}\n};\n`);
    }

    await fs.writeFile(affiliatePath, affiliateFile);
  }

  console.log(`Updated ${category}/${id} in public/data/products.json`);
  console.log(JSON.stringify(updatedProduct, null, 2));
  if (affiliateUrl) {
    console.log(`Updated src/data/affiliate/${category}.ts for '${id}'.`);
  } else {
    console.log(`Add the EarnKaro link manually to src/data/affiliate/${category}.ts for '${id}'.`);
  }
}

main().catch((error) => {
  console.error(`Fetch failed: ${error.message}`);
  process.exitCode = 1;
});
