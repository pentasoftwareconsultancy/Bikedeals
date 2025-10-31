'use client'

import { motion } from 'framer-motion'
import { Phone, Calendar, Search, CreditCard, CheckCircle, FileText } from 'lucide-react'
import { useSiteContent } from '@/contexts/SiteContentContext'

const defaultSteps = [
  {
    id: 1,
    icon: Phone,
    title: 'Submit Details',
    description: 'Fill out our simple form with your bike details and contact information.',
    color: 'bg-blue-500',
    time: '2 minutes'
  },
  {
    id: 2,
    icon: Calendar,
    title: 'Schedule Inspection',
    description: 'Our expert will contact you to schedule a free inspection at your location.',
    color: 'bg-green-500',
    time: 'Within 2 hours'
  },
  {
    id: 3,
    icon: Search,
    title: 'Professional Evaluation',
    description: 'Thorough inspection and fair market valuation by certified professionals.',
    color: 'bg-purple-500',
    time: '15 minutes'
  },
  {
    id: 4,
    icon: FileText,
    title: 'Documentation',
    description: 'We handle all paperwork including RC transfer and legal formalities.',
    color: 'bg-orange-500',
    time: '10 minutes'
  },
  {
    id: 5,
    icon: CreditCard,
    title: 'Instant Payment',
    description: 'Receive payment directly to your bank account within 30 minutes.',
    color: 'bg-red-500',
    time: '30 minutes'
  },
  {
    id: 6,
    icon: CheckCircle,
    title: 'Deal Complete',
    description: 'Your bike is sold! Enjoy hassle-free experience and instant cash.',
    color: 'bg-green-600',
    time: 'Done!'
  }
]

const defaultFaqs = [
  {
    question: 'Is the inspection really free?',
    answer: 'Yes, absolutely! We provide free bike inspection at your location with no hidden charges.'
  },
  {
    question: 'How do you determine the bike price?',
    answer: 'Our experts use market data, bike condition, and current demand to provide fair valuations.'
  },
  {
    question: 'What documents do I need?',
    answer: 'RC, insurance papers, and PUC certificate. We help with any missing documentation.'
  },
  {
    question: 'Is the payment really instant?',
    answer: 'Yes! Once the deal is finalized, payment is transferred to your account within 30 minutes.'
  }
]

const defaultFeatures = [
  {
    title: 'Free Home Inspection',
    description: 'Our experts come to your location for bike evaluation at no cost.',
    icon: '🏠'
  },
  {
    title: 'Fair Market Price',
    description: 'Get the best price based on current market conditions and bike condition.',
    icon: '💰'
  },
  {
    title: 'Instant Documentation',
    description: 'All legal paperwork handled by our team with government compliance.',
    icon: '📋'
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock customer support for any queries or assistance.',
    icon: '🎧'
  }
]

export default function HowItWorksSection() {
  const { content } = useSiteContent()
  const howItWorksContent = content.find(section => section.id === '3' || section.title === 'About Us')

  return (
    <section id="how-it-works" className="py-20 bg-white">
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
            {howItWorksContent?.title || 'How It Works'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {howItWorksContent?.content || 'Selling your motorcycle has never been easier. Follow our simple 6-step process and get paid in just 30 minutes.'}
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {defaultSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center relative"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm z-20">
                    {step.id}
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${step.color} text-white mb-6 shadow-lg`}>
                    <IconComponent size={32} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>
                  
                  {/* Time Badge */}
                  <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {step.time}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose BikesDeal?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {defaultFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-hover bg-gray-50 p-6 rounded-xl text-center border border-gray-200"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 bg-gray-50 p-8 rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {defaultFaqs.map((faq, index) => (
              <div key={index}>
                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="btn-glow bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 glow-effect mr-4">
            Start Selling Now
          </button>
          <button className="btn-glow border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300">
            Call Us: +91-9876543210
          </button>
        </motion.div>
      </div>
    </section>
  )
}