# Public Assets Folder

Place your static assets (images, fonts, etc.) in this folder.

## Recommended Images to Add

### 1. Hero Background Image
- **Filename**: `hero-image.png` or `hero-background.jpg`
- **Size**: 1920x1080px or larger
- **Content**: Colorful candy, gummies, or abstract colorful background
- **Format**: PNG with transparency or JPG
- **Usage**: Replace emoji decorations in Hero component

### 2. Logo
- **Filename**: `logo.png`
- **Size**: 512x512px (square)
- **Content**: ZMARTIES logo
- **Format**: PNG with transparency
- **Usage**: Navigation and footer

### 3. Candy Decorations
- **Filenames**:
  - `candy-1.png`
  - `candy-2.png`
  - `candy-3.png`
  - `candy-4.png`
- **Size**: 256x256px each
- **Content**: Individual candy/gummy images
- **Format**: PNG with transparency
- **Usage**: Replace emoji decorations around logo

### 4. Background Patterns (Optional)
- **Filename**: `pattern.svg`
- **Content**: Subtle pattern or texture
- **Format**: SVG
- **Usage**: Background decoration

## How to Use Images in Next.js

### Import in Component

```tsx
import Image from 'next/image'

// In your component
<Image
  src="/hero-image.png"
  alt="Description"
  width={1920}
  height={1080}
  priority // for above-fold images
/>
```

### Background Image in CSS

```tsx
<div
  className="bg-cover bg-center"
  style={{ backgroundImage: 'url(/hero-image.png)' }}
>
  {/* Content */}
</div>
```

## Image Optimization Tips

1. **Use WebP format** when possible for better compression
2. **Provide multiple sizes** for responsive images
3. **Optimize before upload** using tools like:
   - TinyPNG.com
   - Squoosh.app
   - ImageOptim

4. **Use next/image component** for automatic optimization
5. **Set explicit width/height** to prevent layout shift

## Current Placeholders

The project currently uses:
- 🍬 Emoji for candy decorations
- Gradient backgrounds instead of images
- Text-based logo (letter "Z")

Replace these with your actual brand assets for a professional look!

## File Structure

```
public/
├── README.md (this file)
├── logo.png (add your logo)
├── hero-image.png (add hero background)
├── candy-1.png (decorative)
├── candy-2.png (decorative)
├── candy-3.png (decorative)
├── candy-4.png (decorative)
├── favicon.ico (browser tab icon)
└── images/ (optional subfolder)
    └── ...
```

## Next Steps

1. Add your brand assets to this folder
2. Update the image references in components
3. Configure next.config.js if using external images
4. Test on different devices and screen sizes

---

**Note**: All files in the `public/` folder are served from the root path `/`
