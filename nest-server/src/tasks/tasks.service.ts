import { Injectable, ForbiddenException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'

@Injectable()
export class TasksService {

  constructor(private prisma: PrismaService) {}

  // create task
  async create(userId: number, data: CreateTaskDto) {

    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        userId: userId
      }
    })
  }

  // get tasks
  async findAll(userId: number, role: string) {

    if (role === 'student') {

      return this.prisma.task.findMany({
        where: { userId }
      })

    }

    // teacher view
    return this.prisma.task.findMany({
      where: {
        OR: [
          { userId: userId },
          { user: { teacherId: userId } }
        ]
      }
    })
  }

  // update task
  async update(taskId: number, userId: number, data: UpdateTaskDto) {

    const task = await this.prisma.task.findUnique({
      where: { id: taskId }
    })

    if (!task || task.userId !== userId) {
      throw new ForbiddenException('Not allowed')
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data
    })
  }

  // delete task
  async remove(taskId: number, userId: number) {

    const task = await this.prisma.task.findUnique({
      where: { id: taskId }
    })

    if (!task || task.userId !== userId) {
      throw new ForbiddenException('Not allowed')
    }

    return this.prisma.task.delete({
      where: { id: taskId }
    })
  }

}