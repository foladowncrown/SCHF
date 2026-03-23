export default function EventsPage() {
  const events = [
    {
      title: "World Hepatitis Day Screening",
      date: "July 28, 2024",
      location: "Lagos Main Center",
      description: "Free hepatitis B and C screening for all community members.",
    },
    {
      title: "Health Fair 2024",
      date: "September 15, 2024",
      location: "National Stadium, Lagos",
      description: "Join us for a day of health education and free medical checkups.",
    },
    {
      title: "Annual Fundraising Gala",
      date: "November 20, 2024",
      location: "Eko Hotel, Lagos",
      description: "An evening of impact and celebration with our supporters.",
    },
  ]

  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "80px 0", backgroundColor: "#1E293B" }}>
        <div className="container-main">
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "white", marginBottom: "24px" }}>
            Upcoming Events
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#D1D5DB", maxWidth: "672px", margin: "0 auto" }}>
            Join us at our events to learn, connect, and make a difference.
          </p>
        </div>
      </section>

      <section style={{ padding: "80px 0" }}>
        <div className="container-main">
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "896px", margin: "0 auto" }}>
            {events.map((event, index) => (
              <div key={index} style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }} className="event-card">
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "20px", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginBottom: "8px" }}>
                      {event.title}
                    </h3>
                    <p style={{ color: "#64748B", marginBottom: "8px" }}>{event.description}</p>
                    <div style={{ display: "flex", gap: "16px", fontSize: "14px", color: "#64748B" }}>
                      <span>📅 {event.date}</span>
                      <span>📍 {event.location}</span>
                    </div>
                  </div>
                  <a href="/contact" className="btn-primary" style={{ whiteSpace: "nowrap", alignSelf: "flex-start" }}>
                    Register
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "48px", textAlign: "center" }}>
            <p style={{ color: "#64748B", marginBottom: "16px" }}>Want to organize an event with us?</p>
            <a href="/contact" className="btn-secondary" style={{ display: "inline-block" }}>
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
