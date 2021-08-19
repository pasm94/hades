import { IsIn, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsIn(['to do', 'doing', 'done'])
  status: 'to do' | 'doing' | 'done';

  @IsString()
  description: string;
}
