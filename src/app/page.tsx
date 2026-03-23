"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Heart, Activity, Users, Shield, ArrowRight, Check, Loader2 } from "lucide-react"
import { defaultHeroSlides } from "@/lib/heroSlides"

const stats = [
  { icon: Users, value: "50,000+", label: "People Screened" },
  { icon: Activity, value: "15,000+", label: "Patients Supported" },
  { icon: Shield, value: "200+", label: "Community Partners" },
  { icon: Heart, value: "50+", label: "Healthcare Facilities" },
]

const programs = [
  {
    icon: Shield,
    title: "Prevention",
    description: "Education and vaccination awareness to prevent hepatitis transmission in communities.",
    link: "/programs#prevention",
  },
  {
    icon: Activity,
    title: "Testing & Screening",
    description: "Free confidential testing for hepatitis B and C with rapid results.",
    link: "/programs#screening",
  },
  {
    icon: Heart,
    title: "Treatment Support",
    description: "Connecting patients with affordable treatment options and care coordination.",
    link: "/programs#treatment",
  },
  {
    icon: Users,
    title: "Community Outreach",
    description: "Mobile clinics and community programs bringing healthcare to underserved areas.",
    link: "/programs#outreach",
  },
]

function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      })
      
      const data = await res.json()
      
      if (res.ok) {
        setStatus("success")
        setMessage("Thank you for subscribing!")
        setEmail("")
        setName("")
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Failed to subscribe. Please try again.")
    }
  }

  if (status === "success") {
    return (
      <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ width: "64px", height: "64px", backgroundColor: "rgba(34,197,94,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <Check size={32} color="#22C55E" />
        </div>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#1E293B", marginBottom: "16px" }}>
          You're Subscribed!
        </h2>
        <p style={{ color: "#64748B", marginBottom: "24px" }}>
          Thank you for subscribing to our newsletter. You'll receive updates on hepatitis research, our programs, and ways you can get involved.
        </p>
        <button 
          onClick={() => setStatus("idle")}
          style={{ color: "#0D9488", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}
        >
          Subscribe another email
        </button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
      <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#1E293B", marginBottom: "16px" }}>
        Stay Informed
      </h2>
      <p style={{ color: "#64748B", marginBottom: "32px" }}>
        Subscribe to our newsletter for updates on hepatitis research, our programs, and ways you can get involved.
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "448px", margin: "0 auto" }} className="newsletter-form">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "16px" }}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "16px" }}
        />
        {status === "error" && (
          <p style={{ color: "#EF4444", fontSize: "14px" }}>{message}</p>
        )}
        <button 
          type="submit" 
          disabled={status === "loading"}
          className="btn-primary" 
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
    </div>
  )
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [heroSlides, setHeroSlides] = useState(defaultHeroSlides.filter(s => s.isActive))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSlides() {
      try {
        const res = await fetch('/api/public/settings')
        if (res.ok) {
          const data = await res.json()
          if (data.heroSlides && data.heroSlides.length > 0) {
            const formattedSlides = data.heroSlides.map((s: any) => ({
              id: s.id,
              title: s.title,
              subtitle: s.subtitle || "",
              description: s.description || "",
              image: s.imageUrl,
              ctaText: s.ctaText || "",
              ctaLink: s.ctaLink || "/",
            }))
            setHeroSlides(formattedSlides)
          }
        }
      } catch {
        // Silently fail - default slides will be used
      } finally {
        setLoading(false)
      }
    }
    loadSlides()
  }, [])

  useEffect(() => {
    if (heroSlides.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  if (loading) {
    return (
      <div style={{ paddingTop: "80px", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "40px", height: "40px", border: "3px solid #E2E8F0", borderTopColor: "#0D9488", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    )
  }

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero Slider */}
      <section style={{ position: "relative", height: "calc(100vh - 80px)", minHeight: "600px", overflow: "hidden" }}>
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              position: "absolute",
              inset: 0,
              opacity: index === currentSlide ? 1 : 0,
              transition: "opacity 0.7s ease-in-out",
            }}
          >
            <div 
              style={{
                position: "absolute",
                inset: 0,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: `url(${slide.image})`,
              }}
            />
            <div style={{ 
              position: "absolute", 
              inset: 0, 
              background: "linear-gradient(to right, rgba(30,41,59,0.95), rgba(30,41,59,0.7), transparent)" 
            }} />
            
            <div className="container-main" style={{ position: "relative", height: "100%", display: "flex", alignItems: "center", paddingTop: "80px" }}>
              <div style={{ maxWidth: "672px", color: "white", margin: "0 auto", textAlign: "center" }}>
                <span style={{ 
                  display: "inline-block", 
                  padding: "4px 16px", 
                  backgroundColor: "rgba(13,148,136,0.2)", 
                  border: "1px solid rgba(13,148,136,0.4)", 
                  borderRadius: "9999px", 
                  color: "#5EEAD4",
                  fontSize: "14px",
                  fontWeight: 500,
                  marginBottom: "16px"
                }}>
                  {slide.subtitle}
                </span>
                <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", marginBottom: "24px", lineHeight: 1.2 }}>
                  {slide.title}
                </h1>
                <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#D1D5DB", marginBottom: "32px", lineHeight: 1.7 }}>
                  {slide.description}
                </p>
                <Link
                  href={slide.ctaLink}
                  className="btn-primary"
                  style={{ fontSize: "18px", padding: "16px 32px" }}
                >
                  {slide.ctaText}
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "48px",
            height: "48px",
            backgroundColor: "rgba(255,255,255,0.1)",
            border: "none",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "white",
          }}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "48px",
            height: "48px",
            backgroundColor: "rgba(255,255,255,0.1)",
            border: "none",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "white",
          }}
        >
          <ChevronRight size={24} />
        </button>

        <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px" }}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: index === currentSlide ? "32px" : "12px",
                height: "12px",
                borderRadius: "6px",
                backgroundColor: index === currentSlide ? "#0D9488" : "rgba(255,255,255,0.5)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ backgroundColor: "#0D9488", padding: "64px 0" }}>
        <div className="container-main">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "32px" }} className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <div style={{ 
                  width: "56px", 
                  height: "56px", 
                  backgroundColor: "rgba(255,255,255,0.1)", 
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  margin: "0 auto 16px"
                }}>
                  <stat.icon size={28} color="white" />
                </div>
                <div style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "white", marginBottom: "8px", fontFamily: "'Playfair Display', serif" }}>
                  {stat.value}
                </div>
                <div style={{ color: "rgba(255,255,255,0.8)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Banner */}
      <section style={{ padding: "80px 0", backgroundColor: "#F5F5F4" }}>
        <div className="container-main">
          <div style={{ maxWidth: "768px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#1E293B", marginBottom: "24px" }}>
              Our Mission
            </h2>
            <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#64748B", lineHeight: 1.7 }}>
              To eliminate hepatitis as a public health threat through comprehensive prevention, 
              testing, treatment, and advocacy — ensuring accessible healthcare for all communities, 
              especially those most vulnerable.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section style={{ padding: "80px 0" }}>
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span style={{ color: "#0D9488", fontWeight: 500 }}>What We Do</span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#1E293B", marginTop: "8px" }}>
              Our Programs
            </h2>
            <p style={{ color: "#64748B", marginTop: "16px", maxWidth: "672px", margin: "16px auto 0" }}>
              Comprehensive healthcare initiatives designed to address hepatitis at every stage — 
              from prevention to treatment and beyond.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "24px" }} className="programs-grid">
            {programs.map((program, index) => (
              <Link
                key={index}
                href={program.link}
                className="card"
                style={{ textDecoration: "none" }}
              >
                <div style={{ 
                  width: "56px", 
                  height: "56px", 
                  backgroundColor: "rgba(13,148,136,0.1)", 
                  borderRadius: "12px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  marginBottom: "16px"
                }}>
                  <program.icon size={28} color="#0D9488" />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#1E293B", marginBottom: "12px" }}>
                  {program.title}
                </h3>
                <p style={{ color: "#64748B", lineHeight: 1.6 }}>
                  {program.description}
                </p>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Link href="/programs" className="btn-secondary">
              View All Programs
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "80px 0", backgroundColor: "#1E293B", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.1, background: "linear-gradient(135deg, white 0%, transparent 50%)" }} />
        <div className="container-main" style={{ position: "relative", textAlign: "center", color: "white" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, marginBottom: "24px" }}>
            Join Us in the Fight Against Hepatitis
          </h2>
          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#D1D5DB", marginBottom: "32px", maxWidth: "672px", margin: "0 auto 32px" }}>
            Whether through volunteering, partnering, or donating — your contribution makes a real impact in eliminating hepatitis.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }} className="cta-buttons">
            <Link href="/donate" className="btn-accent" style={{ fontSize: "18px", padding: "16px 32px" }}>
              Donate Now
            </Link>
            <Link href="/volunteer" style={{ 
              backgroundColor: "rgba(255,255,255,0.1)", 
              color: "white", 
              padding: "16px 32px", 
              borderRadius: "8px", 
              fontWeight: 500,
              transition: "background-color 0.2s"
            }}>
              Volunteer With Us
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{ padding: "80px 0" }}>
        <div className="container-main">
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}
