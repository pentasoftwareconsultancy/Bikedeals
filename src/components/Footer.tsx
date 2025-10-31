'use client'

import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowUp,
  LucideIcon,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useSiteContent } from '../contexts/SiteContentContext'

// Define types for footer data
interface FooterLink {
  name: string
  href: string
}

interface FooterLinksGroup {
  company: FooterLink[]
  services: FooterLink[]
  support: FooterLink[]
  legal: FooterLink[]
}

interface SocialLink {
  name: string
  icon: LucideIcon
  href: string
  color: string
}

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { content } = useSiteContent()

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const footerContent = Array.isArray(content)
    ? content.find((section) => section.id === 'footer')
    : undefined

  // Default footer links (fallback)
  const defaultFooterLinks: FooterLinksGroup = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'How It Works', href: '#how-it-works' },
      { name: 'Our Services', href: '#services' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' },
    ],
    services: [
      { name: 'Sell Your Bike', href: '#sell' },
      { name: 'Buy Bikes', href: '#buy' },
      { name: 'Bike Valuation', href: '#valuation' },
      { name: 'Home Inspection', href: '#inspection' },
      { name: 'Documentation', href: '#docs' },
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'FAQ', href: '#faq' },
      { name: 'Live Chat', href: '#chat' },
      { name: 'Report Issue', href: '#report' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'Refund Policy', href: '#refund' },
      { name: 'Disclaimer', href: '#disclaimer' },
    ],
  }

  const footerLinks: FooterLinksGroup =
    (footerContent as any)?.fields?.footerLinks || defaultFooterLinks

  const defaultSocialLinks: SocialLink[] = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:bg-blue-400' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:bg-pink-600' },
    { name: 'Youtube', icon: Youtube, href: '#', color: 'hover:bg-red-600' },
  ]

  const socialLinks: SocialLink[] =
    (footerContent as any)?.fields?.socialLinks || defaultSocialLinks

  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-red-500 mb-4">
                  {footerContent?.fields?.companyName || 'BikesDeal'}
                </h3>
                <p className="text-gray-300 mb-6 max-w-md">
                  {footerContent?.fields?.companyDescription ||
                    "India's most trusted platform for buying and selling pre-owned motorcycles. Get the best value for your bike with our transparent and hassle-free process."}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone size={16} className="mr-3 text-red-500" />
                    <span className="text-gray-300">
                      {footerContent?.fields?.phone || '+91-9876543210'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="mr-3 text-red-500" />
                    <span className="text-gray-300">
                      {footerContent?.fields?.email || 'info@bikesdeal.com'}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <MapPin size={16} className="mr-3 text-red-500 mt-1" />
                    <span className="text-gray-300">
                      {footerContent?.fields?.address ||
                        '123 Bike Street, Mumbai, 400001'}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer Links (Company, Services, Support) */}
            {(
              Object.entries({
                Company: footerLinks.company,
                Services: footerLinks.services,
                Support: footerLinks.support,
              }) as [string, FooterLink[]][]
            ).map(([title, links], i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-4">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link: FooterLink) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-red-500 transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-gray-800"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h4 className="text-lg font-semibold mb-2">
                  {footerContent?.fields?.newsletterTitle || 'Stay Updated'}
                </h4>
                <p className="text-gray-300">
                  {footerContent?.fields?.newsletterDescription ||
                    'Subscribe to get the latest news and offers'}
                </p>
              </div>
              <div className="flex w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                />
                <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-r-lg transition-colors duration-200 font-semibold">
                  {footerContent?.fields?.subscribeButtonText || 'Subscribe'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-gray-400 text-sm mb-4 md:mb-0"
              >
                {footerContent?.fields?.copyright ||
                  '© 2025 BikesDeal. All rights reserved. | Made with ❤️ in India'}
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex space-x-4"
              >
                {socialLinks.map((social: SocialLink) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`p-2 bg-gray-800 rounded-full transition-all duration-200 ${social.color} hover:scale-110`}
                      aria-label={social.name}
                    >
                      <IconComponent size={18} />
                    </a>
                  )
                })}
              </motion.div>

              {/* Legal Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-wrap gap-4 text-sm"
              >
                {footerLinks.legal.map((link: FooterLink, index: number) => (
                  <span key={link.name} className="flex items-center">
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                    {index < footerLinks.legal.length - 1 && (
                      <span className="ml-4 text-gray-600">|</span>
                    )}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 glow-effect"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </>
  )
}
