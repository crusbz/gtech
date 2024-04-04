import { IUseCase } from 'src/shared/protocols/usecase';
import { Level } from '../../domain/level.entity';
import { ILevelRepository } from '../protocols/level-repository.protocol';

export class RemoveLevelUseCase implements IUseCase<Level['id'], void> {
  constructor(private readonly levelRepository: ILevelRepository) {}

  async execute(id: number): Promise<void> {
    await this.levelRepository.remove(id);
  }
}
