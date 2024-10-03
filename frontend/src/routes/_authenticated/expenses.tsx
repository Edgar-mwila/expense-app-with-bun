import { createFileRoute } from '@tanstack/react-router'
import { getAllExpensesQueryOptions } from '../../lib/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import { Skeleton } from '../../components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { deleteExpenseFunction } from '../../lib/api'
import { toast } from 'sonner';


export const Route = createFileRoute('/_authenticated/expenses')({
  component: AllExpenses,
})

function AllExpenses() {
  const { isPending, error, data } = useQuery(getAllExpensesQueryOptions);

  if (error) return 'An error occurred: ' + error.message

  
  const totalAmount = data?.expenses.reduce((acc, member) => {
    const amount = parseFloat(member.amount!) || 0;
    return acc + amount;
  }, 0);

  const TableComp = () => (
    <Table>
      <TableCaption>A list of your expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isPending
          ? Array(3)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <Skeleton className="h-4 w-[250px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[250px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[250px]" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-4 w-[250px]" />
                  </TableCell>
                </TableRow>
              ))
          : data?.expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.id}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell className="text-right">{expense.amount}</TableCell>
                <TableCell>
                  <DeleteExpense id={expense.id}/>
                </TableCell>
                </TableRow>
            ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{totalAmount}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )

  return (
    <div className=" m-auto">
      <TableComp />
    </div>
  )
}
const DeleteExpense = ({id}: {id: number} ) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deleteExpenseFunction,
    onError: () => {
      toast("Error", {
        description: `could not delete expense ${id}!`,
      })
    },
    onSuccess: () => {
      queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, ((existingExpenses) => ({
        ...existingExpenses,
        expenses: existingExpenses!.expenses.filter((e) => e.id !== id),
      })))
      toast("Expense Deleted", {
        description: `Expense ${id} successfully deleted.`,
      })
    },
  })
    return (
      <Button 
        disabled={mutation.isPending}
        variant='outline' 
        onClick={ () =>
          mutation.mutate({id})
        }
      >
        {mutation.isPending ? "..." : <Trash className='h-4 w-4'/>}
      </Button>
    )
  }