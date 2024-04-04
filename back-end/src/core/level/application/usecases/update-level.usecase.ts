import { IUseCase } from 'src/shared/protocols/usecase';
import { Level } from '../../domain/level.entity';
import { ILevelRepository } from '../protocols/level-repository.protocol';

type UpdateLevelInput = { id: number; data: Partial<Level> };
export class UpdateLevelUseCase implements IUseCase<UpdateLevelInput, Level> {
  constructor(private readonly levelRepository: ILevelRepository) {}

  async execute(input: UpdateLevelInput): Promise<Level> {
    const level = new Level(input.data);
    return this.levelRepository.update(input.id, level);
  }
}
