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

const expenses: Expense[] = [
    { id: 1, title: "Groceries", amount: 5000.00 },
    { id: 2, title: "Gas", amount: 800.00 }
];

const totalAmount = expenses.reduce((acc, member) => {
    return acc + (member.amount || 0);
  }, 0)

export const expenseRoutes = new Hono()
.get('/', (c) => {
    return c.json({ expenses: expenses })
})
.post('/', zValidator("json", expenseSchema), async (c) => {
    const data = c.req.valid("json");
    const expense = expenseSchema.parse(data);
    const newExpense: Expense = {
    id: expenses.length + 1,
    ...expense
    };
    expenses.push(newExpense);
    return c.json(newExpense)
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
.get('/total', (c) => {
    return c.json({total: totalAmount});
})