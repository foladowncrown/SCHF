import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    let config = await prisma.whatsAppConfig.findFirst()
    
    if (!config) {
      config = await prisma.whatsAppConfig.create({
        data: {
          isEnabled: true,
          phoneNumber: "2341234567890",
          prefillMessage: "Hello SCHF, I need help with...",
          position: "bottom-right",
          color: "#0D9488"
        }
      })
    }
    
    return NextResponse.json(config)
  } catch (error) {
    console.error("Error fetching WhatsApp config:", error)
    return NextResponse.json({ error: "Failed to fetch WhatsApp config" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, isEnabled, phoneNumber, prefillMessage, position, color } = body
    
    let config = await prisma.whatsAppConfig.findFirst()
    
    if (config) {
      config = await prisma.whatsAppConfig.update({
        where: { id: config.id },
        data: { isEnabled, phoneNumber, prefillMessage, position, color }
      })
    } else {
      config = await prisma.whatsAppConfig.create({
        data: { isEnabled, phoneNumber, prefillMessage, position, color }
      })
    }
    
    return NextResponse.json(config)
  } catch (error) {
    console.error("Error saving WhatsApp config:", error)
    return NextResponse.json({ error: "Failed to save WhatsApp config" }, { status: 500 })
  }
}
