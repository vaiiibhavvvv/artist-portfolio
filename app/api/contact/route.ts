import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST /api/contact — public
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const contact = await prisma.contactMessage.create({
      data: { name, email, phone: phone || null, message },
    })

    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    console.error('POST /api/contact error:', error)
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 })
  }
}

// GET /api/contact — admin only
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}
