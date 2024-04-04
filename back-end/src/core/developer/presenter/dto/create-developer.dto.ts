import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDeveloperDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  nivelId: number;

  @IsNotEmpty()
  @IsString()
  sexo: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  datadenascimento: Date;

  @IsNotEmpty()
  @IsString()
  hobby: string;
}
