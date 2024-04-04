import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Level1711500578235 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'levels',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nome',
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

    await queryRunner.createForeignKey(
      'developers',
      new TableForeignKey({
        name: 'fk_level_developer',
        columnNames: ['nivelId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'levels',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('developers', 'fk_level_developer');

    await queryRunner.dropTable('levels');
  }
}
