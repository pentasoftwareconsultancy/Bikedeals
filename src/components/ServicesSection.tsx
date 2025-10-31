'use client'

import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  DollarSign, 
  Shield, 
  Clock, 
  Users, 
  Award 
} from 'lucide-react'
import { useSiteContent } from '@/contexts/SiteContentContext'

const defaultServices = [
  {
    title: 'Quick Bike Sale',
    description: 'Sell your motorcycle in just 30 minutes with our streamlined process. Get instant evaluation and immediate payment.',
    icon: Clock,
    color: 'text-red-600'
  },
  {
    title: 'Premium Bike Purchase',
    description: 'Browse our curated collection of premium motorcycles. All bikes are thoroughly inspected and certified.',
    icon: ShoppingCart,
    color: 'text-blue-600'
  },
  {
    title: 'Fair Market Pricing',
    description: 'Get the best value for your motorcycle with our AI-powered pricing system based on real market data.',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    title: 'Secure Transactions',
    description: 'All transactions are protected with bank-level security. Your money and documents are always safe.',
    icon: Shield,
    color: 'text-purple-600'
  },
  {
    title: 'Expert Support',
    description: '24/7 customer support from motorcycle experts. Get help whenever you need it.',
    icon: Users,
    color: 'text-orange-600'
  },
  {
    title: 'Quality Guarantee',
    description: 'Every motorcycle comes with our quality guarantee. Buy with confidence knowing you\'re protected.',
    icon: Award,
    color: 'text-indigo-600'
  }
]

export default function ServicesSection() {
  const { content } = useSiteContent()
  const servicesContent = content.find(section => section.id === '2' || section.title === 'Services')

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {servicesContent?.title || 'Our Services'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {servicesContent?.content || 'We provide comprehensive motorcycle dealing services with a focus on speed, security, and customer satisfaction.'}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {defaultServices.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-hover bg-gray-50 p-8 rounded-xl border border-gray-200"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-6 ${service.color}`}>
                  <IconComponent size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="btn-glow bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 glow-effect">
            {servicesContent?.fields?.ctaButtonText || 'Learn More About Our Services'}
          </button>
        </motion.div>
      </div>
    </section>
  )
}