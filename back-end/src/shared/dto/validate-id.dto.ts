import { Transform } from 'class-transformer';
import { IsPositive } from 'class-validator';

export class ValidateIdDto {
  @Transform(({ value }) => Number(value))
  @IsPositive({
    message: 'ID deve ser um número positivo',
  })
  id: number;
}
