"use client"

import { useState } from "react"
import { Heart, Eye, EyeOff, LogIn } from "lucide-react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid email or password")
      setLoading(false)
    } else {
      router.push("/admin/dashboard")
    }
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
          <h1 style={{ fontSize: "24px", fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#334155", marginTop: "16px" }}>SCHF Admin</h1>
          <p style={{ color: "#64748B", marginTop: "8px" }}>Sign in to your account</p>
        </div>

        {/* Form */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
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

            <div>
              <label style={{ display: "block", fontWeight: 500, color: "#334155", marginBottom: "8px" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" style={{ borderRadius: "4px", borderColor: "#D1D5DB" }} />
                <span style={{ fontSize: "14px", color: "#64748B" }}>Remember me</span>
              </label>
              <Link href="/auth/forgot-password" style={{ fontSize: "14px", color: "#0D9488", fontWeight: 500 }}>
                Forgot password?
              </Link>
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
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", color: "#64748B", fontSize: "14px", marginTop: "24px" }}>
            Need admin access?{" "}
            <Link href="/auth/register" style={{ color: "#0D9488", fontWeight: 500 }}>
              Request access
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
