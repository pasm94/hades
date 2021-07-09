import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  name: string;
  status: string;
  prevision_date: Date;
  started: Date;
  finished: Date;
  user_id: number;
  project_id: number;
}
