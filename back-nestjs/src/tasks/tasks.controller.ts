import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { CreateTaskDto } from './dto/create-task.dto.js';

@Controller('tasks')
export class TasksController {

    constructor(
        private readonly taskService: TasksService
    ){}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async findAll(@Req() req: any){
        return this.taskService.findAll(req.user.id);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    findById(@Req() req: any, @Param('id') id: number){
        return this.taskService.findById(req.user.id, id);
    }


    @Post()
    @UseGuards(AuthGuard('jwt'))
    createTask(@Req() req: any, @Body() createTaskDto: CreateTaskDto){
        return this.taskService.createTask(req.user.id, createTaskDto);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    updateTask(@Req() req: any, @Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto){
        return this.taskService.updateTask(req.user.id, id, updateTaskDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    deleteTask(@Req() req: any, @Param('id') id: number){
        return this.taskService.deleteTask(req.user.id, id);
    }
}