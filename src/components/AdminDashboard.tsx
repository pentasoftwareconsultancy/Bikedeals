'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Bike, 
  Settings, 
  BarChart3, 
  FileText, 
  Image, 
  Edit3, 
  Trash2, 
  Plus,
  Save,
  Eye,
  Download,
  Upload,
  LogOut,
  Video,
  Monitor,
  Palette,
  Globe,
  Shield,
  Database,
  RefreshCw,
  Search,
  Filter,
  Calendar,
  Star,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  PlayCircle,
  PauseCircle,
  StopCircle,
  ChevronDown
} from 'lucide-react'
import {
  SubmissionsTab,
  ContentTab,
  MediaTab,
  BackgroundVideoTab,
  SettingsTab,
  UsersTab,
  AnalyticsTab
} from './AdminTabs'

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

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [bikeSubmissions, setBikeSubmissions] = useState<BikeSubmission[]>([])
  const [contentSections, setContentSections] = useState<ContentSection[]>([])
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: 'BikesDeal',
    siteDescription: 'Your trusted bike selling platform',
    contactEmail: 'info@bikesdeal.com',
    contactPhone: '+1 (555) 123-4567',
    address: '123 Bike Street, City, State 12345',
    socialMedia: {},
    seo: {
      metaTitle: 'BikesDeal - Sell Your Bike Instantly',
      metaDescription: 'Get instant payment for your bike in just 30 minutes. Trusted platform for bike selling.',
      keywords: ['bike selling', 'motorcycle', 'instant payment', 'bike dealer']
    },
    theme: {
      primaryColor: '#dc2626',
      secondaryColor: '#991b1b',
      accentColor: '#fbbf24',
      backgroundColor: '#ffffff',
      textColor: '#1f2937'
    }
  })
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showExportDropdown, setShowExportDropdown] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  // Close export dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showExportDropdown) {
        setShowExportDropdown(false)
      }
    }

    if (showExportDropdown) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showExportDropdown])

  const loadData = () => {
    setIsLoading(true)
    
    // Load bike submissions from localStorage
    const savedSubmissions = localStorage.getItem('bikeSubmissions')
    if (savedSubmissions) {
      setBikeSubmissions(JSON.parse(savedSubmissions))
    }

    // Load content sections from localStorage
    const savedContent = localStorage.getItem('contentSections')
    if (savedContent) {
      setContentSections(JSON.parse(savedContent))
    } else {
      // Initialize default content sections
      const defaultSections: ContentSection[] = [
        {
          id: '1',
          title: 'Hero Section',
          content: 'Just Instant Payment in 30 MINUTES',
          description: 'Main hero banner with call-to-action',
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
          title: 'Services Section',
          content: 'Our comprehensive bike selling services',
          description: 'Overview of services offered',
          images: [],
          isVisible: true,
          order: 2
        },
        {
          id: '3',
          title: 'How It Works',
          content: 'Simple 3-step process to sell your bike',
          description: 'Step-by-step guide for users',
          images: [],
          isVisible: true,
          order: 3
        },
        {
          id: '4',
          title: 'Testimonials',
          content: 'What our customers say about us',
          description: 'Customer reviews and feedback',
          images: [],
          isVisible: true,
          order: 4
        },
        {
          id: '5',
          title: 'Partners',
          content: 'Our trusted partners and affiliates',
          description: 'Partner logos and information',
          images: [],
          isVisible: true,
          order: 5
        },
        {
          id: '6',
          title: 'Contact Information',
          content: 'Get in touch with us',
          description: 'Contact details and form',
          images: [],
          isVisible: true,
          order: 6
        }
      ]
      setContentSections(defaultSections)
      localStorage.setItem('contentSections', JSON.stringify(defaultSections))
    }

    // Load site settings
    const savedSettings = localStorage.getItem('siteSettings')
    if (savedSettings) {
      setSiteSettings(JSON.parse(savedSettings))
    }
    
    setIsLoading(false)
  }

  const updateBikeSubmissionStatus = (id: string, status: BikeSubmission['status']) => {
    const updatedSubmissions = bikeSubmissions.map(submission => 
      submission.id === id ? { ...submission, status } : submission
    )
    setBikeSubmissions(updatedSubmissions)
    localStorage.setItem('bikeSubmissions', JSON.stringify(updatedSubmissions))
  }

  const deleteBikeSubmission = (id: string) => {
    const updatedSubmissions = bikeSubmissions.filter(submission => submission.id !== id)
    setBikeSubmissions(updatedSubmissions)
    localStorage.setItem('bikeSubmissions', JSON.stringify(updatedSubmissions))
  }

  const updateContentSection = (id: string, updates: Partial<ContentSection>) => {
    const updatedSections = contentSections.map(section => 
      section.id === id ? { ...section, ...updates } : section
    )
    setContentSections(updatedSections)
    localStorage.setItem('contentSections', JSON.stringify(updatedSections))
  }

  const addContentSection = () => {
    const newSection: ContentSection = {
      id: Date.now().toString(),
      title: 'New Section',
      content: 'Enter your content here...',
      description: 'Section description',
      images: [],
      isVisible: true,
      order: contentSections.length + 1
    }
    const updatedSections = [...contentSections, newSection]
    setContentSections(updatedSections)
    localStorage.setItem('contentSections', JSON.stringify(updatedSections))
  }

  const deleteContentSection = (id: string) => {
    const updatedSections = contentSections.filter(section => section.id !== id)
    setContentSections(updatedSections)
    localStorage.setItem('contentSections', JSON.stringify(updatedSections))
  }

  const updateSiteSettings = (updates: Partial<SiteSettings>) => {
    const updatedSettings = { ...siteSettings, ...updates }
    setSiteSettings(updatedSettings)
    localStorage.setItem('siteSettings', JSON.stringify(updatedSettings))
  }

  const exportData = (type: 'all' | 'submissions' | 'content' | 'settings' = 'all') => {
    let data: any = {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      type: type
    }
    
    let filename = 'bikesdeal'
    
    switch (type) {
      case 'submissions':
        data.bikeSubmissions = bikeSubmissions
        filename += '-submissions'
        break
      case 'content':
        data.contentSections = contentSections
        filename += '-content'
        break
      case 'settings':
        data.siteSettings = siteSettings
        filename += '-settings'
        break
      default:
        data = {
          bikeSubmissions,
          contentSections,
          siteSettings,
          exportedAt: new Date().toISOString(),
          version: '1.0',
          type: 'all'
        }
        filename += '-complete'
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string)
          
          // Validate data structure
          if (!data.exportedAt || !data.version) {
            throw new Error('Invalid file format. Missing required metadata.')
          }
          
          let importedItems: string[] = []
          
          // Import bike submissions
          if (data.bikeSubmissions && Array.isArray(data.bikeSubmissions)) {
            setBikeSubmissions(data.bikeSubmissions)
            localStorage.setItem('bikeSubmissions', JSON.stringify(data.bikeSubmissions))
            importedItems.push(`${data.bikeSubmissions.length} bike submissions`)
          }
          
          // Import content sections
          if (data.contentSections && Array.isArray(data.contentSections)) {
            setContentSections(data.contentSections)
            localStorage.setItem('contentSections', JSON.stringify(data.contentSections))
            importedItems.push(`${data.contentSections.length} content sections`)
          }
          
          // Import site settings
          if (data.siteSettings && typeof data.siteSettings === 'object') {
            setSiteSettings(data.siteSettings)
            localStorage.setItem('siteSettings', JSON.stringify(data.siteSettings))
            importedItems.push('site settings')
          }
          
          if (importedItems.length === 0) {
            throw new Error('No valid data found in the file.')
          }
          
          alert(`Data imported successfully!\n\nImported: ${importedItems.join(', ')}\nExported on: ${new Date(data.exportedAt).toLocaleString()}`)
          
        } catch (error) {
          console.error('Import error:', error)
          alert(`Error importing data: ${error instanceof Error ? error.message : 'Please check the file format.'}`)
        }
      }
      reader.readAsText(file)
    }
    
    // Reset the input value to allow importing the same file again
    event.target.value = ''
  }

  const filteredSubmissions = bikeSubmissions.filter(submission => {
    const matchesSearch = submission.ownerInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.bikeDetails.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.bikeDetails.model.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || submission.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'submissions', label: 'Bike Submissions', icon: Bike },
    { id: 'content', label: 'Content Management', icon: FileText },
    { id: 'media', label: 'Media Library', icon: Image },
    { id: 'background', label: 'Background Video', icon: Video },
    { id: 'settings', label: 'Site Settings', icon: Settings },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-red-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">BikesDeal Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Export Dropdown */}
              <div className="relative">
                <button
                   onClick={(e) => {
                     e.stopPropagation()
                     setShowExportDropdown(!showExportDropdown)
                   }}
                   className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                 >
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
                
                {showExportDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <button
                        onClick={() => { exportData('all'); setShowExportDropdown(false) }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Database className="w-4 h-4 inline mr-2" />
                        Complete Backup
                      </button>
                      <button
                        onClick={() => { exportData('submissions'); setShowExportDropdown(false) }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Bike className="w-4 h-4 inline mr-2" />
                        Bike Submissions Only
                      </button>
                      <button
                        onClick={() => { exportData('content'); setShowExportDropdown(false) }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FileText className="w-4 h-4 inline mr-2" />
                        Content Sections Only
                      </button>
                      <button
                        onClick={() => { exportData('settings'); setShowExportDropdown(false) }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings className="w-4 h-4 inline mr-2" />
                        Site Settings Only
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <label className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Import Data
                <input
                  type="file"
                  accept=".json"
                  onChange={importData}
                  className="hidden"
                />
              </label>
              <button
                onClick={onLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-sm mr-8">
            <nav className="p-4">
              <ul className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          activeTab === tab.id
                            ? 'bg-red-100 text-red-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {tab.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <DashboardTab 
                bikeSubmissions={bikeSubmissions} 
                contentSections={contentSections}
                siteSettings={siteSettings}
              />
            )}
            {activeTab === 'submissions' && (
              <SubmissionsTab 
                bikeSubmissions={filteredSubmissions}
                onUpdateStatus={updateBikeSubmissionStatus}
                onDelete={deleteBikeSubmission}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
              />
            )}
            {activeTab === 'content' && (
              <ContentTab 
                contentSections={contentSections}
                onUpdate={updateContentSection}
                onAdd={addContentSection}
                onDelete={deleteContentSection}
              />
            )}
            {activeTab === 'media' && <MediaTab />}
            {activeTab === 'background' && (
              <BackgroundVideoTab 
                siteSettings={siteSettings}
                onUpdate={updateSiteSettings}
              />
            )}
            {activeTab === 'settings' && (
              <SettingsTab 
                siteSettings={siteSettings}
                onUpdate={updateSiteSettings}
              />
            )}
            {activeTab === 'users' && <UsersTab />}
            {activeTab === 'analytics' && <AnalyticsTab bikeSubmissions={bikeSubmissions} />}
          </div>
        </div>
      </div>
    </div>
  )
}

// Dashboard Tab Component
function DashboardTab({ bikeSubmissions, contentSections, siteSettings }: {
  bikeSubmissions: BikeSubmission[]
  contentSections: ContentSection[]
  siteSettings: SiteSettings
}) {
  const stats = {
    totalSubmissions: bikeSubmissions.length,
    pendingSubmissions: bikeSubmissions.filter(s => s.status === 'pending').length,
    approvedSubmissions: bikeSubmissions.filter(s => s.status === 'approved').length,
    rejectedSubmissions: bikeSubmissions.filter(s => s.status === 'rejected').length,
    totalSections: contentSections.length,
    visibleSections: contentSections.filter(s => s.isVisible).length
  }

  const recentSubmissions = bikeSubmissions
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bike className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSubmissions}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingSubmissions}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approvedSubmissions}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Content Sections</p>
                <p className="text-2xl font-bold text-gray-900">{stats.visibleSections}/{stats.totalSections}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Submissions</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentSubmissions.length > 0 ? (
              recentSubmissions.map((submission) => (
                <div key={submission.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {submission.bikeDetails.brand} {submission.bikeDetails.model}
                      </p>
                      <p className="text-sm text-gray-500">
                        {submission.ownerInfo.name} • {new Date(submission.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                      submission.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <Bike className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No submissions yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Continue with other tab components...
// [The file continues with SubmissionsTab, ContentTab, MediaTab, BackgroundVideoTab, SettingsTab, UsersTab, and AnalyticsTab components]
// Due to length constraints, I'll create these in separate files or continue in the next part