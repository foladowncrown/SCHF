import { Shield, Activity, Heart, Users, Stethoscope, GraduationCap, MapPin, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

const programs = [
  {
    id: "prevention",
    icon: Shield,
    title: "Hepatitis Prevention",
    description: "Our prevention programs focus on education, vaccination awareness, and community health initiatives to stop the spread of hepatitis.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    features: [
      "Community health education workshops",
      "Vaccination awareness campaigns",
      "Safe injection practices training",
      "Mother-to-child transmission prevention",
      "Sexual health education",
    ],
  },
  {
    id: "screening",
    icon: Activity,
    title: "Testing & Screening",
    description: "We provide free, confidential hepatitis B and C testing across our network of testing centers and mobile clinics.",
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80",
    features: [
      "Free rapid hepatitis B testing",
      "Free rapid hepatitis C testing",
      "Confidential results counseling",
      "Mobile testing units for remote areas",
      "Workplace screening programs",
    ],
  },
  {
    id: "treatment",
    icon: Stethoscope,
    title: "Treatment Support",
    description: "Our treatment support program connects patients with affordable antiviral treatments and comprehensive care services.",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
    features: [
      "Antiviral treatment access",
      "Patient counseling services",
      "Treatment adherence support",
      "Liver disease monitoring",
      "Referral to specialists",
    ],
  },
  {
    id: "outreach",
    icon: Users,
    title: "Community Outreach",
    description: "Our outreach teams bring hepatitis education, testing, and care to underserved communities across the region.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    features: [
      "Mobile health clinics",
      "Community health worker programs",
      "Peer education initiatives",
      "Rural health partnerships",
      "Faith-based health programs",
    ],
  },
  {
    id: "education",
    icon: GraduationCap,
    title: "Health Education",
    description: "We empower communities with knowledge through comprehensive health education programs and training initiatives.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
    features: [
      "School health programs",
      "Healthcare worker training",
      "Public awareness campaigns",
      "Online educational resources",
      "Community leadership training",
    ],
  },
  {
    id: "research",
    icon: Heart,
    title: "Research & Advocacy",
    description: "We contribute to hepatitis research and advocate for policies that improve access to prevention and treatment.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
    features: [
      "Clinical research partnerships",
      "Data collection and analysis",
      "Policy advocacy",
      "Healthcare access advocacy",
      "International collaborations",
    ],
  },
]

const locations = [
  {
    name: "Main Center - Lagos",
    address: "123 Health Avenue, Lagos",
    phone: "+234 123 456 7890",
    hours: "Mon-Fri: 8AM - 6PM",
  },
  {
    name: "Abuja Branch",
    address: "456 Federal Capital Territory, Abuja",
    phone: "+234 123 456 7891",
    hours: "Mon-Fri: 8AM - 5PM",
  },
  {
    name: "Port Harcourt Center",
    address: "789 Oil Field Road, Port Harcourt",
    phone: "+234 123 456 7892",
    hours: "Mon-Fri: 8AM - 5PM",
  },
]

export default function ProgramsPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section style={{ padding: "80px 0", backgroundColor: "#1E293B", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(30,41,59,0.95), rgba(30,41,59,0.8))" }} />
        </div>
        <div className="container-main" style={{ position: "relative" }}>
          <div style={{ maxWidth: "768px", margin: "0 auto", textAlign: "center" }}>
            <span style={{ color: "#5EEAD4", fontWeight: 500 }}>Our Programs</span>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "white", marginTop: "8px", marginBottom: "24px" }}>
              Comprehensive Hepatitis Care
            </h1>
            <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#D1D5DB" }}>
              From prevention to treatment, we offer holistic programs designed to address hepatitis 
              at every stage and empower communities with the tools they need.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section style={{ padding: "80px 0" }}>
        <div className="container-main">
          <div style={{ display: "flex", flexDirection: "column", gap: "96px" }}>
            {programs.map((program, index) => (
              <div 
                key={program.id} 
                id={program.id}
                style={{ display: "grid", gridTemplateColumns: "1fr", gap: "48px", alignItems: "center" }}
                className={`program-card ${index % 2 === 1 ? 'reverse' : ''}`}
              >
                <div style={index % 2 === 1 ? { order: 2 } : {}}>
                  <div style={{ width: "64px", height: "64px", backgroundColor: "rgba(13,148,136,0.1)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                    <program.icon size={32} color="#0D9488" />
                  </div>
                  <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginBottom: "16px" }}>
                    {program.title}
                  </h2>
                  <p style={{ color: "#64748B", fontSize: "18px", marginBottom: "24px" }}>
                    {program.description}
                  </p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {program.features.map((feature, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                        <div style={{ width: "24px", height: "24px", backgroundColor: "rgba(13,148,136,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                          <ArrowRight size={12} color="#0D9488" />
                        </div>
                        <span style={{ color: "#64748B" }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ position: "relative", height: "320px", borderRadius: "16px", overflow: "hidden", order: index % 2 === 1 ? 1 : 0 }}>
                  <img
                    src={program.image}
                    alt={program.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section style={{ padding: "80px 0", backgroundColor: "#F5F5F4" }}>
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span style={{ color: "#0D9488", fontWeight: 500 }}>Visit Us</span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginTop: "8px" }}>
              Our Centers
            </h2>
            <p style={{ color: "#64748B", marginTop: "16px", maxWidth: "672px", margin: "16px auto 0" }}>
              Find a testing center or healthcare facility near you. Our centers offer free 
              hepatitis testing and comprehensive care services.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }} className="locations-grid">
            {locations.map((location, index) => (
              <div key={index} style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ width: "48px", height: "48px", backgroundColor: "rgba(13,148,136,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MapPin size={24} color="#0D9488" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#1E293B", marginBottom: "8px" }}>
                      {location.name}
                    </h3>
                    <p style={{ color: "#64748B", fontSize: "14px", marginBottom: "4px" }}>{location.address}</p>
                    <p style={{ color: "#64748B", fontSize: "14px", marginBottom: "4px" }}>{location.phone}</p>
                    <p style={{ color: "#64748B", fontSize: "14px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <Clock size={14} />
                      {location.hours}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", backgroundColor: "#0D9488" }}>
        <div className="container-main" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "white", marginBottom: "16px" }}>
            Get Tested Today
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "32px", maxWidth: "672px", margin: "0 auto 32px" }}>
            Early detection saves lives. Visit any of our centers for free, confidential hepatitis testing.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }} className="cta-buttons">
            <Link href="/donate" className="btn-accent" style={{ fontSize: "18px", padding: "16px 32px" }}>
              Schedule a Test
            </Link>
            <Link href="/contact" style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "white", padding: "16px 32px", borderRadius: "8px", fontWeight: 500 }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
