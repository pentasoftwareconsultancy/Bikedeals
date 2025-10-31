'use client'

import { motion } from 'framer-motion'
import { useSiteContent } from '@/contexts/SiteContentContext'

interface Partner {
  name: string
  logo: string
}

interface Benefit {
  title: string
  description: string
  icon: string
}

const defaultPartners: Partner[] = [
  { name: 'Honda', logo: 'HONDA' },
  { name: 'Yamaha', logo: 'YAMAHA' },
  { name: 'Bajaj', logo: 'BAJAJ' },
  { name: 'TVS', logo: 'TVS' },
  { name: 'Hero', logo: 'HERO' },
  { name: 'Royal Enfield', logo: 'RE' },
  { name: 'KTM', logo: 'KTM' },
  { name: 'Suzuki', logo: 'SUZUKI' },
  { name: 'Kawasaki', logo: 'KAWASAKI' },
  { name: 'Ducati', logo: 'DUCATI' },
  { name: 'BMW', logo: 'BMW' },
  { name: 'Harley Davidson', logo: 'HD' },
]

const defaultBankPartners: Partner[] = [
  { name: 'State Bank of India', logo: 'SBI' },
  { name: 'HDFC Bank', logo: 'HDFC' },
  { name: 'ICICI Bank', logo: 'ICICI' },
  { name: 'Axis Bank', logo: 'AXIS' },
  { name: 'Kotak Bank', logo: 'KOTAK' },
  { name: 'Punjab National Bank', logo: 'PNB' },
]

export default function PartnersSection() {
  const { content } = useSiteContent()

  // Get partners section from CMS (if exists)
  const partnersSection = Array.isArray(content)
    ? content.find((section) => section.id === 'partners')
    : undefined

  // Extract dynamic values safely
  const partners: Partner[] =
    (partnersSection as any)?.fields?.partners || defaultPartners
  const bankPartners: Partner[] =
    (partnersSection as any)?.fields?.bankPartners || defaultBankPartners
  const benefits: Benefit[] =
    (partnersSection as any)?.fields?.partnerBenefits || [
      {
        title: 'Authentic Valuations',
        description:
          'Our brand partnerships ensure accurate market valuations for all motorcycle models.',
        icon: 'check',
      },
      {
        title: 'Instant Payments',
        description:
          'Banking partnerships enable secure and instant money transfers within 30 minutes.',
        icon: 'money',
      },
      {
        title: 'Secure Transactions',
        description:
          'All transactions are protected by bank-level security and insurance coverage.',
        icon: 'shield',
      },
    ]

  return (
    <section id="partners" className="py-20 bg-gray-50">
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
            {partnersSection?.fields?.title || 'Our Partners'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {partnersSection?.fields?.content ||
              'We work with leading motorcycle brands and financial institutions to provide you with the best service and instant payments.'}
          </p>
        </motion.div>

        {/* Motorcycle Brands */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {partnersSection?.fields?.brandsTitle ||
              'Motorcycle Brands We Deal With'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {partners.map((partner: Partner, index: number) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-hover bg-white p-6 rounded-xl shadow-md border border-gray-200 flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-full flex items-center justify-center font-bold text-sm mb-3 mx-auto">
                    {partner.logo}
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {partner.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Banking Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {partnersSection?.fields?.bankingTitle ||
              'Banking Partners for Instant Payments'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {bankPartners.map((bank: Partner, index: number) => (
              <motion.div
                key={bank.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-hover bg-white p-4 rounded-lg shadow-md border border-gray-200 flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-lg flex items-center justify-center font-bold text-xs mb-2 mx-auto">
                    {bank.logo}
                  </div>
                  <p className="text-xs font-medium text-gray-700">{bank.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partnership Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-white p-8 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {partnersSection?.fields?.benefitsTitle ||
              'Why Our Partnerships Matter'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit: Benefit, index: number) => {
              const getIconColor = (icon: string) => {
                switch (icon) {
                  case 'check':
                    return 'bg-red-100 text-red-600'
                  case 'money':
                    return 'bg-green-100 text-green-600'
                  case 'shield':
                    return 'bg-blue-100 text-blue-600'
                  default:
                    return 'bg-gray-100 text-gray-600'
                }
              }

              const getIconSvg = (icon: string) => {
                switch (icon) {
                  case 'check':
                    return (
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    )
                  case 'money':
                    return (
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    )
                  case 'shield':
                    return (
                      <path
                        fillRule="evenodd"
                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    )
                  default:
                    return (
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    )
                }
              }

              return (
                <div key={index} className="text-center">
                  <div
                    className={`w-16 h-16 ${getIconColor(
                      benefit.icon
                    )} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      {getIconSvg(benefit.icon)}
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="btn-glow bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 glow-effect">
            {partnersSection?.fields?.ctaButtonText || 'Become a Partner'}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
