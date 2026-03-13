import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

// PrismaService extends PrismaClient to provide database access
// It also manages database connection when the application starts and stops
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {

  constructor() {

    // Initialize PrismaClient with logging enabled
    // Logs database queries and important events for debugging
    super({
      log: ['query', 'info', 'warn', 'error']
    })
  }

  // Runs automatically when the NestJS module is initialized
  async onModuleInit() {
    try {

      // Establish connection to the database
      await this.$connect()

      console.log('Database connected successfully')

    } catch (error) {

      // Log connection errors if the database fails to connect
      console.error('Database connection failed:', error)

      throw error
    }
  }

  // Runs automatically when the NestJS application shuts down
  async onModuleDestroy() {

    // Close database connection gracefully
    await this.$disconnect()

    console.log('Database disconnected')
  }
}