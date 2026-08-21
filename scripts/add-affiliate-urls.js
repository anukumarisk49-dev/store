#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, '..', 'public', 'data', 'products.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

// Add affiliateUrl to all books that have sourceUrl
let updated = 0;
if (catalog.categories.books && catalog.categories.books.products) {
  catalog.categories.books.products.forEach(product => {
    if (product.sourceUrl && !product.affiliateUrl) {
      product.affiliateUrl = product.sourceUrl;
      updated++;
    }
  });
}

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
console.log(`Added affiliateUrl to ${updated} books`);
