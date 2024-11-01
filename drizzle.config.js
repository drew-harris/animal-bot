require('dotenv').config();

module.exports = {
  schema: "./src/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    connectionString: process.env.DB_URL,
  },
};
