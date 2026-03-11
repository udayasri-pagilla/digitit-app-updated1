
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'
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

  async signup(data: SignupDto) {

    const email = data.email.toLowerCase()

    const existingUser = await this.prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      throw new BadRequestException('Email already registered')
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        role: data.role as Role,
        teacherId: data.teacherId
      }
    })

    return {
      id: user.id,
      email: user.email,
      role: user.role
    }
  }

  async login(data: LoginDto) {

    const email = data.email.toLowerCase()

    const user = await this.prisma.user.findUnique({
      where: { email }
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
      token
    }
  }
}