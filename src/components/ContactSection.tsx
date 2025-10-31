'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { useSiteContent } from '@/contexts/SiteContentContext'

interface ContactInfoItem {
  icon: LucideIcon
  title: string
  details: string[]
}

export default function ContactSection() {
  const { content } = useSiteContent()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Get contact section from site content
  const contactSection = Array.isArray(content)
    ? content.find(
        (section) =>
          section.id === 'contact' ||
          section.title?.toLowerCase().includes('contact')
      )
    : undefined

  // Default contact information (used as fallback)
  const defaultContactInfo: ContactInfoItem[] = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91-9876543210', '+91-9876543211'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@bikesdeal.com', 'support@bikesdeal.com'],
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['BikesDeal HQ', '123 Bike Street, Mumbai, 400001'],
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon–Sat: 9AM–8PM', 'Sun: 10AM–5PM'],
    },
  ]

  // Use dynamic contact info if available, otherwise fallback
  const contactInfo: ContactInfoItem[] =
    (contactSection as any)?.fields?.contactInfo || defaultContactInfo

  // Handle form input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        const existing =
          JSON.parse(localStorage.getItem('contactSubmissions') || '[]') || []
        existing.push(result.submission)
        localStorage.setItem('contactSubmissions', JSON.stringify(existing))

        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
        console.error('Form error:', result.error)
      }
    } catch (error) {
      console.error('Network error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
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
            {contactSection?.fields?.title || 'Contact Us'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {contactSection?.fields?.content ||
              'Have questions or need assistance? Our team is here to help you with any inquiries about selling or buying bikes.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {contactSection?.fields?.formTitle || 'Send Us a Message'}
            </h3>

            {submitStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
                <p className="font-medium">
                  {contactSection?.fields?.successMessage ||
                    'Thank you! Your message has been sent successfully.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center justify-center w-full px-6 py-4 rounded-lg font-semibold transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700'
                  } text-white`}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {contactSection?.fields?.contactInfoTitle || 'Contact Information'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((info: ContactInfoItem, index: number) => {
                const IconComponent = info.icon
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-start">
                      <div className="bg-red-100 text-red-600 p-3 rounded-lg mr-4">
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {info.title}
                        </h4>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-gray-600 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
