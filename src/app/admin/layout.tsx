"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  DollarSign, 
  Mail, 
  MessageSquare, 
  Settings,
  LogOut,
  LogIn,
  ChevronLeft,
  ChevronRight,
  Heart,
  User,
  Coins,
  ArrowLeft,
  Search,
  Bell,
  Menu,
  Image,
  MessageCircle,
  Search as SearchIcon,
  Shield,
  UserCog
} from "lucide-react"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { SessionProvider } from "@/components/providers/SessionProvider"

const sidebarNav = [
  { 
    category: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    ]
  },
  { 
    category: "Content",
    items: [
      { icon: Image, label: "Hero Slider", href: "/admin/hero-slider" },
      { icon: FileText, label: "Pages", href: "/admin/pages" },
      { icon: Users, label: "Team", href: "/admin/team" },
    ]
  },
  { 
    category: "Marketing",
    items: [
      { icon: SearchIcon, label: "SEO", href: "/admin/seo" },
    ]
  },
  { 
    category: "Management",
    items: [
      { icon: DollarSign, label: "Donations", href: "/admin/donations" },
      { icon: Coins, label: "Currencies", href: "/admin/currencies" },
    ]
  },
  { 
    category: "Communication",
    items: [
      { icon: Mail, label: "Newsletter", href: "/admin/newsletter" },
      { icon: MessageSquare, label: "Contacts", href: "/admin/contacts" },
      { icon: MessageCircle, label: "Live Support", href: "/admin/live-support" },
    ]
  },
  { 
    category: "System",
    items: [
      { icon: UserCog, label: "Users", href: "/admin/users" },
      { icon: Shield, label: "Roles", href: "/admin/roles" },
      { icon: Settings, label: "Settings", href: "/admin/settings" },
    ]
  },
]

const topNavItems = [
  { icon: Bell, label: "Notifications", href: "#" },
]

function AdminContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const isAuthPage = pathname === "/auth/login" || pathname === "/auth/register"
  const isAuthenticated = status === "authenticated"
  const user = session?.user

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" })
  }

  if (isAuthPage) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#F9FAFB" }}>
        {children}
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9FAFB", display: "flex" }}>
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 45,
            display: "none",
          }}
          className="mobile-overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          backgroundColor: "#1E293B",
          color: "white",
          transition: "width 0.3s ease",
          width: sidebarCollapsed ? "80px" : "280px",
          display: "flex",
          flexDirection: "column",
          zIndex: 50,
        }}
      >
        {/* Logo */}
        <div style={{ 
          height: "72px", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: sidebarCollapsed ? "center" : "space-between",
          padding: sidebarCollapsed ? "0 16px" : "0 20px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}>
          <Link href="/admin/dashboard" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", color: "white" }}>
            <div style={{ 
              width: "40px", 
              height: "40px", 
              backgroundColor: "#0D9488", 
              borderRadius: "50%", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <Heart size={20} color="white" fill="white" />
            </div>
            {!sidebarCollapsed && (
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "18px" }}>SCHF</span>
            )}
          </Link>
          {!sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(true)}
              style={{
                padding: "8px",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronLeft size={18} />
            </button>
          )}
        </div>

        {/* Collapse Toggle when collapsed */}
        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            style={{
              position: "absolute",
              top: "80px",
              right: "-12px",
              width: "24px",
              height: "24px",
              backgroundColor: "#0D9488",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 60,
            }}
          >
            <ChevronRight size={14} />
          </button>
        )}

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
          {sidebarNav.map((section, sectionIndex) => (
            <div key={section.category} style={{ marginBottom: sectionIndex < sidebarNav.length - 1 ? "24px" : "0" }}>
              {!sidebarCollapsed && (
                <div style={{ 
                  fontSize: "11px", 
                  fontWeight: 600, 
                  color: "rgba(255,255,255,0.4)", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.05em",
                  padding: "0 12px",
                  marginBottom: "8px",
                }}>
                  {section.category}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: sidebarCollapsed ? "12px" : "12px 16px",
                        borderRadius: "10px",
                        backgroundColor: isActive ? "rgba(13, 148, 136, 0.2)" : "transparent",
                        color: isActive ? "#5EEAD4" : "rgba(255,255,255,0.7)",
                        fontWeight: isActive ? 600 : 500,
                        fontSize: "14px",
                        transition: "all 0.2s",
                        justifyContent: sidebarCollapsed ? "center" : "flex-start",
                        textDecoration: "none",
                      }}
                    >
                      <item.icon size={20} style={{ flexShrink: 0 }} />
                      {!sidebarCollapsed && <span>{item.label}</span>}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div style={{ 
          padding: "16px", 
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}>
          {/* Back to Site */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "10px",
              color: "rgba(255,255,255,0.7)",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
              marginBottom: "8px",
              backgroundColor: "rgba(255,255,255,0.05)",
              justifyContent: sidebarCollapsed ? "center" : "flex-start",
            }}
          >
            <ArrowLeft size={18} />
            {!sidebarCollapsed && <span>Back to Site</span>}
          </Link>
          
          {/* User Info */}
          {isAuthenticated ? (
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "12px", 
              padding: "12px",
              marginBottom: "8px",
              borderRadius: "10px",
              backgroundColor: "rgba(255,255,255,0.05)",
              justifyContent: sidebarCollapsed ? "center" : "flex-start",
            }}>
              <div style={{ 
                width: "36px", 
                height: "36px", 
                backgroundColor: "rgba(13, 148, 136, 0.2)", 
                borderRadius: "50%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <User size={18} color="#5EEAD4" />
              </div>
              {!sidebarCollapsed && (
                <div style={{ overflow: "hidden" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {user?.name || "Admin"}
                  </p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {user?.email || ""}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "10px",
                color: "rgba(255,255,255,0.7)",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                marginBottom: "8px",
                backgroundColor: "rgba(255,255,255,0.05)",
                justifyContent: sidebarCollapsed ? "center" : "flex-start",
              }}
            >
              <LogIn size={18} />
              {!sidebarCollapsed && <span>Sign In</span>}
            </Link>
          )}
          
          {/* Sign Out */}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "10px",
                color: "#FCA5A5",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                border: "none",
                cursor: "pointer",
                justifyContent: sidebarCollapsed ? "center" : "flex-start",
              }}
            >
              <LogOut size={18} />
              {!sidebarCollapsed && <span>Sign Out</span>}
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          marginLeft: sidebarCollapsed ? "80px" : "280px",
          transition: "margin-left 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Bar */}
        <header style={{ 
          height: "72px", 
          backgroundColor: "white", 
          borderBottom: "1px solid #E5E7EB", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          padding: "0 24px",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: "none",
                padding: "8px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              className="mobile-menu-btn"
            >
              <Menu size={24} color="#374151" />
            </button>
            <div>
              <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#1E293B", fontFamily: "'Playfair Display', serif" }}>
                Admin Dashboard
              </h1>
              <p style={{ fontSize: "13px", color: "#64748B", display: "none" }} className="admin-subtitle">
                {isAuthenticated 
                  ? `Welcome back, ${user?.name || 'User'}!` 
                  : "Manage your site content here."}
              </p>
            </div>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Search */}
            <div style={{ 
              display: "none", 
              alignItems: "center", 
              gap: "8px",
              padding: "8px 16px",
              backgroundColor: "#F9FAFB",
              borderRadius: "10px",
              border: "1px solid #E5E7EB",
            }} className="admin-search">
              <Search size={18} color="#94A3B8" />
              <input 
                type="text" 
                placeholder="Search..." 
                style={{ 
                  border: "none", 
                  background: "transparent", 
                  outline: "none",
                  fontSize: "14px",
                  width: "160px",
                  color: "#374151",
                }}
              />
            </div>
            
            {/* Top Nav Items */}
            <button style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              border: "1px solid #E5E7EB",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
            }}>
              <Bell size={18} color="#64748B" />
              <span style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                width: "8px",
                height: "8px",
                backgroundColor: "#EF4444",
                borderRadius: "50%",
              }} />
            </button>
            
            {/* View Site */}
            <Link
              href="/"
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
                backgroundColor: "white",
                color: "#64748B",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              View Site
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: "24px", flex: 1 }} className="admin-content">
          {children}
        </div>
      </main>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <AdminContent>{children}</AdminContent>
    </SessionProvider>
  )
}
