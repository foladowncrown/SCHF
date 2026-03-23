"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send, Check, MessageCircle } from "lucide-react"

const departments = [
  { value: "general", label: "General Inquiry" },
  { value: "medical", label: "Medical Services" },
  { value: "partnerships", label: "Partnerships" },
  { value: "donations", label: "Donations" },
  { value: "volunteer", label: "Volunteering" },
]

const contactInfo = [
  {
    icon: MapPin,
    title: "Main Office",
    content: "123 Health Avenue, Lagos, Nigeria",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+234 123 456 7890",
    link: "tel:+2341234567890",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@schf.org",
    link: "mailto:info@schf.org",
  },
  {
    icon: Clock,
    title: "Hours",
    content: "Mon - Fri: 8AM - 6PM",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "general",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data.error || "Failed to send message")
      }
    } catch {
      setError("Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section style={{ padding: "80px 0", backgroundColor: "#1E293B", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(30,41,59,0.95), rgba(30,41,59,0.8))" }} />
        </div>
        <div className="container-main" style={{ position: "relative" }}>
          <div style={{ maxWidth: "768px", margin: "0 auto", textAlign: "center" }}>
            <span style={{ color: "#5EEAD4", fontWeight: 500 }}>Get in Touch</span>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "white", marginTop: "8px", marginBottom: "24px" }}>
              Contact Us
            </h1>
            <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#D1D5DB" }}>
              Have questions or need support? We'd love to hear from you. 
              Reach out through any of our channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ padding: "80px 0" }}>
        <div className="container-main">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "48px" }} className="contact-grid">
            {/* Contact Form */}
            <div style={{ backgroundColor: "white", padding: "32px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginBottom: "24px" }}>
                Send Us a Message
              </h2>

              {submitted ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div style={{ width: "64px", height: "64px", backgroundColor: "rgba(34,197,94,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <Check size={32} color="#22C55E" />
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginBottom: "8px" }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: "#64748B" }}>
                    Thank you for contacting us. We'll get back to you within 24-48 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{ color: "#0D9488", fontWeight: 500, background: "none", border: "none", marginTop: "16px", cursor: "pointer" }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }} className="form-grid">
                    <div>
                      <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "16px" }}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "16px" }}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }} className="form-grid">
                    <div>
                      <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "16px" }}
                        placeholder="+234 123 456 7890"
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>
                        Department
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "16px" }}
                      >
                        {departments.map((dept) => (
                          <option key={dept.value} value={dept.value}>
                            {dept.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>
                      Message *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "16px", resize: "vertical" }}
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "16px", padding: "14px 24px", opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? (
                      <span style={{ width: "20px", height: "20px", border: "2px solid white", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                  
                  {error && (
                    <p style={{ color: "#EF4444", textAlign: "center", fontSize: "14px" }}>{error}</p>
                  )}
                </form>
              )}
            </div>

            {/* Contact Info & Map */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Contact Info Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }} className="info-grid">
                {contactInfo.map((info, index) => (
                  <div key={index} style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                      <div style={{ width: "48px", height: "48px", backgroundColor: "rgba(13,148,136,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <info.icon size={24} color="#0D9488" />
                      </div>
                      <div>
                        <h3 style={{ fontWeight: 600, color: "#1E293B" }}>{info.title}</h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            style={{ color: "#64748B", fontSize: "14px", textDecoration: "none" }}
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p style={{ color: "#64748B", fontSize: "14px" }}>{info.content}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp */}
              <div style={{ backgroundColor: "#25D366", padding: "24px", borderRadius: "12px", color: "white" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "48px", height: "48px", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <MessageCircle size={24} color="white" />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600 }}>Chat on WhatsApp</h3>
                    <p style={{ fontSize: "14px", opacity: 0.8 }}>
                      Get quick responses on WhatsApp
                    </p>
                  </div>
                </div>
                <a
                  href="https://wa.me/2341234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", marginTop: "16px", backgroundColor: "white", color: "#25D366", padding: "12px", borderRadius: "8px", fontWeight: 500, textAlign: "center", textDecoration: "none" }}
                >
                  Start Chat
                </a>
              </div>

              {/* Map */}
              <div style={{ backgroundColor: "white", padding: "0", borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.471232165484!2d3.379185674628463!3d6.524550324233626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8cf8e743921%3A0x1c5f40c5f9c34c2!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SCHF Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section style={{ padding: "80px 0", backgroundColor: "#F5F5F4" }}>
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#1E293B" }}>
              Emergency Contacts
            </h2>
            <p style={{ color: "#64748B", marginTop: "16px" }}>
              For medical emergencies, please contact these hotlines
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px", maxWidth: "896px", margin: "0 auto" }} className="emergency-grid">
            <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", textAlign: "center" }}>
              <h3 style={{ fontWeight: 600, color: "#1E293B", marginBottom: "8px" }}>National Emergency</h3>
              <p style={{ color: "#0D9488", fontSize: "24px", fontWeight: 700 }}>112</p>
            </div>
            <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", textAlign: "center" }}>
              <h3 style={{ fontWeight: 600, color: "#1E293B", marginBottom: "8px" }}>Health Hotline</h3>
              <p style={{ color: "#0D9488", fontSize: "24px", fontWeight: 700 }}>+234 800 SCHF 000</p>
            </div>
            <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", textAlign: "center" }}>
              <h3 style={{ fontWeight: 600, color: "#1E293B", marginBottom: "8px" }}>Hepatitis Support</h3>
              <p style={{ color: "#0D9488", fontSize: "24px", fontWeight: 700 }}>+234 123 456 7899</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
