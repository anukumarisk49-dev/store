# 99Store Phase 1 MVP - Quick Start Guide

This guide will get you up and running with the 99Store affiliate deal discovery platform in minutes.

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Database

### Option A: Local PostgreSQL (Recommended for Development)

1. Install PostgreSQL if not already installed
2. Create a new database:
   ```bash
   createdb 99store
   ```

3. Update `.env` with your database URL:
   ```
   DATABASE_URL="postgresql://your_user:your_password@localhost:5432/99store"
   ```

### Option B: Cloud Database (Supabase/Neon)

1. Sign up at [Supabase.com](https://supabase.com) or [Neon.tech](https://neon.tech)
2. Create a new database
3. Copy the connection string to `.env`

### Option C: Docker (Quick Setup)

```bash
docker run --name postgres99 -e POSTGRES_PASSWORD=password -e POSTGRES_DB=99store -p 5432:5432 -d postgres:14
```

Then update `.env`:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/99store"
```

## Step 3: Initialize Database

```bash
# Run migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio (visual database editor)
npx prisma studio
```

## Step 4: Set Up Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your values (for local development):
```
DATABASE_URL=postgresql://localhost:5432/99store
NEXT_PUBLIC_API_URL=http://localhost:3000/api
JWT_SECRET=dev-secret-key-change-in-production
```

## Step 5: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` - You should see the homepage! 🎉

## Testing the Application

### Explore Key Pages
- **Home**: http://localhost:3000
- **Deals**: http://localhost:3000/deals
- **Categories**: http://localhost:3000/categories
- **Product**: http://localhost:3000/product/sample-product

### Try Features
1. Browse categories
2. Click on products
3. Compare prices
4. Add to wishlist (UI ready, backend coming)

## Common Issues & Solutions

### "DATABASE_URL not found"
Make sure you've created `.env.local` and it has the DATABASE_URL variable.

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001
```

### "PostgreSQL connection failed"
Check:
1. PostgreSQL is running
2. DATABASE_URL is correct
3. Database exists (`createdb 99store`)

### "Prisma migration failed"
```bash
# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

## Next Steps

After getting this running, start building:

### Phase 1 Implementation Order
1. ✅ Project scaffolding (DONE)
2. Connect APIs to database
3. Implement product search
4. Add filtering & sorting
5. User authentication
6. Wishlist functionality

### Example: Add a Product via API

```bash
# Open http://localhost:3000/admin/products
# (Admin panel coming in Phase 2)
```

For now, seed the database using Prisma Studio:
1. Run: `npx prisma studio`
2. Go to the `products` table
3. Click "Add record"
4. Fill in product details

## Understanding the Codebase

### Key Files to Check Out

1. **Homepage** - `src/app/page.tsx`
   - Main landing page layout
   
2. **Components** - `src/components/`
   - Reusable UI components
   - Product cards, deal cards, etc.

3. **API Routes** - `src/app/api/`
   - Backend endpoints
   - Currently return mock data

4. **Database Schema** - `prisma/schema.prisma`
   - Complete database structure
   - All tables with relationships

5. **Services** - `src/services/api.ts`
   - API client configuration
   - HTTP interceptors

6. **State Management** - `src/store/index.ts`
   - Auth, wishlist, filters stores

## Useful Commands

```bash
# Development
npm run dev              # Start dev server

# Database
npx prisma studio       # Visual database editor
npx prisma migrate      # Create/run migrations
npx prisma generate     # Generate client types

# Build & Deploy
npm run build            # Build for production
npm start                # Run production server
npm run lint             # Run ESLint

# Database Reset (⚠️ destructive)
npx prisma migrate reset
```

## API Routes to Implement

These are set up but need database connectivity:

```
GET  /api/products              - List products
GET  /api/products/:id          - Get product details
POST /api/products              - Add product (admin)

GET  /api/categories            - List categories
GET  /api/deals                 - List active deals

GET  /api/go/:trackingId        - Affiliate tracking redirect

GET  /api/wishlist              - Get wishlist (auth required)
POST /api/wishlist              - Add to wishlist
DELETE /api/wishlist/:id        - Remove from wishlist
```

## Deploying to Vercel

When ready to go live:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# - DATABASE_URL
# - JWT_SECRET
```

## Architecture Overview

```
User Browser
    ↓
  Next.js Frontend (React Components)
    ↓
  API Routes (/api/*)
    ↓
  Prisma ORM
    ↓
  PostgreSQL Database
    ↓
  Affiliate Networks (Amazon, Flipkart, etc.)
```

## File Structure Explained

```
src/
├── app/                    # Next.js app directory (routes)
├── components/             # React components
├── hooks/                  # Custom React hooks
├── services/               # API services
├── store/                  # State management (Zustand)

prisma/
├── schema.prisma           # Database schema
└── migrations/             # Migration history

public/                     # Static files
```

## Quick Tips

1. **Hot Reload**: Changes to files automatically reload the dev server
2. **Prisma Studio**: Visual way to manage database - run `npx prisma studio`
3. **Component Reuse**: Check `src/components/` before building new components
4. **API Pattern**: All API routes follow REST convention in `src/app/api/`

## Troubleshooting

### Issue: Blank page on localhost:3000
- Check browser console for errors
- Check terminal for build errors
- Try clearing `.next/` folder and restarting

### Issue: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Database connection errors
```bash
# Check database is running
# For Mac/Linux:
brew services list

# For Windows:
# Check PostgreSQL is in Services
```

## Getting Help

1. Check the main README.md for architecture details
2. Review Prisma docs: https://www.prisma.io/docs
3. Next.js docs: https://nextjs.org/docs
4. TailwindCSS docs: https://tailwindcss.com/docs

## Success Checklist

✅ Node modules installed
✅ Database created & running  
✅ `.env.local` configured
✅ Prisma migrations run
✅ Dev server starts without errors
✅ Homepage loads at http://localhost:3000

You're ready to start development! 🚀

---

**Next Step**: Connect the API routes to the database and implement the search functionality.
