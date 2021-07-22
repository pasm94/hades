import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// orm configs must be here and also in the root dir
interface IOptions {
  host: string;
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      host: 'database',
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
