import { NextResponse } from "next/server"

const defaultTheme = {
  primaryColor: "#0D9488",
  secondaryColor: "#1E293B",
  accentColor: "#F59E0B"
}

const defaultWhatsApp = {
  isEnabled: true,
  phoneNumber: "2341234567890",
  prefillMessage: "Hello SCHF, I need help with...",
  position: "bottom-right",
  color: "#0D9488"
}

const defaultHeroSlides = [
  {
    id: "1",
    title: "Together We Can Eliminate Hepatitis",
    subtitle: "Join the Movement",
    description: "We're leading the fight against hepatitis through prevention, testing, and community outreach.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80",
    ctaText: "Get Involved",
    ctaLink: "/volunteer"
  },
  {
    id: "2",
    title: "Free Hepatitis Screening",
    subtitle: "Know Your Status",
    description: "Early detection saves lives. Visit our centers for free, confidential hepatitis B and C testing.",
    imageUrl: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1920&q=80",
    ctaText: "Find a Center",
    ctaLink: "/programs#screening"
  },
  {
    id: "3",
    title: "Community Health Outreach",
    subtitle: "Bringing Care to You",
    description: "Our mobile clinics bring hepatitis education, testing, and treatment support to underserved communities.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80",
    ctaText: "Learn More",
    ctaLink: "/programs#outreach"
  }
]

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma")
    
    const [settings, theme, heroSlides, waConfig] = await Promise.all([
      prisma.siteSettings.findMany().catch(() => []),
      prisma.siteTheme.findFirst({ where: { isActive: true } }).catch(() => null),
      prisma.heroSlide.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }).catch(() => []),
      prisma.whatsAppConfig.findFirst().catch(() => null)
    ])
    
    const settingsMap: Record<string, string> = {}
    settings.forEach(s => {
      settingsMap[s.key] = s.value
    })
    
    return NextResponse.json({
      settings: settingsMap,
      theme: theme ? {
        primaryColor: theme.primaryColor,
        secondaryColor: theme.secondaryColor,
        accentColor: theme.accentColor
      } : defaultTheme,
      heroSlides: heroSlides.length > 0 ? heroSlides : defaultHeroSlides,
      whatsapp: waConfig || defaultWhatsApp
    })
  } catch (error) {
    return NextResponse.json({
      heroSlides: defaultHeroSlides,
      whatsapp: defaultWhatsApp,
      theme: defaultTheme,
      settings: {}
    })
  }
}
