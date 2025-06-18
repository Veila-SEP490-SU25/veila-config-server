import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const datasource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    require.resolve('../models/audit.model'),
    require.resolve('../models/user.model'),
    require.resolve('../models/profile.model'),
    require.resolve('../models/record.model'),
  ],
  migrations: [require.resolve('./1750171440049-init')],
  synchronize: false,
  charset: 'utf8mb4_unicode_ci',
  migrationsTableName: 'migrations',
});
