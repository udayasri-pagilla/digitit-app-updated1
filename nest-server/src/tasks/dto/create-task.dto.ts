
import {
  IsString,
  IsOptional,
  IsDateString,
  IsNotEmpty
} from 'class-validator'

export class CreateTaskDto {

  @IsString()
  @IsNotEmpty()
  title: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsDateString()
  dueDate?: string
}