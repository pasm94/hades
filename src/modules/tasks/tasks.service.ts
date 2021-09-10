import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity';
import { User } from '../users/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create({
    name,
    status,
    finished,
    prevision_date,
    project_id,
    started,
    user_id,
  }: CreateTaskDto): Promise<void> {
    if (user_id) {
      const userExists = await this.userRepository.findOne(user_id);
      if (!userExists) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
    }

    if (project_id) {
      const userExists = await this.projectRepository.findOne(project_id);
      if (!userExists) {
        throw new HttpException('Project not found', HttpStatus.BAD_REQUEST);
      }
    }

    const task = this.taskRepository.create({
      name,
      status,
      finished,
      prevision_date,
      project_id,
      started,
      user_id,
    });

    await this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    const allTasks = await this.taskRepository.find({
      order: { id: 'DESC' },
    });

    return allTasks;
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    return task;
  }

  async update(id: number, taskUpdateDto: UpdateTaskDto): Promise<void> {
    const { user_id, project_id } = taskUpdateDto;

    if (user_id) {
      const userExists = await this.userRepository.findOne(user_id);

      if (!userExists) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
    }

    if (project_id) {
      const projectExists = await this.projectRepository.findOne(project_id);

      if (!projectExists) {
        throw new HttpException('Project not found', HttpStatus.BAD_REQUEST);
      }
    }

    await this.taskRepository.update(id, taskUpdateDto);
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
