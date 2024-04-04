import { Level } from '../../domain/level.entity';

export interface ILevelRepository {
  add(level: Partial<Level>): Promise<Level>;
  findAll(): Promise<Level[]>;
  findOne(id: number): Promise<Level>;
  update(id: number, level: Partial<Level>): Promise<Level>;
  remove(id: number): Promise<void>;
}
