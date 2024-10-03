import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getTotalExpensesCostOptions } from '../../lib/api'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/_authenticated/')({
  component: App,
})

function App() {
  const { isPending, error, data } = useQuery(getTotalExpensesCostOptions);

  if (error) return 'An error occured: ' + error.message

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Expenses</CardTitle>
        <CardDescription>The total expenses.</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? 'Loading...' : data.total.total ? data.total.total : 0}</CardContent>
    </Card>
  )
}
