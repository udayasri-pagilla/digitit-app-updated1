// import { Controller } from '@nestjs/common';

// @Controller('auth')
// export class AuthController {}
import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignupDto } from './dto/signup.dto'
import { LoginDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  // POST /auth/signup
  @Post('signup')
  signup(@Body() data: SignupDto) {
    return this.authService.signup(data)
  }

  // POST /auth/login
  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data)
  }
}