import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/artworks — public
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')

    const artworks = await prisma.artwork.findMany({
      where: category && category !== 'All' ? { category } : undefined,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(artworks)
  } catch (error) {
    console.error('GET /api/artworks error:', error)
    return NextResponse.json({ error: 'Failed to fetch artworks' }, { status: 500 })
  }
}

// POST /api/artworks — admin only
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, description, imageUrl, category, tags } = body

    if (!title || !imageUrl || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const artwork = await prisma.artwork.create({
      data: {
        title,
        description: description || '',
        imageUrl,
        category,
        tags: tags || [],
      },
    })

    return NextResponse.json(artwork, { status: 201 })
  } catch (error) {
    console.error('POST /api/artworks error:', error)
    return NextResponse.json({ error: 'Failed to create artwork' }, { status: 500 })
  }
}
