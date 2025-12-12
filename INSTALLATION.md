# Complete Installation & Usage Guide

## 🚀 Quick Start (3 Commands)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# Navigate to http://localhost:3000
```

## 📋 Detailed Installation Steps

### Step 1: Verify Prerequisites

Check that you have Node.js installed (v18.0.0 or higher):

```bash
node --version
npm --version
```

If not installed, download from [nodejs.org](https://nodejs.org/)

### Step 2: Navigate to Project

```bash
cd /home/chendi/Desktop/zmarties
```

### Step 3: Install All Dependencies

This will install Next.js, React, Tailwind, Shadcn/UI, and all other packages:

```bash
npm install
```

You should see output like:
```
added 300+ packages in 30s
```

### Step 4: Start Development Server

```bash
npm run dev
```

You should see:
```
▲ Next.js 14.2.0
- Local:        http://localhost:3000
- Ready in 2.5s
```

### Step 5: Open in Browser

Visit: **http://localhost:3000**

You should see your premium ZMARTIES landing page! 🎉

## 🛠️ Available Commands

### Development
```bash
npm run dev          # Start development server (port 3000)
npm run dev -- -p 3001  # Start on different port
```

### Production
```bash
npm run build        # Create optimized production build
npm run start        # Start production server
npm run lint         # Run ESLint for code quality
```

## 📱 Testing Your Site

### Test Locally

1. **Desktop View**
   - Open in Chrome/Firefox/Safari
   - Resize window to see responsive behavior

2. **Mobile View**
   - Open Chrome DevTools (F12)
   - Click device toolbar icon
   - Select iPhone/Android device
   - Test hamburger menu

3. **Tablet View**
   - Set viewport to 768px width
   - Verify layouts adapt properly

### Test Responsiveness

```bash
# Use ngrok to share local dev server
npx ngrok http 3000
```

Then open the provided URL on your phone to test on a real device.

## 🎨 Customization Guide

### 1. Change Colors

Edit [tailwind.config.ts](tailwind.config.ts):

```typescript
// Example: Change primary gradient
colors: {
  primary: {
    DEFAULT: 'hsl(262, 83%, 58%)', // Your color
    foreground: 'hsl(0, 0%, 100%)',
  },
}
```

### 2. Update Content

**Navigation:** [components/Navigation.tsx](components/Navigation.tsx)
```typescript
const navItems = [
  { name: 'YOUR LINK', href: '#your-section' },
  // ... more items
]
```

**Hero Text:** [components/Hero.tsx](components/Hero.tsx)
```typescript
// Find and update the text content
<h1>YOUR BRAND NAME</h1>
```

**Steps:** [components/Steps.tsx](components/Steps.tsx)
```typescript
const steps = [
  {
    number: 1,
    title: 'Your Step Title',
    description: 'Your description',
    // ...
  },
]
```

**Footer:** [components/Footer.tsx](components/Footer.tsx)
```typescript
// Update legal text and links
```

### 3. Add Images

Place images in `public/` folder:

```bash
public/
├── logo.png
├── hero-bg.jpg
└── candy-1.png
```

Use in components:

```tsx
import Image from 'next/image'

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={200}
/>
```

### 4. Add New Sections

Create new component:

```bash
# Create file
touch components/NewSection.tsx
```

```tsx
// components/NewSection.tsx
export default function NewSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Your content */}
      </div>
    </section>
  )
}
```

Import in [app/page.tsx](app/page.tsx):

```tsx
import NewSection from '@/components/NewSection'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <NewSection /> {/* Add here */}
      <Steps />
      <Footer />
    </main>
  )
}
```

## 🚢 Deployment Guide

### Deploy to Vercel (Recommended)

1. **Create Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub/GitLab/Bitbucket

2. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Or Deploy via GitHub**
   - Push code to GitHub
   - Import project in Vercel dashboard
   - Automatic deployments on every push

### Deploy to Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Framework**: Next.js

### Deploy to VPS (DigitalOcean, AWS, etc.)

```bash
# On your server
git clone your-repo
cd your-repo
npm install
npm run build
npm run start

# Use PM2 for process management
npm i -g pm2
pm2 start npm --name "zmarties" -- start
```

## 🐛 Troubleshooting

### Issue: Port 3000 Already in Use

```bash
# Use different port
npm run dev -- -p 3001

# Or kill process on port 3000
# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
```

### Issue: Build Errors

```bash
# Check Node version (should be 18+)
node --version

# Update npm
npm install -g npm@latest

# Try clean build
npm run build
```

### Issue: TypeScript Errors

```bash
# Type check
npx tsc --noEmit

# Fix ESLint issues
npm run lint -- --fix
```

## 📊 Performance Optimization

### Before Deployment

1. **Optimize Images**
   - Use WebP format
   - Compress with TinyPNG.com
   - Use appropriate sizes

2. **Check Bundle Size**
   ```bash
   npm run build
   # Check output for page sizes
   ```

3. **Run Lighthouse**
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run audit
   - Aim for 90+ scores

### After Deployment

1. **Enable Caching**
   - Configure CDN settings
   - Set cache headers

2. **Monitor Performance**
   - Use Vercel Analytics
   - Or Google Analytics
   - Monitor Core Web Vitals

## 🔒 Security Checklist

- [ ] Review all dependencies for vulnerabilities
- [ ] Configure environment variables properly
- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Set up CSP headers
- [ ] Regular dependency updates

```bash
# Check for security issues
npm audit

# Fix automatically
npm audit fix
```

## 📚 Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Shadcn/UI**: https://ui.shadcn.com
- **Framer Motion**: https://www.framer.com/motion
- **TypeScript**: https://www.typescriptlang.org/docs

## 💬 Getting Help

### Documentation
1. Check README.md
2. Read FEATURES.md
3. Review PROJECT_OVERVIEW.md

### Community Resources
- Next.js Discord
- Stack Overflow
- GitHub Issues

### Development Tools
- VS Code with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript

## ✅ Post-Installation Checklist

After installation, verify:

- [ ] `npm install` completed successfully
- [ ] `npm run dev` starts without errors
- [ ] Site loads at http://localhost:3000
- [ ] Mobile menu works (hamburger icon)
- [ ] All animations are smooth
- [ ] No console errors in browser
- [ ] Responsive on mobile, tablet, desktop
- [ ] All buttons have hover effects

## 🎉 You're Ready!

Your premium ZMARTIES landing page is now ready for customization and deployment.

Happy coding! 🚀

---

**Need help?** Review the documentation files in the project root.
