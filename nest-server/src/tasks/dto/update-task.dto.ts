import { IsOptional, IsString } from 'class-validator'
import { Progress } from '@prisma/client'

export class UpdateTaskDto {

  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  progress?: Progress
}