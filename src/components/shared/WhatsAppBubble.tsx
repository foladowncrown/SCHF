"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"

interface WAConfig {
  isEnabled: boolean
  phoneNumber: string
  prefillMessage: string
  position: string
  color: string
}

export function WhatsAppBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState<WAConfig>({
    isEnabled: true,
    phoneNumber: "2341234567890",
    prefillMessage: "Hello SCHF, I need help with...",
    position: "bottom-right",
    color: "#25D366"
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch('/api/public/settings')
        if (res.ok) {
          const data = await res.json()
          if (data.whatsapp) {
            setConfig({
              isEnabled: data.whatsapp.isEnabled ?? true,
              phoneNumber: data.whatsapp.phoneNumber || "2341234567890",
              prefillMessage: data.whatsapp.prefillMessage || "Hello SCHF, I need help with...",
              position: data.whatsapp.position || "bottom-right",
              color: data.whatsapp.color || "#25D366"
            })
          }
        }
      } catch {
        // Silently fail - default config will be used
      } finally {
        setLoading(false)
      }
    }
    loadConfig()
  }, [])

  if (loading || !config.isEnabled) {
    return null
  }

  const waLink = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.prefillMessage)}`
  const position = config.position === "bottom-left" ? { left: "24px", right: "auto" } : { right: "24px" }

  return (
    <div style={{ position: "fixed", bottom: "24px", ...position, zIndex: 50 }}>
      {/* Chat Toggle */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: config.color,
          boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
          transition: "all 0.2s",
        }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} color="white" />
      </a>
    </div>
  )
}
