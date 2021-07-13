import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: 'to do' | 'doing' | 'done';

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
}
