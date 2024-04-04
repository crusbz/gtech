import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IDeveloperRepository } from 'src/core/developer/application/protocols/db/developer-repository.protocol';
import { Developer } from 'src/core/developer/domain/developer.entity';
import { DeveloperModel } from '../models/developer.model';

@Injectable()
export class DeveloperRepository implements IDeveloperRepository {
  constructor(
    @InjectRepository(DeveloperModel)
    private repository: Repository<DeveloperModel>,
  ) {}
  async add(developer: Partial<Developer>): Promise<Developer> {
    return await this.repository.save(developer);
  }
  async findAll(): Promise<Developer[]> {
    return await this.repository.find({
      relations: ['nivel'],
      order: {
        id: 'ASC',
      },
    });
  }
  async findOne(id: number): Promise<Developer> {
    return await this.repository.findOne({
      where: { id },
      relations: ['nivel'],
    });
  }
  async update(id: number, developer: Partial<Developer>): Promise<Developer> {
    await this.repository.update({ id }, developer);
    return await this.repository.findOneBy({ id });
  }
  async remove(id: number): Promise<void> {
    const developer = await this.repository.findOneBy({ id });
    if (!developer) {
      throw new NotFoundException('Desenvolvedor não encontrado');
    }
    await this.repository.softDelete({ id });
  }
}
