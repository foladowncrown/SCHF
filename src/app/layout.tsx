import type { Metadata } from "next";
import "./globals.css";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { prisma } from "@/lib/prisma";

async function getSettings() {
  try {
    const settings = await prisma.siteSettings.findMany()
    const theme = await prisma.siteTheme.findFirst({ where: { isActive: true } })
    
    const settingsMap: Record<string, string> = {}
    settings.forEach(s => {
      settingsMap[s.key] = s.value
    })
    
    return {
      siteName: settingsMap.siteName || "SCHF - Strategic Care & Health Foundation",
      siteDescription: settingsMap.siteDescription || "Leading the fight against hepatitis through prevention, outreach, and awareness.",
      favicon: settingsMap.favicon || "",
      theme: theme ? {
        primaryColor: theme.primaryColor,
        secondaryColor: theme.secondaryColor,
        accentColor: theme.accentColor
      } : null
    }
  } catch (error) {
    console.error("Error fetching settings:", error)
    return {
      siteName: "SCHF - Strategic Care & Health Foundation",
      siteDescription: "Leading the fight against hepatitis through prevention, outreach, and awareness.",
      favicon: "",
      theme: null
    }
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  
  return {
    title: settings.siteName,
    description: settings.siteDescription,
    icons: settings.favicon ? { icon: settings.favicon } : undefined,
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings()
  
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <LayoutWrapper settings={settings}>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
