# Admin Dashboard Setup Guide

## 📦 Install Dependencies

```bash
npm install @prisma/client prisma sharp cloudinary
npm install -D @types/node
```

## 🎨 Install Shadcn/UI Components

```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add select
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add alert-dialog
```

## 🗄️ Database Setup

1. **Initialize Prisma:**
```bash
npx prisma init
```

2. **Generate Prisma Client:**
```bash
npx prisma generate
```

3. **Push Schema to Database:**
```bash
npx prisma db push
```

4. **Open Prisma Studio (optional):**
```bash
npx prisma studio
```

## 🌐 Environment Variables

The `.env` file has been created with:
- `DATABASE_URL` - NeonDB PostgreSQL connection
- `CLOUDINARY_URL` - Cloudinary credentials

## 📂 File Structure

```
zmarties/
├── app/
│   └── admin/
│       ├── page.tsx                    # Dashboard with stats
│       ├── add-product/
│       │   └── page.tsx                # Add product form
│       └── products/
│           ├── page.tsx                # Products list
│           └── delete-button.tsx       # Delete product component
├── lib/
│   ├── prisma.ts                       # Prisma client
│   └── actions/
│       └── products.ts                 # Server actions
├── prisma/
│   └── schema.prisma                   # Database schema
└── .env                                # Environment variables
```

## 🚀 Running the Admin Dashboard

1. **Start Development Server:**
```bash
npm run dev
```

2. **Access Admin Dashboard:**
```
http://localhost:3000/admin
```

## ✨ Features

### Dashboard (`/admin`)
- Total products count
- Category-wise breakdown (Flowers, Non-Flower, Bulk)
- Quick action buttons
- Mobile-responsive cards

### Add Product (`/admin/add-product`)
- Product name
- Category selection (flowers, nonflower, bulk)
- Price input
- Rate slider (0-10)
- Flavour input
- Multiple image upload with previews
- Image compression using Sharp
- Cloudinary integration
- Form validation
- Success/error states
- Mobile-responsive layout

### Products List (`/admin/products`)
- Grid view of all products
- Product details display
- Delete functionality
- Image previews
- Category badges
- Mobile-responsive grid

## 🔒 Server Actions

All data operations use Next.js Server Actions (no API routes):

- `createProduct()` - Create new product with image upload
- `uploadProductImages()` - Upload compressed images to Cloudinary
- `getDashboardStats()` - Get dashboard statistics
- `getAllProducts()` - Fetch all products
- `deleteProduct()` - Delete a product

## 📸 Image Optimization

Images are automatically:
- Resized to max 1200x1200px
- Compressed to 85% JPEG quality
- Progressive JPEGs for faster loading
- Uploaded to Cloudinary with auto-optimization
- Stored as secure HTTPS URLs

## 🎨 Design Features

- Apple-level clean design
- Mobile-first responsive
- Tailwind CSS styling
- Shadcn/UI components
- Smooth transitions
- Loading states
- Error handling
- Success feedback

## 🔐 Security Notes

- Environment variables are gitignored
- Server actions validate all inputs
- Prisma prevents SQL injection
- File upload size limits
- Image type validation

## 📝 Database Schema

```prisma
model Product {
  id        String   @id @default(cuid())
  name      String
  category  Category
  price     Float
  rate      Int      @default(0)
  flavour   String
  images    String[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Category {
  flowers
  nonflower
  bulk
}
```

## 🎯 Next Steps

1. Install all dependencies
2. Run Prisma migrations
3. Start the dev server
4. Access `/admin` to view dashboard
5. Add your first product!

## ⚡ Production Deployment

Before deploying to production:

```bash
# Build the app
npm run build

# Run Prisma migrations
npx prisma migrate deploy

# Start production server
npm start
```

## 💡 Tips

- Images are automatically optimized before upload
- Use descriptive product names
- Rate products accurately (0-10 scale)
- Upload high-quality product images
- Monitor Cloudinary usage for image storage
