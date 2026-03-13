import {
  IsOptional,
  IsString,
  IsEnum
} from 'class-validator'

import { Progress } from '@prisma/client'

// UpdateTaskDto validates the data sent when updating a task
// All fields are optional because the user may update only certain properties
export class UpdateTaskDto {

  // Optional task title update
  @IsOptional()

  // If provided, it must be a string
  @IsString()

  // Updated title for the task
  title?: string


  // Optional task description update
  @IsOptional()

  // Must be a string if provided
  @IsString()

  // Updated task description
  description?: string


  // Optional task progress update
  @IsOptional()

  // Ensures the value matches the Progress enum
  @IsEnum(Progress)

  // Progress status of the task
  // Possible values: not_started | in_progress | completed
  progress?: Progress
}