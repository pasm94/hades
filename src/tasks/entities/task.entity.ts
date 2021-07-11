import { timeStamp } from 'console';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: 'to do' | 'doing' | 'done';

  @Column({ type: 'date', nullable: true })
  prevision_date?: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  started?: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  finished?: Date;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  project_id: number;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
