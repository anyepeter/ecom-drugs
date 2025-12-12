# ⚡ Quick Start - Admin Dashboard

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install @prisma/client prisma sharp cloudinary
```

### Step 2: Setup Database
```bash
npx prisma generate
npx prisma db push
```

### Step 3: Start Development
```bash
npm run dev
```

**Then visit:** `http://localhost:3000/admin`

---

## 🎨 Install UI Components (One-time)

```bash
npx shadcn-ui@latest add card button input label select slider badge alert-dialog -y
```

---

## 📱 Routes

| Route | Description |
|-------|-------------|
| `/admin` | Dashboard with statistics |
| `/admin/add-product` | Add new product form |
| `/admin/products` | View all products |

---

## 🔑 Key Files

```
📁 zmarties/
├── .env                    ← Database & Cloudinary config
├── prisma/schema.prisma    ← Database schema
├── lib/
│   ├── prisma.ts           ← Database client
│   └── actions/products.ts ← Server actions
└── app/admin/
    ├── page.tsx            ← Dashboard
    ├── add-product/
    │   └── page.tsx        ← Add product form
    └── products/
        └── page.tsx        ← Products list
```

---

## 💻 Common Commands

```bash
# Start dev server
npm run dev

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database
npx prisma db push --force-reset

# Generate Prisma client
npx prisma generate
```

---

## ✅ Checklist

- [ ] Dependencies installed
- [ ] `.env` file exists
- [ ] Prisma client generated
- [ ] Database pushed
- [ ] Dev server running
- [ ] Visit `/admin` successfully

---

## 🆘 Troubleshooting

**Database connection error?**
```bash
# Check .env file has DATABASE_URL
cat .env | grep DATABASE_URL
```

**Prisma client not found?**
```bash
npx prisma generate
```

**Image upload failing?**
```bash
# Check .env has CLOUDINARY_URL
cat .env | grep CLOUDINARY
```

---

**Need help?** See `ADMIN_SETUP.md` for detailed instructions.
