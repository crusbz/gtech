import { IUseCase } from 'src/shared/protocols/usecase';
import { Level } from '../../domain/level.entity';
import { ILevelRepository } from '../protocols/level-repository.protocol';

export class CreateLevelUseCase implements IUseCase<Partial<Level>, Level> {
  constructor(private readonly levelRepository: ILevelRepository) {}

  async execute(data: Partial<Level>): Promise<Level> {
    const level = new Level(data);
    return await this.levelRepository.add(level);
  }
}
