import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsDate, IsIn, IsInt, IsString } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  name?: string;

  @IsIn(['to do', 'doing', 'done'])
  status?: 'to do' | 'doing' | 'done';

  @IsDate()
  prevision_date?: Date;

  @IsDate()
  started?: Date;

  @IsDate()
  finished?: Date;

  @IsInt()
  user_id?: number;

  @IsInt()
  project_id?: number;
}
