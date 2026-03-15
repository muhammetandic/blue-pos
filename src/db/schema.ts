import { boolean, pgTable, primaryKey, serial, timestamp, unique, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial().primaryKey(),
  mail: varchar({ length: 64 }).notNull().unique(),
  password: varchar({ length: 127 }).notNull(),
  isMailConfirmed: boolean().default(false),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const userTokens = pgTable(
  'user_tokens',
  {
    id: serial().primaryKey(),
    userId: serial()
      .notNull()
      .references(() => users.id),
    kind: varchar({ length: 64 }).notNull(),
    token: varchar({ length: 127 }).notNull(),
    expiresAt: timestamp().notNull(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
  },
  (table) => [unique().on(table.userId, table.token)],
);

export const tenants = pgTable('tenants', {
  id: serial().primaryKey(),
  name: varchar({ length: 64 }).notNull(),
  description: varchar({ length: 127 }),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
  createdBy: serial()
    .notNull()
    .references(() => users.id),
  updatedBy: serial().references(() => users.id),
});

export const tenantsUsers = pgTable(
  'tenants_users',
  {
    tenantId: serial()
      .notNull()
      .references(() => tenants.id),
    userId: serial()
      .notNull()
      .references(() => users.id),
    isAdmin: boolean().notNull().default(false),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
    createdBy: serial()
      .notNull()
      .references(() => users.id),
    updatedBy: serial().references(() => users.id),
  },
  (table) => [primaryKey({ columns: [table.tenantId, table.userId] })],
);

export const groups = pgTable('groups', {
  id: serial().primaryKey(),
  name: varchar({ length: 64 }).notNull(),
  description: varchar({ length: 127 }).notNull(),
  tenantId: serial()
    .notNull()
    .references(() => tenants.id),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
  createdBy: serial()
    .notNull()
    .references(() => users.id),
  updatedBy: serial().references(() => users.id),
});

export const usersGroups = pgTable(
  'users_groups',
  {
    userId: serial()
      .notNull()
      .references(() => users.id),
    groupId: serial()
      .notNull()
      .references(() => groups.id),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
    createdBy: serial()
      .notNull()
      .references(() => users.id),
    updatedBy: serial().references(() => users.id),
  },
  (table) => [primaryKey({ columns: [table.userId, table.groupId] })],
);

export const policies = pgTable('policies', {
  id: serial().primaryKey(),
  name: varchar({ length: 64 }).notNull(),
  description: varchar({ length: 127 }).notNull(),
  tenantId: serial()
    .notNull()
    .references(() => tenants.id),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
  createdBy: serial()
    .notNull()
    .references(() => users.id),
  updatedBy: serial().references(() => users.id),
});

export const usersPolicies = pgTable(
  'users_policies',
  {
    userId: serial()
      .notNull()
      .references(() => users.id),
    policyId: serial()
      .notNull()
      .references(() => policies.id),
    allow: boolean().notNull(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
    createdBy: serial()
      .notNull()
      .references(() => users.id),
    updatedBy: serial().references(() => users.id),
  },
  (table) => [primaryKey({ columns: [table.userId, table.policyId] })],
);

export const groupPolicies = pgTable(
  'groups_policies',
  {
    groupId: serial()
      .notNull()
      .references(() => groups.id),
    policyId: serial()
      .notNull()
      .references(() => policies.id),
    allow: boolean().notNull(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
    createdBy: serial()
      .notNull()
      .references(() => users.id),
    updatedBy: serial().references(() => users.id),
  },
  (table) => [primaryKey({ columns: [table.groupId, table.policyId] })],
);
