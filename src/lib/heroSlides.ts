export interface HeroSlide {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
  isActive: boolean
}

export const defaultHeroSlides: HeroSlide[] = [
  {
    id: "1",
    title: "Together We Can Eliminate Hepatitis",
    subtitle: "Join the Movement",
    description: "We're leading the fight against hepatitis through prevention, testing, and community outreach. Every action counts in saving lives.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80",
    ctaText: "Get Involved",
    ctaLink: "/volunteer",
    isActive: true,
  },
  {
    id: "2",
    title: "Free Hepatitis Screening",
    subtitle: "Know Your Status",
    description: "Early detection saves lives. Visit our centers for free, confidential hepatitis B and C testing.",
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1920&q=80",
    ctaText: "Find a Center",
    ctaLink: "/programs#screening",
    isActive: true,
  },
  {
    id: "3",
    title: "Community Health Outreach",
    subtitle: "Bringing Care to You",
    description: "Our mobile clinics bring hepatitis education, testing, and treatment support to underserved communities.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80",
    ctaText: "Learn More",
    ctaLink: "/programs#outreach",
    isActive: true,
  },
  {
    id: "4",
    title: "Treatment Support Program",
    subtitle: "We're Here to Help",
    description: "Access affordable treatment, counseling, and ongoing care support for those affected by hepatitis.",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1920&q=80",
    ctaText: "Get Support",
    ctaLink: "/programs#treatment",
    isActive: true,
  },
  {
    id: "5",
    title: "Every Donation Makes a Difference",
    subtitle: "Support Our Mission",
    description: "Your contribution helps us provide free testing, treatment, and education to communities in need.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80",
    ctaText: "Donate Now",
    ctaLink: "/donate",
    isActive: true,
  },
]
