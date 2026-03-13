import {
  IsEmail,
  IsString,
  IsOptional,
  IsEnum,
  MinLength,
  IsNotEmpty,
  IsInt
} from 'class-validator'

import { Role } from '@prisma/client'

// SignupDto validates the data sent by the user
// when they register/signup in the application
export class SignupDto {

  // Validate that email must be in proper email format
  @IsEmail()

  // Ensure email field is not empty
  @IsNotEmpty()

  // User email used for account creation and login
  email: string


  // Validate that password is a string
  @IsString()

  // Ensure password must have at least 8 characters
  @MinLength(8)

  // Password entered during signup
  password: string


  // Validate that role must match the Role enum
  // Allowed values: 'student' or 'teacher'
  @IsEnum(Role)

  // Role of the user in the system
  role: Role


  // teacherId is optional
  // Used only when a student signs up and needs to be linked to a teacher
  @IsOptional()

  // Ensure teacherId must be an integer if provided
  @IsInt()

  // ID of the teacher assigned to the student
  teacherId?: number
}