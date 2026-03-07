// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AuthService {}
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Role } from '@prisma/client'
import { SignupDto } from './dto/signup.dto'
import { LoginDto } from './dto/login.dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}



  // SIGNUP LOGIC
  async signup(data: SignupDto) {

    // hash password before saving
    const hashedPassword = await bcrypt.hash(data.password, 10)

    // create user in database
    const user = await this.prisma.user.create({
  data: {
    email: data.email,
    passwordHash: hashedPassword,
    role: data.role as Role,
    teacherId: data.teacherId
  }
})

    return user
  }



  // LOGIN LOGIC
  async login(data: LoginDto) {

  const user = await this.prisma.user.findUnique({
    where: { email: data.email }
  })

  if (!user) {
    throw new UnauthorizedException('Invalid credentials')
  }

  const validPassword = await bcrypt.compare(
    data.password,
    user.passwordHash
  )

  if (!validPassword) {
    throw new UnauthorizedException('Invalid credentials')
  }

  const payload = {
    userId: user.id,
    role: user.role
  }

  const token = this.jwtService.sign(payload)

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    },
    token: token
  }
}
}