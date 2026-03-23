"use client"

import { useState, useRef, useEffect } from "react"
import { Save, MessageCircle, X, Check, CheckCircle, XCircle, Upload, Trash2, Bell, Clock, Globe, Palette, Phone, Loader2 } from "lucide-react"

interface ChatConfig {
  id: string
  name: string
  isEnabled: boolean
  platform: "whatsapp" | "telegram" | "messenger" | "custom"
  phoneNumber: string
  countryCode: string
  defaultMessage: string
  greetingMessage: string
  offlineMessage: string
  position: "bottom-right" | "bottom-left"
  color: string
  icon: string
  showBadge: boolean
  badgeText: string
  workingHours: {
    enabled: boolean
    timezone: string
    schedule: {
      day: string
      start: string
      end: string
      enabled: boolean
    }[]
  }
  autoPopup: boolean
  popupDelay: number
  soundEnabled: boolean
}

const defaultConfig: ChatConfig = {
  id: "1",
  name: "WhatsApp Chat",
  isEnabled: true,
  platform: "whatsapp",
  phoneNumber: "2341234567890",
  countryCode: "+234",
  defaultMessage: "Hello SCHF, I need help with...",
  greetingMessage: "Hi there! How can we help you today?",
  offlineMessage: "We're currently offline. Leave a message and we'll get back to you.",
  position: "bottom-right",
  color: "#25D366",
  icon: "whatsapp",
  showBadge: true,
  badgeText: "New",
  workingHours: {
    enabled: false,
    timezone: "Africa/Lagos",
    schedule: [
      { day: "Monday", start: "09:00", end: "18:00", enabled: true },
      { day: "Tuesday", start: "09:00", end: "18:00", enabled: true },
      { day: "Wednesday", start: "09:00", end: "18:00", enabled: true },
      { day: "Thursday", start: "09:00", end: "18:00", enabled: true },
      { day: "Friday", start: "09:00", end: "18:00", enabled: true },
      { day: "Saturday", start: "10:00", end: "16:00", enabled: true },
      { day: "Sunday", start: "12:00", end: "14:00", enabled: false },
    ]
  },
  autoPopup: false,
  popupDelay: 5,
  soundEnabled: false,
}

const platforms = [
  { id: "whatsapp", label: "WhatsApp", icon: "💬" },
  { id: "telegram", label: "Telegram", icon: "✈️" },
  { id: "messenger", label: "Facebook Messenger", icon: "📘" },
  { id: "custom", label: "Custom Chat", icon: "💭" },
]

const positions = [
  { id: "bottom-right", label: "Bottom Right" },
  { id: "bottom-left", label: "Bottom Left" },
]

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function LiveSupportPage() {
  const [config, setConfig] = useState<ChatConfig>(defaultConfig)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"general" | "messages" | "appearance" | "schedule">("general")
  const [logoPreview, setLogoPreview] = useState<string>("")

  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch('/api/whatsapp')
        const data = await res.json()
        if (data) {
          setConfig({
            ...defaultConfig,
            id: data.id || "1",
            isEnabled: data.isEnabled ?? true,
            phoneNumber: data.phoneNumber || "",
            defaultMessage: data.prefillMessage || "",
            color: data.color || "#25D366",
            position: data.position || "bottom-right",
          })
        }
      } catch (error) {
        console.error("Error loading config:", error)
      } finally {
        setLoading(false)
      }
    }
    loadConfig()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: config.id,
          isEnabled: config.isEnabled,
          phoneNumber: config.phoneNumber,
          prefillMessage: config.defaultMessage,
          position: config.position,
          color: config.color,
        })
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      console.error("Error saving config:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
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
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1E293B", fontFamily: "'Playfair Display', serif" }}>Live Support Chat</h2>
        <p style={{ color: "#64748B", marginTop: "4px" }}>Manage your WhatsApp and live chat bubble settings</p>
      </div>

      <div style={{ display: "flex", gap: "32px" }}>
        {/* Tabs */}
        <div style={{ width: "200px", flexShrink: 0 }}>
          <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {[
              { id: "general", label: "General", icon: MessageCircle },
              { id: "messages", label: "Messages", icon: MessageCircle },
              { id: "appearance", label: "Appearance", icon: Palette },
              { id: "schedule", label: "Schedule", icon: Clock },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
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
            
            {/* Enable/Disable */}
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginBottom: "24px",
              padding: "16px",
              backgroundColor: config.isEnabled ? "#ECFDF5" : "#FEF3C7",
              borderRadius: "10px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: config.isEnabled ? "#10B981" : "#F59E0B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {config.isEnabled ? <CheckCircle size={20} color="white" /> : <XCircle size={20} color="white" />}
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, color: "#1E293B", marginBottom: "2px" }}>
                    {config.isEnabled ? "Chat Widget Active" : "Chat Widget Inactive"}
                  </h4>
                  <p style={{ fontSize: "13px", color: "#64748B" }}>
                    {config.isEnabled ? "Your chat widget is visible to visitors" : "Your chat widget is hidden from visitors"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setConfig({ ...config, isEnabled: !config.isEnabled })}
                style={{
                  padding: "10px 20px",
                  backgroundColor: config.isEnabled ? "#EF4444" : "#10B981",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {config.isEnabled ? "Disable" : "Enable"}
              </button>
            </div>

            {/* General Tab */}
            {activeTab === "general" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1E293B" }}>General Settings</h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Chat Name</label>
                    <input
                      type="text"
                      value={config.name}
                      onChange={(e) => setConfig({ ...config, name: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Platform</label>
                    <select
                      value={config.platform}
                      onChange={(e) => setConfig({ ...config, platform: e.target.value as any })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                    >
                      {platforms.map(p => (
                        <option key={p.id} value={p.id}>{p.icon} {p.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Country</label>
                    <input
                      type="text"
                      value={config.countryCode}
                      onChange={(e) => setConfig({ ...config, countryCode: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                      placeholder="+234"
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Phone Number</label>
                    <input
                      type="text"
                      value={config.phoneNumber}
                      onChange={(e) => setConfig({ ...config, phoneNumber: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                      placeholder="1234567890"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Position</label>
                  <div style={{ display: "flex", gap: "12px" }}>
                    {positions.map(pos => (
                      <button
                        key={pos.id}
                        onClick={() => setConfig({ ...config, position: pos.id as any })}
                        style={{
                          padding: "12px 24px",
                          borderRadius: "8px",
                          border: config.position === pos.id ? "2px solid #0D9488" : "1px solid #D1D5DB",
                          backgroundColor: config.position === pos.id ? "#F0FDFA" : "white",
                          color: config.position === pos.id ? "#0D9488" : "#374151",
                          fontWeight: 500,
                          cursor: "pointer",
                        }}
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === "messages" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1E293B" }}>Message Settings</h3>
                
                <div>
                  <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Default Message (prefilled)</label>
                  <textarea
                    value={config.defaultMessage}
                    onChange={(e) => setConfig({ ...config, defaultMessage: e.target.value })}
                    rows={2}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px", resize: "vertical" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Greeting Message</label>
                  <textarea
                    value={config.greetingMessage}
                    onChange={(e) => setConfig({ ...config, greetingMessage: e.target.value })}
                    rows={2}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px", resize: "vertical" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Offline Message</label>
                  <textarea
                    value={config.offlineMessage}
                    onChange={(e) => setConfig({ ...config, offlineMessage: e.target.value })}
                    rows={2}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px", resize: "vertical" }}
                  />
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1E293B" }}>Appearance</h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                  <div>
                    <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Button Color</label>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <input
                        type="color"
                        value={config.color}
                        onChange={(e) => setConfig({ ...config, color: e.target.value })}
                        style={{ width: "48px", height: "48px", borderRadius: "8px", border: "none", cursor: "pointer" }}
                      />
                      <input
                        type="text"
                        value={config.color}
                        onChange={(e) => setConfig({ ...config, color: e.target.value })}
                        style={{ flex: 1, padding: "12px 14px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Badge Text</label>
                    <input
                      type="text"
                      value={config.badgeText}
                      onChange={(e) => setConfig({ ...config, badgeText: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={config.showBadge}
                      onChange={(e) => setConfig({ ...config, showBadge: e.target.checked })}
                      style={{ width: "20px", height: "20px", accentColor: "#0D9488" }}
                    />
                    <span style={{ fontWeight: 500, color: "#374151" }}>Show notification badge</span>
                  </label>
                </div>

                <div>
                  <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={config.autoPopup}
                      onChange={(e) => setConfig({ ...config, autoPopup: e.target.checked })}
                      style={{ width: "20px", height: "20px", accentColor: "#0D9488" }}
                    />
                    <span style={{ fontWeight: 500, color: "#374151" }}>Auto-popup chat window</span>
                  </label>
                </div>

                {config.autoPopup && (
                  <div>
                    <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Popup Delay (seconds)</label>
                    <input
                      type="number"
                      value={config.popupDelay}
                      onChange={(e) => setConfig({ ...config, popupDelay: parseInt(e.target.value) })}
                      min={1}
                      max={60}
                      style={{ width: "120px", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                    />
                  </div>
                )}

                {/* Preview */}
                <div style={{ padding: "24px", backgroundColor: "#F9FAFB", borderRadius: "12px", marginTop: "16px" }}>
                  <h4 style={{ fontWeight: 600, color: "#1E293B", marginBottom: "16px" }}>Preview</h4>
                  <div style={{ position: "relative", height: "200px", backgroundColor: "white", borderRadius: "12px", border: "1px solid #E5E7EB" }}>
                    <div style={{ 
                      position: "absolute", 
                      bottom: config.position === "bottom-right" ? "20px" : "auto", 
                      left: config.position === "bottom-left" ? "20px" : "auto",
                      right: config.position === "bottom-right" ? "20px" : "auto",
                      width: "56px", 
                      height: "56px", 
                      borderRadius: "50%", 
                      backgroundColor: config.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                    }}>
                      <MessageCircle size={28} color="white" />
                    </div>
                    {config.showBadge && (
                      <div style={{
                        position: "absolute",
                        bottom: config.position === "bottom-right" ? "70px" : "auto",
                        left: config.position === "bottom-left" ? "70px" : "auto",
                        right: config.position === "bottom-right" ? "-4px" : "auto",
                        top: config.position === "bottom-left" ? "-4px" : "auto",
                        backgroundColor: "#EF4444",
                        color: "white",
                        fontSize: "10px",
                        fontWeight: 600,
                        padding: "2px 6px",
                        borderRadius: "10px",
                      }}>
                        {config.badgeText}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Schedule Tab */}
            {activeTab === "schedule" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1E293B" }}>Working Hours</h3>

                <div>
                  <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={config.workingHours.enabled}
                      onChange={(e) => setConfig({ ...config, workingHours: { ...config.workingHours, enabled: e.target.checked } })}
                      style={{ width: "20px", height: "20px", accentColor: "#0D9488" }}
                    />
                    <span style={{ fontWeight: 500, color: "#374151" }}>Enable scheduled hours</span>
                  </label>
                </div>

                {config.workingHours.enabled && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Timezone</label>
                      <select
                        value={config.workingHours.timezone}
                        onChange={(e) => setConfig({ ...config, workingHours: { ...config.workingHours, timezone: e.target.value } })}
                        style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                      >
                        <option value="Africa/Lagos">Africa/Lagos (GMT+1)</option>
                        <option value="Africa/Nairobi">Africa/Nairobi (GMT+3)</option>
                        <option value="Europe/London">Europe/London (GMT+0)</option>
                        <option value="America/New_York">America/New_York (GMT-5)</option>
                      </select>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                      {config.workingHours.schedule.map((day, index) => (
                        <div key={day.day} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px", backgroundColor: "#F9FAFB", borderRadius: "8px" }}>
                          <input
                            type="checkbox"
                            checked={day.enabled}
                            onChange={(e) => {
                              const newSchedule = [...config.workingHours.schedule]
                              newSchedule[index] = { ...day, enabled: e.target.checked }
                              setConfig({ ...config, workingHours: { ...config.workingHours, schedule: newSchedule } })
                            }}
                            style={{ width: "18px", height: "18px", accentColor: "#0D9488" }}
                          />
                          <span style={{ width: "100px", fontWeight: 500, color: "#374151" }}>{day.day}</span>
                          {day.enabled ? (
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <input
                                type="time"
                                value={day.start}
                                onChange={(e) => {
                                  const newSchedule = [...config.workingHours.schedule]
                                  newSchedule[index] = { ...day, start: e.target.value }
                                  setConfig({ ...config, workingHours: { ...config.workingHours, schedule: newSchedule } })
                                }}
                                style={{ padding: "8px", borderRadius: "6px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                              />
                              <span style={{ color: "#64748B" }}>to</span>
                              <input
                                type="time"
                                value={day.end}
                                onChange={(e) => {
                                  const newSchedule = [...config.workingHours.schedule]
                                  newSchedule[index] = { ...day, end: e.target.value }
                                  setConfig({ ...config, workingHours: { ...config.workingHours, schedule: newSchedule } })
                                }}
                                style={{ padding: "8px", borderRadius: "6px", border: "1px solid #D1D5DB", fontSize: "14px" }}
                              />
                            </div>
                          ) : (
                            <span style={{ color: "#9CA3AF", fontSize: "14px" }}>Closed</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                <Save size={18} />
                Save Changes
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
