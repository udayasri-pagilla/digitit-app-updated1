// import { Module } from '@nestjs/common'
// import { JwtModule } from '@nestjs/jwt'
// import { ConfigModule, ConfigService } from '@nestjs/config'
// import { AuthController } from './auth.controller'
// import { AuthService } from './auth.service'
// import { PrismaService } from '../prisma/prisma.service'

// @Module({
//   imports: [
//     // Import ConfigModule so we can use ConfigService
//     ConfigModule,

//     // Configure JWT module using environment variables
//     JwtModule.registerAsync({
//       imports: [ConfigModule],

//       // Inject ConfigService
//       inject: [ConfigService],

//       // Factory function that returns JWT configuration
//       useFactory: (config: ConfigService) => ({
        

//         // Secret used to sign JWT tokens
//         secret: config.get<string>('JWT_SECRET'),

//         // Token configuration
//         signOptions: {
//           // Cast value so TypeScript accepts it
//           expiresIn: config.get<string>('JWT_EXPIRES_IN') as any
//         },
//       }),
//     }),
//   ],

//   // Register controller
//   controllers: [AuthController],

//   // Register providers
//   providers: [
//     AuthService,
//     PrismaService
//   ],
// })
// export class AuthModule {}
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  imports: [
    JwtModule.register({
      secret: 'my-secret-key',   // temporary secret
      signOptions: { expiresIn: '1d' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}