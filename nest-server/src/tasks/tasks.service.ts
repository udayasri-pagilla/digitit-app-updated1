

import { Injectable, ForbiddenException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Progress, Role } from '@prisma/client'

@Injectable()
export class TasksService {

  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: CreateTaskDto) {

    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        progress: Progress.not_started,
        userId
      }
    })
  }
async findAll(
  userId: number,
  role: Role,
  progress?: string,
  page = 1,
  limit = 5
) {

  const filter: any = {}

  if (progress && Object.values(Progress).includes(progress as Progress)) {
    filter.progress = progress
  }

  const skip = (page - 1) * limit

  if (role === Role.student) {

    return this.prisma.task.findMany({
      where: {
        userId,
        ...filter
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    })

  }

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
  // async findAll(userId: number, role: Role, progress?: string) {

  //   const filter: any = {}

  //   if (progress && Object.values(Progress).includes(progress as Progress)) {
  //     filter.progress = progress
  //   }

  //   if (role === Role.student) {

  //     return this.prisma.task.findMany({
  //       where: {
  //         userId,
  //         ...filter
  //       },
  //       orderBy: {
  //         createdAt: 'desc'
  //       }
  //     })

  //   }

  //   return this.prisma.task.findMany({
  //     where: {
  //       OR: [
  //         { userId },
  //         { user: { teacherId: userId } }
  //       ],
  //       ...filter
  //     },
  //     orderBy: {
  //       createdAt: 'desc'
  //     }
  //   })
  // }

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