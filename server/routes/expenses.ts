import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

type Expense = {
    id: number,
    title: string,
    amount: number
}

const expenseSchema = z.object({
    title : z.string().min(3).max(100),
    amount : z.number().int().positive(),
})

export const expenseRoutes = new Hono()
.get('/', (c) => {
    return c.json({expenses: []})
})
.post('/', zValidator("json", expenseSchema), async (c) => {
    const data = c.req.valid("json");
    const expense = expenseSchema.parse(data);
    return c.json(expense)
})
.get('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = {id: id};
    return c.json(expense);
})
.delete('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = {id: id};
    return c.text("deleted: " + {expense});
})