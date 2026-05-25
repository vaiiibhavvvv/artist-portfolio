export interface Artwork {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  tags: string[]
  createdAt: Date | string
  updatedAt?: Date | string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  read: boolean
  createdAt: Date | string
}

export interface Admin {
  id: string
  email: string
  createdAt: Date | string
}

export interface DashboardStats {
  totalArtworks: number
  totalMessages: number
  unreadMessages: number
  recentArtworks: Artwork[]
}
