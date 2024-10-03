import { createFileRoute } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api, getAllExpensesQueryOptions } from '@/lib/api';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { DatePicker } from '@/components/ui/datePicker'

const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 2 characters.',
    })
    .max(100, {
      message: 'Title must have less than a 100 characters.',
    }),
  amount: z.number().int().positive({
    message: 'Amount must be positive.',
  }),
  date: z.date(),
})

export const Route = createFileRoute('/_authenticated/create-expense')({
  component: CreateExpense,
})

function CreateExpense() {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      amount: 0,
      date: new Date(),
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setShowSuccessAlert(false)
    try {
      const existingExpenses = await queryClient.ensureQueryData(getAllExpensesQueryOptions);
      const res = await api.expenses.$post({
        json: {
          title: values.title,
          amount: values.amount.toString(),
          date: values.date.toISOString(),
        },
      })
      if (!res.ok) {
        throw new Error('server error')
      }
      const newExpense = await res.json();
      queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, ({
        ...existingExpenses,
        expenses: [newExpense, ...existingExpenses.expenses],
      }))
      // Reset form after successful submission
      form.reset()
      toast("Success", {
        description: "Expense created Successfully",
      })
      // Hide the alert after 5 seconds
      setTimeout(() => setShowSuccessAlert(false), 5000)
    } catch (error) {
      toast("Error", {
        description: "Failed to create Expense",
    
      })
      console.error('Error submitting form:', error)
      // Handle error (e.g., show error message to user)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className=" m-auto items-center">
      {showSuccessAlert && (
        <Alert className="mb-4">
          <CheckCircledIcon className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Expense added successfully!</AlertDescription>
          <a href='/expenses'>Check List</a>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Expense"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  This is description of the expense.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>The total cost of the item.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <DatePicker 
                    date={field.value}
                    onDateChange={(date) => field.onChange(date)}
                    name="date"
                    aria-label="Select date"
                  />
                </FormControl>
                <FormDescription>Date the item was purchased.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
