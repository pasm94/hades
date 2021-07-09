export class CreateTaskDto {
  name: string;
  status: string;
  prevision_date: Date;
  started: Date;
  finished: Date;
  user_id: number;
  project_id: number;
}
