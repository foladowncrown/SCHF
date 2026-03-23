import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findMany()
    const theme = await prisma.siteTheme.findFirst({ where: { isActive: true } })
    
    const settingsMap: Record<string, string> = {}
    settings.forEach(s => {
      settingsMap[s.key] = s.value
    })
    
    return NextResponse.json({
      settings: settingsMap,
      theme: theme || {
        primaryColor: "#0D9488",
        secondaryColor: "#1E293B",
        accentColor: "#F59E0B"
      }
    })
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { settings } = body
    
    if (settings) {
      for (const [key, value] of Object.entries(settings)) {
        await prisma.siteSettings.upsert({
          where: { key },
          update: { value: value as string },
          create: { key, value: value as string }
        })
      }
    }
    
    if (body.theme) {
      await prisma.siteTheme.upsert({
        where: { id: body.theme.id || "default" },
        update: { ...body.theme },
        create: { 
          id: "default",
          name: "Default",
          isActive: true,
          ...body.theme 
        }
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving settings:", error)
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
  }
}
