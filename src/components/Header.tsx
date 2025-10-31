'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useSiteContent } from '../contexts/SiteContentContext'

interface HeaderProps {
  onSellClick: () => void
}

interface NavItem {
  name: string
  href: string
}

export default function Header({ onSellClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { content } = useSiteContent()

  const defaultNavItems: NavItem[] = [
    { name: 'Hero Section', href: '#hero' },
    { name: 'Services', href: '#services' },
    { name: 'Bikes for Sale', href: '#bikes' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Partners', href: '#partners' },
    { name: 'Contact Info', href: '#contact' },
    { name: 'How It Works', href: '#how-it-works' },
  ]

  const headerContent = Array.isArray(content)
    ? content.find((section) => section.id === 'header')
    : undefined

  const navItems: NavItem[] =
    (headerContent as any)?.fields?.navigationItems || defaultNavItems

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-red-600 text-glow">
              {headerContent?.fields?.siteName || 'BikesDeal'}
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item: NavItem) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Sell Now Button */}
          <button
            onClick={onSellClick}
            className="btn-glow bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 glow-effect"
          >
            {headerContent?.fields?.ctaButtonText || 'Sell Now'}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item: NavItem) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
