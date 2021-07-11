export class CreateTaskDto {
  name: string;
  status: 'to do' | 'doing' | 'done';
  prevision_date: Date;
  started: Date;
  finished: Date;
  user_id: number;
  project_id: number;
}
