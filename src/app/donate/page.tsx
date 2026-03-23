"use client"

import { useState } from "react"
import { Heart, Check, CreditCard, Building2, Wallet, ArrowRight } from "lucide-react"

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
]

const donationAmountsUSD = [25, 50, 100, 250, 500]
const donationAmountsNGN = [10000, 25000, 50000, 100000, 250000]

const impactUSD = [
  { amount: 25, impact: "Provides testing kits for 5 people" },
  { amount: 50, impact: "Covers treatment counseling for 2 patients" },
  { amount: 100, impact: "Funds mobile clinic visit to 1 community" },
  { amount: 250, impact: "Supports full treatment for 1 patient" },
  { amount: 500, impact: "Sponsors community health worker training" },
]

const impactNGN = [
  { amount: 10000, impact: "Provides testing kits for 3 people" },
  { amount: 25000, impact: "Covers treatment counseling for 1 patient" },
  { amount: 50000, impact: "Funds community health outreach" },
  { amount: 100000, impact: "Supports partial treatment for 1 patient" },
  { amount: 250000, impact: "Sponsors full treatment for 1 patient" },
]

export default function DonatePage() {
  const [currency, setCurrency] = useState(currencies[0])
  const [amount, setAmount] = useState(currency.code === "USD" ? 50 : 25000)
  const [customAmount, setCustomAmount] = useState("")
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time")
  const [paymentMethod, setPaymentMethod] = useState("stripe")

  const donationAmounts = currency.code === "USD" ? donationAmountsUSD : donationAmountsNGN
  const impact = currency.code === "USD" ? impactUSD : impactNGN
  const finalAmount = customAmount || amount

  const handleCurrencyChange = (code: string) => {
    const newCurrency = currencies.find(c => c.code === code) || currencies[0]
    setCurrency(newCurrency)
    setAmount(code === "USD" ? 50 : 25000)
    setCustomAmount("")
  }

  const handleDonate = () => {
    // Process donation
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
            <span style={{ color: "#5EEAD4", fontWeight: 500 }}>Support Our Mission</span>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "white", marginTop: "8px", marginBottom: "24px" }}>
              Make a Difference Today
            </h1>
            <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#D1D5DB" }}>
              Your donation helps us provide free testing, treatment, and education to communities 
              in need. Every contribution saves lives.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section style={{ padding: "80px 0" }}>
        <div className="container-main">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px" }} className="donation-grid">
            {/* Main Form */}
            <div style={{ gridColumn: "span 1" }}>
              <div style={{ backgroundColor: "white", padding: "32px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <h2 style={{ fontSize: "24px", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginBottom: "24px" }}>
                  Donation Details
                </h2>

                {/* Currency Selection */}
                <div style={{ marginBottom: "32px" }}>
                  <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "12px" }}>Select Currency</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    {currencies.map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => handleCurrencyChange(curr.code)}
                        style={{
                          padding: "16px",
                          borderRadius: "8px",
                          border: currency.code === curr.code ? "2px solid #0D9488" : "2px solid #E2E8F0",
                          backgroundColor: currency.code === curr.code ? "rgba(13,148,136,0.05)" : "white",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.2s",
                        }}
                      >
                        <span style={{ fontSize: "24px", fontWeight: 700, color: currency.code === curr.code ? "#0D9488" : "#1E293B" }}>
                          {curr.symbol}
                        </span>
                        <span style={{ display: "block", fontWeight: 500, color: currency.code === curr.code ? "#0D9488" : "#1E293B" }}>
                          {curr.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Donation Type */}
                <div style={{ marginBottom: "32px" }}>
                  <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "12px" }}>Donation Type</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <button
                      onClick={() => setDonationType("one-time")}
                      style={{
                        padding: "16px",
                        borderRadius: "8px",
                        border: donationType === "one-time" ? "2px solid #0D9488" : "2px solid #E2E8F0",
                        backgroundColor: donationType === "one-time" ? "rgba(13,148,136,0.05)" : "white",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      <Heart size={24} style={{ margin: "0 auto 8px", color: donationType === "one-time" ? "#0D9488" : "#64748B" }} />
                      <span style={{ fontWeight: 500, color: donationType === "one-time" ? "#0D9488" : "#1E293B" }}>
                        One-Time
                      </span>
                    </button>
                    <button
                      onClick={() => setDonationType("monthly")}
                      style={{
                        padding: "16px",
                        borderRadius: "8px",
                        border: donationType === "monthly" ? "2px solid #0D9488" : "2px solid #E2E8F0",
                        backgroundColor: donationType === "monthly" ? "rgba(13,148,136,0.05)" : "white",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      <svg style={{ margin: "0 auto 8px", width: "24px", height: "24px" }} viewBox="0 0 24 24" fill="none" stroke={donationType === "monthly" ? "#0D9488" : "#64748B"} strokeWidth="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                      <span style={{ fontWeight: 500, color: donationType === "monthly" ? "#0D9488" : "#1E293B" }}>
                        Monthly
                      </span>
                    </button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div style={{ marginBottom: "32px" }}>
                  <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "12px" }}>
                    Select Amount {donationType === "monthly" ? "(per month)" : ""}
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px", marginBottom: "16px" }}>
                    {donationAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => {
                          setAmount(amt)
                          setCustomAmount("")
                        }}
                        style={{
                          padding: "12px 8px",
                          borderRadius: "8px",
                          border: amount === amt && !customAmount ? "2px solid #0D9488" : "2px solid #E2E8F0",
                          backgroundColor: amount === amt && !customAmount ? "#0D9488" : "white",
                          color: amount === amt && !customAmount ? "white" : "#1E293B",
                          fontWeight: 500,
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        {currency.symbol}{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#64748B" }}>{currency.symbol}</span>
                    <input
                      type="number"
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      style={{ width: "100%", padding: "12px 16px 12px 32px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "16px" }}
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div style={{ marginBottom: "32px" }}>
                  <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "12px" }}>Payment Method</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                    <button
                      onClick={() => setPaymentMethod("stripe")}
                      style={{
                        padding: "16px",
                        borderRadius: "8px",
                        border: paymentMethod === "stripe" ? "2px solid #0D9488" : "2px solid #E2E8F0",
                        backgroundColor: paymentMethod === "stripe" ? "rgba(13,148,136,0.05)" : "white",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <CreditCard size={24} color={paymentMethod === "stripe" ? "#0D9488" : "#64748B"} />
                      <span style={{ fontSize: "14px", fontWeight: 500, color: paymentMethod === "stripe" ? "#0D9488" : "#1E293B" }}>
                        Card
                      </span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("paystack")}
                      style={{
                        padding: "16px",
                        borderRadius: "8px",
                        border: paymentMethod === "paystack" ? "2px solid #0D9488" : "2px solid #E2E8F0",
                        backgroundColor: paymentMethod === "paystack" ? "rgba(13,148,136,0.05)" : "white",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Wallet size={24} color={paymentMethod === "paystack" ? "#0D9488" : "#64748B"} />
                      <span style={{ fontSize: "14px", fontWeight: 500, color: paymentMethod === "paystack" ? "#0D9488" : "#1E293B" }}>
                        Paystack
                      </span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("lemonsqueezy")}
                      style={{
                        padding: "16px",
                        borderRadius: "8px",
                        border: paymentMethod === "lemonsqueezy" ? "2px solid #0D9488" : "2px solid #E2E8F0",
                        backgroundColor: paymentMethod === "lemonsqueezy" ? "rgba(13,148,136,0.05)" : "white",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Building2 size={24} color={paymentMethod === "lemonsqueezy" ? "#0D9488" : "#64748B"} />
                      <span style={{ fontSize: "14px", fontWeight: 500, color: paymentMethod === "lemonsqueezy" ? "#0D9488" : "#1E293B" }}>
                        Other
                      </span>
                    </button>
                  </div>
                </div>

                {/* Donor Info */}
                <div style={{ marginBottom: "32px" }}>
                  <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "12px" }}>Your Information</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <input
                      type="text"
                      placeholder="First Name"
                      style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "16px" }}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "16px" }}
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      style={{ gridColumn: "span 2", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "16px" }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: "32px" }}>
                  <label style={{ display: "block", fontWeight: 500, color: "#374151", marginBottom: "12px" }}>Leave a Message (Optional)</label>
                  <textarea
                    placeholder="Tell us why you're donating or share your thoughts..."
                    rows={3}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "16px", resize: "vertical" }}
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleDonate}
                  className="btn-primary"
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "18px", padding: "16px 24px" }}
                >
                  <Heart size={20} />
                  Donate {currency.symbol}{Number(finalAmount).toLocaleString()} {donationType === "monthly" ? "/month" : ""}
                  <ArrowRight size={20} />
                </button>

                <p style={{ textAlign: "center", color: "#64748B", fontSize: "14px", marginTop: "16px" }}>
                  Secure payment powered by {paymentMethod === "stripe" ? "Stripe" : paymentMethod === "paystack" ? "Paystack" : "LemonSqueezy"}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Impact Card */}
              <div style={{ backgroundColor: "#0D9488", padding: "24px", borderRadius: "12px", color: "white" }}>
                <h3 style={{ fontSize: "20px", fontWeight: 700, fontFamily: "'Playfair Display', serif", marginBottom: "16px" }}>Your Impact</h3>
                <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "24px" }}>
                  A {currency.symbol}{Number(finalAmount).toLocaleString()} {donationType === "monthly" ? "monthly" : ""} donation will help:
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {impact
                    .filter((item) => item.amount <= Number(finalAmount))
                    .slice(-1)
                    .map((item, index) => (
                      <li key={index} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                        <Check size={20} color="white" style={{ flexShrink: 0, marginTop: "2px" }} />
                        <span>{item.impact}</span>
                      </li>
                    ))}
                  {Number(finalAmount) < (currency.code === "USD" ? 25 : 10000) && (
                    <li style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                      <Check size={20} color="white" style={{ flexShrink: 0, marginTop: "2px" }} />
                      <span>Support our ongoing programs</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Tax Benefits */}
              <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginBottom: "12px" }}>
                  Tax Benefits
                </h3>
                <p style={{ color: "#64748B", fontSize: "14px" }}>
                  SCHF is a registered non-profit organization. Your donations may be 
                  tax-deductible to the extent allowed by law. You will receive a receipt 
                  for your records.
                </p>
              </div>

              {/* Other Ways */}
              <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginBottom: "12px" }}>
                  Other Ways to Give
                </h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "8px", color: "#64748B", fontSize: "14px" }}>
                  <li>• Bank Transfer</li>
                  <li>• Corporate Partnership</li>
                  <li>• Legacy Giving</li>
                  <li>• In-Kind Donations</li>
                </ul>
                <a href="/contact" style={{ color: "#0D9488", fontWeight: 500, fontSize: "14px", marginTop: "12px", display: "inline-block" }}>
                  Contact us for more options →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
