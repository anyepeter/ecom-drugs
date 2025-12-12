#!/bin/bash

echo "🚀 Setting up Zmarties Admin Dashboard..."
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install @prisma/client prisma sharp cloudinary
npm install -D @types/node

# Install Shadcn/UI components
echo ""
echo "🎨 Installing Shadcn/UI components..."
npx shadcn-ui@latest add card -y
npx shadcn-ui@latest add button -y
npx shadcn-ui@latest add input -y
npx shadcn-ui@latest add label -y
npx shadcn-ui@latest add select -y
npx shadcn-ui@latest add slider -y
npx shadcn-ui@latest add badge -y
npx shadcn-ui@latest add alert-dialog -y

# Setup Prisma
echo ""
echo "🗄️ Setting up Prisma..."
npx prisma generate
npx prisma db push

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Run 'npm run dev' to start the development server"
echo "2. Visit http://localhost:3000/admin to access the dashboard"
echo "3. Start adding products!"
echo ""
