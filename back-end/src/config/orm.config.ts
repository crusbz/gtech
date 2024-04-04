import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { DeveloperModel } from 'src/core/developer/infra/db/typorm/models/developer.model';
import { LevelModel } from 'src/core/level/infra/db/typorm/models/level.model';

export const dataOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrations: [__dirname + '/migrations/{*.js,*.ts}'],
  entities: [DeveloperModel, LevelModel],
  synchronize: false,
};

console.log(dataOptions.migrations);

const dataSource = new DataSource(dataOptions);
export default dataSource;
