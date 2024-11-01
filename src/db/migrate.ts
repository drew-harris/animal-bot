import * as dotenv from "dotenv";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { db } from ".";
dotenv.config();

const runMigration = async () => {
  try {
    console.log("Migrating");
    await migrate(db, { migrationsFolder: "./drizzle" });
  } catch (error) {
    console.error(error);
  }
};

runMigration();
