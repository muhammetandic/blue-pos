import { defineConfig } from "drizzle-kit";

const dbUrl = process.env.DB_FILE_NAME || "hono.sqlite";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: dbUrl,
  },
});
