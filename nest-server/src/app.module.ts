
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { TasksModule } from './tasks/tasks.module'
import { ThrottlerModule } from '@nestjs/throttler'

@Module({
  imports: [

    // Rate limiting configuration
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, // 60 seconds (milliseconds)
          limit: 5    // max 5 requests in that time window
        }
      ]
    }),
    // Load environment variables from the .env file
    // isGlobal: true means ConfigService can be used in any module

    ConfigModule.forRoot({
      isGlobal: true
    }),
 // Register Auth module for authentication features
    AuthModule,
    // Register Tasks module for task management APIs
    TasksModule
  ],
})
export class AppModule {}