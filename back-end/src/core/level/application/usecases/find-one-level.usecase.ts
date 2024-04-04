import { IUseCase } from 'src/shared/protocols/usecase';
import { Level } from '../../domain/level.entity';
import { ILevelRepository } from '../protocols/level-repository.protocol';

export class FindOneLevelUseCase implements IUseCase<Level['id'], Level> {
  constructor(private readonly levelRepository: ILevelRepository) {}

  async execute(id: number): Promise<Level> {
    return await this.levelRepository.findOne(id);
  }
}
