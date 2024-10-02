import { text, numeric, pgTable, serial, index, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const expenses  = pgTable('expenses', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text("title").notNull(),
  amount: numeric('amount', {precision: 12, scale: 2}),
  createdAt: timestamp('created_at').defaultNow(),
}, (expenses) => {
  return {
    userIdIndex: index('user_idx').on(expenses.userId),
  }
});

// Schema for inserting a user - can be used to validate API requests
export const insertExpenseSchema = createInsertSchema(expenses, {
    userId: z.string().optional(),
    amount: z.string().min(1),
});

// Schema for selecting a user - can be used to validate API responses
export const selectExpenseSchema = createSelectSchema(expenses);
