import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { getUser } from "../kinde";
import { db } from '../db';
import { expenses as  expenseTable, insertExpenseSchema } from '../db/schema/expenses';
import { desc, eq, sum, and } from "drizzle-orm";


export const expenseRoutes = new Hono()
.get('/', getUser, async (c) => {
    const expenses = await db.select().from(expenseTable).where(eq(expenseTable.userId, c.var.user.id)).orderBy(desc(expenseTable.createdAt)).limit(100);
    return c.json({ expenses: expenses })
})
.post('/', getUser, zValidator("json", insertExpenseSchema), async (c) => {
    const data = c.req.valid("json");
    const validExpense = insertExpenseSchema.parse(data);
    const expense = {...validExpense, userId: c.var.user.id}
    const result = await db.insert(expenseTable).values(expense).returning();
    c.status(201);
    return c.json(result)
})
.get('/:id{[0-9]+}', getUser, async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const result = await db.select().from(expenseTable).where(and(eq(expenseTable.userId, c.var.user.id), eq(expenseTable.id, id))).then((res) => res[0])
    if (!result) return c.notFound();
    return c.json({result});
})
.delete('/:id{[0-9]+}', getUser, async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const result = await db.delete(expenseTable).where(and(eq(expenseTable.userId, c.var.user.id), eq(expenseTable.id, id))).returning().then((res) => res[0]);
    if (!result) return c.notFound();
    return c.json({deleted : {result}});
})
.get('/total', getUser, async (c) => {
    const total = await db.select({total: sum(expenseTable.amount)}).from(expenseTable).where(eq(expenseTable.userId, c.var.user.id)).limit(1).then(res => res[0])
    return c.json({total});
})