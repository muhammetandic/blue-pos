import { sql } from "drizzle-orm/sql";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  mail: text("mail").notNull().unique(),
  password: text("password").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(
    sql`(strftime('%s','now') * 1000)`,
  ),
});

export const userTokens = sqliteTable("user_tokens", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  kind: text("kind").notNull(),
  token: text("token").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(
    sql`(strftime('%s','now') * 1000)`,
  ),
});

export const tenants = sqliteTable("tenants", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(
    sql`(strftime('%s','now') * 1000)`,
  ),
  createdBy: integer("created_by")
    .notNull()
    .references(() => users.id),
  updatedBy: integer("updated_by").references(() => users.id),
});

export const tenantsUsers = sqliteTable(
  "tenants_users",
  {
    tenantId: integer("tenant_id")
      .notNull()
      .references(() => tenants.id),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    isAdmin: integer("is_admin", { mode: "boolean" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(strftime('%s','now') * 1000)`),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(
      sql`(strftime('%s','now') * 1000)`,
    ),
    createdBy: integer("created_by")
      .notNull()
      .references(() => users.id),
    updatedBy: integer("updated_by").references(() => users.id),
  },
  (table) => [primaryKey({ columns: [table.tenantId, table.userId] })],
);

export const groups = sqliteTable("groups", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(
    sql`(strftime('%s','now') * 1000)`,
  ),
  createdBy: integer("created_by")
    .notNull()
    .references(() => users.id),
  updatedBy: integer("updated_by").references(() => users.id),
});

export const usersGroups = sqliteTable(
  "users_groups",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    groupId: integer("group_id")
      .notNull()
      .references(() => groups.id),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(strftime('%s','now') * 1000)`),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(
      sql`(strftime('%s','now') * 1000)`,
    ),
    createdBy: integer("created_by")
      .notNull()
      .references(() => users.id),
    updatedBy: integer("updated_by").references(() => users.id),
  },
  (table) => [primaryKey({ columns: [table.userId, table.groupId] })],
);

export const policies = sqliteTable("policies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(
    sql`(strftime('%s','now') * 1000)`,
  ),
  createdBy: integer("created_by")
    .notNull()
    .references(() => users.id),
  updatedBy: integer("updated_by").references(() => users.id),
});

export const usersPolicies = sqliteTable(
  "users_policies",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    policyId: integer("policy_id")
      .notNull()
      .references(() => policies.id),
    allow: integer("allow", { mode: "boolean" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(strftime('%s','now') * 1000)`),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(
      sql`(strftime('%s','now') * 1000)`,
    ),
    createdBy: integer("created_by")
      .notNull()
      .references(() => users.id),
    updatedBy: integer("updated_by").references(() => users.id),
  },
  (table) => [primaryKey({ columns: [table.userId, table.policyId] })],
);

export const groupPolicies = sqliteTable(
  "groups_policies",
  {
    groupId: integer("group_id")
      .notNull()
      .references(() => groups.id),
    policyId: integer("policy_id")
      .notNull()
      .references(() => policies.id),
    allow: integer("allow", { mode: "boolean" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(strftime('%s','now') * 1000)`),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(
      sql`(strftime('%s','now') * 1000)`,
    ),
    createdBy: integer("created_by")
      .notNull()
      .references(() => users.id),
    updatedBy: integer("updated_by").references(() => users.id),
  },
  (table) => [primaryKey({ columns: [table.groupId, table.policyId] })],
);
