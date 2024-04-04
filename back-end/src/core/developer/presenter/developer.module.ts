import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeveloperModel } from '../infra/db/typorm/models/developer.model';
import { DeveloperController } from './developer.controller';
import { DEVELOPER_PROVIDERS } from './developer.providers';

@Module({
  imports: [TypeOrmModule.forFeature([DeveloperModel])],
  controllers: [DeveloperController],
  providers: [...DEVELOPER_PROVIDERS],
})
export class DeveloperModule {}
