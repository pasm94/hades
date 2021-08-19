import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from './services/auth.service';
import { EnsureAuthenticatedMiddleware } from './middlewares/ensure-authenticated.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureAuthenticatedMiddleware)
      .exclude({ path: 'users/auth', method: RequestMethod.POST })
      .forRoutes(UsersController);
  }
}
