"use client"

import { useState } from "react"
import { Heart, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data.error || "Something went wrong")
      }
    } catch {
      setError("Failed to send reset email")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 16px", backgroundColor: "#F9FAFB" }}>
      <div style={{ width: "100%", maxWidth: "448px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <div style={{ width: "48px", height: "48px", backgroundColor: "#0D9488", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Heart size={24} color="white" fill="white" />
            </div>
          </Link>
          <h1 style={{ fontSize: "24px", fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#334155", marginTop: "16px" }}>Reset Password</h1>
          <p style={{ color: "#64748B", marginTop: "8px" }}>Enter your email to receive a reset link</p>
        </div>

        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          {submitted ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", backgroundColor: "#DCFCE7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Mail size={32} color="#22C55E" />
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#334155", marginBottom: "8px" }}>Check your email</h2>
              <p style={{ color: "#64748B", marginBottom: "24px" }}>
                We&apos;ve sent a password reset link to <strong>{email}</strong>
              </p>
              <Link href="/auth/login" style={{ color: "#0D9488", fontWeight: 500 }}>
                Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {error && (
                <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "8px", padding: "12px" }}>
                  <p style={{ color: "#DC2626", fontSize: "14px" }}>{error}</p>
                </div>
              )}
              <div>
                <label style={{ display: "block", fontWeight: 500, color: "#334155", marginBottom: "8px" }}>Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "16px", boxSizing: "border-box" }}
                  placeholder="admin@schf.org"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ 
                  width: "100%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  gap: "8px", 
                  padding: "14px 24px", 
                  backgroundColor: "#0D9488", 
                  color: "white", 
                  fontWeight: 500, 
                  borderRadius: "8px", 
                  border: "none", 
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? (
                  <span style={{ width: "20px", height: "20px", border: "2px solid white", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                ) : (
                  "Send Reset Link"
                )}
              </button>

              <Link href="/auth/login" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#64748B", fontSize: "14px" }}>
                <ArrowLeft size={16} />
                Back to login
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
