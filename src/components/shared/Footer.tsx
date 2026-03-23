import Link from "next/link"
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

interface FooterProps {
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

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Programs", href: "/programs" },
  { name: "Get Involved", href: "/volunteer" },
  { name: "Donate", href: "/donate" },
  { name: "Contact", href: "/contact" },
]

const programs = [
  { name: "Hepatitis Prevention", href: "/programs#prevention" },
  { name: "Testing & Screening", href: "/programs#screening" },
  { name: "Treatment Support", href: "/programs#treatment" },
  { name: "Community Outreach", href: "/programs#outreach" },
  { name: "Health Education", href: "/programs#education" },
]

const socials = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
]

export function Footer({ settings }: FooterProps) {
  return (
    <footer style={{ backgroundColor: "#1E293B", color: "white", marginTop: "auto" }}>
      {/* Main Footer */}
      <div className="container-main" style={{ padding: "64px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "32px" }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
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
                <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>SCHF</span>
                <p style={{ fontSize: "12px", color: "#9CA3AF" }}>Strategic Care & Health Foundation</p>
              </div>
            </div>
            <p style={{ color: "#9CA3AF", marginBottom: "24px", lineHeight: 1.7 }}>
              Leading the fight against hepatitis through prevention, outreach, and awareness. Together, we can create a healthier future.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  style={{ 
                    width: "40px", 
                    height: "40px", 
                    backgroundColor: "rgba(255,255,255,0.1)", 
                    borderRadius: "50%", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    transition: "background-color 0.2s"
                  }}
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, fontFamily: "'Playfair Display', serif", marginBottom: "16px" }}>Quick Links</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} style={{ color: "#9CA3AF", transition: "color 0.2s" }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, fontFamily: "'Playfair Display', serif", marginBottom: "16px" }}>Our Programs</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {programs.map((program) => (
                <li key={program.name}>
                  <Link href={program.href} style={{ color: "#9CA3AF", transition: "color 0.2s" }}>
                    {program.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, fontFamily: "'Playfair Display', serif", marginBottom: "16px" }}>Contact Us</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <MapPin size={20} color="#0D9488" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span style={{ color: "#9CA3AF" }}>
                  123 Health Avenue,<br />
                  Lagos, Nigeria
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Phone size={20} color="#0D9488" />
                <a href="tel:+2341234567890" style={{ color: "#9CA3AF" }}>
                  +234 123 456 7890
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Mail size={20} color="#0D9488" />
                <a href="mailto:info@schf.org" style={{ color: "#9CA3AF" }}>
                  info@schf.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="container-main" style={{ padding: "24px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <p style={{ color: "#9CA3AF", fontSize: "14px" }}>
            © {new Date().getFullYear()} SCHF. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px", fontSize: "14px" }}>
            <Link href="/privacy" style={{ color: "#9CA3AF" }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: "#9CA3AF" }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
