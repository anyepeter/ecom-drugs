"use client"

import Image from 'next/image'

const steps = [
  {
    number: 1,
    title: 'Start browsing and exploring.',
    description: "Look through products and see what's gonna be best for you.",
  },
  {
    number: 2,
    title: 'Get Verified.',
    description: "Use the 'Click to Verify' button to get locked in with us.",
  },
  {
    number: 3,
    title: 'Add your order to cart and DM us.',
    description: 'After you fill up your cart, send us a message to finalize your order.',
  },
]

export default function Steps() {
  return (
    <section id="how-to-order" className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      {/* Background Hero Image */}
      <div
        className="absolute inset-0 opacity-1 bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: 'url(/images/hero.avif)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-2 uppercase">
            GET LOCKED IN WITH 3 STEPS 🔐
          </h2>
        </div>

        {/* Steps List */}
        <div className="space-y-10 sm:space-y-12">
          {steps.map((step) => (
            <div key={step.number} className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                {step.number}. {step.title}
              </h3>
              <p className="text-base sm:text-lg text-gray-700 pl-6 sm:pl-8">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
