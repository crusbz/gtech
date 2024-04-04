import { LevelModel } from 'src/core/level/infra/db/typorm/models/level.model';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity({ name: 'developers' })
export class DeveloperModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  nome: string;

  @ManyToOne(() => LevelModel, (level) => level.developers)
  nivel: LevelModel; // Propriedade para armazenar o objeto LevelModel associado

  @Column({ type: 'int' })
  @RelationId((developer: DeveloperModel) => developer.nivel)
  nivelId: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column('char')
  sexo: string;

  @Column('date')
  datadenascimento: Date;

  @Column('text')
  hobby: string;
}
