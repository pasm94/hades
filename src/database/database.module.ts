import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'paulo',
      password: 'docker',
      database: 'hades_db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      migrations: ['./migrations/*.ts'],
      cli: {
        migrationsDir: './migrations',
      },
    }),
  ],
})
export class DatabaseModule { }
