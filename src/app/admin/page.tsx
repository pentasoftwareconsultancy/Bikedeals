// src/app/admin/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSiteContent } from "../../contexts/SiteContentContext";
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
  Video,
  MessageSquare,
} from "lucide-react";

/* ----------------------------- TYPES / INTERFACES ----------------------------- */

interface WebsiteContent {
  header: {
    siteName: string;
    navigationItems: { name: string; href: string }[];
    ctaButtonText: string;
  };
  footer: {
    companyName: string;
    companyDescription: string;
    phone: string;
    email: string;
    address: string;
    newsletterTitle: string;
    newsletterDescription: string;
    subscribeButtonText: string;
    copyright: string;
    footerLinks: Record<string, { name: string; href: string }[]>;
    socialLinks: { name: string; href: string; color: string }[];
  };
  hero: {
    mainTitle: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
  contact: {
    title: string;
    content: string;
    formTitle: string;
    contactInfoTitle?: string;
    socialMediaTitle?: string;
    contactInfo: { title: string; details: string[] }[];
  };
}

interface BikeSubmission {
  id: string;
  ownerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  bikeDetails: {
    brand: string;
    model: string;
    year: number;
    kmDriven: number;
    fuelType: string;
    transmission: string;
    owners: number;
    registrationState: string;
    expectedPrice: number;
  };
  additionalInfo: {
    condition: string;
    modifications: string;
    accidentHistory: string;
    serviceHistory: string;
    reason: string;
    urgency: string;
  };
  images: string[];
  submittedAt: string;
  status: "pending" | "reviewed" | "approved" | "rejected";
}

interface ContentSection {
  id: string;
  title: string;
  content: string;
  images: string[];
  isVisible: boolean;
}

/* ----------------------------- MAIN COMPONENT ----------------------------- */

export default function AdminPanel() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [bikeSubmissions, setBikeSubmissions] = useState<BikeSubmission[]>(
    []
  );
  const [contentSections, setContentSections] = useState<ContentSection[]>(
    []
  );

  useEffect(() => {
    // Check authentication first
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          setIsAuthenticated(true);
          loadData();
        } else {
          // Not authenticated, redirect to login
          router.push("/secret-admin-portal-x9k2m");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/secret-admin-portal-x9k2m");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const loadData = () => {
    // Load bike submissions from localStorage
    const savedSubmissions = localStorage.getItem("bikeSubmissions");
    if (savedSubmissions) {
      setBikeSubmissions(JSON.parse(savedSubmissions));
    }

    // Load content sections from localStorage
    const savedContent = localStorage.getItem("contentSections");
    if (savedContent) {
      setContentSections(JSON.parse(savedContent));
    } else {
      // Initialize default content sections
      const defaultSections: ContentSection[] = [
        {
          id: "1",
          title: "Hero Section",
          content: "Just Instant Payment in 30 MINUTES",
          images: [],
          isVisible: true,
        },
        {
          id: "2",
          title: "Services Section",
          content: "Our comprehensive bike selling services",
          images: [],
          isVisible: true,
        },
        {
          id: "3",
          title: "Testimonials Section",
          content: "What our customers say about us",
          images: [],
          isVisible: true,
        },
      ];
      setContentSections(defaultSections);
      localStorage.setItem("contentSections", JSON.stringify(defaultSections));
    }
  };

  const updateSubmissionStatus = (
    id: string,
    status: BikeSubmission["status"]
  ) => {
    const updatedSubmissions = bikeSubmissions.map((submission) =>
      submission.id === id ? { ...submission, status } : submission
    );
    setBikeSubmissions(updatedSubmissions);
    localStorage.setItem("bikeSubmissions", JSON.stringify(updatedSubmissions));
  };

  const deleteSubmission = (id: string) => {
    const updatedSubmissions = bikeSubmissions.filter(
      (submission) => submission.id !== id
    );
    setBikeSubmissions(updatedSubmissions);
    localStorage.setItem("bikeSubmissions", JSON.stringify(updatedSubmissions));
  };

  const updateContentSection = (
    id: string,
    updates: Partial<ContentSection>
  ) => {
    const updatedSections = contentSections.map((section) =>
      section.id === id ? { ...section, ...updates } : section
    );
    setContentSections(updatedSections);
    localStorage.setItem("contentSections", JSON.stringify(updatedSections));
  };

  const addContentSection = () => {
    const newSection: ContentSection = {
      id: Date.now().toString(),
      title: "New Section",
      content: "Enter your content here...",
      images: [],
      isVisible: true,
    };
    const updatedSections = [...contentSections, newSection];
    setContentSections(updatedSections);
    localStorage.setItem("contentSections", JSON.stringify(updatedSections));
  };

  const deleteContentSection = (id: string) => {
    const updatedSections = contentSections.filter((section) => section.id !== id);
    setContentSections(updatedSections);
    localStorage.setItem("contentSections", JSON.stringify(updatedSections));
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    router.push("/secret-admin-portal-x9k2m");
  };

  const exportData = () => {
    const data = {
      bikeSubmissions,
      contentSections,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bikesdeal-data-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: "dashboard", name: "Dashboard", icon: BarChart3 },
    { id: "submissions", name: "Bike Submissions", icon: Bike },
    { id: "contact", name: "Contact Submissions", icon: MessageSquare },
    { id: "content", name: "Content Management", icon: FileText },
    { id: "website", name: "Website Editor", icon: Edit3 },
    { id: "users", name: "Users", icon: Users },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">BikesDeal Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={exportData}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download size={16} className="mr-2" />
                Export Data
              </button>
              <a
                href="/"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Eye size={16} className="mr-2" />
                View Site
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-red-50 text-red-700 border-r-2 border-red-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <IconComponent size={20} className="mr-3" />
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === "dashboard" && (
            <DashboardTab bikeSubmissions={bikeSubmissions} contentSections={contentSections} />
          )}

          {activeTab === "submissions" && (
            <SubmissionsTab
              bikeSubmissions={bikeSubmissions}
              onUpdateStatus={updateSubmissionStatus}
              onDelete={deleteSubmission}
            />
          )}

          {activeTab === "contact" && <ContactSubmissionsTab />}

          {activeTab === "content" && (
            <ContentTab
              contentSections={contentSections}
              onUpdate={updateContentSection}
              onAdd={addContentSection}
              onDelete={deleteContentSection}
            />
          )}

          {activeTab === "website" && <WebsiteEditorTab />}

          {activeTab === "users" && <UsersTab />}
          {activeTab === "settings" && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}

/* ----------------------------- WEBSITE EDITOR TAB ----------------------------- */

function WebsiteEditorTab() {
  // typed state
  const [websiteContent, setWebsiteContent] = useState<WebsiteContent>({
    header: {
      siteName: "BikesDeal",
      navigationItems: [
        { name: "Hero Section", href: "#hero" },
        { name: "Services", href: "#services" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "Partners", href: "#partners" },
        { name: "Contact Info", href: "#contact" },
        { name: "How It Works", href: "#how-it-works" },
      ],
      ctaButtonText: "Sell Now",
    },
    footer: {
      companyName: "BikesDeal",
      companyDescription:
        "India's most trusted platform for buying and selling pre-owned motorcycles. Get the best value for your bike with our transparent and hassle-free process.",
      phone: "+91-9876543210",
      email: "info@bikesdeal.com",
      address: "123 Bike Street, Mumbai, 400001",
      newsletterTitle: "Stay Updated",
      newsletterDescription: "Subscribe to get the latest news and offers",
      subscribeButtonText: "Subscribe",
      copyright: "© 2025 BikesDeal. All rights reserved. | Made with ❤️ in India",
      footerLinks: {
        company: [
          { name: "About Us", href: "#about" },
          { name: "How It Works", href: "#how-it-works" },
          { name: "Our Services", href: "#services" },
          { name: "Careers", href: "#careers" },
          { name: "Press", href: "#press" },
        ],
        services: [
          { name: "Sell Your Bike", href: "#sell" },
          { name: "Buy Bikes", href: "#buy" },
          { name: "Bike Valuation", href: "#valuation" },
          { name: "Home Inspection", href: "#inspection" },
          { name: "Documentation", href: "#docs" },
        ],
        support: [
          { name: "Help Center", href: "#help" },
          { name: "Contact Us", href: "#contact" },
          { name: "FAQ", href: "#faq" },
          { name: "Live Chat", href: "#chat" },
          { name: "Report Issue", href: "#report" },
        ],
        legal: [
          { name: "Privacy Policy", href: "#privacy" },
          { name: "Terms of Service", href: "#terms" },
          { name: "Cookie Policy", href: "#cookies" },
          { name: "Refund Policy", href: "#refund" },
          { name: "Disclaimer", href: "#disclaimer" },
        ],
      },
      socialLinks: [
        { name: "Facebook", href: "#", color: "hover:bg-blue-600" },
        { name: "Twitter", href: "#", color: "hover:bg-blue-400" },
        { name: "Instagram", href: "#", color: "hover:bg-pink-600" },
        { name: "Youtube", href: "#", color: "hover:bg-red-600" },
      ],
    },
    hero: {
      mainTitle: "BikesDeal",
      description:
        "Your trusted partner for buying and selling premium motorcycles. Experience the fastest and most secure bike dealing platform.",
      primaryButtonText: "Sell Your Bike Now",
      secondaryButtonText: "Contact on WhatsApp",
    },
    contact: {
      title: "Contact Us",
      content:
        "Have questions or need assistance? Our team is here to help you with any inquiries about selling or buying bikes.",
      formTitle: "Send Us a Message",
      contactInfoTitle: "Contact Information",
      socialMediaTitle: "Follow Us",
      contactInfo: [
        {
          title: "Phone",
          details: ["+91-9876543210", "+91-9876543211"],
        },
        {
          title: "Email",
          details: ["info@bikesdeal.com", "support@bikesdeal.com"],
        },
        {
          title: "Address",
          details: ["BikesDeal Headquarters", "123 Bike Street, Mumbai, 400001"],
        },
        {
          title: "Working Hours",
          details: ["Monday - Saturday: 9AM - 8PM", "Sunday: 10AM - 5PM"],
        },
      ],
    },
  });

  const [activeSection, setActiveSection] = useState<keyof WebsiteContent>("header");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Load website content from localStorage
    const savedContent = localStorage.getItem("websiteContent");
    if (savedContent) {
      const parsedContent = JSON.parse(savedContent);
      // Check if the header navigation items contain "Bikes for Sale" and remove it
      if (parsedContent.header?.navigationItems) {
        parsedContent.header.navigationItems = parsedContent.header.navigationItems.filter(
          (item: { name: string; href: string }) => item.name !== "Bikes for Sale"
        );
      }
      setWebsiteContent(parsedContent);
    } else {
      // Try to load from SiteContentContext format
      const savedSections = localStorage.getItem("bikesdeal_content_sections");
      if (savedSections) {
        const sections = JSON.parse(savedSections);
        const headerSection = (sections as any).find((s: { id: string; fields?: any }) => s.id === "header");
        const footerSection = (sections as any).find((s: { id: string; fields?: any }) => s.id === "footer");
        const heroSection = (sections as any).find((s: { id: string; fields?: any }) => s.id === "1" || s.id === "hero");
        const contactSection = (sections as any).find((s: { id: string; fields?: any }) => s.id === "contact");

        if (headerSection?.fields || footerSection?.fields || heroSection?.fields || contactSection?.fields) {
          const loadedContent: Partial<WebsiteContent> = {
            ...(headerSection?.fields && { header: headerSection.fields }),
            ...(footerSection?.fields && { footer: footerSection.fields }),
            ...(heroSection?.fields && {
              hero: {
                mainTitle: heroSection.fields.mainTitle || "BikesDeal",
                description:
                  heroSection.fields.description ||
                  "Your trusted partner for buying and selling premium motorcycles. Experience the fastest and most secure bike dealing platform.",
                primaryButtonText: heroSection.fields.primaryButtonText || "Sell Your Bike Now",
                secondaryButtonText: heroSection.fields.secondaryButtonText || "Contact on WhatsApp",
              } as WebsiteContent["hero"],
            }),
            ...(contactSection?.fields && { contact: contactSection.fields }),
          };

          // Remove "Bikes for Sale" from navigation items if it exists
          if ((loadedContent as any).header?.navigationItems) {
            (loadedContent as any).header.navigationItems = (loadedContent as any).header.navigationItems.filter(
              (item: { name: string; href: string }) => item.name !== "Bikes for Sale"
            );
          }

          setWebsiteContent((prev) => ({ ...prev, ...(loadedContent as Partial<WebsiteContent>) }));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearOldData = () => {
    // Clear old localStorage data to force refresh
    localStorage.removeItem("websiteContent");
    localStorage.removeItem("bikesdeal_content_sections");
    localStorage.removeItem("contentSections");
    window.location.reload();
  };

  const saveChanges = () => {
    // Ensure "Bikes for Sale" is not in navigation items before saving
    const cleanedWebsiteContent: WebsiteContent = {
      ...websiteContent,
      header: {
        ...websiteContent.header,
        navigationItems: websiteContent.header.navigationItems?.filter(
          (item) => item.name !== "Bikes for Sale"
        ) || [],
      },
    };

    localStorage.setItem("websiteContent", JSON.stringify(cleanedWebsiteContent));

    // Load existing content sections to preserve other sections
    const existingContentSections = JSON.parse(localStorage.getItem("bikesdeal_content_sections") || "[]") as any[];

    // Update or add the website content sections
    const websiteContentSections = [
      {
        id: "header",
        title: "Header",
        content: "Header navigation and branding",
        description: "Website header content",
        images: [],
        isVisible: true,
        order: 0,
        fields: cleanedWebsiteContent.header,
      },
      {
        id: "footer",
        title: "Footer",
        content: "Footer information and links",
        description: "Website footer content",
        images: [],
        isVisible: true,
        order: 100,
        fields: cleanedWebsiteContent.footer,
      },
      {
        id: "1",
        title: "Hero Section",
        content: "Find Your Perfect Ride Today",
        description: "Main hero section content",
        images: [],
        isVisible: true,
        order: 1,
        metadata: {
          backgroundColor: "#dc2626",
          textColor: "#ffffff",
        },
        fields: {
          bannerTitle: "Just Instant Payment",
          bannerSubtitle: "in 30 MINUTES",
          mainTitle: cleanedWebsiteContent.hero.mainTitle,
          description: cleanedWebsiteContent.hero.description,
          primaryButtonText: cleanedWebsiteContent.hero.primaryButtonText,
          secondaryButtonText: cleanedWebsiteContent.hero.secondaryButtonText,
        },
      },
      {
        id: "contact",
        title: "Contact Section",
        content: "Contact information and form",
        description: "Contact section content",
        images: [],
        isVisible: true,
        order: 10,
        fields: cleanedWebsiteContent.contact,
      },
    ];

    // Merge with existing sections, replacing matching IDs
    const updatedContentSections = (existingContentSections || [])
      .filter((section: { id: string }) => !["header", "footer", "1", "contact"].includes(section.id))
      .concat(websiteContentSections);

    // Save to the correct localStorage key that SiteContentContext uses
    localStorage.setItem("bikesdeal_content_sections", JSON.stringify(updatedContentSections));

    // Also save to the old key for backward compatibility
    localStorage.setItem("contentSections", JSON.stringify(updatedContentSections));

    setHasChanges(false);
    alert("Website content saved successfully! Please refresh the main website to see changes.");
  };

  /* ---------------------- Typed update helpers ---------------------- */

  // updateContent: strongly typed section + field
  const updateContent = <K extends keyof WebsiteContent>(
    section: K,
    field: keyof WebsiteContent[K],
    value: any
  ) => {
    setWebsiteContent((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field as string]: value,
      },
    }));
    setHasChanges(true);
  };

  // updateNestedContent: for nested objects, e.g., footer.footerLinks.category
  const updateNestedContent = <K extends keyof WebsiteContent>(
    section: K,
    field: keyof WebsiteContent[K],
    subField: string,
    value: any
  ) => {
    setWebsiteContent((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field as string]: {
          ...((prev[section] as any)[field as string]),
          [subField]: value,
        },
      },
    }));
    setHasChanges(true);
  };

  // updateArrayItem: update an item inside an array field
  const updateArrayItem = <K extends keyof WebsiteContent>(
    section: K,
    field: keyof WebsiteContent[K],
    index: number,
    itemField: string,
    value: any
  ) => {
    setWebsiteContent((prev) => {
      const currentArray = [...(((prev[section] as any)[field as string]) || [])];
      currentArray[index] = { ...(currentArray[index] || {}), [itemField]: value };
      return {
        ...prev,
        [section]: {
          ...(prev[section] as any),
          [field as string]: currentArray,
        },
      } as WebsiteContent;
    });
    setHasChanges(true);
  };

  const addArrayItem = <K extends keyof WebsiteContent>(section: K, field: keyof WebsiteContent[K], newItem: any) => {
    setWebsiteContent((prev) => {
      const currentArray = [...(((prev[section] as any)[field as string]) || []), newItem];
      return {
        ...prev,
        [section]: {
          ...(prev[section] as any),
          [field as string]: currentArray,
        },
      } as WebsiteContent;
    });
    setHasChanges(true);
  };

  const removeArrayItem = <K extends keyof WebsiteContent>(section: K, field: keyof WebsiteContent[K], index: number) => {
    setWebsiteContent((prev) => {
      const currentArray = [...(((prev[section] as any)[field as string]) || [])].filter((_: any, i: number) => i !== index);
      return {
        ...prev,
        [section]: {
          ...(prev[section] as any),
          [field as string]: currentArray,
        },
      } as WebsiteContent;
    });
    setHasChanges(true);
  };

  /* ---------------------- UI / JSX for Website Editor ---------------------- */

  const sections = [
    { id: "header", name: "Header & Navigation", icon: "🏠" },
    { id: "hero", name: "Hero Section", icon: "🎯" },
    { id: "contact", name: "Contact Information", icon: "📞" },
    { id: "footer", name: "Footer & Links", icon: "🔗" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Website Editor</h2>
        <div className="flex gap-3">
          <button
            onClick={clearOldData}
            className="flex items-center px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700"
            title="Clear cached data and refresh admin panel"
          >
            <Save size={16} className="mr-2" />
            Refresh Data
          </button>
          <button
            onClick={saveChanges}
            disabled={!hasChanges}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              hasChanges ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Save size={16} className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sections</h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as keyof WebsiteContent)}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                    activeSection === section.id
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="mr-3 text-lg">{section.icon}</span>
                  {section.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Header Section */}
            {activeSection === "header" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Header & Navigation</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                    <input
                      type="text"
                      value={websiteContent.header.siteName}
                      onChange={(e) => updateContent("header", "siteName", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Text</label>
                    <input
                      type="text"
                      value={websiteContent.header.ctaButtonText}
                      onChange={(e) => updateContent("header", "ctaButtonText", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Navigation Items</label>
                  <div className="space-y-3">
                    {websiteContent.header.navigationItems.map((item, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <input
                          type="text"
                          placeholder="Name"
                          value={item.name}
                          onChange={(e) =>
                            updateArrayItem("header", "navigationItems", index, "name", e.target.value)
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Link (e.g., #section)"
                          value={item.href}
                          onChange={(e) =>
                            updateArrayItem("header", "navigationItems", index, "href", e.target.value)
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => removeArrayItem("header", "navigationItems", index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addArrayItem("header", "navigationItems", { name: "New Item", href: "#new" })}
                      className="flex items-center px-3 py-2 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Navigation Item
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Hero Section */}
            {activeSection === "hero" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Hero Section</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Main Title</label>
                  <input
                    type="text"
                    value={websiteContent.hero.mainTitle}
                    onChange={(e) => updateContent("hero", "mainTitle", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={websiteContent.hero.description}
                    onChange={(e) => updateContent("hero", "description", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Button Text</label>
                    <input
                      type="text"
                      value={websiteContent.hero.primaryButtonText}
                      onChange={(e) => updateContent("hero", "primaryButtonText", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Button Text</label>
                    <input
                      type="text"
                      value={websiteContent.hero.secondaryButtonText}
                      onChange={(e) => updateContent("hero", "secondaryButtonText", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Contact Section */}
            {activeSection === "contact" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                    <input
                      type="text"
                      value={websiteContent.contact.title}
                      onChange={(e) => updateContent("contact", "title", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Form Title</label>
                    <input
                      type="text"
                      value={websiteContent.contact.formTitle}
                      onChange={(e) => updateContent("contact", "formTitle", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label>
                  <textarea
                    value={websiteContent.contact.content}
                    onChange={(e) => updateContent("contact", "content", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Information</label>
                  <div className="space-y-4">
                    {websiteContent.contact.contactInfo.map((info, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <input
                            type="text"
                            placeholder="Title (e.g., Phone, Email)"
                            value={info.title}
                            onChange={(e) => updateArrayItem("contact", "contactInfo", index, "title", e.target.value)}
                            className="font-medium px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                          <button
                            onClick={() => removeArrayItem("contact", "contactInfo", index)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded-md"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="space-y-2">
                          {info.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex gap-2">
                              <input
                                type="text"
                                value={detail}
                                onChange={(e) => {
                                  const newDetails = [...info.details];
                                  newDetails[detailIndex] = e.target.value;
                                  updateArrayItem("contact", "contactInfo", index, "details", newDetails);
                                }}
                                className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              />
                              <button
                                onClick={() => {
                                  const newDetails = info.details.filter((_, i) => i !== detailIndex);
                                  updateArrayItem("contact", "contactInfo", index, "details", newDetails);
                                }}
                                className="p-1 text-red-600 hover:bg-red-50 rounded-md"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => {
                              const newDetails = [...info.details, "New detail"];
                              updateArrayItem("contact", "contactInfo", index, "details", newDetails);
                            }}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            + Add Detail
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => addArrayItem("contact", "contactInfo", { title: "New Contact", details: ["Detail 1"] })}
                      className="flex items-center px-3 py-2 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Contact Info
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Section */}
            {activeSection === "footer" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Footer & Links</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      value={websiteContent.footer.companyName}
                      onChange={(e) => updateContent("footer", "companyName", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="text"
                      value={websiteContent.footer.phone}
                      onChange={(e) => updateContent("footer", "phone", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={websiteContent.footer.email}
                      onChange={(e) => updateContent("footer", "email", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={websiteContent.footer.address}
                      onChange={(e) => updateContent("footer", "address", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
                  <textarea
                    value={websiteContent.footer.companyDescription}
                    onChange={(e) => updateContent("footer", "companyDescription", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Newsletter Title</label>
                    <input
                      type="text"
                      value={websiteContent.footer.newsletterTitle}
                      onChange={(e) => updateContent("footer", "newsletterTitle", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Newsletter Description</label>
                    <input
                      type="text"
                      value={websiteContent.footer.newsletterDescription}
                      onChange={(e) => updateContent("footer", "newsletterDescription", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subscribe Button Text</label>
                    <input
                      type="text"
                      value={websiteContent.footer.subscribeButtonText}
                      onChange={(e) => updateContent("footer", "subscribeButtonText", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
                  <input
                    type="text"
                    value={websiteContent.footer.copyright}
                    onChange={(e) => updateContent("footer", "copyright", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Footer Links */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Footer Links</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(websiteContent.footer.footerLinks).map(([category, links]) => (
                      <div key={category} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3 capitalize">{category}</h4>
                        <div className="space-y-2">
                          {links.map((link, index) => (
                            <div key={index} className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Name"
                                value={link.name}
                                onChange={(e) => {
                                  const newLinks = [...links];
                                  newLinks[index] = { ...newLinks[index], name: e.target.value };
                                  updateNestedContent("footer", "footerLinks", category, newLinks);
                                }}
                                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-red-500 focus:border-transparent"
                              />
                              <input
                                type="text"
                                placeholder="Link"
                                value={link.href}
                                onChange={(e) => {
                                  const newLinks = [...links];
                                  newLinks[index] = { ...newLinks[index], href: e.target.value };
                                  updateNestedContent("footer", "footerLinks", category, newLinks);
                                }}
                                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-red-500 focus:border-transparent"
                              />
                              <button
                                onClick={() => {
                                  const newLinks = links.filter((_, i) => i !== index);
                                  updateNestedContent("footer", "footerLinks", category, newLinks);
                                }}
                                className="p-1 text-red-600 hover:bg-red-50 rounded-md"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => {
                              const newLinks = [...links, { name: "New Link", href: "#" }];
                              updateNestedContent("footer", "footerLinks", category, newLinks);
                            }}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            + Add Link
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Social Media Links</label>
                  <div className="space-y-3">
                    {websiteContent.footer.socialLinks.map((social, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <input
                          type="text"
                          placeholder="Platform Name"
                          value={social.name}
                          onChange={(e) => updateArrayItem("footer", "socialLinks", index, "name", e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <input
                          type="url"
                          placeholder="Social Media URL"
                          value={social.href}
                          onChange={(e) => updateArrayItem("footer", "socialLinks", index, "href", e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Hover Color Class"
                          value={social.color}
                          onChange={(e) => updateArrayItem("footer", "socialLinks", index, "color", e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => removeArrayItem("footer", "socialLinks", index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addArrayItem("footer", "socialLinks", { name: "New Platform", href: "#", color: "hover:bg-gray-600" })}
                      className="flex items-center px-3 py-2 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Social Link
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- DASHBOARD TAB ----------------------------- */

function DashboardTab({ bikeSubmissions, contentSections }: { bikeSubmissions: BikeSubmission[]; contentSections: ContentSection[] }) {
  const stats = {
    totalSubmissions: bikeSubmissions.length,
    pendingReview: bikeSubmissions.filter((s) => s.status === "pending").length,
    approved: bikeSubmissions.filter((s) => s.status === "approved").length,
    rejected: bikeSubmissions.filter((s) => s.status === "rejected").length,
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bike className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Submissions</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalSubmissions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingReview}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Settings className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Content Sections</p>
              <p className="text-2xl font-bold text-gray-900">{contentSections.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Submissions</h3>
        </div>
        <div className="p-6">
          {bikeSubmissions.slice(0, 5).map((submission) => (
            <div key={submission.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div>
                <p className="font-medium text-gray-900">{submission.ownerInfo.name}</p>
                <p className="text-sm text-gray-600">{submission.bikeDetails.brand} {submission.bikeDetails.model}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  submission.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                  submission.status === "approved" ? "bg-green-100 text-green-800" :
                  submission.status === "rejected" ? "bg-red-100 text-red-800" :
                  "bg-blue-100 text-blue-800"
                }`}>{submission.status}</span>
                <p className="text-sm text-gray-500">{new Date(submission.submittedAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- SUBMISSIONS TAB ----------------------------- */

function SubmissionsTab({ bikeSubmissions, onUpdateStatus, onDelete }: { bikeSubmissions: BikeSubmission[]; onUpdateStatus: (id: string, status: BikeSubmission["status"]) => void; onDelete: (id: string) => void; }) {
  const [selectedSubmission, setSelectedSubmission] = useState<BikeSubmission | null>(null);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Bike Submissions</h2>
        <p className="text-gray-600">{bikeSubmissions.length} total submissions</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bike Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bikeSubmissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{submission.ownerInfo.name}</p>
                      <p className="text-sm text-gray-500">{submission.ownerInfo.email}</p>
                      <p className="text-sm text-gray-500">{submission.ownerInfo.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{submission.bikeDetails.brand} {submission.bikeDetails.model}</p>
                      <p className="text-sm text-gray-500">{submission.bikeDetails.year} • {submission.bikeDetails.kmDriven} km</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">₹{submission.bikeDetails.expectedPrice.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={submission.status}
                      onChange={(e) => onUpdateStatus(submission.id, e.target.value as BikeSubmission["status"])}
                      className={`text-xs font-medium rounded-full px-2 py-1 border-0 ${
                        submission.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        submission.status === "approved" ? "bg-green-100 text-green-800" :
                        submission.status === "rejected" ? "bg-red-100 text-red-800" :
                        "bg-blue-100 text-blue-800"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(submission.submittedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button onClick={() => setSelectedSubmission(submission)} className="text-blue-600 hover:text-blue-900"><Eye size={16} /></button>
                      <button onClick={() => onDelete(submission.id)} className="text-red-600 hover:text-red-900"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Submission Details</h3>
                <button onClick={() => setSelectedSubmission(null)} className="text-gray-400 hover:text-gray-600">×</button>
              </div>
            </div>
            <div className="p-6">
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
                    <p><span className="font-medium">Expected Price:</span> ₹{selectedSubmission.bikeDetails.expectedPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Additional Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <p><span className="font-medium">Condition:</span> {selectedSubmission.additionalInfo.condition}</p>
                  <p><span className="font-medium">Urgency:</span> {selectedSubmission.additionalInfo.urgency}</p>
                  <p><span className="font-medium">Modifications:</span> {selectedSubmission.additionalInfo.modifications || 'None'}</p>
                  <p><span className="font-medium">Accident History:</span> {selectedSubmission.additionalInfo.accidentHistory || 'None'}</p>
                  <p><span className="font-medium">Service History:</span> {selectedSubmission.additionalInfo.serviceHistory || 'Regular'}</p>
                  <p><span className="font-medium">Reason for Selling:</span> {selectedSubmission.additionalInfo.reason}</p>
                </div>
              </div>

              {selectedSubmission.images.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Images</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedSubmission.images.map((image, index) => (
                      <img key={index} src={image} alt={`Bike image ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------- CONTENT TAB ----------------------------- */

function ContentTab({
  contentSections,
  onUpdate,
  onAdd,
  onDelete,
}: {
  contentSections: ContentSection[];
  onUpdate: (id: string, updates: Partial<ContentSection>) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
}) {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", content: "" });

  const startEditing = (section: ContentSection) => {
    setEditingSection(section.id);
    setEditForm({ title: section.title, content: section.content });
  };

  const saveEditing = () => {
    if (editingSection) {
      onUpdate(editingSection, editForm);
      setEditingSection(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Content Management</h2>
        <button
          onClick={onAdd}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Add Section
        </button>
      </div>

      <div className="space-y-6">
        {contentSections.map((section) => (
          <div key={section.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                {editingSection === section.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Section title"
                    />
                    <textarea
                      value={editForm.content}
                      onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Section content"
                    />
                    <div className="flex space-x-2">
                      <button onClick={saveEditing} className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                        <Save size={14} className="mr-1" />
                        Save
                      </button>
                      <button onClick={() => setEditingSection(null)} className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{section.title}</h3>
                    <p className="text-gray-600">{section.content}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <label className="flex items-center">
                  <input type="checkbox" checked={section.isVisible} onChange={(e) => onUpdate(section.id, { isVisible: e.target.checked })} className="mr-2" />
                  <span className="text-sm text-gray-600">Visible</span>
                </label>

                {editingSection !== section.id && (
                  <>
                    <button onClick={() => startEditing(section)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit3 size={16} /></button>
                    <button onClick={() => onDelete(section.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- USERS TAB ----------------------------- */

function UsersTab() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Users Management</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">User management features will be implemented here.</p>
        <p className="text-sm text-gray-500 mt-2">This section can include user registration, authentication, and role management.</p>
      </div>
    </div>
  );
}

/* ----------------------------- SETTINGS TAB ----------------------------- */

function SettingsTab() {
  const { refreshSiteSettings } = useSiteContent();
  const [backgroundVideo, setBackgroundVideo] = useState<{ url: string; isEnabled: boolean; opacity: number }>({
    url: "",
    isEnabled: false,
    opacity: 0.5,
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const currentBlobUrl = useRef<string | null>(null);

  useEffect(() => {
    // Load background video settings from localStorage
    const savedSettings = localStorage.getItem("backgroundVideoSettings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setBackgroundVideo(settings);
      setPreviewUrl(settings.url);
      if (settings.url && settings.url.startsWith("blob:")) {
        currentBlobUrl.current = settings.url;
      }
    }

    // Cleanup function to revoke blob URLs when component unmounts
    return () => {
      if (currentBlobUrl.current) {
        URL.revokeObjectURL(currentBlobUrl.current);
      }
    };
  }, []);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      // Clean up previous blob URL if it exists
      if (currentBlobUrl.current) {
        URL.revokeObjectURL(currentBlobUrl.current);
      }

      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      currentBlobUrl.current = url;
    }
  };

  const handleSaveVideo = async () => {
    if (!videoFile) return;

    setIsUploading(true);
    try {
      // Upload video to server
      const formData = new FormData();
      formData.append("video", videoFile);

      const response = await fetch("/api/upload/video", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to upload video");
      }

      const updatedSettings = {
        ...backgroundVideo,
        url: result.url,
        isEnabled: true, // Automatically enable when video is uploaded
      };

      setBackgroundVideo(updatedSettings);
      localStorage.setItem("backgroundVideoSettings", JSON.stringify(updatedSettings));

      // Also update the site content context
      const savedSettings = localStorage.getItem("bikesdeal_site_settings");
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        settings.backgroundVideo = updatedSettings;
        localStorage.setItem("bikesdeal_site_settings", JSON.stringify(settings));
      } else {
        // Create new settings if none exist
        const defaultSettings = {
          siteName: "BikesDeal",
          siteDescription: "Your trusted partner for buying and selling bikes",
          contactEmail: "info@bikesdeal.com",
          contactPhone: "+91 9876543210",
          address: "123 Bike Street, Mumbai, Maharashtra 400001",
          socialMedia: {},
          seo: {
            metaTitle: "BikesDeal - Buy & Sell Bikes Online",
            metaDescription: "Find the best deals on bikes.",
            keywords: ["bikes", "motorcycles"],
          },
          theme: {
            primaryColor: "#dc2626",
            secondaryColor: "#1f2937",
            accentColor: "#f59e0b",
            backgroundColor: "#ffffff",
            textColor: "#111827",
          },
          backgroundVideo: updatedSettings,
        };
        localStorage.setItem("bikesdeal_site_settings", JSON.stringify(defaultSettings));
      }

      // Clean up blob URL and update preview
      if (currentBlobUrl.current) {
        URL.revokeObjectURL(currentBlobUrl.current);
        currentBlobUrl.current = null;
      }
      setPreviewUrl(result.url);

      // Refresh the site context to update the video immediately
      refreshSiteSettings();

      alert("Background video updated successfully!");
    } catch (error) {
      console.error("Error saving video:", error);
      alert("Error saving video. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSettingsUpdate = (key: string, value: any) => {
    const updatedSettings = {
      ...backgroundVideo,
      [key]: value,
    };
    setBackgroundVideo(updatedSettings);
    localStorage.setItem("backgroundVideoSettings", JSON.stringify(updatedSettings));

    // Also update the site content context
    const savedSettings = localStorage.getItem("bikesdeal_site_settings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      settings.backgroundVideo = updatedSettings;
      localStorage.setItem("bikesdeal_site_settings", JSON.stringify(settings));
    }

    // Refresh the site context to update the video immediately
    refreshSiteSettings();
  };

  const handleRemoveVideo = async () => {
    // Delete video file from server if it exists
    if (backgroundVideo.url && backgroundVideo.url.startsWith("/uploads/videos/")) {
      const filename = backgroundVideo.url.split("/").pop();
      if (filename) {
        try {
          await fetch(`/api/upload/video/delete?filename=${filename}`, { method: "DELETE" });
        } catch (error) {
          console.error("Error deleting video file:", error);
        }
      }
    }

    // Clean up blob URL if it exists
    if (currentBlobUrl.current) {
      URL.revokeObjectURL(currentBlobUrl.current);
      currentBlobUrl.current = null;
    }

    const updatedSettings = { url: "", isEnabled: false, opacity: 0.5 };
    setBackgroundVideo(updatedSettings);
    setPreviewUrl("");
    setVideoFile(null);
    localStorage.setItem("backgroundVideoSettings", JSON.stringify(updatedSettings));

    // Also update the site content context
    const savedSettings = localStorage.getItem("bikesdeal_site_settings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      settings.backgroundVideo = updatedSettings;
      localStorage.setItem("bikesdeal_site_settings", JSON.stringify(settings));
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Settings</h2>

      {/* Background Video Management */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center mb-6">
          <Video className="w-6 h-6 text-red-600 mr-3" />
          <h3 className="text-xl font-semibold text-gray-900">Background Video Management</h3>
        </div>

        {/* Video Upload Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Background Video</label>
          <div className="flex items-center space-x-4">
            <input type="file" accept="video/*" onChange={handleVideoUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100" />
            {videoFile && (
              <button onClick={handleSaveVideo} disabled={isUploading} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Video
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Video Preview */}
        {previewUrl && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Video Preview</label>
            <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <video src={previewUrl} controls className="w-full h-full object-cover" style={{ opacity: backgroundVideo.opacity }}>
                Your browser does not support the video tag.
              </video>
              <button onClick={handleRemoveVideo} className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full" title="Remove Video">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Video Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" checked={backgroundVideo.isEnabled} onChange={(e) => handleSettingsUpdate("isEnabled", e.target.checked)} className="rounded border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50" />
              <span className="ml-2 text-sm font-medium text-gray-700">Enable Background Video</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Video Opacity: {Math.round(backgroundVideo.opacity * 100)}%</label>
            <input type="range" min="0.1" max="1" step="0.1" value={backgroundVideo.opacity} onChange={(e) => handleSettingsUpdate("opacity", parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider" />
          </div>
        </div>

        {/* Current Status */}
        {!backgroundVideo.url && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="text-sm font-medium text-yellow-900 mb-2">⚠️ No Background Video Uploaded</h4>
            <p className="text-sm text-yellow-800">Currently, the hero section is using a gradient background. Upload a video above and enable it to show a background video on your website.</p>
          </div>
        )}

        {/* Video Guidelines */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Video Guidelines:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Recommended format: MP4 (H.264)</li>
            <li>• Maximum file size: 50MB</li>
            <li>• Recommended resolution: 1920x1080 or higher</li>
            <li>• Keep videos short (10-30 seconds) for better performance</li>
            <li>• Ensure video content is appropriate and professional</li>
          </ul>
        </div>
      </div>

      {/* Other Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">General Settings</h3>
        <p className="text-gray-600">Additional system settings and configuration options will be available here.</p>
        <p className="text-sm text-gray-500 mt-2">This section can include site configuration, email settings, and other administrative options.</p>
      </div>
    </div>
  );
}

/* ----------------------------- CONTACT SUBMISSIONS TAB ----------------------------- */

function ContactSubmissionsTab() {
  const [contactSubmissions, setContactSubmissions] = useState<any[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    // Load contact submissions from localStorage
    const savedSubmissions = localStorage.getItem("contactSubmissions");
    if (savedSubmissions) {
      setContactSubmissions(JSON.parse(savedSubmissions));
    }
  }, []);

  const updateSubmissionStatus = (id: string, status: string) => {
    const updatedSubmissions = contactSubmissions.map((submission) =>
      submission.id === id ? { ...submission, status, updatedAt: new Date().toISOString() } : submission
    );
    setContactSubmissions(updatedSubmissions);
    localStorage.setItem("contactSubmissions", JSON.stringify(updatedSubmissions));
  };

  const deleteSubmission = (id: string) => {
    const updatedSubmissions = contactSubmissions.filter((submission) => submission.id !== id);
    setContactSubmissions(updatedSubmissions);
    localStorage.setItem("contactSubmissions", JSON.stringify(updatedSubmissions));
  };

  const filteredSubmissions = filterStatus === "all" ? contactSubmissions : contactSubmissions.filter((s) => s.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Contact Submissions</h2>
        <div className="flex items-center space-x-4">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Submissions List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{submission.name}</div>
                      <div className="text-sm text-gray-500">{submission.email}</div>
                      {submission.phone && <div className="text-sm text-gray-500">{submission.phone}</div>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{submission.message}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(submission.submittedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      submission.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                      submission.status === "reviewed" ? "bg-blue-100 text-blue-800" :
                      submission.status === "resolved" ? "bg-green-100 text-green-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>{submission.status || "pending"}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => setSelectedSubmission(submission)} className="text-blue-600 hover:text-blue-900">View</button>
                    <select value={submission.status || "pending"} onChange={(e) => updateSubmissionStatus(submission.id, e.target.value)} className="text-sm border border-gray-300 rounded px-2 py-1">
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="resolved">Resolved</option>
                    </select>
                    <button onClick={() => deleteSubmission(submission.id)} className="text-red-600 hover:text-red-900 ml-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSubmissions.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Contact Submissions</h3>
            <p className="text-gray-500">Contact form submissions will appear here when users send messages.</p>
          </div>
        )}
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Contact Submission Details</h3>
              <button onClick={() => setSelectedSubmission(null)} className="text-gray-400 hover:text-gray-600"><span className="sr-only">Close</span>×</button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                <div className="bg-gray-50 rounded-md p-4 space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedSubmission.name}</p>
                  <p><span className="font-medium">Email:</span> {selectedSubmission.email}</p>
                  {selectedSubmission.phone && <p><span className="font-medium">Phone:</span> {selectedSubmission.phone}</p>}
                  <p><span className="font-medium">Submitted:</span> {new Date(selectedSubmission.submittedAt).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Message</h4>
                <div className="bg-gray-50 rounded-md p-4">
                  <p className="whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button onClick={() => setSelectedSubmission(null)} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Close</button>
                <button onClick={() => { updateSubmissionStatus(selectedSubmission.id, "reviewed"); setSelectedSubmission(null); }} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Mark as Reviewed</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
