import { createFileRoute } from '@tanstack/react-router'
import { api } from '../../lib/api'
import { useQuery } from '@tanstack/react-query'
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

async function fetchTotal() {
  const res = await api.expenses.$get()
  if (!res.ok) {
    throw new Error('server error')
  }
  const data = await res.json()
  return data
}

export const Route = createFileRoute('/_authenticated/expenses')({
  component: AllExpenses,
})

function AllExpenses() {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-all-expenses'],
    queryFn: fetchTotal,
  })

  if (error) return 'An error occured: ' + error.message

  const totalAmount =
    data?.expenses.reduce((acc, member) => {
      return acc + (member.amount || 0)
    }, 0) || 0

  const TableComp = () => (
    <Table>
      <TableCaption>A list of your expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Title</TableHead>
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
                  <TableCell className="text-right">
                    <Skeleton className="h-4 w-[250px]" />
                  </TableCell>
                </TableRow>
              ))
          : data?.expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.id}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell className="text-right">{expense.amount}</TableCell>
              </TableRow>
            ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">{totalAmount}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )

  return (
    <div className="max-w-3xl m-auto">
      <TableComp />
    </div>
  )
}
