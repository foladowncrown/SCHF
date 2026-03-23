"use client"

import { useState, useRef, useEffect } from "react"
import { Save, Settings, Palette, CreditCard, Share2, Mail, Shield, Eye, EyeOff, Plus, Trash2, Upload, X, Image, FileText, Key, Globe, Bell, Plug, CheckCircle, XCircle, Loader2 } from "lucide-react"

interface ApiService {
  id: string
  name: string
  type: "payment" | "sms" | "email" | "storage" | "analytics" | "other"
  apiKey: string
  apiSecret: string
  webhookUrl: string
  isActive: boolean
  config: Record<string, string>
}

interface LogoUploadProps {
  label: string
  value: string
  onChange: (value: string) => void
}

function LogoUpload({ label, value, onChange }: LogoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState(value)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreview(result)
        onChange(result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center gap-4">
        <div 
          onClick={() => inputRef.current?.click()}
          className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors overflow-hidden"
        >
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-contain" />
          ) : (
            <Upload className="w-6 h-6 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Choose File
          </button>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG, SVG. Max 2MB.</p>
        </div>
        {preview && (
          <button
            type="button"
            onClick={() => { setPreview(""); onChange(""); }}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

const tabs = [
  { id: "general", label: "General", icon: Settings },
  { id: "api", label: "API Services", icon: Plug },
  { id: "theme", label: "Theme", icon: Palette },
  { id: "social", label: "Social Links", icon: Share2 },
  { id: "email", label: "Email", icon: Mail },
]

const apiTypes = [
  { id: "payment", label: "Payment Gateway" },
  { id: "sms", label: "SMS Service" },
  { id: "email", label: "Email Service" },
  { id: "storage", label: "Storage" },
  { id: "analytics", label: "Analytics" },
  { id: "other", label: "Other" },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({})
  const [saved, setSaved] = useState(false)
  const [showAddApi, setShowAddApi] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [settings, setSettings] = useState({
    siteName: "SCHF - Strategic Care & Health Foundation",
    siteDescription: "Leading the fight against hepatitis through prevention, outreach, and awareness.",
    siteEmail: "info@schf.org",
    sitePhone: "+234 123 456 7890",
    siteAddress: "123 Health Avenue, Lagos, Nigeria",
    siteUrl: "https://schf.org",
    logo: "",
    favicon: "",
    
    primaryColor: "#0D9488",
    secondaryColor: "#1E293B",
    accentColor: "#F59E0B",
    
    facebook: "https://facebook.com/schf",
    twitter: "https://twitter.com/schf",
    instagram: "https://instagram.com/schf",
    linkedin: "https://linkedin.com/company/schf",
    youtube: "https://youtube.com/schf",
    
    smtpHost: "smtp.mailgun.org",
    smtpPort: "587",
    smtpUser: "postmaster@schf.org",
    smtpPassword: "",
    fromEmail: "noreply@schf.org",
    fromName: "SCHF",
  })

  const [apiServices, setApiServices] = useState<ApiService[]>([
    {
      id: "1",
      name: "Stripe",
      type: "payment",
      apiKey: "pk_test_xxx",
      apiSecret: "sk_test_xxx",
      webhookUrl: "https://schf.org/api/webhooks/stripe",
      isActive: true,
      config: { publishableKey: "pk_test_xxx" }
    },
    {
      id: "2",
      name: "Paystack",
      type: "payment",
      apiKey: "pk_test_xxx",
      apiSecret: "sk_test_xxx",
      webhookUrl: "https://schf.org/api/webhooks/paystack",
      isActive: true,
      config: {}
    },
    {
      id: "3",
      name: "Twilio SMS",
      type: "sms",
      apiKey: "ACxxx",
      apiSecret: "xxx",
      webhookUrl: "",
      isActive: false,
      config: { from: "+234xxx" }
    },
  ])

  const [newApi, setNewApi] = useState<Partial<ApiService>>({
    name: "",
    type: "other",
    apiKey: "",
    apiSecret: "",
    webhookUrl: "",
    isActive: true,
    config: {}
  })

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings')
        if (!res.ok) throw new Error('Failed to load')
        const data = await res.json()
        if (data.settings) {
          setSettings(prev => ({
            ...prev,
            siteName: data.settings.siteName || prev.siteName,
            siteDescription: data.settings.siteDescription || prev.siteDescription,
            siteEmail: data.settings.siteEmail || prev.siteEmail,
            sitePhone: data.settings.sitePhone || prev.sitePhone,
            siteAddress: data.settings.siteAddress || prev.siteAddress,
            siteUrl: data.settings.siteUrl || prev.siteUrl,
            logo: data.settings.logo || prev.logo,
            favicon: data.settings.favicon || prev.favicon,
            facebook: data.settings.facebook || prev.facebook,
            twitter: data.settings.twitter || prev.twitter,
            instagram: data.settings.instagram || prev.instagram,
            linkedin: data.settings.linkedin || prev.linkedin,
            youtube: data.settings.youtube || prev.youtube,
            smtpHost: data.settings.smtpHost || prev.smtpHost,
            smtpPort: data.settings.smtpPort || prev.smtpPort,
            smtpUser: data.settings.smtpUser || prev.smtpUser,
            smtpPassword: data.settings.smtpPassword || prev.smtpPassword,
            fromEmail: data.settings.fromEmail || prev.fromEmail,
            fromName: data.settings.fromName || prev.fromName,
          }))
        }
        if (data.theme) {
          setSettings(prev => ({
            ...prev,
            primaryColor: data.theme.primaryColor || prev.primaryColor,
            secondaryColor: data.theme.secondaryColor || prev.secondaryColor,
            accentColor: data.theme.accentColor || prev.accentColor,
          }))
        }
      } catch (error) {
        console.error("Error loading settings:", error)
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings: {
            siteName: settings.siteName,
            siteDescription: settings.siteDescription,
            siteEmail: settings.siteEmail,
            sitePhone: settings.sitePhone,
            siteAddress: settings.siteAddress,
            siteUrl: settings.siteUrl,
            logo: settings.logo,
            favicon: settings.favicon,
            facebook: settings.facebook,
            twitter: settings.twitter,
            instagram: settings.instagram,
            linkedin: settings.linkedin,
            youtube: settings.youtube,
            smtpHost: settings.smtpHost,
            smtpPort: settings.smtpPort,
            smtpUser: settings.smtpUser,
            smtpPassword: settings.smtpPassword,
            fromEmail: settings.fromEmail,
            fromName: settings.fromName,
          },
          theme: {
            primaryColor: settings.primaryColor,
            secondaryColor: settings.secondaryColor,
            accentColor: settings.accentColor,
          }
        })
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      console.error("Error saving settings:", error)
    } finally {
      setSaving(false)
    }
  }

  const toggleApiKey = (key: string) => {
    setShowApiKeys(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const addApiService = () => {
    if (newApi.name) {
      setApiServices([...apiServices, { 
        ...newApi, 
        id: Date.now().toString() 
      } as ApiService])
      setNewApi({
        name: "",
        type: "other",
        apiKey: "",
        apiSecret: "",
        webhookUrl: "",
        isActive: true,
        config: {}
      })
      setShowAddApi(false)
    }
  }

  const deleteApiService = (id: string) => {
    setApiServices(apiServices.filter(s => s.id !== id))
  }

  const toggleApiActive = (id: string) => {
    setApiServices(apiServices.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s))
  }

  return (
    <div>
      <div className="mb-8">
        <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1E293B", fontFamily: "'Playfair Display', serif" }}>Settings</h2>
        <p style={{ color: "#64748B", marginTop: "4px" }}>Manage your site configuration</p>
      </div>

      <div style={{ display: "flex", gap: "32px" }}>
        {/* Sidebar Tabs */}
        <div style={{ width: "240px", flexShrink: 0 }} className="settings-sidebar">
          <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: activeTab === tab.id ? "#0D9488" : "transparent",
                  color: activeTab === tab.id ? "white" : "#475569",
                  fontWeight: 500,
                  fontSize: "14px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                }}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid #E5E7EB", padding: "24px" }}>
            {/* General Settings */}
            {activeTab === "general" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1E293B" }}>General Settings</h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                  <LogoUpload
                    label="Site Logo"
                    value={settings.logo}
                    onChange={(value) => setSettings({ ...settings, logo: value })}
                  />
                  <LogoUpload
                    label="Favicon"
                    value={settings.favicon}
                    onChange={(value) => setSettings({ ...settings, favicon: value })}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Site Name</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Site Description</label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    rows={3}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px", resize: "vertical" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Email</label>
                    <input
                      type="email"
                      value={settings.siteEmail}
                      onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Phone</label>
                    <input
                      type="text"
                      value={settings.sitePhone}
                      onChange={(e) => setSettings({ ...settings, sitePhone: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Address</label>
                  <input
                    type="text"
                    value={settings.siteAddress}
                    onChange={(e) => setSettings({ ...settings, siteAddress: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Site URL</label>
                  <input
                    type="url"
                    value={settings.siteUrl}
                    onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                  />
                </div>
              </div>
            )}

            {/* API Services */}
            {activeTab === "api" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1E293B" }}>API Services Manager</h3>
                  <button
                    onClick={() => setShowAddApi(true)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 16px",
                      backgroundColor: "#0D9488",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: 500,
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    <Plus size={16} />
                    Add API
                  </button>
                </div>

                <p style={{ color: "#64748B", fontSize: "14px" }}>
                  Manage external API integrations for payments, SMS, email, storage, analytics, and more.
                </p>

                {/* API Services List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {apiServices.map((service) => (
                    <div
                      key={service.id}
                      style={{
                        padding: "16px",
                        border: "1px solid #E5E7EB",
                        borderRadius: "10px",
                        backgroundColor: service.isActive ? "white" : "#F9FAFB",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "8px",
                            backgroundColor: service.isActive ? "#ECFDF5" : "#F3F4F6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                            {service.isActive ? (
                              <CheckCircle size={20} color="#10B981" />
                            ) : (
                              <XCircle size={20} color="#9CA3AF" />
                            )}
                          </div>
                          <div>
                            <h4 style={{ fontWeight: 600, color: "#1E293B", marginBottom: "2px" }}>{service.name}</h4>
                            <span style={{ fontSize: "12px", color: "#64748B", textTransform: "capitalize" }}>{service.type}</span>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            onClick={() => toggleApiActive(service.id)}
                            style={{
                              padding: "8px",
                              backgroundColor: service.isActive ? "#FEF3C7" : "#ECFDF5",
                              border: "none",
                              borderRadius: "6px",
                              cursor: "pointer",
                            }}
                            title={service.isActive ? "Disable" : "Enable"}
                          >
                            {service.isActive ? (
                              <XCircle size={16} color="#F59E0B" />
                            ) : (
                              <CheckCircle size={16} color="#10B981" />
                            )}
                          </button>
                          <button
                            onClick={() => deleteApiService(service.id)}
                            style={{
                              padding: "8px",
                              backgroundColor: "#FEF2F2",
                              border: "none",
                              borderRadius: "6px",
                              cursor: "pointer",
                            }}
                          >
                            <Trash2 size={16} color="#EF4444" />
                          </button>
                        </div>
                      </div>
                      {service.webhookUrl && (
                        <p style={{ fontSize: "12px", color: "#64748B", marginTop: "8px" }}>
                          Webhook: {service.webhookUrl}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add API Form */}
                {showAddApi && (
                  <div style={{
                    padding: "20px",
                    border: "1px solid #E5E7EB",
                    borderRadius: "10px",
                    backgroundColor: "#F9FAFB",
                  }}>
                    <h4 style={{ fontWeight: 600, color: "#1E293B", marginBottom: "16px" }}>Add New API Service</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px", fontSize: "14px" }}>Service Name</label>
                        <input
                          type="text"
                          value={newApi.name}
                          onChange={(e) => setNewApi({ ...newApi, name: e.target.value })}
                          placeholder="e.g., Stripe, Twilio"
                          style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px", fontSize: "14px" }}>Type</label>
                        <select
                          value={newApi.type}
                          onChange={(e) => setNewApi({ ...newApi, type: e.target.value as any })}
                          style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                        >
                          {apiTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px", fontSize: "14px" }}>API Key</label>
                        <input
                          type="text"
                          value={newApi.apiKey}
                          onChange={(e) => setNewApi({ ...newApi, apiKey: e.target.value })}
                          placeholder="Public API key"
                          style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px", fontSize: "14px" }}>API Secret</label>
                        <input
                          type="password"
                          value={newApi.apiSecret}
                          onChange={(e) => setNewApi({ ...newApi, apiSecret: e.target.value })}
                          placeholder="Secret key"
                          style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                        />
                      </div>
                      <div style={{ gridColumn: "span 2" }}>
                        <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px", fontSize: "14px" }}>Webhook URL (optional)</label>
                        <input
                          type="url"
                          value={newApi.webhookUrl}
                          onChange={(e) => setNewApi({ ...newApi, webhookUrl: e.target.value })}
                          placeholder="https://yourdomain.com/api/webhooks/..."
                          style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                      <button
                        onClick={addApiService}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#0D9488",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          fontWeight: 500,
                          cursor: "pointer",
                        }}
                      >
                        Add Service
                      </button>
                      <button
                        onClick={() => setShowAddApi(false)}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "white",
                          color: "#64748B",
                          border: "1px solid #D1D5DB",
                          borderRadius: "8px",
                          fontWeight: 500,
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Theme Settings */}
            {activeTab === "theme" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1E293B" }}>Theme Colors</h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
                  {[
                    { key: "primaryColor", label: "Primary Color", desc: "Main actions, links" },
                    { key: "secondaryColor", label: "Secondary Color", desc: "Headers, footers" },
                    { key: "accentColor", label: "Accent Color", desc: "CTAs, highlights" },
                  ].map((color) => (
                    <div key={color.key}>
                      <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>{color.label}</label>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <input
                          type="color"
                          value={settings[color.key as keyof typeof settings] as string}
                          onChange={(e) => setSettings({ ...settings, [color.key]: e.target.value })}
                          style={{ width: "48px", height: "48px", borderRadius: "8px", border: "none", cursor: "pointer" }}
                        />
                        <input
                          type="text"
                          value={settings[color.key as keyof typeof settings] as string}
                          onChange={(e) => setSettings({ ...settings, [color.key]: e.target.value })}
                          style={{ flex: 1, padding: "12px 14px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                        />
                      </div>
                      <p style={{ fontSize: "12px", color: "#64748B", marginTop: "4px" }}>{color.desc}</p>
                    </div>
                  ))}
                </div>

                <div style={{ padding: "16px", backgroundColor: "#F9FAFB", borderRadius: "10px" }}>
                  <h4 style={{ fontWeight: 600, color: "#1E293B", marginBottom: "12px" }}>Preview</h4>
                  <div style={{ display: "flex", gap: "16px" }}>
                    <button style={{ padding: "10px 20px", borderRadius: "8px", border: "none", color: "white", fontWeight: 500, backgroundColor: settings.primaryColor }}>Primary</button>
                    <button style={{ padding: "10px 20px", borderRadius: "8px", border: "none", color: "white", fontWeight: 500, backgroundColor: settings.secondaryColor }}>Secondary</button>
                    <button style={{ padding: "10px 20px", borderRadius: "8px", border: "none", color: "white", fontWeight: 500, backgroundColor: settings.accentColor }}>Accent</button>
                  </div>
                </div>
              </div>
            )}

            {/* Social Links */}
            {activeTab === "social" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1E293B" }}>Social Media Links</h3>
                {[
                  { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/yourpage" },
                  { key: "twitter", label: "Twitter / X", placeholder: "https://twitter.com/yourhandle" },
                  { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/yourhandle" },
                  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/company/yourcompany" },
                  { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/@yourchannel" },
                ].map((field) => (
                  <div key={field.key}>
                    <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>{field.label}</label>
                    <input
                      type="url"
                      value={settings[field.key as keyof typeof settings] as string}
                      onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Email Settings */}
            {activeTab === "email" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1E293B" }}>Email Configuration</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>SMTP Host</label>
                    <input
                      type="text"
                      value={settings.smtpHost}
                      onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>SMTP Port</label>
                    <input
                      type="text"
                      value={settings.smtpPort}
                      onChange={(e) => setSettings({ ...settings, smtpPort: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>SMTP Username</label>
                  <input
                    type="text"
                    value={settings.smtpUser}
                    onChange={(e) => setSettings({ ...settings, smtpUser: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>SMTP Password</label>
                  <input
                    type="password"
                    value={settings.smtpPassword}
                    onChange={(e) => setSettings({ ...settings, smtpPassword: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>From Email</label>
                    <input
                      type="email"
                      value={settings.fromEmail}
                      onChange={(e) => setSettings({ ...settings, fromEmail: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>From Name</label>
                    <input
                      type="text"
                      value={settings.fromName}
                      onChange={(e) => setSettings({ ...settings, fromName: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={handleSave}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  backgroundColor: "#0D9488",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
              
              {saved && (
                <span style={{ color: "#10B981", fontWeight: 500 }}>Settings saved successfully!</span>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
