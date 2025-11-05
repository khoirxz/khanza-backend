import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

const env = process.env.NODE_ENV || "development";

dotenv.config({ path: path.resolve(__dirname, `../../.env.${env}`) });

const envSchema = z.object({
  PORT: z.string().or(z.number()).default("5000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_HOST: z.string().default("localhost"),
  DATABASE_USER: z.string().default("root"),
  DATABASE_PASSWORD: z.string().default(""),
  DATABASE_NAME: z.string().default("inhealth"),
  DATABASE_DIALECT: z
    .enum(["mysql", "postgres", "sqlite", "mssql"])
    .default("mysql"),
});

export type Env = z.infer<typeof envSchema>;

export const config = (): Env => {
  const parsedEnv = envSchema.safeParse(process.env);

  if (!parsedEnv.success) {
    console.error(
      "❌ Invalid environment variables:",
      z.treeifyError(parsedEnv.error)
    );
    throw new Error("Invalid environment variables");
  }

  return parsedEnv.data;
};

export default config;
