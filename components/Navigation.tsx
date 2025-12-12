"use client"

import { useState } from 'react'
import { Menu, Search, ShoppingCart, ChevronDown, ChevronRight, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const shopFlowerItems = [
  { name: 'Flowers', href: '/shop/flowers' },
  { name: 'Non Flowers', href: '/shop/non-flowers' },
  { name: 'Bulk Only', href: '/shop/bulk' },
]

const otherNavItems = [
  { name: 'CLICK TO VERIFY', href: 'https://signal.me/#eu/6lm096UMr11MQ6KPDthlU5GBBKGfGp26I9caNImudJGP5lRFBXFO-43HUMvmYESC', external: true },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isShopFlowerOpen, setIsShopFlowerOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)

  return (
    <>
      {/* Top Yellow Banner */}
      <div className="w-full md:flex justify-center items-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 py-2 px-4">
        <div className="max-w-7xl w-full flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
          <p className="text-xs sm:text-sm font-bold text-gray-900 tracking-wide">
            OFFICIAL ZMARTIES PAGE
          </p>
          <div className="flex items-center gap-4 text-xs sm:text-sm font-bold text-gray-900">
            <a href="tel:+13182016767" className="hover:underline flex items-center gap-1">
              <Phone className="w-3 h-3" /> +1 (318) 201-6767
            </a>
            <a href="https://t.me/the_zmarties" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
              <MessageCircle className="w-3 h-3" /> Telegram
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 relative">
                  <Image
                    src="/images/logo.avif"
                    alt="ZMARTIES"
                    fill
                    className="object-contain"
                  />
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <a
                href="/"
                className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:scale-105"
              >
                HOME
              </a>

              {/* Desktop Dropdown for Shop Flower */}
              <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <button
                    className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:scale-105 inline-flex items-center gap-1"
                    onMouseEnter={() => {
                      if (hoverTimeout) clearTimeout(hoverTimeout)
                      setIsDropdownOpen(true)
                    }}
                    onMouseLeave={() => {
                      const timeout = setTimeout(() => setIsDropdownOpen(false), 150)
                      setHoverTimeout(timeout)
                    }}
                  >
                    SHOP FLOWER
                    <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-48"
                  onMouseEnter={() => {
                    if (hoverTimeout) clearTimeout(hoverTimeout)
                    setIsDropdownOpen(true)
                  }}
                  onMouseLeave={() => {
                    setIsDropdownOpen(false)
                  }}
                >
                  {shopFlowerItems.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <a
                        href={item.href}
                        className="cursor-pointer font-medium"
                      >
                        {item.name}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {otherNavItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-gray-700" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5 text-gray-700" />
              </Button>

              {/* Mobile Menu Toggle */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden rounded-full hover:bg-gray-100"
                    aria-label="Menu"
                  >
                    <Menu className="h-6 w-6 text-gray-700" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                  <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col space-y-3 mt-6">
                    {/* HOME Link */}
                    <a
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                    >
                      HOME
                    </a>
                    
                    {/* SHOP Link */}
                    <a
                      href="/shop"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                    >
                      SHOP
                    </a>

                    {/* Mobile Collapsible Shop Flower */}
                    <div className="space-y-2">
                      <button
                        onClick={() => setIsShopFlowerOpen(!isShopFlowerOpen)}
                        className="w-full px-4 py-3 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 flex items-center justify-between"
                      >
                        SHOP FLOWER
                        <ChevronRight
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isShopFlowerOpen ? 'rotate-90' : ''
                          }`}
                        />
                      </button>

                      {/* Submenu Items */}
                      {isShopFlowerOpen && (
                        <div className="pl-4 space-y-2">
                          {shopFlowerItems.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Other Menu Items */}
                    {otherNavItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
