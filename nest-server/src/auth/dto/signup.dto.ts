import { IsEmail, IsString, IsOptional } from 'class-validator';

// DTO defines what data the signup API expects
export class SignupDto {

  // validate email format
  @IsEmail()
  email: string;

  // password must be string
  @IsString()
  password: string;

  // role must be student or teacher
  @IsString()
  role: string;

  // optional field
  // student must include teacherId
  @IsOptional()
  teacherId?: number;
}