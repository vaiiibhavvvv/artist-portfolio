import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL || 'studiocolorpalette@gmail.com'
  const password = process.env.ADMIN_PASSWORD || 'Admin@123'

  // Check if admin already exists
  const existing = await prisma.admin.findUnique({ where: { email } })
  if (existing) {
    console.log(`Admin already exists: ${email}`)
    return
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const admin = await prisma.admin.create({
    data: { email, password: hashedPassword },
  })

  console.log(`✅ Admin created: ${admin.email}`)
  console.log(`   Password: ${password}`)
  console.log(`   ⚠️  Change the password immediately after first login!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
