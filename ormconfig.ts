import 'reflect-metadata';

import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['./src/**/*.entity.ts'],
  migrationsRun: true,
  migrations: ['./src/db/migrations/*.ts'],
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
