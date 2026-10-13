import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { TasksController } from './tasks.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity.js';
import { TaskRepository } from './task.repository.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports:[
    TypeOrmModule.forFeature([TaskEntity]),
    UsersModule
  ],
  providers: [TasksService, TaskRepository],
  controllers: [TasksController]
})
export class TasksModule {}
