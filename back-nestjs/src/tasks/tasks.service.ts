import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { TaskRepository } from './task.repository.js';
import { UsersService } from '../users/users.service.js';
import { ResponseTaskDto } from './dto/response-task.dto.js';
import { TaskEntity } from './task.entity.js';

@Injectable()
export class TasksService {

    constructor(
        private readonly taskRepository: TaskRepository,
        private readonly userService: UsersService
    ){}

    async findAll(userId: number){
        return await this.taskRepository.findTasksByUserId(userId);
    }
    
    async findById(userId: number, taskId: number){

        const selectedTask = await this.taskRepository.findById(taskId)

        if(!selectedTask){
            throw new HttpException(`Задача с Id: ${taskId} не найдена`, HttpStatus.NOT_FOUND);
        }

        if(selectedTask.author.id !== userId){
            throw new HttpException(`Задача с Id: ${taskId} создана создана другим пользователем`, HttpStatus.FORBIDDEN);
        }

        return this.mapEntityToDto(selectedTask);
    }
    
    
    async createTask(userId: number, createTaskDto: CreateTaskDto){
        const user = await this.userService.findById(userId);
        if(!user){
            throw new HttpException('Не найден пользователь', HttpStatus.NOT_FOUND)
        }

        const newTask = this.taskRepository.create({...createTaskDto, completed: false});
        newTask.author = user;

        const savedTask = await this.taskRepository.save(newTask);

        if(!savedTask){
            throw new HttpException('Не удалось сохранить задачу', HttpStatus.BAD_REQUEST)
        }

        return this.mapEntityToDto(savedTask);
    }
    
    async updateTask(userId: number, taskId: number, updateTaskDto: UpdateTaskDto){
        const taskOld = await this.taskRepository.findById(taskId);
        if(!taskOld){
            throw new HttpException(`Задача с Id: ${taskId} не найдена`, HttpStatus.NOT_FOUND);
        }

        if(taskOld.author.id !== userId){
            throw new HttpException(`Задача с Id: ${taskId} создана создана другим пользователем`, HttpStatus.FORBIDDEN);
        }

        const newTask = {...taskOld, ...updateTaskDto}

        console.log(updateTaskDto);

        const savedTask = await this.taskRepository.save(newTask);

        if(!savedTask){
            throw new HttpException('Не удалось сохранить задачу', HttpStatus.BAD_REQUEST)
        }

        return this.mapEntityToDto(savedTask);
        
    }
        
    async deleteTask(userId: number, taskId: number){

        await this.findById(userId, taskId);

        const deleteResult = await this.taskRepository.delete(taskId);

        if(deleteResult.affected === 0){
            return {status: false}
        }

        return {status: true}
    }


    private mapEntityToDto(task: TaskEntity): ResponseTaskDto{
        const responceTask: ResponseTaskDto = { ...task, author: { id: task.author.id, email: task.author.email } };

        return responceTask;
    }
}
