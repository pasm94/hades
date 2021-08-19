import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsString } from 'class-validator';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsString()
  name?: string;

  @IsIn(['to do', 'doing', 'done'])
  status?: 'to do' | 'doing' | 'done';

  @IsString()
  description?: string;
}
