
import { Controller, Post, Body, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignupDto } from './dto/signup.dto'
import { LoginDto } from './dto/login.dto'
import type { Response } from 'express'

// AuthController handles authentication-related API routes
// Base route for this controller: /auth
@Controller('auth')
export class AuthController {

  // Inject AuthService using Dependency Injection
  // AuthService contains the business logic for signup and login
  constructor(private authService: AuthService) {}

  // POST /auth/signup
  // Endpoint used to register a new user
  @Post('signup')
  signup(@Body() data: SignupDto) {

    // The request body is validated using SignupDto
    // Then passed to the service to create a new user
    return this.authService.signup(data)
  }

  // POST /auth/login
  // Endpoint used for user login
  @Post('login')
  async login(
    // Validate login data (email and password)
    @Body() data: LoginDto,

    // Access the Express response object to set cookies
    @Res({ passthrough: true }) res: Response
  ) {

    // Call the service to verify credentials
    const result = await this.authService.login(data)

    // Store JWT token in a secure HTTP-only cookie
    // This helps maintain user session
    res.cookie('token', result.token, {
      httpOnly: true, // Prevents JavaScript access (protects against XSS attacks)

      secure: process.env.NODE_ENV === 'production', 
      // Cookie is sent only over HTTPS in production

      sameSite: 'lax', 
      // Protects against CSRF while still allowing normal navigation

      path: '/', 
      // Cookie is accessible for the entire application

      maxAge: 24 * 60 * 60 * 1000
      // Cookie expires after 24 hours
    })

    // Return user information to the client (without the token)
    return {
      user: result.user
    }
  }
}