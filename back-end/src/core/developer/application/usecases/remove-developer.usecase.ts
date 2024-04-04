import { IUseCase } from 'src/shared/protocols/usecase';
import { Developer } from '../../domain/developer.entity';
import { IDeveloperRepository } from '../protocols/db/developer-repository.protocol';

export class RemoveDeveloperUseCase implements IUseCase<Developer['id'], void> {
  constructor(private readonly developerRepository: IDeveloperRepository) {}

  async execute(id: number): Promise<void> {
    await this.developerRepository.remove(id);
  }
}
