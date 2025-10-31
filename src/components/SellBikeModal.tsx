'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Camera, FileText } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface SellBikeModalProps {
  isOpen: boolean
  onClose: () => void
}

interface BikeFormData {
  // Owner Information
  ownerName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  
  // Bike Information
  make: string
  model: string
  year: number
  engineSize: string
  mileage: number
  color: string
  condition: string
  price: number
  
  // Additional Details
  description: string
  modifications: string
  serviceHistory: string
  accidentHistory: string
  
  // Documents
  hasRegistration: boolean
  hasInsurance: boolean
  hasPUC: boolean
}

export default function SellBikeModal({ isOpen, onClose }: SellBikeModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BikeFormData>()

  const steps = [
    { number: 1, title: 'Owner Information', icon: FileText },
    { number: 2, title: 'Bike Details', icon: Camera },
    { number: 3, title: 'Additional Info', icon: Upload },
    { number: 4, title: 'Review & Submit', icon: FileText }
  ]

  const onSubmit = async (data: BikeFormData) => {
    setIsSubmitting(true)
    
    try {
      // Transform data to match admin panel structure
      const bikeSubmission = {
        id: Date.now().toString(),
        ownerInfo: {
          name: data.ownerName,
          email: data.email,
          phone: data.phone,
          address: `${data.address}, ${data.city}, ${data.state} ${data.zipCode}`
        },
        bikeDetails: {
          brand: data.make,
          model: data.model,
          year: data.year,
          kmDriven: data.mileage,
          fuelType: data.engineSize,
          transmission: 'Manual', // Default value
          owners: 1, // Default value
          registrationState: data.state,
          expectedPrice: data.price
        },
        additionalInfo: {
          condition: data.condition,
          modifications: data.modifications || 'None',
          accidentHistory: data.accidentHistory || 'None',
          serviceHistory: data.serviceHistory || 'None',
          reason: data.description || 'Not specified',
          urgency: 'Normal' // Default value
        },
        images: uploadedImages,
        submittedAt: new Date().toISOString(),
        status: 'pending' as const
      }
      
      // Store in localStorage with correct key for admin panel
      const existingSubmissions = JSON.parse(localStorage.getItem('bikeSubmissions') || '[]')
      existingSubmissions.push(bikeSubmission)
      localStorage.setItem('bikeSubmissions', JSON.stringify(existingSubmissions))
      
      alert('Bike submitted successfully! We will contact you within 24 hours.')
      reset()
      setCurrentStep(1)
      setUploadedImages([])
      onClose()
    } catch (error) {
      alert('Error submitting bike. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedImages(prev => [...prev, e.target!.result as string])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-red-600 text-white p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Sell Your Bike</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-red-700 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Progress Steps */}
              <div className="flex justify-between mt-6">
                {steps.map((step) => {
                  const IconComponent = step.icon
                  return (
                    <div key={step.number} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        currentStep >= step.number ? 'bg-white text-red-600' : 'bg-red-500 text-white'
                      }`}>
                        {currentStep > step.number ? (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <IconComponent size={20} />
                        )}
                      </div>
                      <span className="ml-2 text-sm font-medium hidden sm:block">{step.title}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Step 1: Owner Information */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Owner Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                          {...register('ownerName', { required: 'Name is required' })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                        {errors.ownerName && <p className="text-red-500 text-sm mt-1">{errors.ownerName.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input
                          {...register('email', { required: 'Email is required', pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: 'Invalid email' } })}
                          type="email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input
                          {...register('phone', { required: 'Phone is required' })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                        <input
                          {...register('city', { required: 'City is required' })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter your city"
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                      <textarea
                        {...register('address', { required: 'Address is required' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        rows={3}
                        placeholder="Enter your complete address"
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Bike Details */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Bike Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Make *</label>
                        <select
                          {...register('make', { required: 'Make is required' })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                          <option value="">Select Make</option>
                          <option value="Honda">Honda</option>
                          <option value="Yamaha">Yamaha</option>
                          <option value="Kawasaki">Kawasaki</option>
                          <option value="Suzuki">Suzuki</option>
                          <option value="Ducati">Ducati</option>
                          <option value="BMW">BMW</option>
                          <option value="Harley Davidson">Harley Davidson</option>
                          <option value="Royal Enfield">Royal Enfield</option>
                          <option value="TVS">TVS</option>
                          <option value="Bajaj">Bajaj</option>
                          <option value="Hero">Hero</option>
                          <option value="KTM">KTM</option>
                        </select>
                        {errors.make && <p className="text-red-500 text-sm mt-1">{errors.make.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Model *</label>
                        <input
                          {...register('model', { required: 'Model is required' })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter bike model"
                        />
                        {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
                        <input
                          {...register('year', { required: 'Year is required', min: 1990, max: new Date().getFullYear() })}
                          type="number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter manufacturing year"
                        />
                        {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Engine Size *</label>
                        <input
                          {...register('engineSize', { required: 'Engine size is required' })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="e.g., 150cc, 250cc"
                        />
                        {errors.engineSize && <p className="text-red-500 text-sm mt-1">{errors.engineSize.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mileage (km) *</label>
                        <input
                          {...register('mileage', { required: 'Mileage is required', min: 0 })}
                          type="number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter total kilometers"
                        />
                        {errors.mileage && <p className="text-red-500 text-sm mt-1">{errors.mileage.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expected Price (₹) *</label>
                        <input
                          {...register('price', { required: 'Price is required', min: 1000 })}
                          type="number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter expected price"
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                      </div>
                    </div>
                    
                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bike Images</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-gray-600">Click to upload bike images</p>
                          <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB each</p>
                        </label>
                      </div>
                      
                      {uploadedImages.length > 0 && (
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          {uploadedImages.map((image, index) => (
                            <img key={index} src={image} alt={`Bike ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Additional Information */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bike Condition *</label>
                      <select
                        {...register('condition', { required: 'Condition is required' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Select Condition</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Needs Work">Needs Work</option>
                      </select>
                      {errors.condition && <p className="text-red-500 text-sm mt-1">{errors.condition.message}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        {...register('description')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        rows={4}
                        placeholder="Describe your bike's features, condition, and any special details..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Modifications (if any)</label>
                      <textarea
                        {...register('modifications')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        rows={3}
                        placeholder="List any modifications or upgrades..."
                      />
                    </div>
                    
                    {/* Document Checkboxes */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Available Documents</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input {...register('hasRegistration')} type="checkbox" className="mr-3" />
                          <span>Registration Certificate (RC)</span>
                        </label>
                        <label className="flex items-center">
                          <input {...register('hasInsurance')} type="checkbox" className="mr-3" />
                          <span>Valid Insurance</span>
                        </label>
                        <label className="flex items-center">
                          <input {...register('hasPUC')} type="checkbox" className="mr-3" />
                          <span>Pollution Under Control (PUC) Certificate</span>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Review & Submit</h3>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        Please review all the information you've provided. Once submitted, our team will contact you within 24 hours to schedule an inspection.
                      </p>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-semibold text-red-800 mb-2">What happens next?</h4>
                        <ul className="text-red-700 text-sm space-y-1">
                          <li>• Our expert will contact you to schedule an inspection</li>
                          <li>• Free bike evaluation at your location</li>
                          <li>• Instant payment within 30 minutes of approval</li>
                          <li>• All paperwork handled by our team</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      currentStep === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-glow bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn-glow px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-700 glow-effect'
                      } text-white`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Bike Details'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}