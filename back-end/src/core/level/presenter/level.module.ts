import { Module } from '@nestjs/common';
import { LevelController } from './level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelModel } from '../infra/db/typorm/models/level.model';
import { LEVEL_PROVIDERS } from './level.providers';

@Module({
  imports: [TypeOrmModule.forFeature([LevelModel])],
  controllers: [LevelController],
  providers: [...LEVEL_PROVIDERS],
})
export class LevelModule {}
