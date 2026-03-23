"use client"

import { useState, useEffect } from "react"
import { Users, Target, Heart, Award } from "lucide-react"

const defaultTeam = [
  {
    name: "Dr. Sarah Johnson",
    position: "Executive Director",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
    bio: "Over 20 years of experience in public health and infectious disease management.",
  },
  {
    name: "Dr. Michael Chen",
    position: "Medical Director",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    bio: "Specialist in hepatology with extensive research on hepatitis treatment.",
  },
  {
    name: "Amara Okonkwo",
    position: "Programs Director",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
    bio: "Community health expert with 15 years leading outreach programs.",
  },
  {
    name: "David Williams",
    position: "Finance Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "Financial strategist with expertise in NGO sustainability.",
  },
]

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We treat every individual with dignity and empathy, understanding the challenges they face.",
  },
  {
    icon: Target,
    title: "Impact",
    description: "We focus on measurable outcomes that transform communities and save lives.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work together with partners, communities, and stakeholders to achieve our mission.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in healthcare delivery and organizational operations.",
  },
]

const partners = [
  { name: "WHO", logo: "/partners/who.png" },
  { name: "UNICEF", logo: "/partners/unicef.png" },
  { name: "CDC", logo: "/partners/cdc.png" },
  { name: "Health Ministry", logo: "/partners/health.png" },
  { name: "Red Cross", logo: "/partners/redcross.png" },
  { name: "Clinton Health", logo: "/partners/clinton.png" },
]

interface TeamMember {
  name: string
  position: string
  bio: string
  image: string
}

export default function AboutPage() {
  const [team, setTeam] = useState<TeamMember[]>(defaultTeam)

  useEffect(() => {
    async function loadTeam() {
      try {
        const res = await fetch("/api/team")
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setTeam(data.map((m: any) => ({
              name: m.name,
              position: m.position,
              image: m.imageUrl || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
              bio: m.bio || "",
            })))
          }
        }
      } catch (error) {
        console.error("Error loading team:", error)
      }
    }
    loadTeam()
  }, [])

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section style={{ padding: "80px 0", backgroundColor: "#1E293B", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(30,41,59,0.95), rgba(30,41,59,0.8))" }} />
        </div>
        <div className="container-main" style={{ position: "relative" }}>
          <div style={{ maxWidth: "768px", margin: "0 auto", textAlign: "center" }}>
            <span style={{ color: "#5EEAD4", fontWeight: 500 }}>About SCHF</span>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "white", marginTop: "8px", marginBottom: "24px" }}>
              Leading the Fight Against Hepatitis
            </h1>
            <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#D1D5DB" }}>
              We are a non-profit organization dedicated to eliminating hepatitis as a public health threat 
              through prevention, testing, treatment, and advocacy.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section style={{ padding: "80px 0" }}>
        <div className="container-main">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "48px", alignItems: "center" }} className="about-story-grid">
            <div>
              <span style={{ color: "#0D9488", fontWeight: 500 }}>Our Story</span>
              <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginTop: "8px", marginBottom: "24px" }}>
                A Legacy of Healthcare Excellence
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", color: "#64748B" }}>
                <p>
                  Founded in 2010, the Strategic Care & Health Foundation (SCHF) began with a simple vision: 
                  to make hepatitis testing and treatment accessible to everyone, regardless of their background 
                  or location.
                </p>
                <p>
                  What started as a small community initiative has grown into a nationwide movement, with 
                  programs spanning prevention education, free testing, treatment support, and advocacy for 
                  hepatitis-aware policies.
                </p>
                <p>
                  Today, we continue to expand our reach, working tirelessly to eliminate hepatitis as a 
                  public health threat and create a world where everyone has access to the healthcare they deserve.
                </p>
              </div>
            </div>
            <div style={{ position: "relative", height: "400px", borderRadius: "16px", overflow: "hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80"
                alt="Our team in the field"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision */}
      <section style={{ padding: "80px 0", backgroundColor: "#F5F5F4" }}>
        <div className="container-main">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }} className="mission-grid">
            <div style={{ backgroundColor: "white", padding: "32px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <h3 style={{ fontSize: "24px", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginBottom: "16px" }}>Our Mission</h3>
              <p style={{ color: "#64748B" }}>
                To eliminate hepatitis as a public health threat through comprehensive prevention, 
                testing, treatment, and advocacy — ensuring accessible healthcare for all communities, 
                especially those most vulnerable.
              </p>
            </div>
            <div style={{ backgroundColor: "white", padding: "32px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <h3 style={{ fontSize: "24px", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginBottom: "16px" }}>Our Vision</h3>
              <p style={{ color: "#64748B" }}>
                A world where hepatitis no longer poses a significant threat to public health, 
                where every person has access to prevention, testing, and treatment services, 
                and where communities are empowered with the knowledge to protect themselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "80px 0" }}>
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span style={{ color: "#0D9488", fontWeight: 500 }}>What Guides Us</span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginTop: "8px" }}>
              Our Values
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }} className="values-grid">
            {values.map((value, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <div style={{ width: "64px", height: "64px", backgroundColor: "rgba(13,148,136,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <value.icon size={32} color="#0D9488" />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginBottom: "8px" }}>
                  {value.title}
                </h3>
                <p style={{ color: "#64748B" }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "80px 0", backgroundColor: "#F5F5F4" }}>
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span style={{ color: "#0D9488", fontWeight: 500 }}>Meet Our Team</span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginTop: "8px" }}>
              Leadership Team
            </h2>
            <p style={{ color: "#64748B", marginTop: "16px", maxWidth: "672px", margin: "16px auto 0" }}>
              Our dedicated team brings decades of experience in healthcare, public health, 
              and community development to drive our mission forward.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }} className="team-grid">
            {team.map((member, index) => (
              <div key={index} style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", textAlign: "center" }}>
                <div style={{ position: "relative", width: "128px", height: "128px", borderRadius: "50%", overflow: "hidden", margin: "0 auto 16px" }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#1E293B" }}>
                  {member.name}
                </h3>
                <p style={{ color: "#0D9488", fontWeight: 500, marginBottom: "8px" }}>{member.position}</p>
                <p style={{ color: "#64748B", fontSize: "14px" }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section style={{ padding: "80px 0" }}>
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ color: "#0D9488", fontWeight: 500 }}>Our Partners</span>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginTop: "8px" }}>
              Working Together for Impact
            </h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "32px" }} className="partners-grid">
            {partners.map((partner, index) => (
              <div 
                key={index} 
                style={{ width: "128px", height: "64px", backgroundColor: "white", border: "1px solid #E2E8F0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", filter: "grayscale(100%)", transition: "filter 0.3s" }}
                onMouseEnter={(e) => e.currentTarget.style.filter = "grayscale(0%)"}
                onMouseLeave={(e) => e.currentTarget.style.filter = "grayscale(100%)"}
              >
                <span style={{ fontWeight: 600, color: "#64748B" }}>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", backgroundColor: "#0D9488" }}>
        <div className="container-main" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "white", marginBottom: "16px" }}>
            Join Our Mission
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "32px", maxWidth: "672px", margin: "0 auto 32px" }}>
            Whether through volunteering, partnering, or donating, you can help us eliminate hepatitis 
            and create a healthier future for all.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }} className="cta-buttons">
            <a href="/donate" className="btn-accent" style={{ fontSize: "18px", padding: "16px 32px" }}>
              Donate Now
            </a>
            <a href="/volunteer" style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "white", padding: "16px 32px", borderRadius: "8px", fontWeight: 500, transition: "background-color 0.2s" }}>
              Get Involved
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
