import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLevelDto {
  @IsString()
  @IsNotEmpty()
  nome: string;
}
