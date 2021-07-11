export class CreateProjectDto {
  name: string;
  status: 'to do' | 'doing' | 'done';
  description: string;
}
