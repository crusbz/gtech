import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ILevelRepository } from 'src/core/level/application/protocols/level-repository.protocol';
import { Level } from 'src/core/level/domain/level.entity';
import { LevelModel } from '../models/level.model';

@Injectable()
export class LevelRepository implements ILevelRepository {
  constructor(
    @InjectRepository(LevelModel)
    private repository: Repository<LevelModel>,
  ) {}
  async add(level: Partial<Level>): Promise<Level> {
    return await this.repository.save(level);
  }
  async findAll(): Promise<Level[]> {
    return await this.repository.find();
  }
  async findOne(id: number): Promise<Level> {
    return await this.repository.findOneBy({ id });
  }
  async update(id: number, level: Partial<Level>): Promise<Level> {
    await this.repository.update({ id }, level);
    return await this.repository.findOneBy({ id });
  }
  async remove(id: number): Promise<void> {
    const level = await this.repository.findOneBy({ id });
    if (!level) {
      throw new NotFoundException('Nivel não encontrado');
    }
    await this.repository.softDelete({ id });
  }
}
