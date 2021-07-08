import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create({ name, description, status }: CreateProjectDto): Promise<void> {
    const project = this.projectsRepository.create({
      name,
      description,
      status,
    });

    await this.projectsRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    const allProjects = await this.projectsRepository.find({
      order: { id: 'DESC' },
    });

    return allProjects;
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOne(id);
    return project;
  }

  async update(
    id: number,
    { status, description, name }: UpdateProjectDto,
  ): Promise<void> {
    const projectAlreadyExists = await this.findByName(name);

    if (projectAlreadyExists && projectAlreadyExists.id !== id) {
      throw new Error('Another user already use this email!');
    }

    await this.projectsRepository.update(id, {
      name,
      status,
      description,
    });
  }

  async findByName(name: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({ name });
    return project;
  }

  remove(id: number): void {
    this.projectsRepository.delete(id);
  }
}
