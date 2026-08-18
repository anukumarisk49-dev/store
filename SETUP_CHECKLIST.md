# 99Store Setup Checklist ✅

Complete this checklist to get 99store.in running locally.

## Phase 1: Prerequisites

- [ ] Node.js 18+ installed (`node --version`)
- [ ] PostgreSQL 14+ installed and running
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] ~5GB free disk space

## Phase 2: Project Setup

### Clone/Open Project
```bash
cd d:\Project\99store
```
- [ ] Navigate to project directory
- [ ] Project folder exists at `d:\Project\99store`

### Install Dependencies
```bash
npm install
```
- [ ] No errors during installation
- [ ] `node_modules/` folder created (~500MB)
- [ ] `package-lock.json` generated

## Phase 3: Database Configuration

### Create Database
Choose ONE option:

#### Option A: Local PostgreSQL (Recommended)
```bash
createdb 99store
```
- [ ] Database created successfully

#### Option B: Docker
```bash
docker run --name postgres99 -e POSTGRES_PASSWORD=password -e POSTGRES_DB=99store -p 5432:5432 -d postgres:14
```
- [ ] Docker container running

#### Option C: Cloud (Supabase/Neon)
- [ ] Account created
- [ ] Database provisioned
- [ ] Connection string copied

### Configure Environment
```bash
cp .env.example .env.local
```
- [ ] `.env.local` file created
- [ ] Edit and add DATABASE_URL:
  ```
  DATABASE_URL="postgresql://user:password@localhost:5432/99store"
  ```
- [ ] Save file

### Initialize Prisma
```bash
npx prisma migrate dev --name init
```
- [ ] Migration runs successfully
- [ ] Database tables created
- [ ] Prisma Client generated

## Phase 4: Seed Sample Data

```bash
npm run db:seed
```
- [ ] Categories created (Electronics, Fashion, etc.)
- [ ] Sample products added
- [ ] Merchants created (Amazon, Flipkart)
- [ ] Deals initialized
- [ ] No errors in console

## Phase 5: Start Development Server

```bash
npm run dev
```
- [ ] Server starts without errors
- [ ] Terminal shows: "ready - started server on http://localhost:3000"
- [ ] No TypeScript errors
- [ ] No build errors

## Phase 6: Test in Browser

### Homepage
```
http://localhost:3000
```
- [ ] Page loads without errors
- [ ] 99STORE logo visible
- [ ] Search bar displayed
- [ ] Hero section appears
- [ ] Categories visible
- [ ] Products/deals showing
- [ ] Footer visible

### Navigation
- [ ] Click "Deals" → Deals page loads
- [ ] Click "Categories" → Categories page loads
- [ ] Click category card → Can click it
- [ ] Click product → Product detail page works

### Responsive Design
- [ ] Test on mobile (Ctrl+Shift+M in Chrome)
- [ ] Layout looks good on small screens
- [ ] Navigation works on mobile
- [ ] Text is readable

## Phase 7: Database Verification

```bash
npx prisma studio
```
- [ ] Prisma Studio opens in browser
- [ ] Can see all tables
- [ ] Sample data visible:
  - [ ] 5+ categories
  - [ ] 3+ products
  - [ ] 2+ merchants
  - [ ] 2+ affiliate networks
  - [ ] 2+ affiliate links
  - [ ] 1+ deals

## Phase 8: API Testing

### Test Product API
```bash
curl http://localhost:3000/api/products
```
- [ ] Returns JSON response
- [ ] No 500 errors

### Test Categories API
```bash
curl http://localhost:3000/api/categories
```
- [ ] Returns categories list
- [ ] Mock data returned correctly

### Test Deals API
```bash
curl http://localhost:3000/api/deals
```
- [ ] Returns deals list

## Phase 9: Code Review

Open these files and review:

### Architecture Understanding
- [ ] Read `src/app/page.tsx` (homepage structure)
- [ ] Read `src/components/product/ProductCard.tsx` (component pattern)
- [ ] Read `prisma/schema.prisma` (database design)
- [ ] Read `src/services/api.ts` (API setup)

### Directory Structure
- [ ] Understand `src/app/` (pages & routes)
- [ ] Understand `src/components/` (reusable UI)
- [ ] Understand `src/api/` (backend endpoints)
- [ ] Understand `prisma/` (database)

## Phase 10: Configuration Review

- [ ] Review `.env.local` - all values set
- [ ] Review `next.config.js` - image handling
- [ ] Review `tailwind.config.js` - custom colors
- [ ] Review `tsconfig.json` - TypeScript paths

## Phase 11: Git Setup (Optional)

```bash
git init
git add .
git commit -m "Initial 99store MVP scaffold"
```
- [ ] Git repository initialized
- [ ] Initial commit created
- [ ] .gitignore working (node_modules not tracked)

## Phase 12: Ready for Development

- [ ] All above steps completed
- [ ] Dev server running smoothly
- [ ] Database connected
- [ ] Sample data visible
- [ ] Browser tests passing

### Next Steps
- [ ] Start Task 1: Connect API to database
- [ ] Or: Implement user authentication
- [ ] Or: Build search functionality

---

## Troubleshooting

### Error: "Cannot connect to database"
- [ ] PostgreSQL running? `psql -U postgres`
- [ ] Database exists? `psql -l`
- [ ] DATABASE_URL correct in `.env.local`?

### Error: "Port 3000 already in use"
```bash
npm run dev -- -p 3001
```

### Error: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "Prisma migration failed"
```bash
npx prisma migrate reset
npx prisma db seed
```

### Blank page in browser
- [ ] Check browser console (F12)
- [ ] Check terminal for errors
- [ ] Hard refresh (Ctrl+Shift+R)

### Build errors
- [ ] Check TypeScript errors: `npx tsc --noEmit`
- [ ] Check ESLint: `npm run lint`

---

## Success Indicators

You'll know everything is working when:

✅ `npm run dev` starts without errors
✅ Homepage loads at http://localhost:3000
✅ Products display in grid
✅ Database has sample data
✅ No console errors in browser
✅ Navigation works (all pages load)
✅ Mobile view works
✅ Can see categories, products, deals

---

## Useful Commands Reference

```bash
# Development
npm run dev              # Start dev server

# Database Management
npx prisma studio       # Visual database editor
npx prisma db seed      # Load sample data
npx prisma migrate dev  # Run migrations
npm run db:push         # Sync schema to DB

# Build & Deploy
npm run build            # Create production build
npm start                # Run production server
npm run lint             # Check code quality

# Troubleshooting
npx prisma generate     # Regenerate Prisma client
npx prisma migrate reset # ⚠️ Reset database
npx tsc --noEmit        # Check TypeScript
```

---

## Estimated Time

- Prerequisites: 10 min
- Project setup: 15 min
- Database setup: 10 min
- Testing: 10 min
- **Total: ~45 minutes**

---

## Final Verification

Before moving to Phase 2 development, verify:

```bash
# All should pass:
npm run dev             # ✅ Starts without errors
npx prisma studio      # ✅ Opens database viewer
curl http://localhost:3000  # ✅ Returns HTML
curl http://localhost:3000/api/products  # ✅ Returns JSON
```

---

**When complete, you're ready to start implementing Phase 2 features!** 🚀

Last updated: 2024
