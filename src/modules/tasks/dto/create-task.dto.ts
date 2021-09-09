import { IsDate, IsIn, IsInt, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsIn(['to do', 'doing', 'done'])
  status: 'to do' | 'doing' | 'done';

  @IsDateString()
  @IsOptional()
  prevision_date?: Date;

  @IsDateString()
  @IsOptional()
  started?: Date;

  @IsDateString()
  @IsOptional()
  finished?: Date;

  @IsInt()
  user_id: number;

  @IsInt()
  project_id: number;
}
