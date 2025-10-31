'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { useSiteContent } from '@/contexts/SiteContentContext'

const defaultTestimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    text: 'Sold my Royal Enfield within 2 hours of listing! The payment was instant and the process was incredibly smooth. Highly recommended!',
    bike: 'Royal Enfield Classic 350',
    avatar: 'RK',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    location: 'Delhi, NCR',
    rating: 5,
    text: 'Best bike dealing platform I have ever used. The team was professional and the valuation was fair. Got paid in exactly 30 minutes!',
    bike: 'Honda CB Shine',
    avatar: 'PS',
  },
  {
    id: 3,
    name: 'Amit Patel',
    location: 'Ahmedabad, Gujarat',
    rating: 5,
    text: 'Amazing service! They handled all the paperwork and the inspection was thorough. Will definitely use BikesDeal again.',
    bike: 'Bajaj Pulsar 220F',
    avatar: 'AP',
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    location: 'Hyderabad, Telangana',
    rating: 5,
    text: 'Professional team, quick service, and transparent pricing. Sold my Activa at a great price with zero hassle.',
    bike: 'Honda Activa 6G',
    avatar: 'SR',
  },
  {
    id: 5,
    name: 'Vikram Singh',
    location: 'Jaipur, Rajasthan',
    rating: 5,
    text: 'The fastest bike selling experience ever! From listing to payment, everything was completed in under an hour.',
    bike: 'KTM Duke 390',
    avatar: 'VS',
  },
  {
    id: 6,
    name: 'Deepika Nair',
    location: 'Kochi, Kerala',
    rating: 5,
    text: 'Excellent customer service and fair pricing. The team was very helpful throughout the entire process.',
    bike: 'TVS Jupiter',
    avatar: 'DN',
  },
]

export default function TestimonialsSection() {
  const { content } = useSiteContent()

  // Get testimonials content from CMS
  const testimonialsContent = content.find(
    (section) =>
      section.id === 'testimonials' ||
      section.title?.toLowerCase().includes('testimonials')
  )

  // ✅ Use dynamic testimonials or fallback to defaults
  const testimonials =
    (testimonialsContent as any)?.fields?.testimonials || defaultTestimonials

  // Default stats
  const defaultStats = [
    { value: '10,000+', label: 'Bikes Sold' },
    { value: '4.9/5', label: 'Customer Rating' },
    { value: '30 Min', label: 'Average Payment Time' },
    { value: '50+', label: 'Cities Covered' },
  ]

  // ✅ Use dynamic stats or fallback to defaults
  const stats = (testimonialsContent as any)?.fields?.stats || defaultStats

  return (
    <section id="testimonials" className="py-20 bg-white">
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
            {testimonialsContent?.title || 'What Our Customers Say'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {testimonialsContent?.content ||
              "Don't just take our word for it. Here's what our satisfied customers have to say about their experience with BikesDeal."}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial: any, index: number) => (
            <motion.div
              key={testimonial.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-hover bg-gray-50 p-6 rounded-xl border border-gray-200 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-red-200">
                <Quote size={32} />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                  <p className="text-sm text-red-600 font-medium">{testimonial.bike}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat: any, index: number) => (
            <div key={index} className="p-6">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
