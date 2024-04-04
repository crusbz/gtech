import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Developer1711500568548 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'developers',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nivelId',
            type: 'int',
            foreignKeyConstraintName: 'fk_level_developer',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'sexo',
            type: 'char',
            length: '1',
          },
          {
            name: 'datadenascimento',
            type: 'date',
          },
          {
            name: 'hobby',
            type: 'varchar',
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('developers');
  }
}
