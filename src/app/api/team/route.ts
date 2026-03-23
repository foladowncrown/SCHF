import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" }
    })
    return NextResponse.json(team)
  } catch (error) {
    console.error("Error fetching team:", error)
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, position, bio, imageUrl, linkedin, isPublished, order } = body

    if (!name || !position) {
      return NextResponse.json({ error: "Name and position are required" }, { status: 400 })
    }

    const lastMember = await prisma.teamMember.findFirst({
      orderBy: { order: "desc" }
    })
    const newOrder = order ?? (lastMember ? lastMember.order + 1 : 0)

    const member = await prisma.teamMember.create({
      data: {
        name,
        position,
        bio: bio || null,
        imageUrl: imageUrl || null,
        linkedin: linkedin || null,
        isPublished: isPublished ?? true,
        order: newOrder,
      }
    })

    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    console.error("Error creating team member:", error)
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, name, position, bio, imageUrl, linkedin, isPublished, order } = body

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        name,
        position,
        bio: bio ?? null,
        imageUrl: imageUrl ?? null,
        linkedin: linkedin ?? null,
        isPublished: isPublished ?? true,
        order: order ?? 0,
      }
    })

    return NextResponse.json(member)
  } catch (error) {
    console.error("Error updating team member:", error)
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    await prisma.teamMember.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting team member:", error)
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 })
  }
}
