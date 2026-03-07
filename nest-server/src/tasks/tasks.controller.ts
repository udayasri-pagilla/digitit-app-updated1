import { Controller, Get, Post, Put, Delete, Body, Param, Req } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'

@Controller('tasks')
export class TasksController {

  constructor(private tasksService: TasksService) {}

  @Post()
  create(@Req() req, @Body() data: CreateTaskDto) {

    const user = req.user

    return this.tasksService.create(user.userId, data)
  }

  @Get()
  getTasks(@Req() req) {

    const user = req.user

    return this.tasksService.findAll(user.userId, user.role)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Req() req,
    @Body() data: UpdateTaskDto
  ) {

    const user = req.user

    return this.tasksService.update(Number(id), user.userId, data)
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Req() req
  ) {

    const user = req.user

    return this.tasksService.remove(Number(id), user.userId)
  }

}