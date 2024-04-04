import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DeveloperModule } from './core/developer/presenter/developer.module';
import { LevelModule } from './core/level/presenter/level.module';
import { dataOptions } from './config/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataOptions),
    DeveloperModule,
    LevelModule,
    ConfigModule,
  ],
  controllers: [],
})
export class AppModule {}
