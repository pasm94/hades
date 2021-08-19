import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnsureAuthenticatedMiddleware } from '../users/middlewares/ensure-authenticated.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  exports: [TypeOrmModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EnsureAuthenticatedMiddleware).forRoutes(TasksController);
  }
}
