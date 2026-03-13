import { Module } from '@nestjs/common'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { PrismaService } from '../prisma/prisma.service'
import { AuthModule } from '../auth/auth.module'

// TasksModule groups all task-related components
// such as controller, service, and required dependencies
@Module({

  // Import AuthModule so we can use authentication features
  // like JwtAuthGuard for protecting task routes
  imports: [AuthModule],  

  // Controllers handle incoming HTTP requests
  // TasksController manages all task APIs
  controllers: [TasksController],

  // Providers are services available in this module
  // TasksService -> contains task business logic
  // PrismaService -> used for database operations
  providers: [TasksService, PrismaService],
})
export class TasksModule {}