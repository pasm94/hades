import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// orm configs must be here and also in the root dir
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
      migrations: ['./migrations/*.ts'],
      cli: {
        migrationsDir: './migrations',
      },
    }),
  ],
})
export class DatabaseModule {}
