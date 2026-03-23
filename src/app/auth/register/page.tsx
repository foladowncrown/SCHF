"use client"

import { useState } from "react"
import { Heart, Eye, EyeOff, UserPlus, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accessCode: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!formData.accessCode) {
      setError("Access code is required for admin registration")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          accessCode: formData.accessCode,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Registration failed")
        setLoading(false)
        return
      }

      setSubmitted(true)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 16px", backgroundColor: "#F9FAFB" }}>
        <div style={{ width: "100%", maxWidth: "448px", textAlign: "center" }}>
          <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <div style={{ width: "64px", height: "64px", backgroundColor: "#DCFCE7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <CheckCircle size={32} color="#22C55E" />
            </div>
            <h1 style={{ fontSize: "24px", fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#334155", marginBottom: "8px" }}>
              Request Submitted
            </h1>
            <p style={{ color: "#64748B", marginBottom: "24px" }}>
              Your admin access request has been submitted. You will receive an email once your account is approved.
            </p>
            <Link href="/auth/login" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "12px 24px", backgroundColor: "#0D9488", color: "white", fontWeight: 500, borderRadius: "8px", textDecoration: "none" }}>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 16px", backgroundColor: "#F9FAFB" }}>
      <div style={{ width: "100%", maxWidth: "448px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <div style={{ width: "48px", height: "48px", backgroundColor: "#0D9488", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Heart size={24} color="white" fill="white" />
            </div>
          </Link>
          <h1 style={{ fontSize: "24px", fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#334155", marginTop: "16px" }}>Admin Registration</h1>
          <p style={{ color: "#64748B", marginTop: "8px" }}>Request admin access to SCHF</p>
        </div>

        {/* Form */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ backgroundColor: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: "8px", padding: "16px", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <AlertCircle size={20} color="#B45309" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <p style={{ color: "#B45309", fontSize: "14px", fontWeight: 500 }}>Restricted Access</p>
                <p style={{ color: "#B45309", fontSize: "14px", marginTop: "4px" }}>
                  Admin registration requires an access code. Contact the system administrator to request access.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontWeight: 500, color: "#334155", marginBottom: "8px" }}>Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "16px", boxSizing: "border-box" }}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: 500, color: "#334155", marginBottom: "8px" }}>Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "16px", boxSizing: "border-box" }}
                placeholder="admin@schf.org"
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: 500, color: "#334155", marginBottom: "8px" }}>Access Code</label>
              <input
                type="text"
                required
                value={formData.accessCode}
                onChange={(e) => setFormData({ ...formData, accessCode: e.target.value })}
                style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "16px", boxSizing: "border-box" }}
                placeholder="Enter admin access code"
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: 500, color: "#334155", marginBottom: "8px" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={{ width: "100%", padding: "12px 48px 12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "16px", boxSizing: "border-box" }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#64748B" }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontWeight: 500, color: "#334155", marginBottom: "8px" }}>Confirm Password</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "16px", boxSizing: "border-box" }}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "8px", padding: "12px" }}>
                <p style={{ color: "#DC2626", fontSize: "14px" }}>{error}</p>
              </div>
            )}

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
                <>
                  <UserPlus size={20} />
                  Request Access
                </>
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", color: "#64748B", fontSize: "14px", marginTop: "24px" }}>
            Already have an account?{" "}
            <Link href="/auth/login" style={{ color: "#0D9488", fontWeight: 500 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
