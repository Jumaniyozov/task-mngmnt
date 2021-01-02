import 'dotenv/config';
import { TypeOrmModuleOptions } from "@nestjs/typeorm";


export const typeORMConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: process.env["DB_PASSWORD"],
  database: "task-management",
  entities: [__dirname + "/../**/*.entity.js"],
  synchronize: true
};
