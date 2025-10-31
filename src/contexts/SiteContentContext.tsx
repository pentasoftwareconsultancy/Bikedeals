'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ContentSection {
  id: string
  title: string
  content: string
  description?: string
  images: string[]
  isVisible: boolean
  order?: number
  metadata?: {
    backgroundColor?: string
    textColor?: string
    backgroundVideo?: string
    customCSS?: string
  }
  fields?: {
    [key: string]: any
  }
}

interface SiteSettings {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  socialMedia: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
  }
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
  theme: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    backgroundColor: string
    textColor: string
  }
  backgroundVideo?: {
    url: string
    isEnabled: boolean
    opacity: number
  }
}

interface SiteContentContextType {
  content: ContentSection[]
  contentSections: ContentSection[]
  siteSettings: SiteSettings
  updateContentSection: (id: string, updates: Partial<ContentSection>) => void
  addContentSection: (section: Omit<ContentSection, 'id'>) => void
  deleteContentSection: (id: string) => void
  updateSiteSettings: (updates: Partial<SiteSettings>) => void
  refreshSiteSettings: () => void
  getVisibleSections: () => ContentSection[]
  getSectionsByType: (type: string) => ContentSection[]
}

const defaultSiteSettings: SiteSettings = {
  siteName: 'BikesDeal',
  siteDescription: 'Your trusted partner for buying and selling bikes',
  contactEmail: 'info@bikesdeal.com',
  contactPhone: '+91 9876543210',
  address: '123 Bike Street, Mumbai, Maharashtra 400001',
  socialMedia: {
    facebook: 'https://facebook.com/bikesdeal',
    twitter: 'https://twitter.com/bikesdeal',
    instagram: 'https://instagram.com/bikesdeal',
    linkedin: 'https://linkedin.com/company/bikesdeal'
  },
  seo: {
    metaTitle: 'BikesDeal - Buy & Sell Bikes Online',
    metaDescription: 'Find the best deals on bikes. Buy and sell motorcycles, scooters, and bicycles with ease.',
    keywords: ['bikes', 'motorcycles', 'scooters', 'buy bikes', 'sell bikes', 'bike deals']
  },
  theme: {
    primaryColor: '#dc2626',
    secondaryColor: '#1f2937',
    accentColor: '#f59e0b',
    backgroundColor: '#ffffff',
    textColor: '#111827'
  },
  backgroundVideo: {
    url: '',
    isEnabled: false,
    opacity: 0.5
  }
}

const defaultContentSections: ContentSection[] = [
  {
    id: '1',
    title: 'Hero Section',
    content: 'Find Your Perfect Ride Today',
    description: 'Main hero section content',
    images: [],
    isVisible: true,
    order: 1,
    metadata: {
      backgroundColor: '#dc2626',
      textColor: '#ffffff'
    }
  },
  {
    id: '2',
    title: 'Services',
    content: 'We provide comprehensive bike buying and selling services',
    description: 'Services section content',
    images: [],
    isVisible: true,
    order: 2
  },
  {
    id: '3',
    title: 'About Us',
    content: 'Your trusted partner in the bike marketplace',
    description: 'About section content',
    images: [],
    isVisible: true,
    order: 3
  },
  {
    id: 'header',
    title: 'Header',
    content: 'Header navigation and branding',
    description: 'Website header content',
    images: [],
    isVisible: true,
    order: 0,
    fields: {
      siteName: 'BikesDeal',
      navigationItems: [
        { name: 'Hero Section', href: '#hero' },
        { name: 'Services', href: '#services' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Partners', href: '#partners' },
        { name: 'Contact Info', href: '#contact' },
        { name: 'How It Works', href: '#how-it-works' }
      ],
      ctaButtonText: 'Sell Now'
    }
  },
  {
    id: 'footer',
    title: 'Footer',
    content: 'Footer information and links',
    description: 'Website footer content',
    images: [],
    isVisible: true,
    order: 100,
    fields: {
      companyName: 'BikesDeal',
      companyDescription: 'India\'s most trusted platform for buying and selling pre-owned motorcycles. Get the best value for your bike with our transparent and hassle-free process.',
      phone: '+91-9876543210',
      email: 'info@bikesdeal.com',
      address: '123 Bike Street, Mumbai, 400001',
      newsletterTitle: 'Stay Updated',
      newsletterDescription: 'Subscribe to get the latest news and offers',
      subscribeButtonText: 'Subscribe',
      copyright: '© 2025 BikesDeal. All rights reserved. | Made with ❤️ in India'
    }
  },
  {
    id: 'testimonials',
    title: 'Testimonials',
    content: 'Customer testimonials and reviews',
    description: 'Customer feedback section',
    images: [],
    isVisible: true,
    order: 4,
    fields: {
      sectionTitle: 'What Our Customers Say',
      sectionSubtitle: 'Real experiences from satisfied customers'
    }
  },
  {
    id: 'partners',
    title: 'Partners',
    content: 'Our trusted partners and collaborators',
    description: 'Partners and brands section',
    images: [],
    isVisible: true,
    order: 5,
    fields: {
      sectionTitle: 'Our Partners',
      sectionDescription: 'We work with leading brands and financial institutions to provide you the best service',
      benefitsTitle: 'Partnership Benefits',
      ctaButtonText: 'Become a Partner'
    }
  }
]

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined)

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [contentSections, setContentSections] = useState<ContentSection[]>(defaultContentSections)
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedSections = localStorage.getItem('bikesdeal_content_sections')
    const savedSettings = localStorage.getItem('bikesdeal_site_settings')
    const savedVideoSettings = localStorage.getItem('backgroundVideoSettings')

    if (savedSections) {
      try {
        setContentSections(JSON.parse(savedSections))
      } catch (error) {
        console.error('Error loading content sections:', error)
      }
    }

    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings)
        setSiteSettings(settings)
      } catch (error) {
        console.error('Error loading site settings:', error)
      }
    }

    // Load background video settings from admin panel
    if (savedVideoSettings) {
      try {
        const videoSettings = JSON.parse(savedVideoSettings)
        setSiteSettings(prev => ({
          ...prev,
          backgroundVideo: videoSettings
        }))
      } catch (error) {
        console.error('Error loading background video settings:', error)
      }
    }
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('bikesdeal_content_sections', JSON.stringify(contentSections))
  }, [contentSections])

  useEffect(() => {
    localStorage.setItem('bikesdeal_site_settings', JSON.stringify(siteSettings))
  }, [siteSettings])

  const updateContentSection = (id: string, updates: Partial<ContentSection>) => {
    setContentSections(prev => 
      prev.map(section => 
        section.id === id ? { ...section, ...updates } : section
      )
    )
  }

  const addContentSection = (section: Omit<ContentSection, 'id'>) => {
    const newSection: ContentSection = {
      ...section,
      id: Date.now().toString()
    }
    setContentSections(prev => [...prev, newSection])
  }

  const deleteContentSection = (id: string) => {
    setContentSections(prev => prev.filter(section => section.id !== id))
  }

  const updateSiteSettings = (updates: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...updates }))
  }

  const refreshSiteSettings = () => {
    const savedSettings = localStorage.getItem('bikesdeal_site_settings')
    const savedVideoSettings = localStorage.getItem('backgroundVideoSettings')
    
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings)
        setSiteSettings(settings)
      } catch (error) {
        console.error('Error loading site settings:', error)
      }
    }

    // Load background video settings from admin panel
    if (savedVideoSettings) {
      try {
        const videoSettings = JSON.parse(savedVideoSettings)
        setSiteSettings(prev => ({
          ...prev,
          backgroundVideo: videoSettings
        }))
      } catch (error) {
        console.error('Error loading background video settings:', error)
      }
    }
  }

  const getVisibleSections = () => {
    return contentSections
      .filter(section => section.isVisible)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
  }

  const getSectionsByType = (type: string) => {
    return contentSections.filter(section => 
      section.title.toLowerCase().includes(type.toLowerCase()) && section.isVisible
    )
  }

  const value: SiteContentContextType = {
    content: contentSections,
    contentSections,
    siteSettings,
    updateContentSection,
    addContentSection,
    deleteContentSection,
    updateSiteSettings,
    refreshSiteSettings,
    getVisibleSections,
    getSectionsByType
  }

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  )
}

export function useSiteContent() {
  const context = useContext(SiteContentContext)
  if (context === undefined) {
    throw new Error('useSiteContent must be used within a SiteContentProvider')
  }
  return context
}

export type { ContentSection, SiteSettings }