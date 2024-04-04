import { IDeveloperRepository } from '../application/protocols/db/developer-repository.protocol';
import { CreateDeveloperUseCase } from '../application/usecases/create-developer.usecase';
import { FindOneDeveloperUseCase } from '../application/usecases/find-one-developer.usecase';
import { ListDevelopersUseCase } from '../application/usecases/list-developers.usecase';
import { RemoveDeveloperUseCase } from '../application/usecases/remove-developer.usecase';
import { UpdateDeveloperUseCase } from '../application/usecases/update-developer.usecase';
import { DeveloperRepository } from '../infra/db/typorm/repositories/developer.repository';

export const DEVELOPER_PROVIDERS = [
  {
    provide: CreateDeveloperUseCase,
    useFactory: (developerRepo: IDeveloperRepository) => {
      return new CreateDeveloperUseCase(developerRepo);
    },
    inject: [DeveloperRepository],
  },
  {
    provide: ListDevelopersUseCase,
    useFactory: (developerRepo: IDeveloperRepository) => {
      return new ListDevelopersUseCase(developerRepo);
    },
    inject: [DeveloperRepository],
  },
  {
    provide: FindOneDeveloperUseCase,
    useFactory: (developerRepo: IDeveloperRepository) => {
      return new FindOneDeveloperUseCase(developerRepo);
    },
    inject: [DeveloperRepository],
  },
  {
    provide: UpdateDeveloperUseCase,
    useFactory: (developerRepo: IDeveloperRepository) => {
      return new UpdateDeveloperUseCase(developerRepo);
    },
    inject: [DeveloperRepository],
  },
  {
    provide: RemoveDeveloperUseCase,
    useFactory: (developerRepo: IDeveloperRepository) => {
      return new RemoveDeveloperUseCase(developerRepo);
    },
    inject: [DeveloperRepository],
  },
  DeveloperRepository,
];
