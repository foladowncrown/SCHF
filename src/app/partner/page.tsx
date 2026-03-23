export default function PartnerPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "80px 0", backgroundColor: "#1E293B" }}>
        <div className="container-main">
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "white", marginBottom: "24px" }}>
            Partner With Us
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#D1D5DB", maxWidth: "672px", margin: "0 auto" }}>
            Join forces with SCHF to eliminate hepatitis. Together, we can create greater impact.
          </p>
        </div>
      </section>

      <section style={{ padding: "80px 0" }}>
        <div className="container-main">
          <div style={{ maxWidth: "768px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(20px, 3vw, 24px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginBottom: "24px" }}>Partnership Benefits</h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ width: "24px", height: "24px", backgroundColor: "#0D9488", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", flexShrink: 0 }}>1</span>
                <div>
                  <strong style={{ color: "#1E293B" }}>Employee Engagement</strong>
                  <p style={{ color: "#64748B" }}>Give your employees meaningful volunteer opportunities</p>
                </div>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ width: "24px", height: "24px", backgroundColor: "#0D9488", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", flexShrink: 0 }}>2</span>
                <div>
                  <strong style={{ color: "#1E293B" }}>CSR Impact</strong>
                  <p style={{ color: "#64748B" }}>Demonstrate social responsibility with measurable outcomes</p>
                </div>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ width: "24px", height: "24px", backgroundColor: "#0D9488", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", flexShrink: 0 }}>3</span>
                <div>
                  <strong style={{ color: "#1E293B" }}>Brand Visibility</strong>
                  <p style={{ color: "#64748B" }}>Get recognized as a health champion in our communications</p>
                </div>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ width: "24px", height: "24px", backgroundColor: "#0D9488", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", flexShrink: 0 }}>4</span>
                <div>
                  <strong style={{ color: "#1E293B" }}>Tax Benefits</strong>
                  <p style={{ color: "#64748B" }}>Registered NGO - donations may be tax deductible</p>
                </div>
              </li>
            </ul>

            <h2 style={{ fontSize: "clamp(20px, 3vw, 24px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginBottom: "24px" }}>Partnership Types</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px", marginBottom: "32px" }} className="partner-grid">
              <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <h3 style={{ fontWeight: 600, color: "#1E293B", marginBottom: "8px" }}>Financial Support</h3>
                <p style={{ color: "#64748B", fontSize: "14px" }}>Fund specific programs or general operations</p>
              </div>
              <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <h3 style={{ fontWeight: 600, color: "#1E293B", marginBottom: "8px" }}>In-Kind Donations</h3>
                <p style={{ color: "#64748B", fontSize: "14px" }}>Supply testing kits, equipment, or services</p>
              </div>
              <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <h3 style={{ fontWeight: 600, color: "#1E293B", marginBottom: "8px" }}>Program Partnership</h3>
                <p style={{ color: "#64748B", fontSize: "14px" }}>Co-develop initiatives aligned with your goals</p>
              </div>
              <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <h3 style={{ fontWeight: 600, color: "#1E293B", marginBottom: "8px" }}>Employee Volunteering</h3>
                <p style={{ color: "#64748B", fontSize: "14px" }}>Organize team volunteer days with us</p>
              </div>
            </div>

            <a href="/contact" className="btn-primary" style={{ display: "inline-block" }}>
              Become a Partner
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
