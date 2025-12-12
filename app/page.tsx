import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import Steps from '@/components/Steps'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <FeaturedProducts />
      <Steps />
      <Footer />
    </main>
  )
}
