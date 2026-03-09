// import { Module } from '@nestjs/common'
// import { TasksController } from './tasks.controller'
// import { TasksService } from './tasks.service'
// import { PrismaService } from '../prisma/prisma.service'
// import { JwtModule } from '@nestjs/jwt'

// @Module({
//   imports: [JwtModule],
//   controllers: [TasksController],
//   providers: [TasksService, PrismaService],
// })
// export class TasksModule {}
import { Module } from '@nestjs/common'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { PrismaService } from '../prisma/prisma.service'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [AuthModule],   // ⭐ IMPORTANT
  controllers: [TasksController],
  providers: [TasksService, PrismaService],
})
export class TasksModule {}