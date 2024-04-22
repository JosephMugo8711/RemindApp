// Import the PrismaClient class from the '@prisma/client' package
import { PrismaClient } from '@prisma/client'

// Define a function to create a singleton instance of PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient()
}

// Define a type alias for the return type of the prismaClientSingleton function
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

// Cast the globalThis object to an unknown type and then to a custom type with a prisma property
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

// Export a constant named prisma, which will either use the existing global prisma instance or create a new one
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

// If the environment is not production, set the global prisma instance to the created prisma instance
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
