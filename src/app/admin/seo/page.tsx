"use client"

import { useState, useEffect } from "react"
import { Save, Search, Globe, Share2, FileText, Link2, Image, Loader2, Plus, Trash2, Edit, Eye, EyeOff } from "lucide-react"

interface SEOConfig {
  id: string
  page: string
  title: string
  description: string
  keywords: string
  ogImage: string
  canonicalUrl: string
  noIndex: boolean
  noFollow: boolean
}

const defaultSeoConfigs: SEOConfig[] = [
  {
    id: "home",
    page: "Home",
    title: "SCHF - Strategic Care & Health Foundation | Hepatitis Prevention & Treatment",
    description: "Leading the fight against hepatitis through prevention, testing, treatment, and community outreach. Join us in creating a healthier future for all.",
    keywords: "hepatitis, healthcare, NGO, prevention, testing, treatment, health foundation, Nigeria",
    ogImage: "",
    canonicalUrl: "https://schf.org",
    noIndex: false,
    noFollow: false,
  },
  {
    id: "about",
    page: "About",
    title: "About Us | SCHF - Strategic Care & Health Foundation",
    description: "Learn about SCHF's mission to eliminate hepatitis through comprehensive prevention, testing, treatment, and advocacy programs.",
    keywords: "about SCHF, hepatitis organization, healthcare NGO, mission vision",
    ogImage: "",
    canonicalUrl: "https://schf.org/about",
    noIndex: false,
    noFollow: false,
  },
  {
    id: "programs",
    page: "Programs",
    title: "Our Programs | Hepatitis Prevention, Testing & Treatment | SCHF",
    description: "Explore SCHF's comprehensive programs including hepatitis prevention, free testing, treatment support, and community outreach.",
    keywords: "hepatitis programs, free testing, treatment support, community outreach, health education",
    ogImage: "",
    canonicalUrl: "https://schf.org/programs",
    noIndex: false,
    noFollow: false,
  },
  {
    id: "donate",
    page: "Donate",
    title: "Donate to SCHF | Support Hepatitis Prevention & Treatment",
    description: "Your donation helps SCHF provide free hepatitis testing, treatment, and education to communities in need. Every contribution saves lives.",
    keywords: "donate, charity, hepatitis donation, NGO donation, support healthcare",
    ogImage: "",
    canonicalUrl: "https://schf.org/donate",
    noIndex: false,
    noFollow: false,
  },
  {
    id: "contact",
    page: "Contact",
    title: "Contact SCHF | Get in Touch",
    description: "Contact SCHF for hepatitis testing, treatment support, partnerships, or general inquiries. We're here to help.",
    keywords: "contact SCHF, hepatitis support, healthcare contact, NGO contact",
    ogImage: "",
    canonicalUrl: "https://schf.org/contact",
    noIndex: false,
    noFollow: false,
  },
  {
    id: "volunteer",
    page: "Volunteer",
    title: "Volunteer With SCHF | Join the Fight Against Hepatitis",
    description: "Join SCHF as a volunteer. Help us spread hepatitis awareness, support community programs, and make a difference.",
    keywords: "volunteer, charity work, hepatitis awareness, community service",
    ogImage: "",
    canonicalUrl: "https://schf.org/volunteer",
    noIndex: false,
    noFollow: false,
  },
  {
    id: "partner",
    page: "Partner",
    title: "Partner With SCHF | Corporate Partnerships",
    description: "Partner with SCHF to eliminate hepatitis. Corporate partnerships, CSR programs, and collaborative health initiatives.",
    keywords: "partner with SCHF, corporate partnership, CSR, health partnership",
    ogImage: "",
    canonicalUrl: "https://schf.org/partner",
    noIndex: false,
    noFollow: false,
  },
  {
    id: "events",
    page: "Events",
    title: "Events | SCHF - Health Fairs, Screening & Fundraisers",
    description: "Join SCHF events including World Hepatitis Day screening, health fairs, and fundraising galas. Get involved in our mission.",
    keywords: "events, health fair, hepatitis screening, fundraiser, community event",
    ogImage: "",
    canonicalUrl: "https://schf.org/events",
    noIndex: false,
    noFollow: false,
  },
]

export default function SEOPage() {
  const [seoConfigs, setSeoConfigs] = useState<SEOConfig[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [selectedPage, setSelectedPage] = useState<string>("home")
  const [editMode, setEditMode] = useState<string | null>(null)

  useEffect(() => {
    async function loadSEO() {
      try {
        const res = await fetch('/api/settings')
        const data = await res.json()
        
        if (data.settings) {
          const savedConfigs = defaultSeoConfigs.map(config => ({
            ...config,
            title: data.settings[`seo_${config.id}_title`] || config.title,
            description: data.settings[`seo_${config.id}_description`] || config.description,
            keywords: data.settings[`seo_${config.id}_keywords`] || config.keywords,
            ogImage: data.settings[`seo_${config.id}_ogImage`] || config.ogImage,
            canonicalUrl: data.settings[`seo_${config.id}_canonicalUrl`] || config.canonicalUrl,
            noIndex: data.settings[`seo_${config.id}_noIndex`] === "true",
            noFollow: data.settings[`seo_${config.id}_noFollow`] === "true",
          }))
          setSeoConfigs(savedConfigs)
        } else {
          setSeoConfigs(defaultSeoConfigs)
        }
      } catch (error) {
        console.error("Error loading SEO:", error)
        setSeoConfigs(defaultSeoConfigs)
      } finally {
        setLoading(false)
      }
    }
    loadSEO()
  }, [])

  const currentConfig = seoConfigs.find(c => c.id === selectedPage) || seoConfigs[0]

  const handleSave = async () => {
    setSaving(true)
    try {
      const settings: Record<string, string> = {}
      
      seoConfigs.forEach(config => {
        settings[`seo_${config.id}_title`] = config.title
        settings[`seo_${config.id}_description`] = config.description
        settings[`seo_${config.id}_keywords`] = config.keywords
        settings[`seo_${config.id}_ogImage`] = config.ogImage
        settings[`seo_${config.id}_canonicalUrl`] = config.canonicalUrl
        settings[`seo_${config.id}_noIndex`] = config.noIndex.toString()
        settings[`seo_${config.id}_noFollow`] = config.noFollow.toString()
      })

      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings })
      })

      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      console.error("Error saving SEO:", error)
    } finally {
      setSaving(false)
    }
  }

  const updateConfig = (field: keyof SEOConfig, value: any) => {
    setSeoConfigs(seoConfigs.map(c => 
      c.id === selectedPage ? { ...c, [field]: value } : c
    ))
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Loader2 size={32} className="animate-spin" style={{ color: '#0D9488' }} />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">SEO Management</h2>
          <p className="text-foreground-light">Configure search engine optimization for each page</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="btn-primary flex items-center gap-2"
        >
          {saving ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              Save All Changes
            </>
          )}
        </button>
      </div>

      {saved && (
        <div style={{ backgroundColor: '#DCFCE7', color: '#166534', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Save size={18} />
          SEO settings saved successfully!
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px' }} className="seo-grid">
        {/* Page List */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', height: 'fit-content' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#64748B', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Pages
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {seoConfigs.map((config) => (
              <button
                key={config.id}
                onClick={() => setSelectedPage(config.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: selectedPage === config.id ? 'rgba(13,148,136,0.1)' : 'transparent',
                  color: selectedPage === config.id ? '#0D9488' : '#374151',
                  fontWeight: selectedPage === config.id ? 600 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={16} />
                  {config.page}
                </span>
                {config.noIndex && (
                  <span style={{ fontSize: '10px', backgroundColor: '#FEF3C7', color: '#92400E', padding: '2px 6px', borderRadius: '4px' }}>
                    NOINDEX
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* SEO Form */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, fontFamily: "'Playfair Display', serif", color: '#1E293B' }}>
              {currentConfig.page} - SEO Settings
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Meta Title */}
            <div>
              <label style={{ display: 'block', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                Meta Title
                <span style={{ color: '#0D9488', marginLeft: '4px' }}>*</span>
              </label>
              <input
                type="text"
                value={currentConfig.title}
                onChange={(e) => updateConfig('title', e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px' }}
                placeholder="Page title for search engines"
              />
              <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                {currentConfig.title.length}/60 characters (recommended: 50-60)
              </p>
            </div>

            {/* Meta Description */}
            <div>
              <label style={{ display: 'block', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                Meta Description
                <span style={{ color: '#0D9488', marginLeft: '4px' }}>*</span>
              </label>
              <textarea
                value={currentConfig.description}
                onChange={(e) => updateConfig('description', e.target.value)}
                rows={3}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', resize: 'vertical' }}
                placeholder="Page description for search engines"
              />
              <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                {currentConfig.description.length}/160 characters (recommended: 150-160)
              </p>
            </div>

            {/* Keywords */}
            <div>
              <label style={{ display: 'block', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                Keywords
              </label>
              <input
                type="text"
                value={currentConfig.keywords}
                onChange={(e) => updateConfig('keywords', e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px' }}
                placeholder="keyword1, keyword2, keyword3"
              />
              <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                Separate keywords with commas
              </p>
            </div>

            {/* Canonical URL */}
            <div>
              <label style={{ display: 'block', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                Canonical URL
              </label>
              <input
                type="url"
                value={currentConfig.canonicalUrl}
                onChange={(e) => updateConfig('canonicalUrl', e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px' }}
                placeholder="https://example.com/page"
              />
            </div>

            {/* OG Image */}
            <div>
              <label style={{ display: 'block', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                Open Graph Image (OG Image)
              </label>
              <input
                type="url"
                value={currentConfig.ogImage}
                onChange={(e) => updateConfig('ogImage', e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px' }}
                placeholder="https://example.com/image.jpg"
              />
              <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                Recommended size: 1200x630px
              </p>
            </div>

            {/* Robot Options */}
            <div>
              <label style={{ display: 'block', fontWeight: 500, color: '#374151', marginBottom: '12px' }}>
                Search Engine Options
              </label>
              <div style={{ display: 'flex', gap: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={!currentConfig.noIndex}
                    onChange={(e) => updateConfig('noIndex', !e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: '#0D9488' }}
                  />
                  <span style={{ fontWeight: 500 }}>Index this page</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={!currentConfig.noFollow}
                    onChange={(e) => updateConfig('noFollow', !e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: '#0D9488' }}
                  />
                  <span style={{ fontWeight: 500 }}>Follow links</span>
                </label>
              </div>
              {currentConfig.noIndex && (
                <p style={{ fontSize: '12px', color: '#F59E0B', marginTop: '8px' }}>
                  ⚠️ This page is set to noindex - it won't appear in search results
                </p>
              )}
            </div>
          </div>

          {/* Preview */}
          <div style={{ marginTop: '32px', padding: '24px', backgroundColor: '#F8FAFC', borderRadius: '12px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#64748B', marginBottom: '16px' }}>Search Preview</h4>
            <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
              <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>google.com</p>
              <p style={{ fontSize: '18px', color: '#1A0DAB', marginBottom: '4px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {currentConfig.title || 'Page Title'}
              </p>
              <p style={{ fontSize: '14px', color: '#006621', marginBottom: '4px' }}>
                {currentConfig.description?.slice(0, 100) || 'Page description will appear here...'}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
