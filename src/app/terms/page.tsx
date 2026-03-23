export default function TermsPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "80px 0", backgroundColor: "#1E293B" }}>
        <div className="container-main">
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "white" }}>
            Terms of Service
          </h1>
        </div>
      </section>

      <section style={{ padding: "80px 0" }}>
        <div className="container-main" style={{ maxWidth: "896px" }}>
          <p style={{ color: "#64748B", marginBottom: "24px" }}>
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <h2 style={{ fontSize: "24px", fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginTop: "32px", marginBottom: "16px" }}>Acceptance of Terms</h2>
          <p style={{ color: "#64748B", marginBottom: "16px", lineHeight: 1.7 }}>
            By accessing and using the Strategic Care & Health Foundation (SCHF) website, you accept and agree to be 
            bound by the terms and provision of this agreement.
          </p>

          <h2 style={{ fontSize: "24px", fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginTop: "32px", marginBottom: "16px" }}>Use License</h2>
          <p style={{ color: "#64748B", marginBottom: "16px", lineHeight: 1.7 }}>
            Permission is granted to temporarily use the SCHF website for personal, non-commercial transitory viewing only. 
            This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul style={{ color: "#64748B", marginBottom: "16px", paddingLeft: "24px", listStyle: "disc" }}>
            <li style={{ marginBottom: "8px" }}>Modify or copy the materials</li>
            <li style={{ marginBottom: "8px" }}>Use the materials for any commercial purpose or public display</li>
            <li style={{ marginBottom: "8px" }}>Transfer the materials to another person or entity</li>
            <li style={{ marginBottom: "8px" }}>Attempt to reverse engineer any software contained on the Website</li>
          </ul>

          <h2 style={{ fontSize: "24px", fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginTop: "32px", marginBottom: "16px" }}>Donations</h2>
          <p style={{ color: "#64748B", marginBottom: "16px", lineHeight: 1.7 }}>
            All donations made through our website are voluntary and non-refundable. SCHF is a registered non-profit 
            organization. Your donations may be tax-deductible to the extent allowed by law. You will receive a receipt 
            for your records.
          </p>

          <h2 style={{ fontSize: "24px", fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginTop: "32px", marginBottom: "16px" }}>User Contributions</h2>
          <p style={{ color: "#64748B", marginBottom: "16px", lineHeight: 1.7 }}>
            The Website may contain message boards, chat rooms, personal web pages, profiles, forums, and other 
            interactive features that allow users to post, submit, publish, display, or transmit to other users 
            content or materials.
          </p>

          <h2 style={{ fontSize: "24px", fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginTop: "32px", marginBottom: "16px" }}>Disclaimer</h2>
          <p style={{ color: "#64748B", marginBottom: "16px", lineHeight: 1.7 }}>
            The materials on SCHF's website are provided on an 'as is' basis. SCHF makes no warranties, expressed 
            or implied, and hereby disclaims and negates all other warranties including without limitation, implied 
            warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of 
            intellectual property.
          </p>

          <h2 style={{ fontSize: "24px", fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginTop: "32px", marginBottom: "16px" }}>Limitations</h2>
          <p style={{ color: "#64748B", marginBottom: "16px", lineHeight: 1.7 }}>
            In no event shall SCHF or its suppliers be liable for any damages arising out of the use or inability 
            to use the materials on our website.
          </p>

          <h2 style={{ fontSize: "24px", fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginTop: "32px", marginBottom: "16px" }}>Contact Information</h2>
          <p style={{ color: "#64748B", marginBottom: "16px", lineHeight: 1.7 }}>
            If you have any questions about these Terms of Service, please contact us at info@schf.org.
          </p>
        </div>
      </section>
    </div>
  )
}
