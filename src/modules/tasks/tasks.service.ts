import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity';
import { User } from '../users/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

const statusTypes = ['to do', 'doing', 'done'];

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
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

    if (!statusTypes.includes(status)) {
      throw new HttpException('Invalid status!', HttpStatus.BAD_REQUEST);
    }
    const taskUserExists = await this.findUser(user_id);
    const taskProjectExists = await this.findProject(project_id);

    if(!taskUserExists){
      throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
    }

    if(!taskProjectExists){
      throw new HttpException('Project not found!', HttpStatus.BAD_REQUEST);
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

  async update(
    id: number,
    {
      name,
      status,
      prevision_date,
      started,
      finished,
      user_id,
      project_id,
    }: UpdateTaskDto,
  ): Promise<void> {

    const taskUserExists = user_id ? await this.findUser(user_id) : true;
    const taskProjectExists = project_id ? await this.findProject(project_id) : true;
    const isValidStatus = status ? statusTypes.includes(status) : true;

    if (!isValidStatus) {
      throw new HttpException('Invalid status!', HttpStatus.BAD_REQUEST);
    }

    if(!taskUserExists){
      throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
    }

    if(!taskProjectExists){
      throw new HttpException('Project not found!', HttpStatus.BAD_REQUEST);
    }

    const task = await this.taskRepository.findOne(id);

    await this.taskRepository.update(id, {
      name: name ? name : task.name,
      status: status ? status : task.status,
      prevision_date: prevision_date ? prevision_date : task.prevision_date,
      started: started ? started : task.started,
      finished: finished ? finished : task.finished,
      user_id: user_id ? user_id : task.user_id,
      project_id: project_id ? project_id : task.project_id,
    });
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async findUser(id: number): Promise<User>{
    const user = await getRepository(User).findOne(id);
    return user;
  }

  async findProject(id: number): Promise<Project>{
    const project = await getRepository(Project).findOne(id);
    return project;
  }
}
