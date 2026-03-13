import {
  IsString,
  IsOptional,
  IsDateString,
  IsNotEmpty
} from 'class-validator'

// CreateTaskDto validates the data sent by the client
// when creating a new task
export class CreateTaskDto {

  // Validate that title must be a string
  @IsString()

  // Ensure the title field is not empty
  @IsNotEmpty()

  // Title of the task (required field)
  title: string


  // Description is optional
  @IsOptional()

  // If provided, it must be a string
  @IsString()

  // Additional details about the task
  description?: string


  // dueDate is optional
  @IsOptional()

  // Validate that the value is a valid ISO date string
  @IsDateString()

  // Deadline for the task
  dueDate?: string
}