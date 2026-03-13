import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Role } from '@prisma/client'
import { SignupDto } from './dto/signup.dto'
import { LoginDto } from './dto/login.dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

// AuthService contains the business logic for authentication
// It handles user signup, login, password hashing, and JWT token generation
@Injectable()
export class AuthService {

  constructor(
    // PrismaService is used to interact with the database
    private prisma: PrismaService,

    // JwtService is used to generate authentication tokens
    private jwtService: JwtService
  ) {}

  // ---------------------------
  // USER SIGNUP FUNCTION
  // ---------------------------
  async signup(data: SignupDto) {

    // Convert email to lowercase to maintain consistency
    const email = data.email.toLowerCase()

    // Check if a user with this email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email }
    })

    // If email already exists, throw an error
    if (existingUser) {
      throw new BadRequestException('Email already registered')
    }

    // Hash the user's password before storing it in the database
    // bcrypt ensures passwords are securely stored
    const hashedPassword = await bcrypt.hash(data.password, 10)

    // Create a new user in the database
    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        role: data.role as Role,
        teacherId: data.teacherId
      }
    })

    // Return safe user information (do not return password)
    return {
      id: user.id,
      email: user.email,
      role: user.role
    }
  }

  // ---------------------------
  // USER LOGIN FUNCTION
  // ---------------------------
  async login(data: LoginDto) {

    // Normalize email format
    const email = data.email.toLowerCase()

    // Find user by email in the database
    const user = await this.prisma.user.findUnique({
      where: { email }
    })

    // If user does not exist, throw unauthorized error
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    // Compare the entered password with the stored hashed password
    const validPassword = await bcrypt.compare(
      data.password,
      user.passwordHash
    )

    // If password is incorrect, throw unauthorized error
    if (!validPassword) {
      throw new UnauthorizedException('Invalid credentials')
    }

    // Create JWT payload (data stored inside the token)
    const payload = {
      userId: user.id,
      role: user.role
    }

    // Generate JWT token using JwtService
    const token = this.jwtService.sign(payload)

    // Return user details and authentication token
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