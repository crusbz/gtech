import { IUseCase } from 'src/shared/protocols/usecase';
import { Developer } from '../../domain/developer.entity';
import { IDeveloperRepository } from '../protocols/db/developer-repository.protocol';

export class FindOneDeveloperUseCase
  implements IUseCase<Developer['id'], Developer>
{
  constructor(private readonly developerRepository: IDeveloperRepository) {}

  async execute(id: number): Promise<Developer> {
    return await this.developerRepository.findOne(id);
  }
}
