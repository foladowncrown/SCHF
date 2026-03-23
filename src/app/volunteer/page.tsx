export default function VolunteerPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "80px 0", backgroundColor: "#1E293B" }}>
        <div className="container-main">
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "white", marginBottom: "24px" }}>
            Volunteer With Us
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#D1D5DB", maxWidth: "672px", margin: "0 auto" }}>
            Join our team of dedicated volunteers and make a real difference in the fight against hepatitis.
          </p>
        </div>
      </section>

      <section style={{ padding: "80px 0" }}>
        <div className="container-main">
          <div style={{ maxWidth: "768px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(20px, 3vw, 24px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginBottom: "24px" }}>Why Volunteer?</h2>
            <p style={{ color: "#64748B", marginBottom: "32px" }}>
              Your time and skills can help us reach more people with life-saving hepatitis education, 
              testing, and support. Whether you have medical expertise, organizational skills, or 
              just a willingness to help, there's a place for you in our mission.
            </p>

            <h2 style={{ fontSize: "clamp(20px, 3vw, 24px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginBottom: "24px" }}>Volunteer Opportunities</h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ width: "24px", height: "24px", backgroundColor: "#0D9488", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", flexShrink: 0 }}>1</span>
                <div>
                  <strong style={{ color: "#1E293B" }}>Community Outreach</strong>
                  <p style={{ color: "#64748B" }}>Help us spread awareness in local communities</p>
                </div>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ width: "24px", height: "24px", backgroundColor: "#0D9488", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", flexShrink: 0 }}>2</span>
                <div>
                  <strong style={{ color: "#1E293B" }}>Event Support</strong>
                  <p style={{ color: "#64748B" }}>Assist at health fairs, screening events, and fundraisers</p>
                </div>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ width: "24px", height: "24px", backgroundColor: "#0D9488", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", flexShrink: 0 }}>3</span>
                <div>
                  <strong style={{ color: "#1E293B" }}>Administrative Support</strong>
                  <p style={{ color: "#64748B" }}>Help with office tasks, data entry, and communications</p>
                </div>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ width: "24px", height: "24px", backgroundColor: "#0D9488", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", flexShrink: 0 }}>4</span>
                <div>
                  <strong style={{ color: "#1E293B" }}>Professional Services</strong>
                  <p style={{ color: "#64748B" }}>Legal, accounting, marketing, and IT expertise</p>
                </div>
              </li>
            </ul>

            <a href="/contact" className="btn-primary" style={{ display: "inline-block" }}>
              Apply to Volunteer
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
