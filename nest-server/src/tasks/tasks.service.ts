import { Injectable, ForbiddenException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Progress, Role } from '@prisma/client'

// TasksService contains all business logic related to task management
@Injectable()
export class TasksService {

  // Inject PrismaService to perform database operations
  constructor(private prisma: PrismaService) {}

  // -----------------------------------
  // CREATE TASK
  // -----------------------------------
  async create(userId: number, data: CreateTaskDto) {

    // Create a new task for the logged-in user
    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,

        // Convert dueDate string to Date object if provided
        dueDate: data.dueDate ? new Date(data.dueDate) : null,

        // Default task progress when created
        progress: Progress.not_started,

        // Associate task with the user
        userId
      }
    })
  }

  // -----------------------------------
  // GET TASKS (FILTERING + PAGINATION)
  // -----------------------------------
  async findAll(
    userId: number,
    role: Role,
    progress?: string,
    page = 1,
    limit = 5
  ) {

    // Filter object used to dynamically build query
    const filter: any = {}

    // If progress filter is valid, add it to query
    if (progress && Object.values(Progress).includes(progress as Progress)) {
      filter.progress = progress
    }

    // Pagination calculation
    const skip = (page - 1) * limit

    // -----------------------------------
    // STUDENT VIEW
    // Students can only see their own tasks
    // -----------------------------------
    if (role === Role.student) {

      return this.prisma.task.findMany({
        where: {
          userId,
          ...filter
        },

        // Sort tasks by latest created
        orderBy: {
          createdAt: 'desc'
        },

        skip,
        take: limit
      })

    }

    // -----------------------------------
    // TEACHER VIEW
    // Teachers can see:
    // 1. Their own tasks
    // 2. Tasks of their students
    // -----------------------------------
    return this.prisma.task.findMany({
      where: {
        OR: [
          { userId },
          { user: { teacherId: userId } }
        ],
        ...filter
      },

      orderBy: {
        createdAt: 'desc'
      },

      skip,
      take: limit
    })
  }
  
  // -----------------------------------
  // UPDATE TASK
  // -----------------------------------
  async update(taskId: number, userId: number, data: UpdateTaskDto) {

    // Find task by ID
    const task = await this.prisma.task.findUnique({
      where: { id: taskId }
    })

    // Only the task owner can update it
    if (!task || task.userId !== userId) {
      throw new ForbiddenException('Not allowed')
    }

    // Update task with provided data
    return this.prisma.task.update({
      where: { id: taskId },
      data
    })
  }

  // -----------------------------------
  // DELETE TASK
  // -----------------------------------
  async remove(taskId: number, userId: number) {

    // Find task by ID
    const task = await this.prisma.task.findUnique({
      where: { id: taskId }
    })

    // Only the owner can delete the task
    if (!task || task.userId !== userId) {
      throw new ForbiddenException('Not allowed')
    }

    // Delete the task
    return this.prisma.task.delete({
      where: { id: taskId }
    })
  }

}