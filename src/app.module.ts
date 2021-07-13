import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [DatabaseModule, ModulesModule],
})
export class AppModule {}
