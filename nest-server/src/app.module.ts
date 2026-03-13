import { Module } from '@nestjs/common'

// ConfigModule allows NestJS to read variables from .env file
import { ConfigModule } from '@nestjs/config'

// Import Auth module (handles signup/login)
import { AuthModule } from './auth/auth.module'

// Import Tasks module (handles task APIs)
import { TasksModule } from './tasks/tasks.module'

@Module({
  imports: [

ThrottlerModule.forRoot({
      ttl: 60,
      limit: 5
    }),
    // Load environment variables from .env file
    // isGlobal: true means ConfigService can be used in any module
    ConfigModule.forRoot({
      isGlobal: true
    }),

    // Register Auth module
    AuthModule,

    // Register Tasks module
    TasksModule
  ],
})
export class AppModule {}