import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

const statusTypes = ['to do', 'doing', 'done'];

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create({ name, description, status }: CreateProjectDto): Promise<void> {
    if (!statusTypes.includes(status)) {
      throw new HttpException('Invalid status!', HttpStatus.BAD_REQUEST);
    }

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

    const isValidStatus = status ? statusTypes.includes(status) : true;

    if (!isValidStatus) {
      throw new HttpException('Invalid status!', HttpStatus.BAD_REQUEST);
    }

    const project = await this.findOne(id);

    await this.projectsRepository.update(id, {
      name: name ? name : project.name,
      status: status ? status : project.status,
      description: description ? description : project.description,
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