import { DeveloperModel } from 'src/core/developer/infra/db/typorm/models/developer.model';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'levels' })
export class LevelModel {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => DeveloperModel, (developer) => developer.nivel)
  developers: DeveloperModel[];

  @Column('text')
  nome: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
