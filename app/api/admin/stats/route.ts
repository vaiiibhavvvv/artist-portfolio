import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const [totalArtworks, totalMessages, unreadMessages, recentArtworks] = await Promise.all([
      prisma.artwork.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.artwork.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    ])

    return NextResponse.json({ totalArtworks, totalMessages, unreadMessages, recentArtworks })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
