import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { api } from '../../lib/api'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/_authenticated/')({
  component: App,
})

async function fetchTotal() {
  const res = await api.expenses['total'].$get()
  if (!res.ok) {
    throw new Error('server error')
  }
  const data = await res.json()
  return data
}

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-total'],
    queryFn: fetchTotal,
  })

  if (error) return 'An error occured: ' + error.message

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Expenses</CardTitle>
        <CardDescription>The total expenses.</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? 'Loading...' : data.total}</CardContent>
    </Card>
  )
}
