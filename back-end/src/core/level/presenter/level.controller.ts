import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { CreateLevelUseCase } from '../application/usecases/create-level.usecase';
import { FindOneLevelUseCase } from '../application/usecases/find-one-level.usecase';
import { ListLevelsUseCase } from '../application/usecases/list-levels.usecase';
import { RemoveLevelUseCase } from '../application/usecases/remove-level.usecase';
import { UpdateLevelUseCase } from '../application/usecases/update-level.usecase';
import { ValidateIdDto } from 'src/shared/dto/validate-id.dto';

@Controller('niveis')
export class LevelController {
  constructor(
    private readonly createLevelUseCase: CreateLevelUseCase,
    private readonly findOneLevelUseCase: FindOneLevelUseCase,
    private readonly listLevelsUseCase: ListLevelsUseCase,
    private readonly updateLevelUseCase: UpdateLevelUseCase,
    private readonly removeLevelUseCase: RemoveLevelUseCase,
  ) {}

  @Post()
  async create(@Body() createLevelDto: CreateLevelDto) {
    return await this.createLevelUseCase.execute(createLevelDto);
  }

  @Get()
  async findAll() {
    return await this.listLevelsUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param() params: ValidateIdDto) {
    return await this.findOneLevelUseCase.execute(params.id);
  }

  @Put(':id')
  async update(
    @Param() params: ValidateIdDto,
    @Body() updateLevelDto: UpdateLevelDto,
  ) {
    return await this.updateLevelUseCase.execute({
      id: params.id,
      data: updateLevelDto,
    });
  }

  @Delete(':id')
  async remove(@Param() params: ValidateIdDto) {
    await this.removeLevelUseCase.execute(params.id);
    return { message: 'Nivel removido com sucesso!', deleted: true };
  }
}
