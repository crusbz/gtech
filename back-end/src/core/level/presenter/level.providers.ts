import { ILevelRepository } from '../application/protocols/level-repository.protocol';
import { CreateLevelUseCase } from '../application/usecases/create-level.usecase';
import { FindOneLevelUseCase } from '../application/usecases/find-one-level.usecase';
import { ListLevelsUseCase } from '../application/usecases/list-levels.usecase';
import { RemoveLevelUseCase } from '../application/usecases/remove-level.usecase';
import { UpdateLevelUseCase } from '../application/usecases/update-level.usecase';
import { LevelRepository } from '../infra/db/typorm/repositories/level.repository';

export const LEVEL_PROVIDERS = [
  {
    provide: CreateLevelUseCase,
    useFactory: (levelRepo: ILevelRepository) => {
      return new CreateLevelUseCase(levelRepo);
    },
    inject: [LevelRepository],
  },
  {
    provide: ListLevelsUseCase,
    useFactory: (levelRepo: ILevelRepository) => {
      return new ListLevelsUseCase(levelRepo);
    },
    inject: [LevelRepository],
  },
  {
    provide: FindOneLevelUseCase,
    useFactory: (levelRepo: ILevelRepository) => {
      return new FindOneLevelUseCase(levelRepo);
    },
    inject: [LevelRepository],
  },
  {
    provide: UpdateLevelUseCase,
    useFactory: (levelRepo: ILevelRepository) => {
      return new UpdateLevelUseCase(levelRepo);
    },
    inject: [LevelRepository],
  },
  {
    provide: RemoveLevelUseCase,
    useFactory: (levelRepo: ILevelRepository) => {
      return new RemoveLevelUseCase(levelRepo);
    },
    inject: [LevelRepository],
  },
  LevelRepository,
];
