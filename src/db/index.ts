import { Sequelize } from "sequelize";
import { config } from "../config";

const dbConfig = config();

export const db = new Sequelize({
  dialect: dbConfig.DATABASE_DIALECT,
  host: dbConfig.DATABASE_HOST,
  username: dbConfig.DATABASE_USER,
  password: dbConfig.DATABASE_PASSWORD,
  database: dbConfig.DATABASE_NAME,
});
