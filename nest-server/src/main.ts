import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import cookieParser from 'cookie-parser'

// Bootstrap function starts the NestJS application
async function bootstrap() {

  // Create NestJS application instance using AppModule
  const app = await NestFactory.create(AppModule)

  // -------------------------------------
  // ENABLE CORS
  // -------------------------------------
  // Allows frontend (React app) to communicate with backend
  app.enableCors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true // Allow cookies to be sent with requests
  })

  // -------------------------------------
  // ENABLE COOKIE PARSER
  // -------------------------------------
  // Allows backend to read cookies from incoming requests
  app.use(cookieParser())

  // -------------------------------------
  // ENABLE GLOBAL VALIDATION
  // -------------------------------------
  // Automatically validates incoming request data using DTOs
  app.useGlobalPipes(
    new ValidationPipe({

      // Remove properties that are not defined in DTO
      whitelist: true,

      // Throw an error if unknown properties are sent
      forbidNonWhitelisted: true
    })
  )

  // Start the server on port 3000
  await app.listen(3000)

  console.log(`Server running on http://localhost:3000`)
}

// Start the application
bootstrap()