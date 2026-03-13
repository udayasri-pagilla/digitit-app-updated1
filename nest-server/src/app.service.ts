import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'

// AppService contains the business logic for the root controller
@Injectable()
export class AppService {

  // Inject PrismaService to interact with the database
  constructor(private prisma: PrismaService) {}

  // ------------------------------------
  // GET USERS
  // ------------------------------------
  async getHello() {

    // Fetch all users from the database using Prisma
    const users = await this.prisma.user.findMany()

    // Return the list of users
    return users
  }
}