import { IUseCase } from 'src/shared/protocols/usecase';
import { Developer } from '../../domain/developer.entity';
import { IDeveloperRepository } from '../protocols/db/developer-repository.protocol';

type InputUpdateDeveloper = {
  id: number;
  data: Partial<Developer>;
};
export class UpdateDeveloperUseCase
  implements IUseCase<InputUpdateDeveloper, Developer>
{
  constructor(private readonly developerRepository: IDeveloperRepository) {}

  async execute(input: InputUpdateDeveloper): Promise<Developer> {
    const developer = new Developer(input.data);
    return this.developerRepository.update(input.id, developer);
  }
}
