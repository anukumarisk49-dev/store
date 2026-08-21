'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#111827] py-12 text-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">About 99Store</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/categories/electronics" className="hover:text-white">Electronics</Link></li>
              <li><Link href="/categories/fashion" className="hover:text-white">Fashion</Link></li>
              <li><Link href="/categories/home-kitchen" className="hover:text-white">Home &amp; Kitchen</Link></li>
              <li><Link href="/categories" className="hover:text-white">View all categories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Follow Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="https://twitter.com/99storepe" target="_blank" rel="noreferrer" className="hover:text-white">Twitter</a></li>
              <li><a href="https://www.facebook.com/99storepe" target="_blank" rel="noreferrer" className="hover:text-white">Facebook</a></li>
              <li><a href="https://www.instagram.com/99storepe" target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6">
          <p className="text-center text-sm text-gray-400">
            © 2026 99StorePe. All rights reserved. | Affiliate-based deal discovery platform
          </p>
        </div>
      </div>
    </footer>
  );
}
