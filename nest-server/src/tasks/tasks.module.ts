
import { Module } from '@nestjs/common'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { PrismaService } from '../prisma/prisma.service'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [AuthModule],  
  controllers: [TasksController],
  providers: [TasksService, PrismaService],
})
export class TasksModule {}