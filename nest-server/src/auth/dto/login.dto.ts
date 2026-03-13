import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty
} from 'class-validator'

// LoginDto is used to validate the data sent by the user
// when they try to log in to the application
export class LoginDto {

  // Validate that the email field is a valid email format
  @IsEmail()

  // Ensure the email field is not empty
  @IsNotEmpty()

  // Email entered by the user for login
  email: string


  // Validate that password must be a string
  @IsString()

  // Ensure password length is at least 8 characters
  @MinLength(8)

  // Password entered by the user for login
  password: string
}