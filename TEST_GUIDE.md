# 🧪 Admin Dashboard Testing Guide

## ✅ Pre-Testing Checklist

Before testing, ensure:
- [ ] All dependencies installed (`npm install`)
- [ ] Prisma client generated (`npx prisma generate`)
- [ ] Database schema pushed (`npx prisma db push`)
- [ ] Dev server running (`npm run dev`)
- [ ] `.env` file exists with correct URLs

---

## 🏠 Test 1: Dashboard Page

### URL: `http://localhost:3000/admin`

**Expected Results:**
- ✅ Page loads without errors
- ✅ Shows 4 statistics cards:
  - Total Products
  - Flowers
  - Non-Flower
  - Bulk Items
- ✅ All counts show "0" initially
- ✅ "Add New Product" button visible
- ✅ Quick actions section visible
- ✅ Responsive on mobile/tablet/desktop

**Test Procedure:**
1. Navigate to `/admin`
2. Check all cards render
3. Verify counts are from database
4. Resize browser to test responsive design
5. Click "Add New Product" → Should go to `/admin/add-product`

---

## ➕ Test 2: Add Product Form

### URL: `http://localhost:3000/admin/add-product`

**Expected Results:**
- ✅ Form renders all fields
- ✅ Category dropdown works
- ✅ Rate slider moves (0-10)
- ✅ Image upload opens file picker
- ✅ Image previews show after upload
- ✅ Can remove individual images
- ✅ Submit button shows loading state
- ✅ Success message appears
- ✅ Redirects to `/admin` after success

**Test Procedure:**

### A. Test Form Validation
```
1. Leave all fields empty → Click "Create Product"
   Expected: Error message appears

2. Fill name only → Click "Create Product"
   Expected: Error message (missing fields)

3. Enter invalid price (e.g., "abc") → Submit
   Expected: Validation error
```

### B. Test Image Upload
```
1. Click "Upload Images" area
   Expected: File picker opens

2. Select 3 images
   Expected: 3 preview thumbnails appear

3. Click X on one image
   Expected: Image removed from preview

4. Try uploading non-image file
   Expected: Should only allow images
```

### C. Test Successful Product Creation
```
1. Fill all fields:
   - Name: "Test Flower 1"
   - Category: "flowers"
   - Price: "25.00"
   - Rate: Slide to "8"
   - Flavour: "Exotic"
   - Images: Upload 2-3 images

2. Click "Create Product"
   Expected:
   - Button shows "Creating Product..."
   - Success message appears
   - Redirects to /admin after 2 seconds
```

### D. Verify Database Entry
```
1. Open Prisma Studio: `npx prisma studio`
2. Check Product table
   Expected:
   - New product exists
   - All fields populated correctly
   - Images are Cloudinary URLs (https://res.cloudinary.com/...)
   - createdAt timestamp is recent
```

---

## 📋 Test 3: Products List

### URL: `http://localhost:3000/admin/products`

**After adding products:**

**Expected Results:**
- ✅ Products display in grid
- ✅ Each card shows:
  - Product image
  - Name
  - Price
  - Category badge
  - Flavour
  - Rate
- ✅ Grid is responsive (1/2/3 columns)
- ✅ Delete button appears on hover

**Test Procedure:**

### A. View Products
```
1. Navigate to /admin/products
2. Verify product grid displays
3. Check product details are correct
4. Verify images load from Cloudinary
```

### B. Test Delete Functionality
```
1. Hover over a product card
2. Click trash icon
   Expected: Confirmation dialog appears

3. Click "Cancel"
   Expected: Dialog closes, product remains

4. Click trash icon again → Click "Delete"
   Expected:
   - Dialog shows "Deleting..."
   - Product removed from grid
   - Database updated
```

---

## 🔄 Test 4: Dashboard Updates

### After adding products, verify dashboard updates:

```
1. Add 3 "flowers" products
2. Add 2 "nonflower" products
3. Add 1 "bulk" product
4. Go to /admin

Expected:
- Total Products: 6
- Flowers: 3
- Non-Flower: 2
- Bulk: 1
```

---

## 📸 Test 5: Image Optimization

**Verify Cloudinary upload & compression:**

```
1. Upload a large image (e.g., 5MB, 4000x3000px)
2. Create product
3. Check Cloudinary dashboard (https://cloudinary.com)

Expected:
- Image resized to max 1200x1200px
- File size reduced by 70-80%
- Format optimized (auto)
- Progressive JPEG
```

---

## 🔒 Test 6: Error Handling

### A. Database Connection Error
```
1. Change DATABASE_URL in .env to invalid
2. Restart server
3. Try to access /admin

Expected: Error page or message
```

### B. Cloudinary Error
```
1. Change CLOUDINARY_URL to invalid
2. Try uploading images

Expected: Upload fails with error message
```

### C. File Upload Error
```
1. Try uploading very large file (>50MB)
2. Try uploading wrong file type (.txt, .pdf)

Expected: Appropriate error messages
```

---

## 📱 Test 7: Responsive Design

### Mobile (< 640px)
- [ ] Dashboard cards stack vertically
- [ ] Forms are full-width
- [ ] Buttons are touch-friendly
- [ ] Images resize properly
- [ ] No horizontal scroll

### Tablet (640px - 1024px)
- [ ] Cards display in 2 columns
- [ ] Forms are readable
- [ ] Sidebar (if any) adapts

### Desktop (> 1024px)
- [ ] Cards display in 4 columns
- [ ] Forms have max-width
- [ ] Optimal use of space

---

## 🚀 Test 8: Performance

### Check Loading Times:
```
1. Dashboard page load: < 1 second
2. Products list load: < 2 seconds
3. Image upload time: < 5 seconds per image
4. Form submission: < 3 seconds
```

### Check Bundle Size:
```bash
npm run build
# Check output size
```

---

## ✅ Final Verification

### All Tests Passed?
- [ ] Dashboard displays correctly
- [ ] Can add products successfully
- [ ] Images upload & compress correctly
- [ ] Products list displays
- [ ] Can delete products
- [ ] Statistics update correctly
- [ ] Mobile responsive works
- [ ] Error handling works
- [ ] No console errors
- [ ] Database updates correctly

---

## 🐛 Common Issues & Fixes

### Issue: "PrismaClient not found"
```bash
npx prisma generate
```

### Issue: "Database connection failed"
```bash
# Check .env file
cat .env | grep DATABASE_URL
# Verify connection string is correct
```

### Issue: "Cloudinary upload failed"
```bash
# Check .env file
cat .env | grep CLOUDINARY
# Verify credentials are correct
```

### Issue: "Sharp module not found"
```bash
npm install sharp
```

### Issue: Images not loading
```
# Check browser console for CORS errors
# Verify Cloudinary URLs are HTTPS
# Check image URLs in database
```

---

## 📊 Test Results Template

```
Date: ___________
Tester: ___________

Dashboard: ✅ / ❌
Add Product: ✅ / ❌
Products List: ✅ / ❌
Delete Product: ✅ / ❌
Image Upload: ✅ / ❌
Responsive: ✅ / ❌
Performance: ✅ / ❌

Notes:
_______________________
_______________________
```

---

**Testing Complete!** 🎉

If all tests pass, your Admin Dashboard is ready for production!
