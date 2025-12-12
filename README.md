# ZMARTIES - Premium Landing Page

A modern, premium landing page built with Next.js 14, Tailwind CSS, and Shadcn/UI.

## Features

- **Next.js 14** with App Router
- **Tailwind CSS** for styling
- **Shadcn/UI** components
- **Framer Motion** for smooth animations
- **Mobile-first** responsive design
- **Premium design** with gradients, shadows, and smooth transitions
- **Optimized performance** with modern React patterns

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### 3. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
zmarties/
├── app/
│   ├── layout.tsx          # Root layout with global styles
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global CSS and Tailwind directives
├── components/
│   ├── ui/                 # Shadcn UI components
│   │   ├── button.tsx
│   │   └── sheet.tsx
│   ├── Navigation.tsx      # Main navigation with mobile menu
│   ├── Hero.tsx            # Hero section with animations
│   ├── Steps.tsx           # Three steps section
│   └── Footer.tsx          # Footer with links and disclaimer
├── lib/
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## Design Highlights

### 🎨 Premium Features

- **Animated gradient backgrounds** with floating orbs
- **Smooth page transitions** using Framer Motion
- **Glass morphism effects** for modern UI elements
- **Hover animations** on all interactive elements
- **Mobile-optimized** hamburger menu with smooth slide-in
- **Colorful branding** with gradient text effects

### 📱 Mobile-First Approach

All components are designed mobile-first and scale up beautifully to tablet and desktop:

- Touch-friendly button sizes
- Responsive typography
- Collapsible mobile navigation
- Optimized spacing for all screen sizes

### ⚡ Performance

- Optimized animations with GPU acceleration
- Lazy loading for images
- Minimal JavaScript bundle
- Server-side rendering with Next.js

## Customization

### Colors

Edit the color scheme in [tailwind.config.ts](tailwind.config.ts) and [app/globals.css](app/globals.css).

### Content

Update text content directly in the components:
- [components/Hero.tsx](components/Hero.tsx) - Hero section
- [components/Steps.tsx](components/Steps.tsx) - Steps section
- [components/Footer.tsx](components/Footer.tsx) - Footer and legal disclaimer

### Animations

Modify animation timings and effects in the component files using Framer Motion props.

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - High-quality component library
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **TypeScript** - Type safety

## License

This project is private and proprietary.

## Support

For questions or issues, please contact the development team.
