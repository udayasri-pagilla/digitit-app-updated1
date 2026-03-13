import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PrismaService } from '../prisma/prisma.service'

// AuthModule groups all authentication-related components
// such as controllers, services, and JWT configuration
@Module({
  imports: [
    // Configure JWT module used for generating authentication tokens
    JwtModule.register({

      // Secret key used to sign JWT tokens
      // In production this should be stored in environment variables
      secret: 'my-secret-key',

      // Token expiration time
      signOptions: { expiresIn: '1d' } // token valid for 1 day
    })
  ],

  // Controllers handle incoming HTTP requests
  controllers: [AuthController],

  // Providers are services available within this module
  // AuthService -> contains authentication logic
  // PrismaService -> handles database operations
  providers: [AuthService, PrismaService],

  // Export JwtModule so other modules (like TasksModule) can use JWT features
  exports: [JwtModule]   
})
export class AuthModule {}