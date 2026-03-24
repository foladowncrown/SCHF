import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"

async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString("hex")
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 1000, 64, "sha512", (err, derivedKey) => {
      if (err) reject(err)
      resolve(`${salt}:${derivedKey.toString("hex")}`)
    })
  })
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get("secret")

    if (secret !== process.env.SETUP_SECRET && secret !== "schf-setup-2024") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Create default theme
    await prisma.siteTheme.upsert({
      where: { id: "default-theme" },
      update: {},
      create: {
        id: "default-theme",
        name: "Default",
        isActive: true,
        primaryColor: "#0D9488",
        secondaryColor: "#1E293B",
        accentColor: "#F59E0B",
        backgroundColor: "#FAFAF9",
        textColor: "#334155",
        headerStyle: "default",
        footerStyle: "default",
        heroStyle: "slider",
      },
    })

    // Create site settings
    const settingsData = [
      { key: "siteName", value: "SCHF - Strategic Care & Health Foundation" },
      { key: "siteDescription", value: "Leading the fight against hepatitis through prevention, outreach, and awareness." },
      { key: "siteEmail", value: "info@schf.org" },
      { key: "sitePhone", value: "+234 123 456 7890" },
      { key: "siteAddress", value: "123 Health Avenue, Lagos, Nigeria" },
      { key: "siteUrl", value: process.env.NEXTAUTH_URL || "https://schf.org" },
      { key: "facebook", value: "https://facebook.com/schf" },
      { key: "twitter", value: "https://twitter.com/schf" },
      { key: "instagram", value: "https://instagram.com/schf" },
      { key: "linkedin", value: "https://linkedin.com/company/schf" },
    ]

    for (const setting of settingsData) {
      await prisma.siteSettings.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: setting,
      })
    }

    // Create admin user
    const adminPassword = await hashPassword("admin123")
    await prisma.user.upsert({
      where: { email: "admin@schf.org" },
      update: { password: adminPassword },
      create: {
        email: "admin@schf.org",
        name: "Admin User",
        password: adminPassword,
        role: "admin",
        isActive: true,
      },
    })

    // Create hero slides
    const heroSlides = [
      {
        id: "slide-1",
        title: "Together We Can Eliminate Hepatitis",
        subtitle: "Join the Movement",
        description: "We're leading the fight against hepatitis through prevention, testing, and community outreach.",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80",
        ctaText: "Get Involved",
        ctaLink: "/volunteer",
        isActive: true,
        order: 1,
      },
      {
        id: "slide-2",
        title: "Free Hepatitis Screening",
        subtitle: "Know Your Status",
        description: "Early detection saves lives. Visit our centers for free, confidential hepatitis B and C testing.",
        imageUrl: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1920&q=80",
        ctaText: "Find a Center",
        ctaLink: "/programs#screening",
        isActive: true,
        order: 2,
      },
      {
        id: "slide-3",
        title: "Community Health Outreach",
        subtitle: "Bringing Care to You",
        description: "Our mobile clinics bring hepatitis education, testing, and treatment support to underserved communities.",
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80",
        ctaText: "Learn More",
        ctaLink: "/programs#outreach",
        isActive: true,
        order: 3,
      },
    ]

    for (const slide of heroSlides) {
      await prisma.heroSlide.upsert({
        where: { id: slide.id },
        update: slide,
        create: slide,
      })
    }

    // Create team members
    const teamMembers = [
      {
        id: "team-1",
        name: "Dr. Adebayo Johnson",
        position: "Executive Director",
        bio: "Dr. Johnson has over 20 years of experience in public health.",
        imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
        linkedin: "https://linkedin.com/in/adebayo-johnson",
        isPublished: true,
        order: 1,
      },
      {
        id: "team-2",
        name: "Dr. Fatima Ibrahim",
        position: "Medical Director",
        bio: "Specializing in hepatology, Dr. Ibrahim leads our medical programs.",
        imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
        linkedin: "https://linkedin.com/in/fatima-ibrahim",
        isPublished: true,
        order: 2,
      },
    ]

    for (const member of teamMembers) {
      await prisma.teamMember.upsert({
        where: { id: member.id },
        update: member,
        create: member,
      })
    }

    // Create WhatsApp config
    await prisma.whatsAppConfig.upsert({
      where: { id: "wa-config" },
      update: {},
      create: {
        id: "wa-config",
        isEnabled: true,
        phoneNumber: "2341234567890",
        prefillMessage: "Hello SCHF, I need help with...",
        position: "bottom-right",
        color: "#25D366",
      },
    })

    // Create currencies
    const currencies = [
      { code: "USD", name: "US Dollar", symbol: "$", exchangeRate: 1.0, isDefault: true },
      { code: "NGN", name: "Nigerian Naira", symbol: "₦", exchangeRate: 1550.0, isDefault: false },
      { code: "GBP", name: "British Pound", symbol: "£", exchangeRate: 0.79, isDefault: false },
    ]

    for (const currency of currencies) {
      await prisma.currency.upsert({
        where: { code: currency.code },
        update: currency,
        create: currency,
      })
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully!",
      credentials: {
        email: "admin@schf.org",
        password: "admin123",
      },
    })
  } catch (error) {
    console.error("Setup error:", error)
    return NextResponse.json(
      { error: "Failed to seed database", details: String(error) },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  return GET(request)
}
