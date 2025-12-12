# Quick Setup Guide

Follow these steps to get your ZMARTIES landing page up and running:

## Prerequisites

Make sure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager

## Installation Steps

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- Next.js
- React
- Tailwind CSS
- Shadcn/UI components
- Framer Motion
- Lucide React icons

### Step 2: Start Development Server

```bash
npm run dev
```

Your site will be available at **http://localhost:3000**

### Step 3: View in Browser

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the premium ZMARTIES landing page!

## Building for Production

When you're ready to deploy:

### 1. Create Production Build

```bash
npm run build
```

### 2. Start Production Server

```bash
npm start
```

### 3. Deploy

You can deploy to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS**
- **DigitalOcean**
- Any hosting platform that supports Node.js

#### Deploy to Vercel (Easiest)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts and your site will be live!

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can run on a different port:

```bash
npm run dev -- -p 3001
```

### Module Not Found Errors

If you get module errors, try:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

Make sure you're using Node.js v18 or higher:

```bash
node --version
```

If needed, update Node.js from [nodejs.org](https://nodejs.org)

## Development Tips

### Hot Reload

The development server supports hot reload - any changes you make to the code will automatically refresh in the browser.

### TypeScript

This project uses TypeScript for type safety. Your IDE should provide autocomplete and type checking.

### Tailwind CSS

Use Tailwind utility classes for styling. Refer to [tailwindcss.com](https://tailwindcss.com) for documentation.

### Shadcn/UI

Pre-built components are in the `components/ui/` folder. You can add more from [ui.shadcn.com](https://ui.shadcn.com).

## Next Steps

1. ✅ Install dependencies
2. ✅ Start dev server
3. 🎨 Customize colors in `tailwind.config.ts`
4. 📝 Update content in component files
5. 🖼️ Add your logo/images to `public/` folder
6. 🚀 Deploy to production

Enjoy building with your premium ZMARTIES landing page! 🎉
