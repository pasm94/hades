import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { EnsureAuthenticatedMiddleware } from '../users/middlewares/ensure-authenticated.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  exports: [TypeOrmModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EnsureAuthenticatedMiddleware).forRoutes(ProjectsController);
  }
}
