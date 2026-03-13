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

// Protect all task routes using JWT authentication
@UseGuards(JwtAuthGuard)

// Base route for this controller: /tasks
@Controller('tasks')
export class TasksController {

  // Inject TasksService to handle business logic
  constructor(private tasksService: TasksService) {}

  // -----------------------------
  // CREATE TASK
  // POST /tasks
  // -----------------------------
  @Post()
  create(
    // Access authenticated user from request
    @Req() req:any,

    // Validate request body using CreateTaskDto
    @Body() data: CreateTaskDto
  ) {

    // Extract user info added by JwtAuthGuard
    const user = req.user as any

    // Create task for the logged-in user
    return this.tasksService.create(user.userId, data)
  }

  // -----------------------------
  // GET TASKS (with filtering + pagination)
  // GET /tasks
  // -----------------------------
  @Get()
  getTasks(
    // Get authenticated user
    @Req() req: any,

    // Optional filter by task progress
    @Query('progress') progress?: string,

    // Pagination query parameters
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {

    const user = req.user as any

    // Convert page and limit from string to number
    const pageNumber = parseInt(page || '1', 10)
    const limitNumber = parseInt(limit || '5', 10)

    // Fetch tasks based on user role and filters
    return this.tasksService.findAll(
      user.userId,
      user.role,
      progress,
      pageNumber,
      limitNumber
    )
  }

  // -----------------------------
  // UPDATE TASK
  // PUT /tasks/:id
  // -----------------------------
  @Put(':id')
  update(

    // Convert task ID from string to number
    @Param('id', ParseIntPipe) id: number,

    // Get authenticated user
    @Req() req: any,

    // Validate update data using UpdateTaskDto
    @Body() data: UpdateTaskDto
  ) {

    const user = req.user as any

    // Update task if user has permission
    return this.tasksService.update(id, user.userId, data)
  }

  // -----------------------------
  // DELETE TASK
  // DELETE /tasks/:id
  // -----------------------------
  @Delete(':id')
  delete(

    // Convert task ID from string to number
    @Param('id', ParseIntPipe) id: number,

    // Get authenticated user
    @Req() req: any
  ) {

    const user = req.user as any

    // Remove task if the user owns it
    return this.tasksService.remove(id, user.userId)
  }

}