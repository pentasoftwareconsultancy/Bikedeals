'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'

import TestimonialsSection from '@/components/TestimonialsSection'
import PartnersSection from '@/components/PartnersSection'
import ContactSection from '@/components/ContactSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import SellBikeModal from '@/components/SellBikeModal'
import Footer from '@/components/Footer'

export default function Home() {
  const [isSellModalOpen, setIsSellModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-gray-50">
      <Header onSellClick={() => setIsSellModalOpen(true)} />
      <HeroSection onSellClick={() => setIsSellModalOpen(true)} />
      <ServicesSection />

      <TestimonialsSection />
      <PartnersSection />
      <HowItWorksSection />
      <ContactSection />
      <Footer />
      
      <SellBikeModal 
        isOpen={isSellModalOpen} 
        onClose={() => setIsSellModalOpen(false)} 
      />
    </main>
  )
}