"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Hero() {
  return (
    <>
      {/* Free Shipping Banner */}
      <div className="w-full bg-gray-100 py-4 px-4 text-center border-b border-gray-200">
        <p className="text-sm md:text-base font-bold text-gray-900 tracking-wide uppercase">
          FREE SHIPPING ON EVERY ORDER!
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white">
        {/* Faint Background Pattern */}
        <div
          className="absolute inset-0 opacity-[1.03] bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: 'url(/images/hero.avif)' }}
        />

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex flex-col items-center text-center ">
            {/* Hero Logo */}
            <div className="relative w-full max-w-2xl">
              <Image
                src="/images/greet.avif"
                alt="ZMARTIES"
                width={800}
                height={400}
                priority
                className="w-full h-auto"
              />
            </div>

            {/* WORLDWIDE Text */}
            <div className="-mt-20 py-16">
              <p className="text-xl sm:text-2xl md:text-3xl font-black text-black tracking-[0.3em] sm:tracking-[0.4em]">
                WORLDWIDE
              </p>
            </div>

            {/* CTA Buttons - Stacked Vertically */}
            <div className="flex flex-col items-center gap-4 w-full max-w-md px-4">
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto min-w-[240px] border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all duration-200 text-sm sm:text-base uppercase tracking-wide"
              >
                <a href="/shop">
                  CLICK TO SHOP
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto min-w-[240px] border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all duration-200 text-sm sm:text-base uppercase tracking-wide"
              >
                <a 
                  href="https://signal.me/#eu/6lm096UMr11MQ6KPDthlU5GBBKGfGp26I9caNImudJGP5lRFBXFO-43HUMvmYESC"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CLICK TO VERIFY
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto min-w-[240px] border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all duration-200 text-sm sm:text-base uppercase tracking-wide"
              >
                <a href="#how-to-order">HOW TO ORDER</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
