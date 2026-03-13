
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  Query,
  UseGuards,
  ParseIntPipe
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { JwtAuthGuard } from '../auth/jwt.guard'

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {

  constructor(private tasksService: TasksService) {}

  @Post()
  create(
    @Req() req:any,
    @Body() data: CreateTaskDto
  ) {

    const user = req.user as any

    return this.tasksService.create(user.userId, data)
  }

  // @Get()
  // getTasks(
  //   @Req() req: any,
  //   @Query('progress') progress?: string
  // ) {

  //   const user = req.user as any

  //   return this.tasksService.findAll(
  //     user.userId,
  //     user.role,
  //     progress
  //   )
  // }
  @Get()
getTasks(
  @Req() req: any,
  @Query('progress') progress?: string,
 @Query('page') page?: string,
@Query('limit') limit?: string
) {

  const user = req.user as any
   const pageNumber = parseInt(page || '1', 10)
  const limitNumber = parseInt(limit || '5', 10)

  return this.tasksService.findAll(
    user.userId,
    user.role,
    progress,
    pageNumber,
    limitNumber
  )
}

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
    @Body() data: UpdateTaskDto
  ) {

    const user = req.user as any

    return this.tasksService.update(id, user.userId, data)
  }

  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any
  ) {

    const user = req.user as any

    return this.tasksService.remove(id, user.userId)
  }

}