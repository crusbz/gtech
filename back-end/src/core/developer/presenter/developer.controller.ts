import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { CreateDeveloperUseCase } from '../application/usecases/create-developer.usecase';
import { FindOneDeveloperUseCase } from '../application/usecases/find-one-developer.usecase';
import { ListDevelopersUseCase } from '../application/usecases/list-developers.usecase';
import { RemoveDeveloperUseCase } from '../application/usecases/remove-developer.usecase';
import { UpdateDeveloperUseCase } from '../application/usecases/update-developer.usecase';
import { ValidateIdDto } from 'src/shared/dto/validate-id.dto';

@Controller('desenvolvedores')
export class DeveloperController {
  constructor(
    private readonly createDeveloperUseCase: CreateDeveloperUseCase,
    private readonly findOneDeveloperUseCase: FindOneDeveloperUseCase,
    private readonly listDevelopersUseCase: ListDevelopersUseCase,
    private readonly updateDeveloperUseCase: UpdateDeveloperUseCase,
    private readonly removeDeveloperUseCase: RemoveDeveloperUseCase,
  ) {}

  @Post()
  async create(@Body() createDeveloperDto: CreateDeveloperDto) {
    return await this.createDeveloperUseCase.execute(createDeveloperDto);
  }

  @Get()
  async findAll() {
    return await this.listDevelopersUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param() params: ValidateIdDto) {
    return await this.findOneDeveloperUseCase.execute(params.id);
  }

  @Put(':id')
  async update(
    @Param() param: ValidateIdDto,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ) {
    return await this.updateDeveloperUseCase.execute({
      id: param.id,
      data: updateDeveloperDto,
    });
  }

  @Delete(':id')
  async remove(@Param() params: ValidateIdDto) {
    await this.removeDeveloperUseCase.execute(params.id);
    return { message: 'Desenvolvedor removido com sucesso!', deleted: true };
  }
}
