import { NextRequest, NextResponse } from 'next/server';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sourceUrl, affiliateUrl, id, category } = body as Record<string, string>;

    if (!sourceUrl || !affiliateUrl || !id || !category) {
      return NextResponse.json({ error: 'Source URL, EarnKaro URL, product ID, and category are required.' }, { status: 400 });
    }

    if (!/^https:\/\/www\.flipkart\.com\//i.test(sourceUrl)) {
      return NextResponse.json({ error: 'Source URL must be a normal Flipkart product URL.' }, { status: 400 });
    }

    if (!/^https:\/\/fktr\.in\/[A-Za-z0-9]+$/i.test(affiliateUrl)) {
      return NextResponse.json({ error: 'EarnKaro link must look like https://fktr.in/your-code. Do not combine Flipkart and EarnKaro URLs.' }, { status: 400 });
    }

    if (!/^[a-z0-9-]+$/.test(id) || !/^[a-z0-9-]+$/.test(category)) {
      return NextResponse.json({ error: 'Product ID and category may contain only lowercase letters, numbers, and hyphens.' }, { status: 400 });
    }

    const { stdout } = await execFileAsync(process.execPath, [
      'scripts/fetch-flipkart-product.js',
      `--url=${sourceUrl}`,
      `--id=${id}`,
      `--category=${category}`,
      `--affiliate=${affiliateUrl}`,
    ], { cwd: process.cwd(), maxBuffer: 1024 * 1024 });

    return NextResponse.json({ success: true, message: stdout });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Flipkart fetch failed.';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}