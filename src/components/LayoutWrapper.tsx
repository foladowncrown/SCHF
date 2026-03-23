"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/shared/Header"
import { Footer } from "@/components/shared/Footer"
import { WhatsAppBubble } from "@/components/shared/WhatsAppBubble"

interface LayoutWrapperProps {
  children: React.ReactNode
  settings?: {
    siteName: string
    siteDescription: string
    favicon: string
    theme: {
      primaryColor: string
      secondaryColor: string
      accentColor: string
    } | null
  }
}

export function LayoutWrapper({ children, settings }: LayoutWrapperProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith("/admin")

  if (isAdminRoute) {
    return <>{children}</>
  }

  return (
    <>
      <Header settings={settings} />
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "calc(100vh - 80px)" }}>
        {children}
      </main>
      <Footer settings={settings} />
      <WhatsAppBubble />
    </>
  )
}
