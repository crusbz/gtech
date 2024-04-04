import { Developer } from 'src/core/developer/domain/developer.entity';

export interface IDeveloperRepository {
  add(developer: Partial<Developer>): Promise<Developer>;
  findAll(): Promise<Developer[]>;
  findOne(id: number): Promise<Developer>;
  update(id: number, developer: Partial<Developer>): Promise<Developer>;
  remove(id: number): Promise<void>;
}
