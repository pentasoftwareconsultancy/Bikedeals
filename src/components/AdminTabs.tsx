'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Save,
  Plus,
  Upload,
  Image,
  Video,
  PlayCircle,
  PauseCircle,
  StopCircle,
  Monitor,
  Palette,
  Globe,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  BarChart3
} from 'lucide-react'
import RichTextEditor from './RichTextEditor'

interface BikeSubmission {
  id: string
  ownerInfo: {
    name: string
    email: string
    phone: string
    address: string
  }
  bikeDetails: {
    brand: string
    model: string
    year: number
    kmDriven: number
    fuelType: string
    transmission: string
    owners: number
    registrationState: string
    expectedPrice: number
  }
  additionalInfo: {
    condition: string
    modifications: string
    accidentHistory: string
    serviceHistory: string
    reason: string
    urgency: string
  }
  images: string[]
  submittedAt: string
  status: 'pending' | 'reviewed' | 'approved' | 'rejected'
}

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

// Submissions Tab Component
export function SubmissionsTab({ 
  bikeSubmissions, 
  onUpdateStatus, 
  onDelete,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus
}: {
  bikeSubmissions: BikeSubmission[]
  onUpdateStatus: (id: string, status: BikeSubmission['status']) => void
  onDelete: (id: string) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  filterStatus: string
  setFilterStatus: (status: string) => void
}) {
  const [selectedSubmission, setSelectedSubmission] = useState<BikeSubmission | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Bike Submissions</h2>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, brand, or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submissions List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bike Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expected Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bikeSubmissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{submission.ownerInfo.name}</div>
                      <div className="text-sm text-gray-500">{submission.ownerInfo.email}</div>
                      <div className="text-sm text-gray-500">{submission.ownerInfo.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {submission.bikeDetails.brand} {submission.bikeDetails.model}
                      </div>
                      <div className="text-sm text-gray-500">
                        {submission.bikeDetails.year} • {submission.bikeDetails.kmDriven} km
                      </div>
                      <div className="text-sm text-gray-500">
                        {submission.bikeDetails.fuelType} • {submission.bikeDetails.transmission}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₹{submission.bikeDetails.expectedPrice.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={submission.status}
                      onChange={(e) => onUpdateStatus(submission.id, e.target.value as BikeSubmission['status'])}
                      className={`text-xs font-medium px-2.5 py-1.5 rounded-full border-0 focus:ring-2 focus:ring-red-500 ${
                        submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                        submission.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedSubmission(submission)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(submission.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {bikeSubmissions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500">No submissions found</p>
          </div>
        )}
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Submission Details</h3>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Owner Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedSubmission.ownerInfo.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedSubmission.ownerInfo.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedSubmission.ownerInfo.phone}</p>
                    <p><span className="font-medium">Address:</span> {selectedSubmission.ownerInfo.address}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Bike Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Brand:</span> {selectedSubmission.bikeDetails.brand}</p>
                    <p><span className="font-medium">Model:</span> {selectedSubmission.bikeDetails.model}</p>
                    <p><span className="font-medium">Year:</span> {selectedSubmission.bikeDetails.year}</p>
                    <p><span className="font-medium">KM Driven:</span> {selectedSubmission.bikeDetails.kmDriven}</p>
                    <p><span className="font-medium">Fuel Type:</span> {selectedSubmission.bikeDetails.fuelType}</p>
                    <p><span className="font-medium">Transmission:</span> {selectedSubmission.bikeDetails.transmission}</p>
                    <p><span className="font-medium">Owners:</span> {selectedSubmission.bikeDetails.owners}</p>
                    <p><span className="font-medium">Registration State:</span> {selectedSubmission.bikeDetails.registrationState}</p>
                    <p><span className="font-medium">Expected Price:</span> ₹{selectedSubmission.bikeDetails.expectedPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Additional Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><span className="font-medium">Condition:</span> {selectedSubmission.additionalInfo.condition}</p>
                    <p><span className="font-medium">Urgency:</span> {selectedSubmission.additionalInfo.urgency}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Modifications:</span> {selectedSubmission.additionalInfo.modifications || 'None'}</p>
                    <p><span className="font-medium">Accident History:</span> {selectedSubmission.additionalInfo.accidentHistory || 'None'}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p><span className="font-medium">Service History:</span> {selectedSubmission.additionalInfo.serviceHistory || 'Not provided'}</p>
                  <p><span className="font-medium">Reason for Selling:</span> {selectedSubmission.additionalInfo.reason}</p>
                </div>
              </div>
              
              {selectedSubmission.images.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Images</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedSubmission.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Bike image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Content Tab Component
export function ContentTab({ 
  contentSections, 
  onUpdate, 
  onAdd, 
  onDelete 
}: {
  contentSections: ContentSection[]
  onUpdate: (id: string, updates: Partial<ContentSection>) => void
  onAdd: () => void
  onDelete: (id: string) => void
}) {
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<ContentSection>>({})

  const startEditing = (section: ContentSection) => {
    setEditingSection(section.id)
    setEditForm(section)
  }

  const saveSection = () => {
    if (editingSection && editForm) {
      onUpdate(editingSection, editForm)
      setEditingSection(null)
      setEditForm({})
    }
  }

  const cancelEditing = () => {
    setEditingSection(null)
    setEditForm({})
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
        <button
          onClick={onAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Section
        </button>
      </div>

      <div className="grid gap-6">
        {contentSections.map((section) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            {editingSection === section.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <input
                      type="text"
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <RichTextEditor
                    value={editForm.content || ''}
                    onChange={(value) => setEditForm({ ...editForm, content: value })}
                    placeholder="Enter section content..."
                    height="300px"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                    <input
                      type="color"
                      value={editForm.metadata?.backgroundColor || '#ffffff'}
                      onChange={(e) => setEditForm({ 
                        ...editForm, 
                        metadata: { 
                          ...editForm.metadata, 
                          backgroundColor: e.target.value 
                        } 
                      })}
                      className="w-full h-10 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                    <input
                      type="color"
                      value={editForm.metadata?.textColor || '#000000'}
                      onChange={(e) => setEditForm({ 
                        ...editForm, 
                        metadata: { 
                          ...editForm.metadata, 
                          textColor: e.target.value 
                        } 
                      })}
                      className="w-full h-10 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editForm.isVisible || false}
                        onChange={(e) => setEditForm({ ...editForm, isVisible: e.target.checked })}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Visible</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Custom CSS</label>
                  <textarea
                    value={editForm.metadata?.customCSS || ''}
                    onChange={(e) => setEditForm({ 
                      ...editForm, 
                      metadata: { 
                        ...editForm.metadata, 
                        customCSS: e.target.value 
                      } 
                    })}
                    rows={3}
                    placeholder="Enter custom CSS styles..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono text-sm"
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={cancelEditing}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveSection}
                    className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Save className="w-4 h-4 mr-2 inline" />
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                    {section.description && (
                      <p className="text-sm text-gray-500 mt-1">{section.description}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      section.isVisible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {section.isVisible ? 'Visible' : 'Hidden'}
                    </span>
                    <button
                      onClick={() => startEditing(section)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(section.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-md p-4">
                  <p className="text-sm text-gray-700">{section.content}</p>
                  {section.metadata?.backgroundColor && (
                    <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded border mr-2"
                          style={{ backgroundColor: section.metadata.backgroundColor }}
                        ></div>
                        Background: {section.metadata.backgroundColor}
                      </div>
                      {section.metadata.textColor && (
                        <div className="flex items-center">
                          <div 
                            className="w-4 h-4 rounded border mr-2"
                            style={{ backgroundColor: section.metadata.textColor }}
                          ></div>
                          Text: {section.metadata.textColor}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Media Tab Component
export function MediaTab() {
  const [mediaFiles, setMediaFiles] = useState<any[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [filterType, setFilterType] = useState('all')
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    loadMediaFiles()
  }, [filterType])

  const loadMediaFiles = async () => {
    try {
      const response = await fetch(`/api/upload?type=${filterType}`)
      const data = await response.json()
      if (data.success) {
        setMediaFiles(data.files)
      }
    } catch (error) {
      console.error('Failed to load media files:', error)
    }
  }

  const handleFileUpload = async (files: File[]) => {
    setIsUploading(true)
    setUploadProgress(0)

    try {
      const uploadPromises = files.map(async (file, index) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('type', file.type.startsWith('video/') ? 'video' : 'image')

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })

        const result = await response.json()
        setUploadProgress(((index + 1) / files.length) * 100)
        return result
      })

      const results = await Promise.all(uploadPromises)
      const successfulUploads = results.filter(result => result.success)
      
      if (successfulUploads.length > 0) {
        setMediaFiles(prev => [...successfulUploads, ...prev])
      }

      setSelectedFiles([])
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles(files)
    if (files.length > 0) {
      handleFileUpload(files)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files)
    }
  }

  const deleteFile = async (filename: string, type: string) => {
    try {
      const response = await fetch(`/api/upload?filename=${filename}&type=${type}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setMediaFiles(prev => prev.filter(file => file.filename !== filename))
      }
    } catch (error) {
      console.error('Failed to delete file:', error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const filteredFiles = mediaFiles.filter(file => {
    if (filterType === 'all') return true
    return file.type.startsWith(filterType)
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Media Library</h2>
        <div className="flex items-center space-x-4">
          {/* Filter Buttons */}
          <div className="flex rounded-md shadow-sm">
            {['all', 'image', 'video'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 text-sm font-medium border ${
                  filterType === type
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                } ${type === 'all' ? 'rounded-l-md' : type === 'video' ? 'rounded-r-md' : ''} ${type !== 'all' ? '-ml-px' : ''}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
          
          <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            Upload Media
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Upload Area */}
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? 'border-red-400 bg-red-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">Drag and drop files here, or click to select</p>
        <p className="text-sm text-gray-500">Supports: JPG, PNG, GIF, WebP, MP4, WebM, MOV, AVI</p>
        <p className="text-xs text-gray-400 mt-1">Max size: 10MB for images, 50MB for videos</p>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Uploading files...</span>
            <span className="text-sm text-gray-500">{Math.round(uploadProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredFiles.map((file, index) => (
          <motion.div
            key={file.filename || index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="aspect-square bg-gray-100 overflow-hidden">
              {file.type.startsWith('video/') ? (
                <div className="relative w-full h-full">
                  <video 
                    src={file.url} 
                    className="w-full h-full object-cover"
                    controls={false}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="w-8 h-8 text-white opacity-80" />
                  </div>
                </div>
              ) : (
                <img 
                  src={file.url} 
                  alt={file.filename}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            {/* File Info */}
            <div className="p-2">
              <p className="text-xs font-medium text-gray-900 truncate">{file.filename}</p>
              <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
            </div>
            
            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
              <button 
                onClick={() => window.open(file.url, '_blank')}
                className="text-white hover:text-red-300 p-1"
                title="View"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button 
                onClick={() => deleteFile(file.filename, file.type.startsWith('video/') ? 'video' : 'image')}
                className="text-white hover:text-red-300 p-1"
                title="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredFiles.length === 0 && !isUploading && (
        <div className="text-center py-12">
          <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No {filterType === 'all' ? 'media' : filterType} files uploaded yet</p>
          <p className="text-sm text-gray-400 mt-2">Upload some files to get started</p>
        </div>
      )}
    </div>
  )
}

// Background Video Tab Component
export function BackgroundVideoTab({ 
  siteSettings, 
  onUpdate 
}: {
  siteSettings: SiteSettings
  onUpdate: (updates: Partial<SiteSettings>) => void
}) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [availableVideos, setAvailableVideos] = useState<any[]>([])
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    loadAvailableVideos()
  }, [])

  const loadAvailableVideos = async () => {
    try {
      const response = await fetch('/api/upload?type=video')
      const data = await response.json()
      if (data.success) {
        setAvailableVideos(data.files)
      }
    } catch (error) {
      console.error('Failed to load videos:', error)
    }
  }

  const handleVideoUpload = async (files: File[]) => {
    if (files.length === 0) return
    
    const file = files[0]
    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'video')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      
      if (result.success) {
        setAvailableVideos(prev => [result, ...prev])
        
        // Update settings with new video
        onUpdate({
          backgroundVideo: {
            url: result.url,
            isEnabled: true,
            opacity: siteSettings.backgroundVideo?.opacity || 0.5
          }
        })
      }

      setUploadProgress(100)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
      }, 1000)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      handleVideoUpload(files)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('video/'))
    if (files.length > 0) {
      handleVideoUpload(files)
    }
  }

  const selectVideo = (videoUrl: string) => {
    onUpdate({
      backgroundVideo: {
        url: videoUrl,
        isEnabled: true,
        opacity: siteSettings.backgroundVideo?.opacity || 0.5
      }
    })
  }

  const deleteVideo = async (filename: string) => {
    try {
      const response = await fetch(`/api/upload?filename=${filename}&type=video`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setAvailableVideos(prev => prev.filter(video => video.filename !== filename))
        
        // If deleted video was the current background video, clear it
        if (siteSettings.backgroundVideo?.url?.includes(filename)) {
          onUpdate({
            backgroundVideo: {
              url: '',
              isEnabled: false,
              opacity: 0.5
            }
          })
        }
      }
    } catch (error) {
      console.error('Failed to delete video:', error)
    }
  }

  const toggleVideo = () => {
    onUpdate({
      backgroundVideo: {
        ...siteSettings.backgroundVideo,
        url: siteSettings.backgroundVideo?.url || '',
        isEnabled: !siteSettings.backgroundVideo?.isEnabled,
        opacity: siteSettings.backgroundVideo?.opacity || 0.5
      }
    })
  }

  const updateOpacity = (opacity: number) => {
    onUpdate({
      backgroundVideo: {
        ...siteSettings.backgroundVideo,
        url: siteSettings.backgroundVideo?.url || '',
        isEnabled: siteSettings.backgroundVideo?.isEnabled || false,
        opacity
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Background Video Settings</h2>
        
        {/* Video Upload */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Background Video</h3>
          
          <div className="space-y-4">
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? 'border-red-400 bg-red-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop a video here, or click to select</p>
              <p className="text-sm text-gray-500 mb-4">Supports: MP4, WebM, MOV, AVI (Max: 50MB)</p>
              
              <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Choose Video
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Uploading...</span>
                  <span className="text-sm text-gray-500">{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Available Videos */}
        {availableVideos.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Available Videos</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableVideos.map((video, index) => (
                <motion.div
                  key={video.filename || index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`relative group bg-gray-50 rounded-lg overflow-hidden border-2 transition-colors ${
                    siteSettings.backgroundVideo?.url === video.url
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <video 
                      src={video.url} 
                      className="w-full h-full object-cover"
                      controls={false}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="w-8 h-8 text-white opacity-80" />
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-900 truncate">{video.filename}</p>
                    <p className="text-xs text-gray-500">{(video.size / (1024 * 1024)).toFixed(1)} MB</p>
                  </div>
                  
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button 
                      onClick={() => selectVideo(video.url)}
                      className="text-white hover:text-red-300 p-2 bg-black bg-opacity-50 rounded-full"
                      title="Use as Background"
                    >
                      <Monitor className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => window.open(video.url, '_blank')}
                      className="text-white hover:text-red-300 p-2 bg-black bg-opacity-50 rounded-full"
                      title="Preview"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => deleteVideo(video.filename)}
                      className="text-white hover:text-red-300 p-2 bg-black bg-opacity-50 rounded-full"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Current Video Preview */}
        {siteSettings.backgroundVideo?.url && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Current Background Video</h3>
            
            <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <video
                src={siteSettings.backgroundVideo.url}
                className="w-full h-full object-cover"
                controls
                muted
                loop
              />
            </div>
          </div>
        )}
        
        {/* Video Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Video Controls</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Enable Background Video</label>
                <p className="text-xs text-gray-500">Show video as background on the hero section</p>
              </div>
              <button
                onClick={toggleVideo}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                  siteSettings.backgroundVideo?.isEnabled ? 'bg-red-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    siteSettings.backgroundVideo?.isEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Opacity: {Math.round((siteSettings.backgroundVideo?.opacity || 0.5) * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={siteSettings.backgroundVideo?.opacity || 0.5}
                onChange={(e) => updateOpacity(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Transparent</span>
                <span>Opaque</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Video Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Advanced Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL (Alternative)
              </label>
              <input
                type="url"
                placeholder="https://example.com/video.mp4"
                value={siteSettings.backgroundVideo?.url || ''}
                onChange={(e) => onUpdate({
                  backgroundVideo: {
                    ...siteSettings.backgroundVideo,
                    url: e.target.value,
                    isEnabled: siteSettings.backgroundVideo?.isEnabled || false,
                    opacity: siteSettings.backgroundVideo?.opacity || 0.5
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter a direct video URL as an alternative to file upload
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fallback Background Color
              </label>
              <input
                type="color"
                value={siteSettings.theme.primaryColor}
                onChange={(e) => onUpdate({
                  theme: {
                    ...siteSettings.theme,
                    primaryColor: e.target.value
                  }
                })}
                className="w-full h-10 border border-gray-300 rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">
                Color to show when video is not available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Settings Tab Component
export function SettingsTab({ 
  siteSettings, 
  onUpdate 
}: {
  siteSettings: SiteSettings
  onUpdate: (updates: Partial<SiteSettings>) => void
}) {
  const [activeSettingsTab, setActiveSettingsTab] = useState('general')

  const settingsTabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'social', label: 'Social Media', icon: Users },
    { id: 'seo', label: 'SEO', icon: Search },
    { id: 'theme', label: 'Theme', icon: Palette }
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Site Settings</h2>
      
      {/* Settings Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSettingsTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSettingsTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
        
        <div className="p-6">
          {activeSettingsTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={siteSettings.siteName}
                    onChange={(e) => onUpdate({ siteName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Description
                  </label>
                  <RichTextEditor
                    value={siteSettings.siteDescription}
                    onChange={(value) => onUpdate({ siteDescription: value })}
                    placeholder="Enter site description..."
                    height="150px"
                  />
                </div>
              </div>
            </div>
          )}
          
          {activeSettingsTab === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={siteSettings.contactEmail}
                    onChange={(e) => onUpdate({ contactEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={siteSettings.contactPhone}
                    onChange={(e) => onUpdate({ contactPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <RichTextEditor
                  value={siteSettings.address}
                  onChange={(value) => onUpdate({ address: value })}
                  placeholder="Enter business address..."
                  height="150px"
                />
              </div>
            </div>
          )}
          
          {activeSettingsTab === 'social' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Facebook className="w-4 h-4 inline mr-2" />
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    value={siteSettings.socialMedia.facebook || ''}
                    onChange={(e) => onUpdate({ 
                      socialMedia: { 
                        ...siteSettings.socialMedia, 
                        facebook: e.target.value 
                      } 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Twitter className="w-4 h-4 inline mr-2" />
                    Twitter URL
                  </label>
                  <input
                    type="url"
                    value={siteSettings.socialMedia.twitter || ''}
                    onChange={(e) => onUpdate({ 
                      socialMedia: { 
                        ...siteSettings.socialMedia, 
                        twitter: e.target.value 
                      } 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Instagram className="w-4 h-4 inline mr-2" />
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={siteSettings.socialMedia.instagram || ''}
                    onChange={(e) => onUpdate({ 
                      socialMedia: { 
                        ...siteSettings.socialMedia, 
                        instagram: e.target.value 
                      } 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Linkedin className="w-4 h-4 inline mr-2" />
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={siteSettings.socialMedia.linkedin || ''}
                    onChange={(e) => onUpdate({ 
                      socialMedia: { 
                        ...siteSettings.socialMedia, 
                        linkedin: e.target.value 
                      } 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}
          
          {activeSettingsTab === 'seo' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={siteSettings.seo.metaTitle}
                  onChange={(e) => onUpdate({ 
                    seo: { 
                      ...siteSettings.seo, 
                      metaTitle: e.target.value 
                    } 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <RichTextEditor
                  value={siteSettings.seo.metaDescription}
                  onChange={(value) => onUpdate({ 
                    seo: { 
                      ...siteSettings.seo, 
                      metaDescription: value 
                    } 
                  })}
                  placeholder="Enter meta description for SEO..."
                  height="200px"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={siteSettings.seo.keywords.join(', ')}
                  onChange={(e) => onUpdate({ 
                    seo: { 
                      ...siteSettings.seo, 
                      keywords: e.target.value.split(',').map(k => k.trim()) 
                    } 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
          
          {activeSettingsTab === 'theme' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <input
                    type="color"
                    value={siteSettings.theme.primaryColor}
                    onChange={(e) => onUpdate({ 
                      theme: { 
                        ...siteSettings.theme, 
                        primaryColor: e.target.value 
                      } 
                    })}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <input
                    type="color"
                    value={siteSettings.theme.secondaryColor}
                    onChange={(e) => onUpdate({ 
                      theme: { 
                        ...siteSettings.theme, 
                        secondaryColor: e.target.value 
                      } 
                    })}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accent Color
                  </label>
                  <input
                    type="color"
                    value={siteSettings.theme.accentColor}
                    onChange={(e) => onUpdate({ 
                      theme: { 
                        ...siteSettings.theme, 
                        accentColor: e.target.value 
                      } 
                    })}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <input
                    type="color"
                    value={siteSettings.theme.backgroundColor}
                    onChange={(e) => onUpdate({ 
                      theme: { 
                        ...siteSettings.theme, 
                        backgroundColor: e.target.value 
                      } 
                    })}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Color
                  </label>
                  <input
                    type="color"
                    value={siteSettings.theme.textColor}
                    onChange={(e) => onUpdate({ 
                      theme: { 
                        ...siteSettings.theme, 
                        textColor: e.target.value 
                      } 
                    })}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Users Tab Component
export function UsersTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">User Management</h3>
          <p className="text-gray-500 mb-4">Advanced user management features coming soon</p>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• User registration and authentication</p>
            <p>• Role-based access control</p>
            <p>• User activity tracking</p>
            <p>• Bulk user operations</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Analytics Tab Component
export function AnalyticsTab({ bikeSubmissions }: { bikeSubmissions: BikeSubmission[] }) {
  const analytics = {
    totalSubmissions: bikeSubmissions.length,
    thisMonth: bikeSubmissions.filter(s => {
      const submissionDate = new Date(s.submittedAt)
      const now = new Date()
      return submissionDate.getMonth() === now.getMonth() && submissionDate.getFullYear() === now.getFullYear()
    }).length,
    avgPrice: bikeSubmissions.length > 0 
      ? Math.round(bikeSubmissions.reduce((sum, s) => sum + s.bikeDetails.expectedPrice, 0) / bikeSubmissions.length)
      : 0,
    topBrands: bikeSubmissions.reduce((acc, s) => {
      acc[s.bikeDetails.brand] = (acc[s.bikeDetails.brand] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }

  const topBrandsList = Object.entries(analytics.topBrands)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
      
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Submissions</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalSubmissions}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.thisMonth}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Expected Price</p>
              <p className="text-2xl font-bold text-gray-900">₹{analytics.avgPrice.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Brands */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Bike Brands</h3>
        <div className="space-y-3">
          {topBrandsList.map(([brand, count]) => (
            <div key={brand} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">{brand}</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div 
                    className="bg-red-600 h-2 rounded-full" 
                    style={{ width: `${(count / analytics.totalSubmissions) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">{count}</span>
              </div>
            </div>
          ))}
        </div>
        
        {topBrandsList.length === 0 && (
          <div className="text-center py-8">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No data available yet</p>
          </div>
        )}
      </div>
    </div>
  )
}