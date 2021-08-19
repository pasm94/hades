import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  // TO DO
  // in create method
  // [ ] prevision_date, started and finished fields does not need to be filled out
  // [ ] validate if the foreign keys are valid

  // in update method
  // [ ] all field must be optional, update only submitted fields
  // [ ] validate if the foreign keys are valid
  async create({
    name,
    status,
    finished,
    prevision_date,
    project_id,
    started,
    user_id,
  }: CreateTaskDto): Promise<void> {
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
    await this.taskRepository.update(id, {
      name,
      status,
      prevision_date,
      started,
      finished,
      user_id,
      project_id,
    });
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
