import { createFileRoute } from '@tanstack/react-router'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { api } from '@/lib/api'
import { Button } from "../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircledIcon } from "@radix-ui/react-icons"

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 2 characters.",
  }).max(100, {
    message: "Title must have less than a 100 characters.",
  }),
  amount: z.number().int().positive({
    message: "Amount must be positive."
  })
})

export const Route = createFileRoute('/create-expense')({
  component: CreateExpense,
})

function CreateExpense() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      amount: 0,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setShowSuccessAlert(false);
    try {
      const res = await api.expenses.$post({
        json: values
      });
      if(!res.ok){
        throw new Error("server error");
      }
      // Reset form after successful submission
      form.reset();
      setShowSuccessAlert(true);
      // Hide the alert after 5 seconds
      setTimeout(() => setShowSuccessAlert(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='max-w-3xl m-auto items-center'>
      {showSuccessAlert && (
        <Alert className="mb-4">
          <CheckCircledIcon className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Expense added successfully!
          </AlertDescription>
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
                  <Input placeholder="Expense" {...field} disabled={isSubmitting} />
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
                <FormDescription>
                  The total cost of the item.
                </FormDescription>
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