import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(slides)
  } catch (error) {
    console.error("Error fetching hero slides:", error)
    return NextResponse.json({ error: "Failed to fetch hero slides" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (body.action === "reorder") {
      if (!body.slides || !Array.isArray(body.slides)) {
        return NextResponse.json({ error: "Invalid slides data" }, { status: 400 })
      }
      for (const slide of body.slides) {
        await prisma.heroSlide.update({
          where: { id: slide.id },
          data: { order: slide.order }
        })
      }
      return NextResponse.json({ success: true })
    }
    
    const { id, title, subtitle, description, imageUrl, ctaText, ctaLink, isActive, order } = body
    
    if (id) {
      const slide = await prisma.heroSlide.update({
        where: { id },
        data: { title, subtitle, description, imageUrl, ctaText, ctaLink, isActive, order }
      })
      return NextResponse.json(slide)
    } else {
      const lastSlide = await prisma.heroSlide.findFirst({
        orderBy: { order: 'desc' }
      })
      const newOrder = lastSlide ? lastSlide.order + 1 : 0
      
      const slide = await prisma.heroSlide.create({
        data: { title, subtitle, description, imageUrl, ctaText, ctaLink, isActive: isActive ?? true, order: newOrder }
      })
      return NextResponse.json(slide)
    }
  } catch (error) {
    console.error("Error saving hero slide:", error)
    return NextResponse.json({ error: "Failed to save hero slide" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    if (id) {
      await prisma.heroSlide.delete({ where: { id } })
      return NextResponse.json({ success: true })
    }
    
    return NextResponse.json({ error: "ID required" }, { status: 400 })
  } catch (error) {
    console.error("Error deleting hero slide:", error)
    return NextResponse.json({ error: "Failed to delete hero slide" }, { status: 500 })
  }
}
