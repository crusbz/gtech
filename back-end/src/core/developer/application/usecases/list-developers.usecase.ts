import { IUseCase } from 'src/shared/protocols/usecase';
import { Developer } from '../../domain/developer.entity';
import { IDeveloperRepository } from '../protocols/db/developer-repository.protocol';

export class ListDevelopersUseCase implements IUseCase<void, Developer[]> {
  constructor(private readonly developerRepository: IDeveloperRepository) {}

  async execute(): Promise<Developer[]> {
    return await this.developerRepository.findAll();
  }
}
