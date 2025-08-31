import { DataSource, DataSourceOptions } from 'typeorm';

const ormConfig: DataSourceOptions = {
  type: process.env.DB_TYPE as any || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nestjs_concepts_development',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false,
  logging: true,
};

const AppDataSource = new DataSource(ormConfig);

export { AppDataSource };
export default ormConfig;
