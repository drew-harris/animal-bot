require("dotenv").config();

console.log(process.env.DB_URL);

module.exports = {
  schema: "./src/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    connectionString: process.env.DB_URL,
  },
};
