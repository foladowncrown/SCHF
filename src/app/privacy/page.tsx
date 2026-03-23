export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "80px 0", backgroundColor: "#1E293B" }}>
        <div className="container-main">
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "white" }}>
            Privacy Policy
          </h1>
        </div>
      </section>

      <section style={{ padding: "80px 0" }}>
        <div className="container-main" style={{ maxWidth: "896px" }}>
          <p style={{ color: "#64748B", marginBottom: "24px" }}>
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <h2 style={{ fontSize: "24px", fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginTop: "32px", marginBottom: "16px" }}>Introduction</h2>
          <p style={{ color: "#64748B", marginBottom: "16px", lineHeight: 1.7 }}>
            Strategic Care & Health Foundation ("SCHF", "we", "our", or "us") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit 
            our website or use our services.
          </p>

          <h2 style={{ fontSize: "24px", fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginTop: "32px", marginBottom: "16px" }}>Information We Collect</h2>
          <p style={{ color: "#64748B", marginBottom: "16px", lineHeight: 1.7 }}>
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul style={{ color: "#64748B", marginBottom: "16px", paddingLeft: "24px", listStyle: "disc" }}>
            <li style={{ marginBottom: "8px" }}>Register on the Website</li>
            <li style={{ marginBottom: "8px" }}>Express an interest in obtaining information about us or our products and services</li>
            <li style={{ marginBottom: "8px" }}>Participate in activities on the Website</li>
            <li style={{ marginBottom: "8px" }}>Contact us</li>
          </ul>

          <h2 style={{ fontSize: "24px", fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginTop: "32px", marginBottom: "16px" }}>How We Use Your Information</h2>
          <p style={{ color: "#64748B", marginBottom: "16px", lineHeight: 1.7 }}>
            We use personal information collected via our Website for a variety of business purposes described below. 
            We process your personal information for these purposes in reliance on our legitimate business interests, 
            in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>

          <h2 style={{ fontSize: "24px", fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginTop: "32px", marginBottom: "16px" }}>Sharing Your Information</h2>
          <p style={{ color: "#64748B", marginBottom: "16px", lineHeight: 1.7 }}>
            We only share information with the following third parties:
          </p>
          <ul style={{ color: "#64748B", marginBottom: "16px", paddingLeft: "24px", listStyle: "disc" }}>
            <li style={{ marginBottom: "8px" }}>Service Providers - to monitor and analyze the use of our Website</li>
            <li style={{ marginBottom: "8px" }}>Donation Processors - to process your donations securely</li>
            <li style={{ marginBottom: "8px" }}>Legal Obligations - when required by law or in response to valid requests</li>
          </ul>

          <h2 style={{ fontSize: "24px", fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginTop: "32px", marginBottom: "16px" }}>Contact Us</h2>
          <p style={{ color: "#64748B", marginBottom: "16px", lineHeight: 1.7 }}>
            If you have questions or comments about this policy, you may email us at info@schf.org.
          </p>
        </div>
      </section>
    </div>
  )
}
