import { IUseCase } from 'src/shared/protocols/usecase';
import { Level } from '../../domain/level.entity';
import { ILevelRepository } from '../protocols/level-repository.protocol';

export class ListLevelsUseCase implements IUseCase<void, Level[]> {
  constructor(private readonly levelRepository: ILevelRepository) {}

  async execute(): Promise<Level[]> {
    return await this.levelRepository.findAll();
  }
}
