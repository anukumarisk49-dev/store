import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-dynamic';

const rootPath = process.cwd();
const catalogPath = path.join(rootPath, 'public', 'data', 'products.json');

export async function POST(request: NextRequest) {
  try {
    const product = await request.json();
    const { category, affiliateUrl, ...productData } = product;

    if (!category || !affiliateUrl || !productData.id || !productData.name || !productData.image || productData.price === undefined) {
      return NextResponse.json({ error: 'Category, affiliate URL, ID, name, image, and price are required.' }, { status: 400 });
    }

    if (!/^[a-z0-9-]+$/.test(category) || !/^[a-z0-9-]+$/.test(productData.id)) {
      return NextResponse.json({ error: 'Category and product ID may contain only lowercase letters, numbers, and hyphens.' }, { status: 400 });
    }

    if (!/^https:\/\/fktr\.in\/[A-Za-z0-9]+$/i.test(affiliateUrl)) {
      return NextResponse.json({ error: 'EarnKaro link must look like https://fktr.in/your-code.' }, { status: 400 });
    }

    const catalog = JSON.parse(await fs.readFile(catalogPath, 'utf8'));
    if (!catalog.categories[category]) {
      return NextResponse.json({ error: `Unknown category: ${category}` }, { status: 400 });
    }

    const productIndex = catalog.categories[category].products.findIndex((item: { id: string }) => item.id === productData.id);
    if (productIndex >= 0) catalog.categories[category].products[productIndex] = productData;
    else catalog.categories[category].products.push(productData);

    const updatedCatalog = `${JSON.stringify(catalog, null, 2)}\n`;
    const affiliateEntry = `  '${productData.id}': '${affiliateUrl}',`;

    if (process.env.VERCEL === '1') {
      return NextResponse.json({
        success: true,
        persisted: false,
        message: 'Vercel uses a read-only filesystem. Download the generated files and commit them to your repository.',
        productJson: updatedCatalog,
        affiliateEntry,
        affiliateFile: `src/data/affiliate/${category}.ts`,
      });
    }

    await fs.writeFile(catalogPath, updatedCatalog);

    const affiliatePath = path.join(rootPath, 'src', 'data', 'affiliate', `${category}.ts`);
    let affiliateFile = await fs.readFile(affiliatePath, 'utf8');
    const escapedId = productData.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const entry = affiliateEntry;
    const entryPattern = new RegExp(`^\\s*'${escapedId}':`, 'm');
    if (entryPattern.test(affiliateFile)) {
      affiliateFile = affiliateFile.replace(new RegExp(`^\\s*'${escapedId}':[^\\n]*`, 'm'), entry);
    } else {
      affiliateFile = affiliateFile.replace(/\n};\s*$/, `\n${entry}\n};\n`);
    }
    await fs.writeFile(affiliatePath, affiliateFile);

    return NextResponse.json({ success: true, message: `Saved ${productData.name} to ${category}.` });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Manual product save failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
