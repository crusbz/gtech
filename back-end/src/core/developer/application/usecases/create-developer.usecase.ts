import { IUseCase } from 'src/shared/protocols/usecase';
import { Developer } from '../../domain/developer.entity';
import { CreateDeveloperDto } from '../../presenter/dto/create-developer.dto';
import { IDeveloperRepository } from '../protocols/db/developer-repository.protocol';

export class CreateDeveloperUseCase
  implements IUseCase<CreateDeveloperDto, Developer>
{
  constructor(private readonly developerRepository: IDeveloperRepository) {}

  async execute(data: CreateDeveloperDto): Promise<Developer> {
    const developer = new Developer(data);
    return await this.developerRepository.add(developer);
  }
}
