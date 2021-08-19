import { IsDate, IsIn, IsInt, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsIn(['to do', 'doing', 'done'])
  status: 'to do' | 'doing' | 'done';

  @IsDate()
  prevision_date?: Date;

  @IsDate()
  started?: Date;

  @IsDate()
  finished?: Date;

  @IsInt()
  user_id: number;

  @IsInt()
  project_id: number;
}
