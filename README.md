# 99Store - Affiliate Deal Discovery Platform

A modern, React-based affiliate marketing platform for discovering and comparing deals across multiple merchants.

## 🎯 Project Overview

99Store is a **deal discovery platform** (not a traditional e-commerce store). It aggregates products from affiliate networks and helps users:
- Discover trending deals
- Compare prices across merchants
- Search and filter products
- Track favorite products
- Share deals with others

**Business Model**: Affiliate commission from merchant networks (Amazon, Flipkart, etc.)

## 🏗️ Architecture

```
Frontend (Next.js/React)
    ↓
API Routes (Next.js)
    ↓
PostgreSQL Database
    ↓
Affiliate Networks (Amazon, Flipkart, etc.)
```

## 📋 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Next.js 14 |
| **Styling** | Tailwind CSS |
| **State Management** | Zustand |
| **API Client** | Axios + TanStack Query |
| **Backend** | Next.js API Routes |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Auth** | JWT + NextAuth (Phase 2) |
| **Deployment** | Vercel + Cloudflare |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- Git

### Installation

1. **Clone and Install Dependencies**
```bash
cd d:\Project\99store
npm install
```

2. **Set Up Environment**
```bash
cp .env.example .env
# Edit .env with your database URL and API keys
```

3. **Set Up Database**
```bash
# Install Prisma CLI
npm install -D prisma

# Initialize database
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# (Optional) Seed database
npx prisma db seed
```

4. **Start Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
99store/
├── src/
│   ├── app/                      # Next.js app directory
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Homepage
│   │   ├── globals.css           # Global styles
│   │   ├── api/                  # API routes
│   │   │   ├── products/
│   │   │   ├── categories/
│   │   │   ├── deals/
│   │   │   └── go/[trackingId]   # Affiliate redirect tracker
│   │   ├── deals/
│   │   ├── categories/
│   │   ├── product/[slug]/
│   │   ├── search/
│   │   ├── wishlist/
│   │   └── admin/                # Admin dashboard (Phase 2)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── BestRated.tsx
│   │   │   └── DiscountBanner.tsx
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── ProductDetails.tsx
│   │   ├── deals/
│   │   │   ├── DealCard.tsx
│   │   │   └── DealGrid.tsx
│   │   └── category/
│   │       ├── CategoryCard.tsx
│   │       └── CategoryGrid.tsx
│   │
│   ├── hooks/
│   │   ├── useProducts.ts        # Product queries
│   │   ├── useCategories.ts      # Category queries
│   │   └── useAuth.ts            # Auth logic
│   │
│   ├── services/
│   │   ├── api.ts                # Axios instance + services
│   │   ├── productService.ts
│   │   ├── affiliateService.ts
│   │   └── authService.ts
│   │
│   └── store/
│       └── index.ts              # Zustand stores
│           ├── authStore
│           ├── wishlistStore
│           └── filterStore
│
├── prisma/
│   └── schema.prisma             # Database schema
│
├── public/                        # Static assets
├── next.config.js                # Next.js config
├── tailwind.config.js            # Tailwind config
├── tsconfig.json                 # TypeScript config
├── package.json
└── README.md
```

## 🔑 Key Features (Phase 1 - MVP)

### ✅ Implemented
- [x] Homepage with hero section
- [x] Category browsing
- [x] Product listing with filtering
- [x] Deal discovery
- [x] Product detail pages
- [x] Search functionality structure
- [x] Responsive design (Tailwind)
- [x] API route structure

### 🔄 Phase 2 Features
- [ ] User authentication
- [ ] Wishlist functionality
- [ ] Price comparison
- [ ] Reviews & ratings
- [ ] Admin dashboard
- [ ] Analytics dashboard
- [ ] Deal notifications
- [ ] Product recommendations

### 🚀 Phase 3+ Features
- [ ] Affiliate click tracking
- [ ] Automatic price updates
- [ ] Product data ingestion pipeline
- [ ] Advanced search (Elasticsearch)
- [ ] User reviews & ratings
- [ ] Deal expiry automation
- [ ] Affiliate network integration

## 🔗 Affiliate Link Architecture

When a user clicks "View Deal":

```
1. User clicks → 99store.in/product/:slug
2. Clicks "View on [Merchant]" 
3. Redirects to → 99store.in/go/abc123
4. Backend:
   - Logs the click (product, merchant, user, device, country, source)
   - Records conversion tracking ID
   - Redirects to → affiliate_network_url
5. Analytics:
   - 99store earns commission when user buys on merchant
```

Database table: `affiliate_clicks` tracks every interaction.

## 🗄️ Database Schema (Core Tables)

| Table | Purpose |
|-------|---------|
| `products` | Product catalog |
| `categories` | Product categories |
| `merchants` | E-commerce platforms |
| `affiliate_networks` | Amazon, Flipkart, etc. |
| `affiliate_links` | Tracking URLs |
| `affiliate_clicks` | Conversion tracking |
| `deals` | Active promotions |
| `users` | User accounts |
| `wishlist` | Favorite products |
| `reviews` | Customer ratings |
| `search_history` | Analytics |

See `prisma/schema.prisma` for full schema.

## 🔐 Environment Variables

```
DATABASE_URL=postgresql://user:pass@localhost/99store
NEXT_PUBLIC_API_URL=http://localhost:3000/api
JWT_SECRET=your-secret-key
AMAZON_AFFILIATE_ID=your-amazon-id
FLIPKART_AFFILIATE_ID=your-flipkart-id
CLOUDINARY_CLOUD_NAME=your-cloudinary
REDIS_URL=redis://localhost:6379
```

## 🎨 Design System

### Colors
- **Primary**: #FF6B35 (Orange)
- **Secondary**: #004E89 (Dark Blue)
- **Accent**: #1DB5A6 (Teal)
- **Danger**: #E63946 (Red)

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 📊 Analytics & Tracking

Every affiliate click is tracked with:
- Product ID
- Merchant
- Device (user-agent)
- Country (IP geolocation)
- Referrer source
- Timestamp
- User ID (if logged in)

This enables:
- CTR (Click-Through Rate) analysis
- Product performance tracking
- Merchant performance
- Traffic source analysis
- Conversion rate optimization

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Manual Deployment
```bash
npm run build
npm start
```

## 📈 Scaling Considerations

As the platform grows:

1. **Search**: PostgreSQL → Elasticsearch/OpenSearch
2. **Caching**: Redis for frequently accessed data
3. **Images**: Cloudinary/S3 for image optimization
4. **Analytics**: Google Analytics + Custom tracking
5. **Performance**: CDN (Cloudflare), Image optimization
6. **Database**: Read replicas, sharding if needed

## 🤝 API Endpoints

### Products
- `GET /api/products` - List products
- `GET /api/products/:id` - Product details
- `GET /api/products/search?q=...` - Search products

### Categories
- `GET /api/categories` - List categories
- `GET /api/categories/:slug` - Category products

### Deals
- `GET /api/deals` - List active deals
- `GET /api/deals?featured=true` - Featured deals

### Affiliate Tracking
- `GET /api/go/:trackingId` - Redirect to merchant + log click

### Wishlist
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/:productId` - Remove from wishlist

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Database
npx prisma studio           # GUI database viewer
npx prisma migrate dev      # Run migrations
npx prisma generate         # Generate client
```

## 📝 TODO Checklist

- [ ] Connect products API to database
- [ ] Connect categories API to database
- [ ] Implement search functionality
- [ ] Add product filtering & sorting
- [ ] Build admin dashboard
- [ ] User authentication
- [ ] Wishlist functionality
- [ ] Reviews system
- [ ] Affiliate network integration
- [ ] Analytics implementation
- [ ] SEO optimization
- [ ] Mobile app (React Native - Phase 4)

## 🤖 SEO Considerations

For an affiliate site, SEO is critical:

- Use Next.js SSG for product pages
- Generate meta tags dynamically
- Add structured data (JSON-LD)
- Create blog content
- Build internal linking strategy
- Mobile-first indexing
- Fast page load times

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [React Query Docs](https://tanstack.com/query)
- [Zustand Docs](https://zustand-demo.vercel.app/)

## 📧 Support

For questions or issues, please open a GitHub issue.

## 📄 License

MIT
