
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

export class SignupDto {

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @MinLength(8)
  password: string

  @IsEnum(Role)
  role: Role

  @IsOptional()
  @IsInt()
  teacherId?: number
}