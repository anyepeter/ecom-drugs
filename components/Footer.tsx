"use client"

import { Instagram, Phone, MessageCircle } from 'lucide-react'

const footerLinks = [
  { name: 'HOME', href: '/' },
  { name: 'FLOWER', href: '/shop/flowers' },
  { name: 'NON FLOWER', href: '/shop/non-flowers' },
  { name: 'CLICK TO VERIFY', href: 'https://signal.me/#eu/6lm096UMr11MQ6KPDthlU5GBBKGfGp26I9caNImudJGP5lRFBXFO-43HUMvmYESC' },
]

export default function Footer() {
  return (
    <footer className="relative bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Logo, Social, and Links */}
          <div className="space-y-6">
            {/* Logo and Social */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase">
                  ZMARTIES
                </h3>
                <a
                  href="/"
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
              <div className="flex flex-col space-y-2">
                <a href="tel:+13182016767" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> +1 (318) 201-6767
                </a>
                <a href="https://t.me/the_zmarties" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Chat on Telegram
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col space-y-3">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm sm:text-base text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 uppercase tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Legal Disclaimer */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Legal Disclaimer:
            </h4>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-3">
              <p>
                These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease. Must be 21 years or older to purchase from this website. This product is not intended for children, or pregnant/nursing women. Consult with a physician before use if you have a serious medical condition or use prescription medications. Recommendations, suggestions, or information shared on this website, or otherwise, by staff members of Zmoking, LLC, or any of its affiliates, or any dietary supplement product. All trademarks and copyrights are property of their respective owners and are not affiliated with nor do they endorse this product. By using this site, you agree to follow the Privacy Policy and all Terms & Conditions printed on this site. Void Where Prohibited by Law.
              </p>
              <p>
                Products on this site contain less 0.3% Δ9-THC. THCA products are not available for shipment to the following states: Alaska, AS, ID, MN, OR, and RI. ∆8 products are not available to the following US locations where Kratom is restricted: Alabama, Arkansas, Indiana, Rhode Island, Vermont, Wisconsin, Sarasota County (FL), Union County (MS), Denver (CO), and San Diego (CA), Oceanside (CA), Jerseyville (IL), Union County (MS).
              </p>
              <p>
                The FDA has not approved Kratom as a dietary supplement. We do not ship Kratom to the following US locations where Kratom is restricted: Alabama, Arkansas, Indiana, Rhode Island, Vermont, Wisconsin, Sarasota County (FL), Union County (MS), Denver (CO), and San Diego (CA), Oceanside (CA), Jerseyville (IL), Union County (MS).
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
