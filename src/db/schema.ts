import { bigint, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const sites = mysqlTable("scripts", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  folder: varchar("folder", { length: 255 }).notNull(),
});
