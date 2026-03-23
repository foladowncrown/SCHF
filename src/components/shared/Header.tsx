"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Heart, ChevronDown, User } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Donate", href: "/donate" },
  { name: "Contact", href: "/contact" },
]

const dropdowns = [
  {
    name: "Get Involved",
    items: [
      { name: "Volunteer", href: "/volunteer" },
      { name: "Partner With Us", href: "/partner" },
      { name: "Events", href: "/events" },
    ],
  },
]

interface HeaderProps {
  settings?: {
    siteName: string
    siteDescription: string
    favicon: string
    theme: {
      primaryColor: string
      secondaryColor: string
      accentColor: string
    } | null
  }
}

export function Header({ settings }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <header style={{ 
      position: "fixed", 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 50, 
      backgroundColor: "rgba(255,255,255,0.95)", 
      backdropFilter: "blur(8px)",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
    }}>
      <nav className="container-main" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "80px" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <div style={{ 
            width: "48px", 
            height: "48px", 
            backgroundColor: "#0D9488", 
            borderRadius: "50%", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center" 
          }}>
            <Heart size={24} color="white" fill="white" />
          </div>
          <div>
            <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#1E293B" }}>SCHF</span>
            <p style={{ fontSize: "12px", color: "#64748B", lineHeight: 1.2 }}>Strategic Care & Health Foundation</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="desktop-nav">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              style={{ 
                color: "#334155", 
                fontWeight: 500, 
                transition: "color 0.2s"
              }}
            >
              {item.name}
            </Link>
          ))}
          <div style={{ position: "relative" }} className="dropdown">
            <button 
              onClick={() => setActiveDropdown(activeDropdown === "getInvolved" ? null : "getInvolved")}
              onMouseEnter={() => setActiveDropdown("getInvolved")}
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "4px", 
                color: "#334155", 
                fontWeight: 500,
                background: "none",
                border: "none",
                cursor: "pointer"
              }}
            >
              Get Involved
              <ChevronDown size={16} style={{ transform: activeDropdown === "getInvolved" ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </button>
            {activeDropdown === "getInvolved" && (
              <div 
                onMouseLeave={() => setActiveDropdown(null)}
                style={{ 
                  position: "absolute", 
                  top: "100%", 
                  right: 0, 
                  marginTop: "8px", 
                  backgroundColor: "white", 
                  borderRadius: "12px", 
                  boxShadow: "0 10px 40px rgba(0,0,0,0.15)", 
                  padding: "8px", 
                  minWidth: "200px",
                  zIndex: 100
                }}
              >
                {dropdowns[0].items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    style={{ 
                      display: "block", 
                      padding: "12px 16px", 
                      color: "#334155", 
                      fontWeight: 500,
                      borderRadius: "8px",
                      transition: "background-color 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F5F5F4"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/donate" className="btn-primary" style={{ padding: "10px 20px", fontSize: "14px" }}>
            Donate Now
          </Link>
          <Link href="/auth/login" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748B", fontSize: "14px", fontWeight: 500 }}>
            <User size={16} />
            Admin
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ display: "none", padding: "8px", background: "none", border: "none", cursor: "pointer" }}
        >
          {mobileMenuOpen ? <X size={24} color="#334155" /> : <Menu size={24} color="#334155" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu" style={{ padding: "16px 0", borderTop: "1px solid #E2E8F0" }}>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{ display: "block", padding: "12px 16px", color: "#334155", fontWeight: 500, borderBottom: "1px solid #F1F5F9" }}
            >
              {item.name}
            </Link>
          ))}
          <div style={{ padding: "12px 16px" }}>
            <p style={{ fontSize: "14px", fontWeight: 500, color: "#64748B", marginBottom: "8px" }}>Get Involved</p>
            {dropdowns[0].items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: "block", padding: "8px 16px", color: "#334155" }}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div style={{ padding: "16px" }}>
            <Link href="/donate" className="btn-primary" style={{ width: "100%", textAlign: "center" }}>
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
