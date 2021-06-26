import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
// import {} './database/migrations/'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'docker',
      database: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      migrations: ['./database/migrations/*.ts'],
      cli: {
        migrationsDir: './database/migrations',
      },
    }),
    UsersModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
